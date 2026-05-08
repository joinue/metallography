-- Materials Prep — etchant Pace-list audit, batch 1
-- Apply via Supabase SQL Editor on top of 0052.
--
-- This migration covers the unambiguous fixes from auditing the catalog
-- against Pace's stocked etchant list:
--
--   A. Apostrophe / form normalization on common_names that match Pace
--      products under non-standard spellings (Adlers, Carpenters Reagent).
--   B. Add four etchants that aren't in the catalog at all:
--        * Al-NaOH Etchant       — sodium hydroxide for aluminum
--        * Ammonium Persulfate   — for brasses with cobalt
--        * ASTM 97               — KOH electrolytic for Fe-Cr-Ni
--        * Klemm's 2             — Na2S2O3 sat + 25 g K2S2O5 (Klemm's I
--                                  is already in the catalog as a
--                                  separate canonical with ~5 g K2S2O5)
--
-- Out of scope, deferred to batch 2 (needs careful per-canonical
-- composition matching against Pace's exact specs):
--   * Naming the 5 unnamed canonicals where Pace has a product name
--     (Copper No.1, Copper No.2, Dichromate, CU-PASS-SOL, Inconel
--     Etchant).
--   * Distinguishing existing Klemm's variants (I vs III) by metabisulfite
--     quantity.
--
-- Source on new rows: 'pace-list' so they're traceable as additions
-- driven by Pace's product catalog rather than the metallographic-cd
-- import. Existing source rows are 'metallographic-cd'.

begin;

-- =============================================================================
-- A. Apostrophe / form normalization on common_names
-- =============================================================================
-- These canonicals exist with Don's seed-import spelling. Renaming to
-- match the metallography-canonical possessive form makes them findable
-- by users searching "Adler's" or "Carpenter's" and aligns with Pace's
-- product naming.

update public.etchants
   set common_name = 'Adler''s reagent'
 where common_name = 'Adlers'
   and deleted_at is null;

update public.etchants
   set common_name = 'Carpenter''s reagent'
 where common_name = 'Carpenters Reagent'
   and deleted_at is null;

-- =============================================================================
-- B. Add missing etchants from Pace's stocked list
-- =============================================================================
-- Each new canonical inserts one row into etchants and one or more rows
-- into etchant_applications. The trigger refreshes denormalized fields
-- on etchants automatically.

-- ---------------------------------------------------------------------------
-- B.1. Al-NaOH Etchant: 25 g NaOH + 250 ml DI water, immersion, for Al.
-- ---------------------------------------------------------------------------
do $$
declare
  v_etchant_id uuid;
begin
  insert into public.etchants (
    material_family, alloy, scale, method, common_name,
    composition, procedure, application,
    reference_citation, source, primary_uses, secondary_uses
  ) values (
    'Aluminum', null, 'Micro', 'Chemical', 'Al-NaOH etchant',
    '25 g NaOH' || E'\n' || '250 ml DI water',
    'Immersion at room temperature.',
    'General etch for aluminum and aluminum alloys.',
    'Pace Technologies metallography product catalog.', 'pace-list',
    array['general-microstructure']::text[], array[]::text[]
  ) returning id into v_etchant_id;

  insert into public.etchant_applications (
    etchant_id, material_family, alloy, application_notes
  ) values (
    v_etchant_id, 'Aluminum', null,
    'General etch for aluminum and aluminum alloys.'
  );
end $$;

-- ---------------------------------------------------------------------------
-- B.2. Ammonium Persulfate: 50 g (NH4)2S2O8 + 245 ml DI water,
--      immersion, for brasses (especially with cobalt).
-- ---------------------------------------------------------------------------
do $$
declare
  v_etchant_id uuid;
begin
  insert into public.etchants (
    material_family, alloy, scale, method, common_name,
    composition, procedure, application,
    reference_citation, source, primary_uses, secondary_uses
  ) values (
    'Copper', 'Brass', 'Micro', 'Chemical', 'Ammonium persulfate',
    '50 g (NH4)2S2O8' || E'\n' || '245 ml DI water',
    'Immersion at room temperature.',
    'For brasses with cobalt.',
    'Pace Technologies metallography product catalog.', 'pace-list',
    array['general-microstructure']::text[], array['grain-contrast']::text[]
  ) returning id into v_etchant_id;

  insert into public.etchant_applications (
    etchant_id, material_family, alloy, application_notes
  ) values (
    v_etchant_id, 'Copper', 'Brass',
    'For brasses, especially those alloyed with cobalt.'
  );
end $$;

-- ---------------------------------------------------------------------------
-- B.3. ASTM 97: 187.5 g KOH + 245 ml DI water, electrolytic at 2.5 V,
--      for Fe-Cr-Ni heat-resistant alloys.
-- ---------------------------------------------------------------------------
do $$
declare
  v_etchant_id uuid;
begin
  insert into public.etchants (
    material_family, alloy, scale, method, common_name,
    composition, procedure, application,
    reference_citation, source, primary_uses, secondary_uses
  ) values (
    'Heat-resistant alloy', null, 'Micro', 'Electrolytic', 'ASTM No. 97',
    '187.5 g KOH' || E'\n' || '245 ml DI water',
    'Electrolytic etching at 2.5 V.',
    'For Fe-Cr-Ni heat-resistant alloys.',
    'ASTM E407 Standard Practice for Microetching Metals and Alloys.',
    'pace-list',
    array['general-microstructure']::text[], array['sigma-phase']::text[]
  ) returning id into v_etchant_id;

  insert into public.etchant_applications (
    etchant_id, material_family, alloy, application_notes
  ) values (
    v_etchant_id, 'Heat-resistant alloy', null,
    'For Fe-Cr-Ni heat-resistant alloys (310/314 stainless, Incoloys, Ni-Cr resistance grades).'
  );
end $$;

-- ---------------------------------------------------------------------------
-- B.4. Klemm's 2: saturated Na2S2O3 + 25 g K2S2O5, color etch up to a
--      few minutes at 40 C, for Cu / cast iron / tin.
-- ---------------------------------------------------------------------------
do $$
declare
  v_etchant_id uuid;
begin
  insert into public.etchants (
    material_family, alloy, scale, method, common_name,
    composition, procedure, application,
    reference_citation, source, primary_uses, secondary_uses, safety
  ) values (
    'Copper', null, 'Micro', 'Tint', 'Klemm''s 2',
    '250 ml saturated Na2S2O3 solution' || E'\n' || '25 g K2S2O5',
    'Up to a few minutes at 40 C.',
    'For copper, cast iron, and tin.',
    'Pace Technologies metallography product catalog.', 'pace-list',
    array['color-etch','general-microstructure']::text[],
    array['grain-contrast']::text[],
    '{}'::jsonb
  ) returning id into v_etchant_id;

  -- Klemm's 2 applies broadly across Cu, cast iron, tin per Pace.
  insert into public.etchant_applications (
    etchant_id, material_family, alloy, application_notes
  ) values
    (v_etchant_id, 'Copper', null, 'Color etch for copper alloys.'),
    (v_etchant_id, 'Cast iron', null, 'Color etch for cast iron.'),
    (v_etchant_id, 'Tin', null, 'Color etch for tin and tin alloys.');
end $$;

-- =============================================================================
-- Sanity checks (run manually after applying):
--
--   -- Renames worked:
--   select common_name, count(*) from public.etchants
--    where common_name in ('Adler''s reagent', 'Carpenter''s reagent')
--      and deleted_at is null
--    group by common_name;
--   -- Expect one row per name (or more if there were multiple canonicals).
--
--   -- New etchants present:
--   select e.common_name, e.method, e.scale, e.material_families,
--          (select count(*) from public.etchant_applications ea
--            where ea.etchant_id = e.id) as app_count
--     from public.etchants e
--    where e.source = 'pace-list'
--      and e.deleted_at is null
--    order by e.common_name;
--   -- Expect 4 rows.
-- =============================================================================

commit;
