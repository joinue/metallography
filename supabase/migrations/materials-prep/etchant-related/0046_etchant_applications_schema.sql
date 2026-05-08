-- Materials Prep — etchant entity / application split, phase A (schema + backfill)
-- Apply via Supabase SQL Editor on top of 0045.
--
-- This is phase A of the structural dedupe described in the editorial-pass
-- arc. The seed catalog (0014) imported from a 2005-era CSV creates one
-- etchants row per (recipe × applicable alloy). For most recipes the alloy
-- column is the only thing that varies across rows: "Graff and Sargent"
-- exists 4 times for 2xxx/3xxx/6xxx/7xxx aluminum, all with identical
-- composition, procedure, application text, and citation.
--
-- The UI in EtchantsBrowser.tsx already groups these duplicates in memory
-- via `compositionKey()` for display. This phase pushes the same model
-- down to the schema: one row per unique recipe identity, fan-out of
-- (material_family, alloy) handled in a separate `etchant_applications`
-- table.
--
-- Canonical etchant identity: (composition, method, scale). This matches
-- how Vander Voort, ASM Handbook Vol 9, and Petzow organize their etchant
-- tables — every row is one (composition × technique × scale) tuple with
-- its own procedure. Composition-only would have collapsed Nital-chemical
-- and Nital-electrolytic into one row, making detail pages multi-procedure
-- and breaking with how metallographers actually search for recipes.
--
-- Phase A (THIS migration): non-destructive.
--   * Create `etchant_applications` table + indexes + RLS.
--   * Create `composition_key(text)` helper function mirroring the JS
--     normalization in reagent-format.ts.
--   * Add `deleted_at` to etchants. AGENTS.md listed etchants among the
--     soft-delete-aware tables, but 0013 never actually added the column.
--     Phase B uses it to retire non-canonical duplicates.
--   * Backfill: every existing etchants row contributes one application
--     row pointing at its own etchant_id. No canonical selection yet.
--
-- Phase B (0047, separate migration): destructive, ships with code update.
--   * Identify canonical etchant per (composition_key, method, scale)
--     cluster: prefer rows with non-null common_name, then most-populated
--     other fields, then stable id order.
--   * Repoint etchant_applications.etchant_id from non-canonicals to
--     canonicals.
--   * Union primary_uses / secondary_uses arrays into canonicals so no
--     curated tag is lost.
--   * Soft-delete non-canonicals via deleted_at.
--   * Code change: query updates in /etchants page, detail page,
--     suggest_etchants() function, and the materials.etchant_family
--     lookup from 0029 — all join through etchant_applications for the
--     fan-out fields.
--
-- Phase C (separate code change): display polish.
--   * Always-show ingredient fingerprint on catalog cards (not just for
--     named clusters).
--   * "Variants of [name]" panel on detail page surfacing same-common_name
--     siblings with composition fingerprint, method, scale.
--   * Method/scale promoted in card title where same-name siblings exist.

begin;

-- =============================================================================
-- A. composition_key helper function
-- =============================================================================
-- Normalizes a composition string into a stable cluster key. Mirrors the
-- JS implementation in app/labs/[labId]/etchants/reagent-format.ts so the
-- UI's existing in-memory grouping uses the same key as the database.

create or replace function public.composition_key(s text) returns text as $$
  select
    btrim(
      regexp_replace(
        regexp_replace(
          regexp_replace(
            lower(coalesce(s, '')),
            '[\r\n]+', ' ', 'g'
          ),
          '[.;,:]+\s', ' ', 'g'
        ),
        '\s+', ' ', 'g'
      )
    );
$$ language sql immutable;

comment on function public.composition_key(text) is
  'Cluster key for etchant composition: lowercases, normalizes whitespace, '
  'and strips trailing punctuation around tokens. Same logic as compositionKey '
  'in reagent-format.ts. Used by 0047 to identify canonical etchants and at '
  'runtime where SQL-side grouping is preferable to in-memory grouping.';

-- =============================================================================
-- B. etchant_applications table
-- =============================================================================
-- One row per (canonical etchant × applicable material × applicable alloy).
-- After phase B, etchant_id points at the canonical etchants row; the
-- per-alloy fan-out lives entirely in this table.

