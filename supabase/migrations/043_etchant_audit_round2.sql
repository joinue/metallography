-- Etchant accuracy audit, round 2.
--
-- Round 1 (042) fixed the obvious "100ml HCl / 100ml Ethanol / 5g CuCl2"
-- placeholder cluster and the dangerous reagent swaps (Marble's NH4OH,
-- CU-PASS-SOL NH4OH, Klemm's / Beraha's Na2S2O5).
--
-- Round 2 (this migration) fixes errors that survived because the recipes
-- LOOK plausible at a glance:
--   1. Oberhoffer's Reagent — recipe is missing the two active reagents
--      (SnCl2 and FeCl3). What's there is a CuCl2 / HCl / EtOH solution
--      that won't reveal phosphorus segregation.
--   2. Dichromate Etchant — missing NaCl. Without the chloride ion the
--      dichromate is not an effective copper etchant.
--   3. Stead's Reagent — recipe is the steel phosphorus version (with
--      MgCl2); description and tags say cast-iron graphite revelation.
--      Recipe-purpose mismatch. Aligning the recipe to the cast-iron
--      version since that matches the description, the tags, the
--      common-etchants-guide page, and the materials-prep ASTM A247-
--      adjacent references.
--   4. Glyceregia — seed has 10ml HNO3 / 15ml HCl / 10ml glycerol.
--      ASTM E407 #87 and common-etchants-guide both specify 5ml HNO3.
--      Reducing HNO3 to match the canonical 3:1 acid ratio.
--   5. Kroll's Reagent — seed has 5ml HNO3 / 2-3ml HF / 100ml water.
--      Vander Voort and common-etchants-guide both specify 6ml HNO3 /
--      2ml HF / 92ml water (Kroll 1937 original). Aligning to that.
--   6. ASTM No. 157 — categorized as stainless/nickel; PACE catalog
--      classifies it under "Copper & Brass Etchants." Fix categorization.
--      The recipe itself is still placeholder Kalling's (no canonical
--      ASTM E407 #157 reference available in materials-prep migrations);
--      replace with a "consult PACE datasheet" disclaimer rather than
--      leaving the wrong recipe visible.
--   7. Winsteard's, Nickel Etchant — same treatment as ASTM No. 157.
--      Real PACE products (per pace-consumables.csv) but no canonical
--      composition in the materials-prep migrations or common-etchants-
--      guide. Replace placeholder Kalling's composition with a
--      datasheet pointer.

-- =============================================================================
-- A. Oberhoffer's Reagent — restore the missing SnCl2 / FeCl3
-- =============================================================================
-- Canonical Oberhoffer's reagent (Vander Voort, ASM Handbook Vol 9, ASTM
-- E407 #131): SnCl2·2H2O + FeCl3 + CuCl2 + HCl + ethanol + water.
-- For phosphorus segregation in steels and cast irons.
UPDATE etchants
   SET composition = '1.5g SnCl₂·2H₂O, 30g FeCl₃·6H₂O, 0.5g CuCl₂, 50ml HCl, 500ml Ethanol, 500ml DI Water',
       concentration = 'Mixed',
       ingredients = '[
         {"name": "Stannous Chloride Dihydrate", "amount": "1.5g", "role": "etching agent"},
         {"name": "Ferric Chloride Hexahydrate", "amount": "30g", "role": "etching agent"},
         {"name": "Copper Chloride", "amount": "0.5g", "role": "etching agent"},
         {"name": "Hydrochloric Acid", "amount": "50ml", "role": "etching agent"},
         {"name": "Ethanol", "amount": "500ml", "role": "solvent"},
         {"name": "Distilled Water", "amount": "500ml", "role": "solvent"}
       ]'::jsonb,
       reveals = 'Phosphorus segregation, dendritic structure, ghost lines',
       typical_results = 'Reveals phosphorus segregation patterns, dendritic structure, and ghost lines (banding) in steels and irons. Phosphorus-rich regions tint dark.',
       preparation_notes = 'Dissolve 1.5g SnCl₂·2H₂O, 30g FeCl₃·6H₂O, and 0.5g CuCl₂ in 500ml DI water. Add 50ml HCl, then 500ml ethanol. Mix thoroughly. Solution darkens with age — discard when it turns brown.',
       application_notes = 'Immerse for 30-60 seconds at room temperature. Do not swab — solution attacks fingers. Rinse with water and ethanol.',
       astm_references = ARRAY['ASTM E407', 'ASTM E407 No. 131']
 WHERE slug = 'oberhoffers-reagent';

