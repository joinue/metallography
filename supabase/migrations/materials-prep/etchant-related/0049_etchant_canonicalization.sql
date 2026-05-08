-- Materials Prep — etchant entity / application split, phase B (canonicalization)
-- Apply via Supabase SQL Editor on top of 0046.
--
-- Phase B is the destructive half of the structural dedupe. After 0046:
--   * etchants still has all 2,700 source-catalog rows.
--   * etchant_applications has one row per existing etchant (1:1).
--
-- After THIS migration:
--   * Canonical etchants identified per (composition_key, method, scale).
--   * etchant_applications repointed so every application row references a
--     canonical etchant_id (not the original duplicate).
--   * primary_uses / secondary_uses arrays unioned into canonicals so no
--     curated tag is lost when duplicates are retired.
--   * Three denormalized columns on etchants (material_families,
--     alloys, applications_text) populated from the application fan-out so
--     filter queries don't need to join through etchant_applications. The
--     old material_family / alloy / application columns stay for now as
--     the legacy "primary" values (unchanged) — code will migrate to
--     read from the new denormalized columns over time.
--   * Non-canonical etchants soft-deleted via deleted_at. They remain in
--     the table for audit / referential integrity but are filtered out
--     by the standard `is("deleted_at", null)` clause used elsewhere.
--   * Trigger on etchant_applications keeps the denormalized columns in
--     sync if applications are added / changed / deleted later.
--   * suggest_etchants() function rewritten to query through the new
--     schema with deleted_at filtering.
--   * The legacy FTS index from 0013 (gin on to_tsvector(...)) is left
--     in place. It still functions on the legacy columns. Rebuilding it
--     to include the new arrays needs either a generated tsvector column
--     or an IMMUTABLE wrapper around array_to_string; deferred until the
--     catalog adopts Postgres FTS instead of ILIKE.
--
-- This migration ships with a coordinated code update (next commit) that
-- adds `is("deleted_at", null)` filters and switches filter predicates
-- from `material_family.in.X` to `material_families.cs.{X}`. Without that
-- code update, the catalog still works but shows soft-deleted rows.

begin;

