-- Fix critical and moderate technical-accuracy errors in the materials data
-- found by a metallurgical review of 002-006, 014, 016, 017.
-- Skips minor cosmetic issues per user direction (Critical + Moderate only).

-- =============================================================================
-- CRITICAL: wrong-fact errors
-- =============================================================================

-- C1. Solid-solution-strengthened Ni-base alloys are NOT gamma-prime
-- strengthened. Inconel 625, Inconel 601, Incoloy 800, and Incoloy 825 were
-- all listed with microstructure "Austenite with gamma prime". γ′ is the
-- defining phase of Waspaloy / 718 / U720, not these alloys.

UPDATE materials
SET microstructure = 'Austenite (γ matrix) with NbC, M6C, and M23C6 carbides; Ni3Nb (γ″) precipitates only on extended high-temperature aging. Solid-solution strengthened by Mo and Nb, NOT by gamma prime.'
WHERE name = 'Inconel 625';

UPDATE materials
SET microstructure = 'Austenite (γ matrix) with M23C6 carbides and TiN/Ti(C,N) at high temperature. Solid-solution strengthened by Cr (~23%) and Al (~1.4%); NOT a gamma-prime alloy.'
WHERE name = 'Inconel 601';

UPDATE materials
SET microstructure = 'Austenite (γ matrix) with TiN, Ti(C,N), and M23C6 carbides. Solid-solution strengthened (Ni–Fe–Cr); NOT a gamma-prime alloy. Ti+Al levels too low to form γ′.'
WHERE name = 'Incoloy 800';

UPDATE materials
SET microstructure = 'Austenite (γ matrix) with Ti(C,N) and M23C6 carbides. Solid-solution strengthened (Ni–Fe–Cr–Mo–Cu); NOT a gamma-prime alloy.'
WHERE name = 'Incoloy 825';

-- C2. Beta C is a Timet trade name for Ti-3Al-8V-6Cr-4Mo-4Zr (UNS R58640).
-- Ti-15V-3Cr-3Al-3Sn (Ti-15-3) is a different metastable beta alloy and
-- should not carry the "Beta C" alternative name.
UPDATE materials
SET alternative_names = array_remove(alternative_names, 'Beta C')
WHERE name = 'Ti-15V-3Cr-3Al-3Sn';

-- C3. ASTM Grade 5 = Ti-6Al-4V exclusively. Ti-6242 has no ASTM Grade and
-- the "(Grade 5)" suffix on its name is wrong. Slug stays the same.
UPDATE materials
SET name = 'Ti-6Al-2Sn-4Zr-2Mo'
WHERE name = 'Ti-6Al-2Sn-4Zr-2Mo (Grade 5)';

-- C4. AISI 630 designates 17-4 PH (UNS S17400). 15-5 PH is UNS S15500 and
-- has no AISI number. Remove the misleading alt-name.
UPDATE materials
SET alternative_names = array_remove(alternative_names, 'AISI 630')
WHERE name = '15-5 PH Stainless Steel';

-- C5. Gray cast iron preparation must include the ASTM A247 unetched-first
-- protocol. Etching distorts apparent graphite morphology, so any A247
-- classification must be performed on the as-polished surface BEFORE etching.
UPDATE materials
SET etching_notes = COALESCE(etching_notes, '') ||
  E'\n\nIMPORTANT: per ASTM A247, classify graphite morphology, size, and distribution on the as-polished, UNETCHED surface BEFORE applying any etchant. Etching attacks the matrix and distorts the apparent shape of graphite flakes, biasing morphology rating. Document graphite first; etch only afterward to reveal the matrix (pearlite, ferrite, steadite).'
WHERE name = 'Gray Cast Iron';

-- =============================================================================
-- MODERATE: factually wrong but lower-impact
-- =============================================================================

-- M1. DIN 1.2363 is the European designation for AISI A2 (X100CrMoV5).
-- Remove it from S5, S7, and A6 where it was wrongly duplicated.
UPDATE materials
SET alternative_names = array_remove(alternative_names, '1.2363')
WHERE name IN ('S7 Shock-Resisting Tool Steel',
               'S5 Shock-Resisting Tool Steel',
               'A6 Air-Hardening Tool Steel');

-- M2. Composition strings duplicate the element symbol. Fix to standard
-- "X-99.X min - …" form.

UPDATE materials
SET composition = 'Al-99.0 min - 0.12 Cu'
WHERE composition = 'Al-99.0Al-0.12Cu';

UPDATE materials
SET composition = 'Cu-99.9 min - 0.04 O'
WHERE composition = 'Cu-99.9Cu-0.04O';

