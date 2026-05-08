-- Correct etchant recipes to match canonical specifications
--
-- Background: 009_seed_etchants.sql contains a cluster of entries (Adler's,
-- CU-PASS-SOL, ASTM No. 30, Inconel Etchant, Carpenters, Fry's, Nickel
-- Etchant, Winsteard's, ASTM No. 157) that were seeded with an identical
-- copy-pasted "100ml HCl, 100ml Ethanol, 5g CuCl2" composition — that's
-- Kalling's No. 2, not the named etchant. A few other entries name the
-- wrong reagent entirely (Marble's NH4OH where it should be HCl;
-- CU-PASS-SOL NH4OH where it should be H2SO4; Klemm's / Beraha's
-- using Na2S2O5 where it should be Na2S2O3).
--
-- Authoritative recipes verified against:
--   * The materials-prep canonicalization migrations under
--     supabase/migrations/materials-prep/etchant-related/ (PACE catalog
--     audit, ASTM E407 cross-checks, dedupe pass).
--   * app/resources/common-etchants-guide/page.tsx, which already
--     displays the correct recipes to end users — the broken rows are
--     only in the database seed.
--
-- Out of scope: Winsteard's, ASTM No. 157, and Nickel Etchant. These have
-- no canonical entry in the materials-prep migrations and aren't
-- displayed in the common-etchants-guide, so there's no authoritative
-- recipe to update them to. They remain with the placeholder Kalling's
-- composition; flag for a follow-up audit.

-- =============================================================================
-- A. Adler's Etchant — 9g Cu(NH4)Cl2 / 150ml HCl / 45g FeCl3 / 75ml DI water
-- =============================================================================
-- Per materials-prep/0055: the 0014 import had the Carpenter's recipe
-- under the Adler's name. True Adler's is the copper-ammonium-chloride /
-- HCl / FeCl3 / water etchant for 300-series stainless and Ni-base
-- superalloys.
UPDATE etchants
   SET composition = '9g Cu(NH₄)Cl₂, 150ml HCl, 45g FeCl₃, 75ml DI Water',
       concentration = 'Mixed',
       ingredients = '[
         {"name": "Copper Ammonium Chloride", "amount": "9g", "role": "etching agent"},
         {"name": "Hydrochloric Acid", "amount": "150ml", "role": "etching agent"},
         {"name": "Ferric Chloride", "amount": "45g", "role": "oxidizer"},
         {"name": "Distilled Water", "amount": "75ml", "role": "solvent"}
       ]'::jsonb,
       compatible_materials = ARRAY['stainless-steel', 'austenitic-stainless-steel', 'nickel-alloy', 'superalloy'],
       incompatible_materials = ARRAY['carbon-steel', 'aluminum'],
       reveals = 'Grain boundaries, phases',
       typical_results = 'For 300-series austenitic stainless steels and nickel-base superalloys. Reveals grain boundaries and phase structure.',
       preparation_notes = 'Dissolve 9g Cu(NH₄)Cl₂ and 45g FeCl₃ in 75ml distilled water, then add 150ml HCl. Use in fume hood.',
       application_notes = 'Immerse sample at room temperature for 5-30 seconds. Rinse with water and ethanol.',
       similar_etchants = ARRAY['Carpenter''s reagent', 'Kalling''s No. 2']
 WHERE slug = 'adlers-etchant';

-- =============================================================================
-- B. Carpenters — 8.5g FeCl3 / 2.4g CuCl2 / 122ml HCl / 6ml HNO3 / 122ml ethanol
-- =============================================================================
-- Per materials-prep/0055 and the recipe shown on common-etchants-guide.
-- For duplex and 300-series stainless steels.
UPDATE etchants
   SET composition = '8.5g FeCl₃, 2.4g CuCl₂, 122ml HCl, 6ml HNO₃, 122ml Ethanol',
       concentration = 'Mixed',
       ingredients = '[
         {"name": "Ferric Chloride", "amount": "8.5g", "role": "etching agent"},
         {"name": "Copper Chloride", "amount": "2.4g", "role": "etching agent"},
         {"name": "Hydrochloric Acid", "amount": "122ml", "role": "etching agent"},
         {"name": "Nitric Acid", "amount": "6ml", "role": "oxidizer"},
         {"name": "Ethanol", "amount": "122ml", "role": "solvent"}
       ]'::jsonb,
       compatible_materials = ARRAY['stainless-steel', 'duplex-stainless-steel', 'austenitic-stainless-steel'],
       incompatible_materials = ARRAY['carbon-steel', 'aluminum'],
       reveals = 'Grain boundaries, phases',
       typical_results = 'Excellent for duplex stainless and 300-series stainless steels. Reveals grain and phase structure.',
       preparation_notes = 'Dissolve 8.5g FeCl₃ and 2.4g CuCl₂ in 122ml ethanol, then add 122ml HCl and 6ml HNO₃ slowly with stirring.',
       application_notes = 'Immerse at 20°C for 10-30 seconds. Rinse with ethanol then water.'
 WHERE slug = 'carpenters';

