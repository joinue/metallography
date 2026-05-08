-- Materials Prep — add the actual Adler's reagent
-- Apply via Supabase SQL Editor on top of 0054.
--
-- Discovery during the Pace-list audit: Don's 0014 seed has a row tagged
-- 'Adlers' whose composition is actually Carpenter's reagent
-- (8.5 g FeCl3 / 2.4 g CuCl2 / alcohol / HCl). Same recipe was also
-- tagged 'Carpenters Reagent' in another row, so 0049's dedupe collapsed
-- them. Carpenter's became canonical; the 'Adlers' row was retired.
--
-- The genuine Adler's reagent — copper ammonium chloride / HCl / FeCl3 /
-- water for 300-series stainless and superalloys — was never in the
-- seed under any name. Pace stocks it as a product. Adding it here as
-- a new canonical with the Pace specification.

begin;

do $$
declare
  v_etchant_id uuid;
begin
  insert into public.etchants (
    material_family, alloy, scale, method, common_name,
    composition, procedure, application,
    reference_citation, source, primary_uses, secondary_uses
  ) values (
    'Stainless steel', '300 series', 'Micro', 'Chemical', 'Adler''s reagent',
    '9 g copper ammonium chloride' || E'\n' ||
    '150 ml HCl' || E'\n' ||
    '45 g FeCl3' || E'\n' ||
    '75 ml DI water',
    'Immersion at room temperature.',
    'For 300-series stainless steel and superalloys.',
    'Pace Technologies metallography product catalog.', 'pace-list',
    array['general-microstructure']::text[], array['grain-contrast']::text[]
  ) returning id into v_etchant_id;

  insert into public.etchant_applications (
    etchant_id, material_family, alloy, application_notes
  ) values
    (v_etchant_id, 'Stainless steel', '300 series',
     'Reveals microstructure of austenitic 300-series stainless steels.'),
    (v_etchant_id, 'Nickel-base superalloy', null,
     'Also for nickel-base superalloys.');
end $$;

-- =============================================================================
-- Sanity check (run manually after applying):
--
--   select e.common_name, e.material_families, e.alloys,
--          (select count(*) from public.etchant_applications ea
--            where ea.etchant_id = e.id) as app_count
--     from public.etchants e
--    where e.common_name = 'Adler''s reagent'
--      and e.deleted_at is null;
--   -- Expect 1 row. material_families: ["Nickel-base superalloy", "Stainless steel"].
-- =============================================================================

commit;