UPDATE materials
SET composition = 'Ta-99.9 min'
WHERE composition = 'Ta-99.9Ta';

UPDATE materials
SET composition = 'Nb-99.9 min'
WHERE composition = 'Nb-99.9Nb';

UPDATE materials
SET composition = 'Mo-99.9 min'
WHERE composition = 'Mo-99.9Mo';

UPDATE materials
SET composition = 'W-99.9 min'
WHERE composition = 'W-99.9W';

-- M3 + M4. Heat-treat state reconciliation. Several Q&T-able alloys list
-- annealed-state hardness (~190-220 HB) while the tensile/yield values
-- correspond to the hardened-and-tempered service condition. Per direction,
-- list both states in the descriptive `hardness` text and append a heat-
-- treatment note explaining which state the numeric strength values
-- correspond to. Numeric hardness/tensile fields are left untouched so
-- existing search/sort behavior does not silently shift.

UPDATE materials
SET hardness = '192 HB annealed; 45–50 HRC (~440–500 HB) Q&T (typical hot-work die service)',
    heat_treatment = COALESCE(heat_treatment, '') ||
      E'\nNote: tabulated tensile/yield values reflect the hardened-and-tempered service condition. Annealed UTS is roughly 760 MPa.'
WHERE name = 'H13 Tool Steel';

UPDATE materials
SET hardness = '190 HB annealed; 50–55 HRC Q&T',
    heat_treatment = COALESCE(heat_treatment, '') ||
      E'\nNote: tabulated tensile/yield values reflect the hardened-and-tempered service condition; annealed UTS is roughly 760 MPa.'
WHERE name = 'H11 Tool Steel';

UPDATE materials
SET hardness = '217 HB annealed; 45–55 HRC Q&T',
    heat_treatment = COALESCE(heat_treatment, '') ||
      E'\nNote: tabulated tensile/yield values reflect the hardened-and-tempered service condition; annealed UTS is roughly 830 MPa.'
WHERE name = 'H21 Tool Steel';

UPDATE materials
SET hardness = '197 HB annealed; 54–58 HRC Q&T (shock-resisting service)',
    heat_treatment = COALESCE(heat_treatment, '') ||
      E'\nNote: tabulated tensile/yield values reflect the hardened-and-tempered service condition; annealed UTS is roughly 640 MPa.'
WHERE name = 'S7 Shock-Resisting Tool Steel';

UPDATE materials
SET hardness = '217 HB annealed; 55–58 HRC Q&T',
    heat_treatment = COALESCE(heat_treatment, '') ||
      E'\nNote: tabulated tensile/yield values reflect the hardened-and-tempered service condition; annealed UTS is roughly 700 MPa.'
WHERE name = 'S1 Shock-Resisting Tool Steel';

UPDATE materials
SET hardness = '225 HB annealed; 55–60 HRC Q&T',
    heat_treatment = COALESCE(heat_treatment, '') ||
      E'\nNote: tabulated tensile/yield values reflect the hardened-and-tempered service condition; annealed UTS is roughly 720 MPa.'
WHERE name = 'S5 Shock-Resisting Tool Steel';

UPDATE materials
SET hardness = '197 HB annealed (core); 55–60 HRC carburized case',
    heat_treatment = COALESCE(heat_treatment, '') ||
      E'\nNote: 9310 is normally case-carburized. Tabulated yield value reflects post-carburize core; the case is much harder. Annealed core yield is roughly 450 MPa.'
WHERE name = '9310 Alloy Steel' OR name = 'AISI 9310';

UPDATE materials
SET hardness = '197 HB annealed/normalized; 28–35 HRC Q&T (typical service)',
    heat_treatment = COALESCE(heat_treatment, '') ||
      E'\nNote: 4140 is normally supplied annealed/normalized but used in the quenched-and-tempered condition. Q&T UTS typically 900–1300 MPa; annealed UTS roughly 655 MPa. The microstructure description applies to the Q&T condition.'
WHERE name = 'AISI 4140' OR name = '4140 Chromium Molybdenum Steel';

UPDATE materials
SET hardness = '197 HB annealed; 45–52 HRC Q&T (spring temper)',
    heat_treatment = COALESCE(heat_treatment, '') ||
      E'\nNote: 5160 spring service condition is Q&T to 45–52 HRC; annealed UTS roughly 720 MPa. Polishing pressure should be increased proportionally for hardened samples.'
WHERE name = '5160 Spring Steel';

UPDATE materials
SET hardness = '217 HB spheroidize-annealed; 60–65 HRC Q&T (bearing service)',
    heat_treatment = COALESCE(heat_treatment, '') ||
      E'\nNote: 52100 is delivered spheroidize-annealed (ferrite + spheroidized cementite) and used in service Q&T to 60–65 HRC (tempered martensite + retained M3C/M7C3 carbides). Polishing pressure for hardened bearings should be ~35–50 N rather than the 25–30 N suitable for the annealed state.'