-- =============================================================================
-- B. Dichromate Etchant — restore the missing NaCl
-- =============================================================================
-- Per materials-prep/0054 (PACE catalog spec) and common-etchants-guide.
-- Without the chloride ion the dichromate is not an effective Cu etchant.
UPDATE etchants
   SET composition = '2g K₂Cr₂O₇, 1.5g NaCl, 8ml H₂SO₄, 100ml DI Water',
       concentration = 'Mixed',
       ingredients = '[
         {"name": "Potassium Dichromate", "amount": "2g", "role": "etching agent"},
         {"name": "Sodium Chloride", "amount": "1.5g", "role": "activator"},
         {"name": "Sulfuric Acid", "amount": "8ml", "role": "etching agent"},
         {"name": "Distilled Water", "amount": "100ml", "role": "solvent"}
       ]'::jsonb,
       preparation_notes = 'Dissolve 2g K₂Cr₂O₇ and 1.5g NaCl in 100ml DI water, then add 8ml concentrated H₂SO₄ slowly with stirring. CAUTION: dichromate is carcinogenic — use full PPE.',
       application_notes = 'Immerse for 30-60 seconds. Rinse with water immediately. NaCl saturated solution may also be substituted for the 1.5g NaCl + adjusted water.',
       troubleshooting_notes = 'If etch develops slowly, verify NaCl is present — without chloride the dichromate is inactive. CAUTION: contains hexavalent chromium (carcinogen) and concentrated sulfuric acid. Use full PPE.'
 WHERE slug = 'dichromate-etchant';

-- =============================================================================
-- C. Stead's Reagent — align recipe to the cast-iron graphite purpose
-- =============================================================================
-- The original Stead 1900 recipe (CuCl2 + MgCl2 + HCl + water) is for
-- phosphorus segregation in steels. The cast-iron graphite version is a
-- different recipe (CuCl2 + HCl + water + ethanol). Tags, description,
-- and common-etchants-guide all say cast-iron graphite — align the recipe
-- to that purpose.
UPDATE etchants
   SET composition = '2g CuCl₂, 40ml HCl, 30-50ml DI Water, 25-40ml Ethanol',
       concentration = 'Mixed',
       ingredients = '[
         {"name": "Copper Chloride", "amount": "2g", "role": "etching agent"},
         {"name": "Hydrochloric Acid", "amount": "40ml", "role": "etching agent"},
         {"name": "Distilled Water", "amount": "30-50ml", "role": "solvent"},
         {"name": "Ethanol", "amount": "25-40ml", "role": "solvent"}
       ]'::jsonb,
       reveals = 'Graphite, matrix structure',
       typical_results = 'Colors the matrix copper-tone and leaves graphite dark, making graphite morphology readable per ASTM A247. Best for nodular and gray cast iron.',
       preparation_notes = 'Dissolve 2g CuCl₂ in 30-50ml DI water, add 40ml HCl, then 25-40ml ethanol. Adjust water/ethanol ratio for working volume.',
       application_notes = 'Immerse 30-90 seconds. Rinse with water and ethanol. Use on as-polished, unetched specimen for ASTM A247 graphite morphology.',
       troubleshooting_notes = 'If matrix does not develop copper tint, increase CuCl₂ slightly. The original Stead 1900 recipe with MgCl₂ is a different etchant for phosphorus segregation in steels — do not substitute.'
 WHERE slug = 'steads-reagent';