create table public.etchant_applications (
  id uuid primary key default gen_random_uuid(),
  etchant_id uuid not null references public.etchants(id) on delete cascade,
  material_family text not null,
  alloy text,
  application_notes text,
  created_at timestamptz not null default now()
);

comment on table public.etchant_applications is
  'Fan-out of canonical etchants across applicable (material_family, alloy) '
  'pairs. Mirrors the per-row alloy column from the seed schema, but '
  'normalized so a single canonical etchant has many applications.';

-- =============================================================================
-- C. Indexes
-- =============================================================================
-- Mirrors the original etchants indexes. Trigram indexes support the
-- advisor's similarity matching against messy customer free-text input.

create index idx_etchant_apps_etchant_id
  on public.etchant_applications (etchant_id);

create index idx_etchant_apps_material_family
  on public.etchant_applications (material_family);

create index idx_etchant_apps_family_alloy
  on public.etchant_applications (material_family, alloy);

-- pg_trgm extension is already enabled by 0013. Trigram indexes for
-- fuzzy matching on family + alloy.
create index idx_etchant_apps_family_trgm
  on public.etchant_applications using gin (material_family gin_trgm_ops);

create index idx_etchant_apps_alloy_trgm
  on public.etchant_applications using gin (alloy gin_trgm_ops)
  where alloy is not null;

-- =============================================================================
-- D. Row-level security
-- =============================================================================
-- Mirrors etchants: any signed-in user can read; writes are service-role
-- only. The reference catalog is a shared resource across labs.

alter table public.etchant_applications enable row level security;

create policy "etchant_apps_select_authenticated"
  on public.etchant_applications for select
  using (auth.uid() is not null);

-- =============================================================================
-- E. Add deleted_at to etchants
-- =============================================================================
-- AGENTS.md lists etchants among the soft-delete-aware tables but the
-- column was never actually added in 0013. Phase B (0047) needs to mark
-- non-canonical rows as retired without dropping them outright (so the
-- ids remain valid for any external reference and the audit trail is
-- preserved). Adding the column here as part of phase A so the column
-- exists when the backfill below selects from etchants and so phase B
-- can soft-delete duplicates without further schema changes.
--
-- Existing queries in app/labs/[labId]/etchants/* don't currently filter
-- on this column. They'll be updated alongside 0047 to add the standard
-- `is("deleted_at", null)` filter, matching the convention used by
-- samples / recipes / studies / atlas_entries / materials.

alter table public.etchants
  add column if not exists deleted_at timestamptz;

comment on column public.etchants.deleted_at is
  'Soft-delete timestamp. Null = active. Populated by 0047 on non-canonical '
  'duplicates of the same recipe.';

-- =============================================================================
-- F. Backfill etchant_applications
-- =============================================================================
-- Every existing etchants row contributes one application row. After this
-- step, each application points at its own etchant_id (1:1 ratio). Phase B
-- (0047) will repoint applications to canonicals.
--
-- The deleted_at filter is defensive — at the moment this migration runs,
-- the column was just added and every row has deleted_at = null, so the
-- filter matches everything. The clause is here for forward-compatibility
-- if anyone reapplies the migration after rows have been soft-deleted.

insert into public.etchant_applications (etchant_id, material_family, alloy, application_notes)
select id, material_family, alloy, application
  from public.etchants
 where deleted_at is null;

-- =============================================================================
-- Sanity checks (run manually after applying):
--
--   -- Backfill row count should equal active etchants count:
--   select
--     (select count(*) from public.etchants where deleted_at is null) as etchants_count,
--     (select count(*) from public.etchant_applications) as apps_count;
--
--   -- Spot-check Graff and Sargent: expect 4 application rows pointing at
--   -- 4 distinct etchant_ids (canonicalization happens in 0047):
--   select e.id, e.alloy, ea.material_family, ea.alloy, ea.application_notes
--     from public.etchants e
--     join public.etchant_applications ea on ea.etchant_id = e.id
--    where e.common_name = 'Graff and Sargent'
--      and e.deleted_at is null;
--
--   -- Verify composition_key function:
--   select composition_key('100 ml ethanol;
-- 4 g picric acid');
--   -- Expect: '100 ml ethanol 4 g picric acid'
-- =============================================================================

commit;