-- =============================================================================
-- C. Inconel Etchant — HNO3 / HCl / H2O2 macro etch
-- =============================================================================
-- Per materials-prep/0054: the canonical Pace Inconel Etchant is the
-- macro-scale HNO3 + HCl + H2O2 in water recipe used for nickel-base
-- superalloys.
UPDATE etchants
   SET composition = '20-30ml DI water, 0-20ml HNO₃, 20ml HCl, 10ml H₂O₂ (30%)',
       concentration = 'Variable',
       ingredients = '[
         {"name": "Distilled Water", "amount": "20-30ml", "role": "solvent"},
         {"name": "Nitric Acid", "amount": "0-20ml", "role": "oxidizer"},
         {"name": "Hydrochloric Acid", "amount": "20ml", "role": "etching agent"},
         {"name": "Hydrogen Peroxide (30%)", "amount": "10ml", "role": "oxidizer"}
       ]'::jsonb,
       compatible_materials = ARRAY['nickel-alloy', 'inconel', 'superalloy', 'nickel-base-superalloy'],
       incompatible_materials = ARRAY['carbon-steel', 'aluminum'],
       reveals = 'Grain boundaries, macro structure',
       typical_results = 'Macro etch for Inconel and nickel-base superalloys. Reveals grain boundaries and macro structure.',
       preparation_notes = 'Mix water, HNO₃, and HCl, then add H₂O₂ slowly. Prepare fresh — H₂O₂ decomposes. Use in fume hood.',
       application_notes = 'Immerse or swab at room temperature for 10-30 seconds. Rinse with water immediately.',
       similar_etchants = ARRAY['Aqua Regia', 'Glyceregia', 'Marble''s Reagent']
 WHERE slug = 'inconel-etchant';

-- =============================================================================
-- D. ASTM No. 30 — NH4OH + H2O2 for copper alloys
-- =============================================================================
-- ASTM E407 #30 is the standard ammonia + 3% hydrogen peroxide etchant
-- for copper and copper alloys, not a Kalling's variant.
UPDATE etchants
   SET composition = '62.5ml NH₄OH, 125ml H₂O₂ (3%), 62.5ml DI Water',
       concentration = 'Mixed',
       ingredients = '[
         {"name": "Ammonium Hydroxide", "amount": "62.5ml", "role": "etching agent"},
         {"name": "Hydrogen Peroxide (3%)", "amount": "125ml", "role": "oxidizer"},
         {"name": "Distilled Water", "amount": "62.5ml", "role": "solvent"}
       ]'::jsonb,
       compatible_materials = ARRAY['copper', 'copper-alloy', 'brass', 'bronze'],
       incompatible_materials = ARRAY['carbon-steel', 'aluminum'],
       reveals = 'Grain boundaries, twin boundaries',
       typical_results = 'ASTM standard etchant for copper alloys. Reveals grain boundaries and annealing twins.',
       preparation_notes = 'Mix 62.5ml NH₄OH, 125ml 3% H₂O₂, and 62.5ml DI water. Prepare fresh — solution decomposes within hours.',
       application_notes = 'Immerse or swab for 5-45 seconds. Fresh solution required for best results.',
       similar_etchants = ARRAY['Ammonium Hydroxide + H₂O₂', 'Ammonium Persulfate']
 WHERE slug = 'astm-no-30';

