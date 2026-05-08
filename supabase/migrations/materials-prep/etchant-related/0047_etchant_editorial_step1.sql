-- Materials Prep — etchant editorial pass, step 1 (cheap bulk fixes)
-- Apply via Supabase SQL Editor on top of 0043.
--
-- This is the first of several editorial cleanup migrations on the seed
-- catalog (0014). The seed was imported from a 2005-era CSV that has
-- categorization, capitalization, and common-name issues that would read
-- as "20 years old" if the catalog were exposed publicly. Don's chemistry
-- is correct; only the presentation layer is being normalized.
--
-- Scope of THIS migration (low-risk, mostly idempotent):
--   A. Fix material_family for rows where Cu-* and Co-* alloys were filed
--      under Aluminum or Beryllium because the alloy name contains another
--      element. Cu-Be, Al-bronze, Al-brass, Al-Si bronze are fundamentally
--      copper alloys; Co-Al is a cobalt alloy.
--   B. Lowercase common solvent names (Water, Ethanol, Methanol, ...) in
--      composition / procedure / application fields. Mid-text solvents
--      shouldn't be capitalized like proper nouns.
--   C. Back-fill common_name on a CONSERVATIVE subset of famous etchants
--      (Nital, Picral, Vilella's, Murakami's) where composition pattern
--      is unambiguous. Other famous etchants (Kalling's I/II, Kroll's,
--      Keller's, Klemm's I/II/III, Beraha's variants) need per-row
--      editorial review and are deferred to step 2.
--
-- Out of scope (deferred):
--   * OCR artifact cleanup in application text ("MgISi" -> "Mg2Si",
--     stray "AI" -> "Al"). Bulk regex isn't safe; needs eyeballing.
--   * Per-row application-text TL;DR rewrite. Benefits from etchant-entity
--     dedupe (item 6) running first; doing it on duplicate rows means
--     redoing the same edit 4x.
--   * Structured reagents / time / temperature / voltage. Schema work.
--   * References table normalization. Schema work.
--   * ASTM E407 number mapping. Schema work.

begin;

-- =============================================================================
-- A. Material-family corrections
-- =============================================================================

-- Cu-* alloys filed under Aluminum (because the alloy name starts with Al)
-- belong under Copper. Cu-Be is the canonical case: it's a beryllium-
-- strengthened copper alloy, not an aluminum alloy.
update public.etchants
   set material_family = 'Copper'
 where material_family = 'Aluminum'
   and alloy in ('Al-bronze', 'Cu-Be', 'Al-brass', 'Al-Si bronze');

-- Same alloys were also miscategorized under Beryllium when the etchant
-- happens to apply to Cu-Be alongside Be alloys. The alloy is what's being
-- etched here, not the family.
update public.etchants
   set material_family = 'Copper'
 where material_family = 'Beryllium'
   and alloy in ('Al-bronze', 'Cu-Be');

-- Co-Al filed under Aluminum is a cobalt-aluminum alloy; belongs under
-- Cobalt. Application text confirms ("Pure Co. Co-Al alloys.").
update public.etchants
   set material_family = 'Cobalt'
 where material_family = 'Aluminum'
   and alloy = 'Co-Al';

-- =============================================================================
-- B. Solvent capitalization
-- =============================================================================
-- The 2005 CSV consistently capitalized solvent names ("84 ml Water",
-- "ammonia Water", "Ethanol (96 %)"). Lowercase is correct mid-text and
-- removes the visually-obvious "imported from a spreadsheet" feel.
-- Word-boundary regex (\m...\M) avoids partial-word matches.

do $$
declare
  solvent text;
  solvents text[] := array[
    'Water', 'Ethanol', 'Methanol', 'Glycerol', 'Glycerin',
    'Acetone', 'Isopropanol', 'Alcohol'
  ];
begin
  foreach solvent in array solvents loop
    update public.etchants
       set composition = regexp_replace(composition,
                                        '\m' || solvent || '\M',
                                        lower(solvent),
                                        'g')
     where composition ~ ('\m' || solvent || '\M');

    update public.etchants
       set procedure = regexp_replace(procedure,
                                      '\m' || solvent || '\M',
                                      lower(solvent),
                                      'g')
     where procedure ~ ('\m' || solvent || '\M');

    update public.etchants
       set application = regexp_replace(application,
                                        '\m' || solvent || '\M',
                                        lower(solvent),
                                        'g')
     where application ~ ('\m' || solvent || '\M');
  end loop;
end $$;

-- =============================================================================
-- C. Common-name back-fill (conservative)
-- =============================================================================
-- Only fill where composition pattern is unambiguous. Each pattern requires
-- the diagnostic reagents AND explicitly excludes reagents that would
-- indicate a different recipe family. Material family is also constrained
-- to where each etchant is canonically used.

-- Nital: HNO3 + alcohol, no other reagents, on ferrous families.
update public.etchants
   set common_name = 'Nital'
 where common_name is null
   and method = 'Chemical'
   and material_family in (
     'Carbon & alloy steel', 'Cast iron', 'Iron', 'Tool steel', 'Stainless steel'
   )
   and composition ~* '(nitric acid|HNO3)'
   and composition ~* '(ethanol|methanol|alcohol)'
   and composition !~* '(picric|HCl|hydrochloric|HF|hydrofluoric|sulfuric|H2SO4|chromium|CrO3|cupric|copper|ferric|FeCl|persulfate|perchloric|oxalic)';

-- Picral: picric acid + alcohol, no other reagents, on ferrous families.
update public.etchants
   set common_name = 'Picral'
 where common_name is null
   and method = 'Chemical'
   and material_family in (
     'Carbon & alloy steel', 'Cast iron', 'Iron', 'Tool steel', 'Stainless steel'
   )
   and composition ~* 'picric acid'
   and composition ~* '(ethanol|methanol|alcohol)'
   and composition !~* '(nitric|HNO3|HCl|hydrochloric|HF|hydrofluoric|sulfuric|H2SO4|chromium|CrO3|cupric|copper|ferric|FeCl)';

-- Vilella's: picric acid + HCl + alcohol, on ferrous families. The
-- distinguishing feature vs Picral is the HCl.
update public.etchants
   set common_name = 'Vilella''s reagent'
 where common_name is null
   and method = 'Chemical'
   and material_family in (
     'Carbon & alloy steel', 'Stainless steel', 'Tool steel', 'Cast iron'
   )
   and composition ~* 'picric acid'
   and composition ~* '(HCl|hydrochloric)'
   and composition ~* '(ethanol|methanol|alcohol)'
   and composition !~* '(nitric|HNO3|HF|hydrofluoric|sulfuric|H2SO4|chromium|CrO3|cupric|ferric)';

-- Murakami's: alkaline ferricyanide. Distinguishing pattern is the
-- combination of K3Fe(CN)6 (or written equivalents) with a strong base.
update public.etchants
   set common_name = 'Murakami''s reagent'
 where common_name is null
   and method = 'Chemical'
   and (
     composition ~* 'K3Fe\(CN\)6'
     or composition ~* 'potassium ferricyanide'
     or composition ~* 'iron \(III\) cyanide'
     or composition ~* 'cyanide of iron'
   )
   and (
     composition ~* '\mKOH\M'
     or composition ~* 'potassium hydroxide'
     or composition ~* '\mNaOH\M'
     or composition ~* 'sodium hydroxide'
   )
   and composition ~* 'water'
   and composition !~* '(HF|hydrofluoric|HNO3|nitric)';

-- =============================================================================
-- Sanity checks (run manually after applying):
--
--   select material_family, count(*) from public.etchants
--    where material_family in ('Aluminum','Beryllium','Copper','Cobalt')
--    group by material_family order by material_family;
--
--   select common_name, count(*) from public.etchants
--    where common_name in ('Nital','Picral','Vilella''s reagent','Murakami''s reagent')
--    group by common_name order by 1;
--
--   select count(*) as still_capitalized from public.etchants
--    where composition ~ '\m(Water|Ethanol|Methanol|Glycerol|Acetone)\M';
-- =============================================================================

commit;