-- =============================================================================
-- A. Add denormalized columns to etchants
-- =============================================================================
-- These columns let the catalog page filter and search on application-side
-- data without joining through etchant_applications on every query. They
-- are kept in sync by a trigger on etchant_applications (added later in
-- this migration so the bulk operations below don't fire it row-by-row).

alter table public.etchants
  add column if not exists material_families text[] not null default array[]::text[],
  add column if not exists alloys text[] not null default array[]::text[],
  add column if not exists applications_text text not null default '';

comment on column public.etchants.material_families is
  'Denormalized list of distinct material_family values from this etchant''s '
  'applications. Maintained by the trigger on etchant_applications. Use this '
  'for catalog filters; etchant_applications is the source of truth.';

comment on column public.etchants.alloys is
  'Denormalized list of distinct (non-null) alloy values from applications. '
  'Maintained by trigger on etchant_applications.';

comment on column public.etchants.applications_text is
  'Denormalized concatenation of distinct application_notes from applications, '
  'separated by " / ". Used by the FTS index and the q filter. Maintained '
  'by trigger on etchant_applications.';

-- =============================================================================
-- B. Build the canonical map
-- =============================================================================
-- Cluster active etchants by (composition_key, method, scale). Pick canonical
-- per cluster: prefer rows with non-null common_name (already curated), then
-- rows with the most populated optional fields, then stable id order. The
-- result is a temp table with row_id → canonical_id and cluster_rank (1 for
-- the canonical, 2+ for duplicates).

create temporary table _canonical_map on commit drop as
with cluster_ranked as (
  select
    id,
    composition_key(composition) as ckey,
    method,
    scale,
    row_number() over (
      partition by composition_key(composition), method, scale
      order by
        (case when common_name is not null then 0 else 1 end),
        (case when procedure is not null and length(trim(procedure)) > 0 then 0 else 1 end),
        (case when reference_citation is not null then 0 else 1 end),
        id
    ) as rn
  from public.etchants
  where deleted_at is null
    and composition is not null
    and length(trim(composition)) > 0
)
select
  rid.id as row_id,
  rcanon.id as canonical_id,
  rid.rn as cluster_rank
from cluster_ranked rid
join cluster_ranked rcanon
  on rcanon.ckey = rid.ckey
 and rcanon.method = rid.method
 and rcanon.scale = rid.scale
 and rcanon.rn = 1;

create index on _canonical_map (row_id);
create index on _canonical_map (canonical_id);

-- =============================================================================
-- C. Repoint etchant_applications to canonicals
-- =============================================================================
-- Every application currently points at its original etchant_id (1:1 from
-- 0046). Move applications belonging to non-canonical rows to point at
-- their cluster's canonical instead. After this step, each canonical
-- collects applications from all duplicates of itself.

update public.etchant_applications ea
   set etchant_id = m.canonical_id
  from _canonical_map m
 where ea.etchant_id = m.row_id
   and m.row_id <> m.canonical_id;

-- =============================================================================
-- D. Union primary_uses and secondary_uses into canonicals
-- =============================================================================
-- Curated tags may differ across duplicate rows (different application text
-- produces different tags via the heuristic in etchant-uses.ts). Collect
-- the union per cluster and assign to the canonical row.

with cluster_primary as (
  select
    m.canonical_id,
    coalesce(
      array_agg(distinct u order by u) filter (where u is not null),
      array[]::text[]
    ) as merged
  from _canonical_map m
  join public.etchants e on e.id = m.row_id
  cross join unnest(coalesce(e.primary_uses, array[]::text[])) as u
  group by m.canonical_id
)
update public.etchants canon
   set primary_uses = cp.merged
  from cluster_primary cp
 where canon.id = cp.canonical_id;

with cluster_secondary as (
  select
    m.canonical_id,
    coalesce(
      array_agg(distinct u order by u) filter (where u is not null),
      array[]::text[]
    ) as merged
  from _canonical_map m
  join public.etchants e on e.id = m.row_id
  cross join unnest(coalesce(e.secondary_uses, array[]::text[])) as u
  group by m.canonical_id
)
update public.etchants canon
   set secondary_uses = cs.merged
  from cluster_secondary cs
 where canon.id = cs.canonical_id;

-- A tag that became primary in one duplicate but secondary in another should
-- end up only in primary on the canonical (not in both).
update public.etchants
   set secondary_uses = (
     select coalesce(array_agg(s order by s), array[]::text[])
       from unnest(secondary_uses) as s
      where not (s = any(primary_uses))
   )
 where coalesce(array_length(secondary_uses, 1), 0) > 0
   and coalesce(array_length(primary_uses, 1), 0) > 0
   and secondary_uses && primary_uses
   and deleted_at is null;

-- =============================================================================
-- E. Populate denormalized columns on canonicals
-- =============================================================================
-- Now that applications are repointed to canonicals, summarize them into
-- the three denormalized columns. Direct SQL update is cheaper here than
-- firing the trigger row-by-row during the bulk repoint above (the trigger
-- is added at the end of this migration).

update public.etchants e
   set material_families = coalesce(sub.families, array[]::text[]),
       alloys            = coalesce(sub.alloys, array[]::text[]),
       applications_text = coalesce(sub.notes, '')
  from (
    select
      ea.etchant_id,
      array_agg(distinct ea.material_family order by ea.material_family)
        as families,
      array_agg(distinct ea.alloy order by ea.alloy) filter (where ea.alloy is not null)
        as alloys,
      string_agg(distinct ea.application_notes, ' / ' order by ea.application_notes)
        filter (where ea.application_notes is not null and length(trim(ea.application_notes)) > 0)
        as notes
    from public.etchant_applications ea
    group by ea.etchant_id
  ) sub
 where e.id = sub.etchant_id;

-- =============================================================================
-- F. Soft-delete non-canonicals
-- =============================================================================
-- Mark the duplicate rows as retired. They remain in the table for audit
-- purposes but are filtered out by the standard is("deleted_at", null)
-- clause used by all etchants queries.

update public.etchants
   set deleted_at = now()
 where id in (select row_id from _canonical_map where cluster_rank > 1)
   and deleted_at is null;

-- =============================================================================
-- G. Indexes on the new denormalized columns
-- =============================================================================

create index if not exists idx_etchants_material_families_gin
  on public.etchants using gin (material_families);

create index if not exists idx_etchants_alloys_gin
  on public.etchants using gin (alloys);

-- =============================================================================
-- H. (FTS index rebuild deferred)
-- =============================================================================
-- The original FTS index from 0013 indexes material_family / alloy /
-- application — legacy columns that still carry data on canonicals. The
-- catalog query uses ILIKE through Supabase's .or() chain (not Postgres
-- FTS via @@), so the existing index keeps working as-is for canonical
-- rows; soft-deleted duplicates will be filtered out at query time by
-- is("deleted_at", null).
--
-- Rebuilding the index to include the new arrays would require either a
-- generated tsvector column maintained by the trigger or wrapping
-- array_to_string inside an IMMUTABLE wrapper (array_to_string itself is
-- STABLE in current PostgreSQL, which trips the
-- "functions in index expression must be marked IMMUTABLE" rule). Both
-- are reasonable additions when application code actually adopts FTS,
-- which it doesn't today. Deferring.

-- =============================================================================
-- I. Trigger to keep denormalized columns in sync
-- =============================================================================
-- For any future inserts / updates / deletes on etchant_applications,
-- recompute the denormalized columns on the affected etchant(s).

create or replace function public.refresh_etchant_denorm(p_etchant_id uuid)
  returns void as $$
  update public.etchants e
     set material_families = coalesce((
           select array_agg(distinct ea.material_family order by ea.material_family)
             from public.etchant_applications ea
            where ea.etchant_id = p_etchant_id
         ), array[]::text[]),
         alloys = coalesce((
           select array_agg(distinct ea.alloy order by ea.alloy)
             filter (where ea.alloy is not null)
             from public.etchant_applications ea
            where ea.etchant_id = p_etchant_id
         ), array[]::text[]),
         applications_text = coalesce((
           select string_agg(distinct ea.application_notes, ' / '
                             order by ea.application_notes)
             filter (where ea.application_notes is not null
                     and length(trim(ea.application_notes)) > 0)
             from public.etchant_applications ea
            where ea.etchant_id = p_etchant_id
         ), '')
   where e.id = p_etchant_id;