-- =============================================================================
-- E. CU-PASS-SOL — copper sulfate / sulfuric acid free-iron test for stainless
-- =============================================================================
-- Per materials-prep/0054. This is NOT a copper etchant — it is the
-- ASTM A380 / A967 copper-sulfate free-iron test for verifying
-- passivation on stainless steel. The seed misclassified it.
UPDATE etchants
   SET name = 'CU-PASS-SOL',
       composition = '40g CuSO₄·5H₂O, 1.5ml H₂SO₄, 245ml DI Water',
       concentration = 'Mixed',
       ingredients = '[
         {"name": "Copper Sulfate Pentahydrate", "amount": "40g", "role": "indicator"},
         {"name": "Sulfuric Acid", "amount": "1.5ml", "role": "etching agent"},
         {"name": "Distilled Water", "amount": "245ml", "role": "solvent"}
       ]'::jsonb,
       compatible_materials = ARRAY['stainless-steel', 'austenitic-stainless-steel', 'martensitic-stainless-steel', 'duplex-stainless-steel'],
       incompatible_materials = ARRAY['copper', 'copper-alloy', 'aluminum'],
       reveals = 'Free iron contamination on stainless steel surfaces',
       typical_results = 'Detects free-iron contamination on passivated stainless steel surfaces. Iron sites darken with copper deposition.',
       preparation_notes = 'Dissolve 40g CuSO₄·5H₂O in 245ml DI water, then add 1.5ml H₂SO₄ slowly with stirring.',
       application_notes = 'Apply per ASTM A380 / A967 procedure. Observe for copper plating at iron-contaminated sites.',
       similar_etchants = ARRAY[]::text[]
 WHERE slug = 'cu-pass-sol';

-- =============================================================================
-- F. Marble's Reagent — 10g CuSO4 / 50ml HCl / 50ml H2O for stainless / Ni
-- =============================================================================
-- ASTM E407 #25. The seed had NH4OH where the second reagent should be
-- HCl, and classified it under copper alloys instead of stainless / Ni
-- superalloys. Both errors fixed here.
UPDATE etchants
   SET composition = '10g CuSO₄, 50ml HCl, 50ml H₂O',
       concentration = 'Mixed',
       ingredients = '[
         {"name": "Copper Sulfate", "amount": "10g", "role": "etching agent"},
         {"name": "Hydrochloric Acid", "amount": "50ml", "role": "etching agent"},
         {"name": "Water", "amount": "50ml", "role": "solvent"}
       ]'::jsonb,
       compatible_materials = ARRAY['stainless-steel', 'nickel-alloy', 'nickel-base-superalloy', 'superalloy', 'precipitation-hardening-stainless-steel'],
       incompatible_materials = ARRAY['carbon-steel', 'aluminum'],
       reveals = 'Grain boundaries, phases',
       typical_results = 'For 300-series stainless, nickel, nickel-copper, and nickel-iron superalloys. Reveals grain boundaries and phase structure.',
       preparation_notes = 'Dissolve 10g CuSO₄ in 50ml water, then add 50ml HCl. ASTM E407 reagent #25.',
       application_notes = 'Immerse or swab for 5-60 seconds. Rinse with water.',
       astm_references = ARRAY['ASTM E407', 'ASTM E407 No. 25'],
       similar_etchants = ARRAY['Glyceregia', 'Aqua Regia']
 WHERE slug = 'marbles-reagent';

-- =============================================================================
-- G. Al-NaOH Etchant — 25g NaOH / 250ml DI water
-- =============================================================================
-- Per materials-prep/0053 (Pace catalog spec) and common-etchants-guide.
UPDATE etchants
   SET composition = '25g NaOH, 250ml DI Water',
       concentration = '10%',
       ingredients = '[
         {"name": "Sodium Hydroxide", "amount": "25g", "role": "etching agent"},
         {"name": "Distilled Water", "amount": "250ml", "role": "solvent"}
       ]'::jsonb,
       preparation_notes = 'CAUTION: NaOH is caustic and exothermic when dissolving. Add 25g NaOH slowly to 250ml DI water with stirring. Allow to cool before use. Use proper PPE.',
       application_notes = 'Immerse sample at room temperature for 10-30 seconds. Rinse immediately with water.'
 WHERE slug = 'al-naoh-etchant';

