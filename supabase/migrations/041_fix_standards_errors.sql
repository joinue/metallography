-- Fix errors found in 011_seed_standards.sql / 012_seed_additional_standards.sql
-- during a technical-accuracy review.
--
-- Issues addressed:
--   1. ASTM E2014 had the title and description of E2015 (plastics/polymers).
--      The actual E2014 is "Standard Guide on Metallographic Laboratory Safety".
--   2. ASTM E1351 was listed as a terminology standard. The actual E1351 is
--      "Standard Practice for Production and Evaluation of Field Metallographic
--      Replicas". E1316 (already in DB) is the NDT terminology standard.
--   3. ASTM E1077 (decarburization depth) was categorized as 'Etching' — it is
--      a measurement/analysis standard, not an etching procedure.
--   4. Missing ASTM A247 and ISO 945-1 (graphite morphology) — high-value for
--      the cast iron prep content already on the site.

-- 1. Correct ASTM E2014 -------------------------------------------------------
UPDATE standards
SET
  title       = 'Standard Guide on Metallographic Laboratory Safety',
  description = 'Guide covering safety practices for metallographic laboratories, including handling of acids and solvents, ventilation, personal protective equipment, electrical and mechanical hazards from prep equipment, and emergency response.',
  category    = 'Safety',
  tags        = ARRAY['safety','laboratory','ppe','hazards','etchants']
WHERE standard = 'ASTM E2014';

-- 2. Correct ASTM E1351 -------------------------------------------------------
UPDATE standards
SET
  title       = 'Standard Practice for Production and Evaluation of Field Metallographic Replicas',
  description = 'Practice for producing and evaluating replicas (typically cellulose acetate or silicone) of in-service component surfaces for non-destructive metallographic examination. Covers surface preparation, replica application, mounting, and examination of microstructural features without removing material.',
  category    = 'Preparation',
  tags        = ARRAY['replicas','field-metallography','non-destructive','in-service']
WHERE standard = 'ASTM E1351';

-- 3. Reclassify ASTM E1077 ----------------------------------------------------
UPDATE standards
SET category = 'Analysis'
WHERE standard = 'ASTM E1077';

-- 4. Add missing graphite-classification standards ----------------------------
INSERT INTO standards (standard, title, description, category, sort_order, tags, organization) VALUES
  ('ASTM A247',
   'Standard Test Method for Evaluating the Microstructure of Graphite in Iron Castings',
   'Test method for classifying graphite morphology in cast irons by comparison with reference micrographs. Defines graphite forms (I–VII / nodular, vermicular, flake), distribution types (A–E for flake), and nodule sizes. Required to be performed on as-polished, unetched specimens.',
   'Analysis', 42, ARRAY['cast-iron','graphite','nodularity','classification','unetched'], 'ASTM'),
  ('ISO 945-1',
   'Microstructure of Cast Irons - Part 1: Graphite Classification by Visual Analysis',
   'International standard for visual classification of graphite morphology in cast irons. Covers graphite form (I–VI), distribution, and size. International counterpart to ASTM A247, used for ductile, gray, compacted, and malleable irons.',
   'Analysis', 43, ARRAY['cast-iron','graphite','iso','classification','unetched'], 'ISO')
ON CONFLICT (slug) DO NOTHING;

-- Refresh slugs for any newly-inserted rows -----------------------------------
UPDATE standards SET slug = generate_standard_slug(standard) WHERE slug IS NULL;