$$ language sql;

create or replace function public.tg_etchant_apps_refresh_denorm()
  returns trigger as $$
begin
  if (TG_OP = 'DELETE') then
    perform public.refresh_etchant_denorm(OLD.etchant_id);
    return OLD;
  end if;

  perform public.refresh_etchant_denorm(NEW.etchant_id);

  -- If a row's etchant_id was reassigned (repointed to a different
  -- canonical), also recompute the previous owner.
  if (TG_OP = 'UPDATE' and OLD.etchant_id is distinct from NEW.etchant_id) then
    perform public.refresh_etchant_denorm(OLD.etchant_id);
  end if;

  return NEW;
end;
$$ language plpgsql;

create trigger trg_etchant_apps_refresh_denorm
  after insert or update or delete on public.etchant_applications
  for each row execute function public.tg_etchant_apps_refresh_denorm();

-- =============================================================================
-- J. Rewrite suggest_etchants() to use new schema
-- =============================================================================
-- The advisor function from 0013 ranks etchants for a given material/alloy
-- input. It joined material_family + alloy directly off etchants. Now those
-- live on etchant_applications (with denormalized arrays on etchants for
-- filtering). Rewrite to query through applications and return canonical
-- etchants only.
--
-- PostgreSQL refuses CREATE OR REPLACE on a RETURNS TABLE function even
-- when the OUT column list is unchanged, so drop the existing definition
-- first.

drop function if exists public.suggest_etchants(text, text, text, text, int);

create function public.suggest_etchants(
  p_material text,
  p_alloy text default null,
  p_scale text default null,
  p_method text default null,
  p_limit int default 25
)
returns table (
  id uuid,
  material_family text,
  alloy text,
  scale text,
  method text,
  common_name text,
  composition text,
  procedure text,
  application text,
  reference_citation text,
  score real
)
language sql
stable
security definer
set search_path = public
as $$
  with matched as (
    -- Find applications whose family / alloy match the input. Score by
    -- best match across the etchant's applications.
    select
      ea.etchant_id,
      max(
        case
          when p_material is not null and ea.material_family ilike p_material then 1.0
          when p_material is not null then similarity(ea.material_family, p_material)
          else 0.0
        end
        +
        case
          when p_alloy is not null and ea.alloy ilike p_alloy then 0.5
          when p_alloy is not null and ea.alloy is not null then 0.5 * similarity(ea.alloy, p_alloy)
          else 0.0
        end
      )::real as best_score,
      max(ea.material_family) as best_family,
      max(ea.alloy) as best_alloy,
      max(ea.application_notes) as best_notes
    from public.etchant_applications ea
    where (
      p_material is null
      or ea.material_family % p_material
      or ea.material_family ilike '%' || p_material || '%'
    )
    group by ea.etchant_id
  )
  select
    e.id,
    m.best_family,
    m.best_alloy,
    e.scale,
    e.method,
    e.common_name,
    e.composition,
    e.procedure,
    m.best_notes as application,
    e.reference_citation,
    m.best_score as score
  from public.etchants e
  join matched m on m.etchant_id = e.id
  where e.deleted_at is null
    and (p_scale is null or e.scale = p_scale)
    and (p_method is null or e.method = p_method)
  order by m.best_score desc, e.common_name nulls last, e.id
  limit greatest(p_limit, 1);
$$;

revoke all on function public.suggest_etchants(text, text, text, text, int) from public;
grant execute on function public.suggest_etchants(text, text, text, text, int) to authenticated;

-- =============================================================================
-- Sanity checks (run manually after applying):
--
--   -- Count change: canonicals should drop from ~2,700 to ~1,500-2,000.
--   select
--     (select count(*) from public.etchants where deleted_at is null) as canonical_count,
--     (select count(*) from public.etchants where deleted_at is not null) as retired_count;
--
--   -- Spot-check Graff and Sargent: expect 1 canonical etchant with 4
--   -- applications (one per alloy 2xxx/3xxx/6xxx/7xxx).
--   select e.id, e.common_name, e.scale, e.method,
--          e.material_families, e.alloys
--     from public.etchants e
--    where e.common_name = 'Graff and Sargent'
--      and e.deleted_at is null;
--
--   select ea.material_family, ea.alloy, ea.application_notes
--     from public.etchant_applications ea
--     join public.etchants e on e.id = ea.etchant_id
--    where e.common_name = 'Graff and Sargent'
--      and e.deleted_at is null;
--
--   -- Verify denormalization populated correctly (every active etchant
--   -- should have at least one material_family in the array):
--   select count(*) as missing_families from public.etchants
--    where deleted_at is null
--      and array_length(material_families, 1) is null;
--   -- Expect 0.
--
--   -- Verify advisor still returns sensible results:
--   select * from public.suggest_etchants('Carbon & alloy steel', null, 'Micro', 'Chemical', 5);
-- =============================================================================

commit;