-- =============================================================================
-- H. Klemm's Reagent — saturated Na2S2O3 + 5g K2S2O5 (Klemm's I)
-- =============================================================================
-- The seed had Na2S2O5 (sodium metabisulfite) and the wrong proportions.
-- Klemm's I is saturated sodium thiosulfate (Na2S2O3) with 5g potassium
-- metabisulfite (K2S2O5). Tint etchant — not a chemical etchant.
UPDATE etchants
   SET name = 'Klemm''s Reagent (Klemm''s I)',
       composition = '250ml saturated Na₂S₂O₃ solution, 5g K₂S₂O₅',
       concentration = 'Saturated',
       ingredients = '[
         {"name": "Sodium Thiosulfate (saturated)", "amount": "250ml", "role": "etching agent"},
         {"name": "Potassium Metabisulfite", "amount": "5g", "role": "etching agent"}
       ]'::jsonb,
       compatible_materials = ARRAY['carbon-steel', 'cast-iron', 'copper', 'copper-alloy', 'brass', 'bronze', 'stainless-steel', 'duplex-stainless-steel'],
       incompatible_materials = ARRAY['aluminum'],
       reveals = 'Phases (color contrast), grain boundaries',
       typical_results = 'Color/tint etch. Differentiates ferrite, martensite, and pearlite by interference colors. Useful for duplex stainless phase identification.',
       color_effects = 'Produces interference colors; phases tint differently (blue/brown/yellow)',
       preparation_notes = 'Prepare saturated Na₂S₂O₃ solution (≈250ml). Dissolve 5g K₂S₂O₅ in the solution immediately before use.',
       application_notes = 'Immerse for seconds to a few minutes. Rinse with water and ethanol. Solution life is short — prepare fresh.',
       similar_etchants = ARRAY['Klemm''s 2', 'Beraha''s Reagent', 'Weck''s Etch']
 WHERE slug = 'klemm-s-reagent';

-- =============================================================================
-- I. Beraha's Reagent — 250ml H2O / 25g Na2S2O3 / 7.5g K2S2O5
-- =============================================================================
-- The seed had Na2S2O5 (metabisulfite) where it should be Na2S2O3
-- (thiosulfate), and the proportions were off. This is the standard
-- Beraha's I tint etchant.
UPDATE etchants
   SET composition = '250ml Distilled Water, 25g Na₂S₂O₃, 7.5g K₂S₂O₅',
       concentration = 'Mixed',
       ingredients = '[
         {"name": "Distilled Water", "amount": "250ml", "role": "solvent"},
         {"name": "Sodium Thiosulfate", "amount": "25g", "role": "etching agent"},
         {"name": "Potassium Metabisulfite", "amount": "7.5g", "role": "etching agent"}
       ]'::jsonb,
       reveals = 'Phases (color contrast)',
       typical_results = 'Color etch. Tints ferrite, martensite, bainite, and other phases differently for phase identification.',
       preparation_notes = 'Dissolve 25g Na₂S₂O₃ in 250ml DI water, then add 7.5g K₂S₂O₅. Prepare fresh — solution life is hours, not days.',
       application_notes = 'Immerse for 60-120 seconds until surface develops color. Do not over-etch.'
 WHERE slug = 'berahas-reagent';

-- =============================================================================
-- J. Fry's Reagent — 100ml HCl / 12.5g CuCl2 / 75ml H2O / 65ml alcohol
-- =============================================================================
-- The seed had the placeholder Kalling's recipe. Real Fry's per the
-- common-etchants-guide: HCl + CuCl2 + water + alcohol for martensitic
-- and PH stainless steels.
UPDATE etchants
   SET composition = '100ml HCl, 12.5g CuCl₂, 75ml DI Water, 65ml Alcohol',
       concentration = 'Mixed',
       ingredients = '[
         {"name": "Hydrochloric Acid", "amount": "100ml", "role": "etching agent"},
         {"name": "Copper Chloride", "amount": "12.5g", "role": "etching agent"},
         {"name": "Distilled Water", "amount": "75ml", "role": "solvent"},
         {"name": "Alcohol", "amount": "65ml", "role": "solvent"}
       ]'::jsonb,
       compatible_materials = ARRAY['stainless-steel', 'martensitic-stainless-steel', 'precipitation-hardening-stainless-steel', 'chromium-steel'],
       incompatible_materials = ARRAY['carbon-steel', 'aluminum'],
       reveals = 'Grain boundaries, phases',
       typical_results = 'For martensitic and precipitation-hardening (PH) stainless steels.',
       preparation_notes = 'Dissolve 12.5g CuCl₂ in 75ml distilled water, then add 100ml HCl and 65ml alcohol. Mix thoroughly.',
       application_notes = 'Immerse for 10-30 seconds. Rinse with water and ethanol.'
 WHERE slug = 'frys-reagent';