WHERE name = '52100 Bearing Steel';

UPDATE materials
SET hardness = '255 HB annealed; 58–62 HRC Q&T (cutlery/bearing service)',
    heat_treatment = COALESCE(heat_treatment, '') ||
      E'\nNote: 440C in service is hardened to 58–62 HRC (~600–700 HB). Polishing pressure should be on the high end (35–50 N) for hardened material; the annealed-state guidance is too gentle.'
WHERE name = '440C Stainless Steel';

-- M5. Austenitic stainless steel etchants — drop Aqua Regia (overly
-- aggressive for routine work) and add the conventional primaries
-- Kalling's #2 and Marble's reagent.

UPDATE materials
SET common_etchants = (
  SELECT array_agg(DISTINCT e)
  FROM unnest(
    array_remove(common_etchants, 'Aqua Regia') ||
    ARRAY[
      'Kalling''s #2',
      'Marble''s Reagent',
      'Glyceregia',
      'Electrolytic 10% Oxalic'
    ]
  ) AS e
)
WHERE name IN ('304 Stainless Steel',
               '316 Stainless Steel',
               '321 Stainless Steel',
               '347 Stainless Steel',
               '309 Stainless Steel',
               '310 Stainless Steel',
               '330 Stainless Steel');

-- M6. Inconel 718 — add Kalling's #2 (the conventional primary) alongside
-- the existing Glyceregia / oxalic.
UPDATE materials
SET common_etchants = (
  SELECT array_agg(DISTINCT e)
  FROM unnest(common_etchants || ARRAY['Kalling''s #2', 'Waterless Kalling''s']) AS e
)
WHERE name = 'Inconel 718';

-- M7. PH stainless steels — Vilella's is the conventional primary etchant
-- (per ASM E407 and Vander Voort) and Beraha's BII gives color contrast on
-- aged condition. Existing rows have these in the alternates list; promote
-- to primary and add Fry's reagent for the martensitic matrix on Cu-rich
-- precipitation-hardened grades.

UPDATE materials
SET common_etchants = (
  SELECT array_agg(DISTINCT e)
  FROM unnest(
    ARRAY['Vilella''s Reagent',
          'Beraha''s BII',
          'Fry''s Reagent',
          '2% Nital'] ||
    array_remove(array_remove(common_etchants, 'Aqua Regia'), 'Glyceregia')
  ) AS e
)
WHERE name IN ('17-4 PH Stainless Steel', '15-5 PH Stainless Steel');

-- M8. Malleable cast iron has temper-carbon nodules formed by
-- malleabilization heat treatment. "Nodular Graphite Iron" is the
-- alternative name for DUCTILE iron, not malleable.
UPDATE materials
SET alternative_names = array_replace(
  alternative_names,
  'Nodular Graphite Iron',
  'Whiteheart and Blackheart Malleable Iron'
)
WHERE name = 'Malleable Cast Iron';

-- M9. Fiber composites (CFRP/GFRP/AFRP) listed bulk Rockwell hardness values
-- that are not metallographically meaningful — composite hardness is
-- anisotropic and dominated by either fiber, matrix, or cross-section
-- depending on indentation orientation. Null the HRC fields and explain.

UPDATE materials
SET hardness_hrc = NULL,
    hardness = 'Bulk Rockwell hardness is not meaningful for fiber-reinforced polymers; matrix microhardness ~10–20 HV (epoxy), fiber hardness ~3000 HV (carbon) measured separately.',
    special_notes = COALESCE(special_notes, '') ||
      E'\nNote: published Rockwell hardness for fiber composites is unreliable because indentation response depends heavily on whether the indenter contacts a fiber, the matrix, or the fiber/matrix interface. Use Vickers microhardness on individual phases instead.'
WHERE name IN ('Carbon Fiber Reinforced Polymer (CFRP)',
               'Glass Fiber Reinforced Polymer (GFRP)',
               'Aramid Fiber Reinforced Polymer');

-- M10. Sapphire = single-crystal Al2O3. The alumina row describes
-- polycrystalline sintered alumina — a different material with different
-- preparation (no Laue orientation, no birefringence). Remove "Sapphire"
-- from the alt-name list. Corundum (a name applied to both single-crystal
-- and polycrystalline alpha-Al2O3 in geological context) is left in place.
UPDATE materials
SET alternative_names = array_remove(alternative_names, 'Sapphire')
WHERE name = 'Alumina (Al2O3)';
