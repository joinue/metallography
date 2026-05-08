-- Materials Prep — etchant editorial pass, step 2 (OCR + more common names)
-- Apply via Supabase SQL Editor on top of 0044.
--
-- Step 2 of the editorial cleanup arc. Step 1 (0044) handled material-family
-- corrections, solvent capitalization, and the safest common-name back-fills
-- (Nital, Picral, Vilella's, Murakami's). This migration handles:
--
--   A. OCR artifacts surviving from the 2005-era CSV import. Patterns:
--      MgISi -> Mg2Si (subscript misread), !vIg2Si -> Mg2Si (M garbled
--      as !v), AI- -> Al- (lowercase l read as capital I before a
--      hyphenated element name). All limited to application/procedure
--      text where the chemistry context makes the fix unambiguous.
--   B. A citation-text typo (Metals Park ZIP 40073 -> 44073) that fans
--      out across all Beraha 1977 references via alloy duplication.
--   C. Three more common-name back-fills (Kroll's, Marble's, Glyceregia)
--      where composition pattern is tight enough to disambiguate from
--      neighboring recipes (Tucker's, Klemm's, etc.).
--
-- Out of scope (still deferred):
--   * Kalling's I vs II (concentration-dependent disambiguation).
--   * Klemm's I/II/III (saturated-solution patterns hard to match by SQL).
--   * Keller's vs Tucker's (overlapping HF+HCl+HNO3+water signature).
--   * Beraha's variants (too many sub-recipes).
--   * Etchant-entity / alloy-application split (item 6, structural).
--   * Per-row application-text TL;DR rewrite (item 5; benefits from item 6
--     dedupe first).

begin;

-- =============================================================================
-- A. OCR-artifact fixes
-- =============================================================================

-- "MgISi" was the original subscript-2 (Mg2Si) lost during scan; replace
-- the legacy text with the canonical compound name.
update public.etchants
   set application = replace(application, 'MgISi', 'Mg2Si')
 where application like '%MgISi%';

-- "!vIg2Si" — same Beraha citation, "M" read as "!v" by the OCR pass.
update public.etchants
   set application = replace(application, '!vIg2Si', 'Mg2Si')
 where application like '%!vIg2Si%';

-- "AI-" (capital I where lowercase l should be) in chemistry compounds
-- like "AI-Cu-Fe-Mn". Real AISI usage in this catalog is followed by
-- space + digit (e.g. "AISI 1018"), never by hyphen-element, so the
-- "\mAI-" pattern only catches the OCR errors.
update public.etchants
   set application = regexp_replace(application, '\mAI-', 'Al-', 'g')
 where application ~ '\mAI-';

update public.etchants
   set procedure = regexp_replace(procedure, '\mAI-', 'Al-', 'g')
 where procedure ~ '\mAI-';

-- =============================================================================
-- B. Citation typo — Metals Park ZIP
-- =============================================================================
-- Beraha 1977 citations consistently misprint the ASM publisher ZIP as
-- 40073; correct is 44073 (Metals Park, OH). The error fans out across
-- every alloy-duplicated row of the same etchant.
update public.etchants
   set reference_citation = replace(reference_citation, 'Ohio 40073', 'Ohio 44073')
 where reference_citation like '%Ohio 40073%';

-- =============================================================================
-- C. Common-name back-fill, round 2
-- =============================================================================
-- Each pattern requires the diagnostic reagents AND explicitly excludes
-- reagents that would indicate a different recipe. Material family is
-- constrained to where each etchant is canonically used.

-- Kroll's reagent: HF + HNO3 + water on Ti/Zr/Hf, with no other reagents.
-- Distinguishes from Tucker's (which adds HCl) and from generic HF/HNO3
-- aluminum etches.
update public.etchants
   set common_name = 'Kroll''s reagent'
 where common_name is null
   and method = 'Chemical'
   and material_family in ('Titanium', 'Zirconium', 'Hafnium')
   and composition ~* '(HF|hydrofluoric)'
   and composition ~* '(HNO3|nitric)'
   and composition ~* 'water'
   and composition !~* '(picric|HCl|hydrochloric|sulfuric|H2SO4|chromium|CrO3|cupric|copper|ferric|FeCl|persulfate|perchloric|oxalic|ethanol|methanol|glycerol|glycerin|alcohol)';

-- Marble's reagent: CuSO4 + HCl + water on Ni / stainless / Ni-base
-- superalloy / heat-resistant. Excludes recipes carrying additional
-- oxidizers or acids that would indicate a different etch.
update public.etchants
   set common_name = 'Marble''s reagent'
 where common_name is null
   and method = 'Chemical'
   and material_family in ('Nickel', 'Stainless steel', 'Nickel-base superalloy', 'Heat-resistant alloy')
   and (composition ~* 'copper sulfate' or composition ~* 'copper sulphate' or composition ~* '\mCuSO4\M')
   and composition ~* '(HCl|hydrochloric)'
   and composition ~* 'water'
   and composition !~* '(picric|HF|hydrofluoric|HNO3|nitric|chromium|CrO3|persulfate|perchloric|cyanide|ammonia|ferric|FeCl|peroxide|H2O2|ethanol|methanol|alcohol|glycerol|glycerin)';

-- Glyceregia: HCl + HNO3 + glycerol (or glycerin) on Ni / stainless /
-- superalloy / heat-resistant / Co-base. Distinguishes from aqua regia
-- (no glycerol) and from Marble's (no nitric).
update public.etchants
   set common_name = 'Glyceregia'
 where common_name is null
   and method = 'Chemical'
   and material_family in (
     'Nickel', 'Stainless steel', 'Nickel-base superalloy',
     'Heat-resistant alloy', 'Cobalt-base superalloy'
   )
   and composition ~* '(HCl|hydrochloric)'
   and composition ~* '(HNO3|nitric)'
   and (composition ~* 'glycerol' or composition ~* 'glycerin')
   and composition !~* '(picric|HF|hydrofluoric|sulfuric|H2SO4|chromium|CrO3|cupric|copper|ferric|FeCl|persulfate|perchloric)';

-- =============================================================================
-- Sanity checks (run manually after applying):
--
--   -- OCR fixes:
--   select count(*) as remaining_mgisi from public.etchants
--    where application like '%MgISi%' or application like '%!vIg2Si%';
--   -- Expect 0.
--
--   select count(*) as remaining_ai_dash from public.etchants
--    where application ~ '\mAI-' or procedure ~ '\mAI-';
--   -- Expect 0.
--
--   -- Common-name additions:
--   select common_name, count(*) from public.etchants
--    where common_name in ('Kroll''s reagent', 'Marble''s reagent', 'Glyceregia')
--    group by common_name order by 1;
--
--   -- Citation typo:
--   select count(*) as remaining_40073 from public.etchants
--    where reference_citation like '%Ohio 40073%';
--   -- Expect 0.
-- =============================================================================

commit;