-- =============================================================================
-- K. Weck's Etch — NH4HF2 / HCl / H2O for aluminum and titanium
-- =============================================================================
-- The seed had the KMnO4/NaOH variant which is Weck's for magnesium.
-- The site-wide Weck's reference (aluminum + titanium color etching)
-- is the ammonium-bifluoride / HCl / water recipe — promoting that one
-- since it matches every other Weck's reference on the site and the
-- common-etchants-guide entry.
UPDATE etchants
   SET composition = '4.5g NH₄HF₂, 10ml HCl, 240ml DI Water',
       concentration = 'Mixed',
       ingredients = '[
         {"name": "Ammonium Bifluoride", "amount": "4.5g", "role": "etching agent"},
         {"name": "Hydrochloric Acid", "amount": "10ml", "role": "etching agent"},
         {"name": "Distilled Water", "amount": "240ml", "role": "solvent"}
       ]'::jsonb,
       compatible_materials = ARRAY['aluminum', 'aluminum-alloy', 'titanium', 'titanium-alloy', 'stainless-steel', 'duplex-stainless-steel'],
       incompatible_materials = ARRAY['carbon-steel'],
       reveals = 'Phases (color contrast), grain boundaries',
       typical_results = 'Color etching for phase identification. Different phases tint distinct colors. Used for duplex stainless, aluminum, and titanium alloys.',
       preparation_notes = 'CAUTION: NH₄HF₂ releases HF in acidic solution. Mix in plastic container in a fume hood. Have calcium gluconate gel available.',
       application_notes = 'Immerse for 30-90 seconds. Rinse with water.'
 WHERE slug = 'wecks-etch';

-- =============================================================================
-- L. ASTM No. 30 — already handled in section D (compatible_materials change)
-- =============================================================================
-- Move ASTM No. 30 out of the stainless/Ni category and into copper.
-- The slug 'astm-no-30' is what the seed actually used; section D updated
-- the composition. The seed's tags array still mentions stainless-steel,
-- which is wrong. Fix it here.
UPDATE etchants
   SET tags = ARRAY['copper', 'copper-alloy', 'brass', 'bronze']
 WHERE slug = 'astm-no-30';

-- =============================================================================
-- M. Marble's tag fix
-- =============================================================================
-- Same issue: the seed put Marble's under copper tags. Fix.
UPDATE etchants
   SET tags = ARRAY['stainless-steel', 'nickel-alloy', 'superalloy']
 WHERE slug = 'marbles-reagent';

-- =============================================================================
-- N. CU-PASS-SOL tag fix
-- =============================================================================
UPDATE etchants
   SET tags = ARRAY['stainless-steel', 'passivation', 'free-iron-test']
 WHERE slug = 'cu-pass-sol';

-- =============================================================================
-- O. Inconel Etchant tag fix
-- =============================================================================
-- The seed had it as material-specific with copper/brass tags. Move to
-- nickel-alloy.
UPDATE etchants
   SET tags = ARRAY['nickel-alloy', 'inconel', 'superalloy', 'macro-etch']
 WHERE slug = 'inconel-etchant';