-- =============================================================================
-- D. Glyceregia — align HNO3 to canonical 5ml ratio
-- =============================================================================
-- Seed has 10ml HNO3; ASTM E407 #87 and common-etchants-guide use 5ml.
-- The 3:1 HCl:HNO3 ratio (matching aqua regia, moderated by glycerol)
-- is the standard.
UPDATE etchants
   SET composition = '15ml HCl, 5ml HNO₃, 10ml Glycerol',
       concentration = 'Mixed',
       ingredients = '[
         {"name": "Hydrochloric Acid", "amount": "15ml", "role": "etching agent"},
         {"name": "Nitric Acid", "amount": "5ml", "role": "oxidizer"},
         {"name": "Glycerol", "amount": "10ml", "role": "moderator"}
       ]'::jsonb,
       preparation_notes = 'Mix 15ml HCl, 10ml glycerol, then add 5ml HNO₃ slowly with stirring. CAUTION: exothermic. Prepare fresh — solution decomposes within hours.',
       astm_references = ARRAY['ASTM E407', 'ASTM E407 No. 87']
 WHERE slug = 'glyceregia';

-- =============================================================================
-- E. Kroll's Reagent — align to Kroll 1937 canonical proportions
-- =============================================================================
-- Seed has 2-3ml HF / 5ml HNO3 / 100ml water. Kroll's original 1937
-- recipe (and common-etchants-guide, Vander Voort, ASTM E407 #192) use
-- 2ml HF + 6ml HNO3 + 92ml water. Same active acid pair, slightly
-- different ratios — aligning to the published canonical.
UPDATE etchants
   SET composition = '2ml HF, 6ml HNO₃, 92ml DI Water',
       concentration = 'Mixed',
       ingredients = '[
         {"name": "Hydrofluoric Acid", "amount": "2ml", "role": "etching agent"},
         {"name": "Nitric Acid", "amount": "6ml", "role": "oxidizer"},
         {"name": "Distilled Water", "amount": "92ml", "role": "solvent"}
       ]'::jsonb,
       preparation_notes = 'CAUTION: HF is extremely hazardous — causes deep, delayed-onset burns. Mix 92ml DI water and 6ml HNO₃ in a plastic container, then add 2ml HF slowly. Use full HF PPE: face shield, neoprene/butyl gloves, chemical apron. Have calcium gluconate gel available.',
       astm_references = ARRAY['ASTM E407', 'ASTM E407 No. 192']
 WHERE slug = 'krolls-reagent';

-- =============================================================================
-- F. ASTM No. 157 — fix categorization, replace placeholder with disclaimer
-- =============================================================================
-- PACE catalog (pace-consumables.csv) classifies ASTM No. 157 under
-- "Copper & Brass Etchants" — the seed had it under stainless/nickel.
-- The composition was the placeholder Kalling's recipe; we don't have a
-- canonical ASTM E407 #157 spec in the materials-prep migrations or in
-- common-etchants-guide, so replace the wrong recipe with a datasheet
-- pointer rather than leaving an inaccurate formulation visible.
UPDATE etchants
   SET composition = 'See PACE product datasheet for current composition',
       concentration = NULL,
       ingredients = '[]'::jsonb,
       compatible_materials = ARRAY['copper', 'copper-alloy', 'brass', 'bronze'],
       incompatible_materials = ARRAY['carbon-steel', 'aluminum'],
       tags = ARRAY['copper', 'copper-alloy', 'brass', 'astm-e407'],
       reveals = 'Grain boundaries, phases (per ASTM E407 No. 157)',
       typical_results = 'ASTM standard etchant for copper and brass alloys. Specific composition per PACE product specification.',
       preparation_notes = 'Refer to the PACE Technologies product datasheet for the authoritative composition. The recipe is not reproduced in metallography.org because no canonical ASTM E407 No. 157 reference is available in our verified sources.',
       application_notes = 'Apply per PACE product instructions. If preparing in-house, consult the current edition of ASTM E407 for the canonical recipe.',
       troubleshooting_notes = 'Composition not independently verified — defer to manufacturer or ASTM E407 standard.',
       similar_etchants = ARRAY['ASTM No. 30', 'Ammonium Persulfate', 'Ferric Chloride']
 WHERE slug = 'astm-no-157';

