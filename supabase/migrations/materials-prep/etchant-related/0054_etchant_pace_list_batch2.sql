-- Materials Prep — etchant Pace-list audit, batch 2
-- Apply via Supabase SQL Editor on top of 0053.
--
-- Batch 2 covers the 5 unnamed Pace-list canonicals from the audit:
--
--   A. Two renames where the catalog already has a strong composition
--      match (Dichromate, Inconel Etchant).
--   B. Three new canonical etchants where Pace's exact recipe isn't
--      in the seed (Copper No.1, Copper No.2, CU-PASS-SOL).
--
-- Decision rationale per entry:
--   * Dichromate: catalog's 2 g K2Cr2O7 / 1.5 g NaCl / 8 ml H2SO4 /
--     100 ml water (Copper family) recipe matches Pace's ratios exactly.
--     Rename it.
--   * Inconel Etchant: catalog's 20-30 ml water / 0-20 ml HNO3 /
--     20 ml HCl / 10 ml H2O2 macro recipe (Nickel + Ni superalloys,
--     8 apps) is the canonical Ni macro etch. Rename it.
--   * Copper No.1: closest catalog match is a "10-60 ml HNO3 in 90 ml
--     water" variable-concentration recipe. Pace's product is the
--     specific 50/50 form. Adding as a clean new entry rather than
--     conflating with the variable-concentration canonical.
--   * Copper No.2: no clear single match in the catalog at Pace's
--     ratios + Copper family. Adding as new.
--   * CU-PASS-SOL: no CuSO4-based passivation-test recipe in the seed.
--     Adding as new.

begin;

-- =============================================================================
-- A. Renames
-- =============================================================================

-- A.1 Dichromate. Family Copper, Chemical/Micro, exact composition match.
update public.etchants
   set common_name = 'Dichromate'
 where common_name is null
   and method = 'Chemical'
   and scale = 'Micro'
   and material_family = 'Copper'
   and composition_key(composition) = composition_key($comp$2 g K2Cr2O7
1.5 g NaCl
8 ml H2SO4 (conc)
100 ml Water$comp$)
   and deleted_at is null;

-- A.2 Inconel Etchant. The catalog row is filed under Nickel + Nickel
-- superalloys; Macro scale; HNO3 + HCl + H2O2 in water signature.
update public.etchants
   set common_name = 'Inconel Etchant'
 where common_name is null
   and method = 'Chemical'
   and scale = 'Macro'
   and material_family in ('Nickel', 'Nickel superalloys', 'Nickel-base superalloy')
   and composition_key(composition) = composition_key($comp$20-30 ml distilled Water
0-20 ml HNO3
20 ml HCl
10 ml H2O2 (30%)
(concentration variable)$comp$)
   and deleted_at is null;

-- =============================================================================
-- B. New canonical etchants (Pace spec exact)
-- =============================================================================

-- B.1 Copper No.1: 125 ml HNO3 + 125 ml DI water, immersion, for Cu and brass.
do $$
declare
  v_etchant_id uuid;
begin
  insert into public.etchants (
    material_family, alloy, scale, method, common_name,
    composition, procedure, application,
    reference_citation, source, primary_uses, secondary_uses
  ) values (
    'Copper', null, 'Micro', 'Chemical', 'Copper No.1',
    '125 ml HNO3' || E'\n' || '125 ml DI water',
    'Immersion at 20 C.',
    'For copper and brass.',
    'Pace Technologies metallography product catalog.', 'pace-list',
    array['general-microstructure']::text[], array['grain-contrast']::text[]
  ) returning id into v_etchant_id;

  insert into public.etchant_applications (
    etchant_id, material_family, alloy, application_notes
  ) values
    (v_etchant_id, 'Copper', null, 'For copper alloys.'),
    (v_etchant_id, 'Copper', 'Brass', 'For brasses.');
end $$;

-- B.2 Copper No.2: 200 ml DI water + 50 ml HCl + 10 g FeCl3, immersion, Cu and brass.
do $$
declare
  v_etchant_id uuid;
begin
  insert into public.etchants (
    material_family, alloy, scale, method, common_name,
    composition, procedure, application,
    reference_citation, source, primary_uses, secondary_uses
  ) values (
    'Copper', null, 'Micro', 'Chemical', 'Copper No.2',
    '200 ml DI water' || E'\n' || '50 ml HCl' || E'\n' || '10 g FeCl3',
    'Immersion at 20 C.',
    'For copper and brass.',
    'Pace Technologies metallography product catalog.', 'pace-list',
    array['general-microstructure']::text[], array['grain-contrast']::text[]
  ) returning id into v_etchant_id;

  insert into public.etchant_applications (
    etchant_id, material_family, alloy, application_notes
  ) values
    (v_etchant_id, 'Copper', null, 'For copper alloys.'),
    (v_etchant_id, 'Copper', 'Brass', 'For brasses.');
end $$;

-- B.3 CU-PASS-SOL: 40 g CuSO4·5H2O + 1.5 ml H2SO4 + 245 ml DI water,
-- detects free iron on stainless steels.
do $$
declare
  v_etchant_id uuid;
begin
  insert into public.etchants (
    material_family, alloy, scale, method, common_name,
    composition, procedure, application,
    reference_citation, source, primary_uses, secondary_uses
  ) values (
    'Stainless steel', null, 'Micro', 'Chemical', 'CU-PASS-SOL',
    '40 g CuSO4·5H2O' || E'\n' || '1.5 ml H2SO4' || E'\n' || '245 ml DI water',
    'Apply per Pace product guidance.',
    'Detects free iron contamination on stainless steel surfaces.',
    'Pace Technologies metallography product catalog.', 'pace-list',
    array['general-microstructure']::text[], array[]::text[]
  ) returning id into v_etchant_id;

  insert into public.etchant_applications (
    etchant_id, material_family, alloy, application_notes
  ) values
    (v_etchant_id, 'Stainless steel', null,
     'Passivation / free-iron detection test on stainless steel surfaces.');
end $$;

-- =============================================================================
-- Sanity checks (run manually after applying):
--
--   -- Renames worked:
--   select common_name, method, scale, material_family
--     from public.etchants
--    where common_name in ('Dichromate', 'Inconel Etchant')
--      and deleted_at is null
--    order by common_name;
--   -- Expect 2 rows.
--
--   -- New etchants present (this batch + batch 1 = 7 pace-list rows):
--   select common_name, method, scale, material_families,
--          (select count(*) from public.etchant_applications ea
--            where ea.etchant_id = e.id) as app_count
--     from public.etchants e
--    where e.source = 'pace-list'
--      and e.deleted_at is null
--    order by e.common_name;
--   -- Expect 7 rows.
-- =============================================================================

commit;