-- =============================================================================
-- P. New: Klemm's 2 (the 25g K2S2O5 variant)
-- =============================================================================
-- Per materials-prep/0053. Klemm's 2 differs from Klemm's I (handled
-- above) by a 5x higher metabisulfite loading. Targets copper alloys,
-- cast iron, and tin per the Pace catalog.
INSERT INTO etchants (
  name, slug, alternative_names, tags, category,
  composition, concentration, ingredients,
  application_method, typical_time_seconds, temperature_celsius,
  reveals, typical_results, color_effects,
  compatible_materials, incompatible_materials,
  pace_product_available, pace_product_slug,
  preparation_notes, application_notes, troubleshooting_notes, storage_notes,
  alternative_etchants, similar_etchants,
  astm_references,
  status, featured, sort_order
) VALUES (
  'Klemm''s 2', 'klemms-2',
  ARRAY['Klemm''s II', 'Klemm''s Reagent II'],
  ARRAY['cast-iron', 'copper', 'tin', 'color-etching'],
  'specialty',
  '250ml saturated Na₂S₂O₃ solution, 25g K₂S₂O₅',
  'Saturated',
  '[
    {"name": "Sodium Thiosulfate (saturated)", "amount": "250ml", "role": "etching agent"},
    {"name": "Potassium Metabisulfite", "amount": "25g", "role": "etching agent"}
  ]'::jsonb,
  'immersion', 60, 40,
  'Phases (color contrast), grain boundaries',
  'Color/tint etch with higher metabisulfite loading than Klemm''s I. Differentiates phases in copper alloys, cast iron, and tin via interference colors.',
  'Produces interference colors; phases tint differently',
  ARRAY['copper', 'copper-alloy', 'brass', 'bronze', 'cast-iron', 'gray-iron', 'ductile-iron', 'tin', 'tin-alloy'],
  ARRAY['aluminum'],
  false, NULL,
  'Prepare saturated Na₂S₂O₃ solution (≈250ml). Dissolve 25g K₂S₂O₅ in the solution immediately before use. Heat to 40°C.',
  'Immerse at 40°C for up to a few minutes until surface develops color. Rinse with water and ethanol.',
  'Solution life is short — prepare fresh. If colors do not develop, increase time before remixing.',
  'Cannot be stored — prepare fresh for each use.',
  ARRAY['Klemm''s Reagent (Klemm''s I)', 'Beraha''s Reagent'],
  ARRAY['Klemm''s Reagent (Klemm''s I)'],
  ARRAY['ASTM E407'],
  'published', false, 50
)
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- Q. New: Modified Marble's Reagent
-- =============================================================================
-- Per materials-prep/0057: documented variant of Marble's for nickel-
-- niobium superalloys (Inconel 718, Rene 41). Same reagent family as
-- Marble's but different proportions. Distinct enough to warrant its
-- own canonical entry rather than a note on the standard Marble's row.
INSERT INTO etchants (
  name, slug, alternative_names, tags, category,
  composition, concentration, ingredients,
  application_method, typical_time_seconds,
  reveals, typical_results,
  compatible_materials, incompatible_materials,
  pace_product_available, pace_product_slug,
  preparation_notes, application_notes,
  alternative_etchants, similar_etchants,
  astm_references,
  status, featured, sort_order
) VALUES (
  'Modified Marble''s Reagent', 'modified-marbles-reagent',
  ARRAY['Modified Marble''s', 'Marble''s Modified'],
  ARRAY['nickel-alloy', 'superalloy', 'inconel-718', 'rene-41'],
  'material-specific',
  '4g CuSO₄, 20ml HCl, 20ml H₂O',
  'Mixed',
  '[
    {"name": "Copper Sulfate", "amount": "4g", "role": "etching agent"},
    {"name": "Hydrochloric Acid", "amount": "20ml", "role": "etching agent"},
    {"name": "Water", "amount": "20ml", "role": "solvent"}
  ]'::jsonb,
  'immersion', 30,
  'Grain boundaries, gamma prime, carbides',
  'Variant of Marble''s reagent for nickel-niobium superalloys (Inconel 718, Rene 41). Lower copper-sulfate loading gives gentler attack appropriate for the precipitate-strengthened microstructure.',
  ARRAY['nickel-alloy', 'nickel-base-superalloy', 'inconel', 'inconel-718', 'rene-41', 'superalloy'],
  ARRAY['carbon-steel', 'aluminum'],
  false, NULL,
  'Dissolve 4g CuSO₄ in 20ml water, then add 20ml HCl. Use in fume hood.',
  'Immerse or swab for 5-60 seconds. Rinse with water and ethanol. Adjust time per alloy and heat treatment.',
  ARRAY['Marble''s Reagent', 'Glyceregia'],
  ARRAY['Marble''s Reagent'],
  ARRAY['ASTM E407'],
  'published', false, 51
)
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- Sanity checks (run manually after applying):
--
--   -- Verify recipes are no longer the Kalling's placeholder:
--   SELECT slug, composition FROM etchants
--    WHERE slug IN ('adlers-etchant', 'cu-pass-sol', 'astm-no-30',
--                   'inconel-etchant', 'carpenters', 'marbles-reagent',
--                   'al-naoh-etchant', 'klemm-s-reagent', 'berahas-reagent',
--                   'frys-reagent', 'wecks-etch')
--    ORDER BY slug;
--   -- Each composition should match the canonical recipe documented above.
--
--   -- Verify Marble's no longer says NH4OH:
--   SELECT slug, composition FROM etchants WHERE slug = 'marbles-reagent';
--   -- Expect '10g CuSO₄, 50ml HCl, 50ml H₂O'.
--
--   -- Verify CU-PASS-SOL is now a stainless test, not a copper etchant:
--   SELECT slug, compatible_materials FROM etchants WHERE slug = 'cu-pass-sol';
--   -- Expect array containing 'stainless-steel'.
--
--   -- Verify additions:
--   SELECT slug, name FROM etchants
--    WHERE slug IN ('klemms-2', 'modified-marbles-reagent');
--   -- Expect 2 rows.
-- =============================================================================