-- =============================================================================
-- G. Nickel Etchant — replace placeholder with disclaimer
-- =============================================================================
-- PACE catalog has a generic "Nickel" etchant under "Nickel & Nickel-
-- Alloy Etchants." No canonical recipe in materials-prep or in common-
-- etchants-guide — same datasheet-pointer treatment as ASTM No. 157.
UPDATE etchants
   SET composition = 'See PACE product datasheet for current composition',
       concentration = NULL,
       ingredients = '[]'::jsonb,
       tags = ARRAY['nickel', 'nickel-alloy', 'monel'],
       reveals = 'Grain boundaries, phases',
       typical_results = 'For nickel and nickel-base alloys. Specific composition per PACE product specification.',
       preparation_notes = 'Refer to the PACE Technologies product datasheet for the authoritative composition. The recipe is not reproduced in metallography.org because no canonical reference is available in our verified sources.',
       application_notes = 'Apply per PACE product instructions. For documented Ni etchants, see Marble''s Reagent, Glyceregia, or Inconel Etchant.',
       troubleshooting_notes = 'Composition not independently verified — defer to manufacturer or use one of the documented alternatives (Marble''s, Glyceregia, Inconel Etchant).',
       similar_etchants = ARRAY['Marble''s Reagent', 'Glyceregia', 'Inconel Etchant']
 WHERE slug = 'nickel-etchant';

-- =============================================================================
-- H. Winsteard's Reagent — replace placeholder with disclaimer
-- =============================================================================
-- PACE catalog has "Winsteards" under "General Steel Etchants." No
-- canonical recipe found in any verified source. Same treatment as
-- ASTM No. 157 / Nickel Etchant.
UPDATE etchants
   SET composition = 'See PACE product datasheet for current composition',
       concentration = NULL,
       ingredients = '[]'::jsonb,
       compatible_materials = ARRAY['carbon-steel', 'low-alloy-steel', 'tool-steel'],
       incompatible_materials = ARRAY['stainless-steel', 'aluminum'],
       tags = ARRAY['steel', 'general-purpose'],
       reveals = 'Grain boundaries, phases',
       typical_results = 'General-purpose steel etchant. Specific composition per PACE product specification.',
       preparation_notes = 'Refer to the PACE Technologies product datasheet for the authoritative composition. The recipe is not reproduced in metallography.org because no canonical reference is available in our verified sources.',
       application_notes = 'Apply per PACE product instructions. For documented steel etchants, see Nital, Picral, or Vilella''s Reagent.',
       troubleshooting_notes = 'Composition not independently verified — defer to manufacturer or use one of the documented alternatives (Nital, Picral, Vilella''s).',
       similar_etchants = ARRAY['2% Nital', '4% Picral', 'Vilella''s Reagent']
 WHERE slug = 'winsteards-reagent';

-- =============================================================================
-- Sanity checks (run manually after applying):
--
--   -- Verify Oberhoffer's now contains SnCl2 and FeCl3:
--   SELECT slug, composition FROM etchants WHERE slug = 'oberhoffers-reagent';
--   -- Expect '1.5g SnCl₂·2H₂O, 30g FeCl₃·6H₂O, 0.5g CuCl₂, ...'
--
--   -- Verify Dichromate now contains NaCl:
--   SELECT slug, composition FROM etchants WHERE slug = 'dichromate-etchant';
--   -- Expect '2g K₂Cr₂O₇, 1.5g NaCl, 8ml H₂SO₄, 100ml DI Water'
--
--   -- Verify the three placeholder rows now point at the datasheet:
--   SELECT slug, composition FROM etchants
--    WHERE slug IN ('astm-no-157', 'nickel-etchant', 'winsteards-reagent');
--   -- Expect three rows with composition = 'See PACE product datasheet ...'
--
--   -- Verify Stead's recipe matches its purpose:
--   SELECT slug, composition, reveals FROM etchants WHERE slug = 'steads-reagent';
--   -- Expect CuCl₂ / HCl / water / ethanol — no MgCl₂.
-- =============================================================================
