-- Fix data-quality and technical-accuracy errors found in
-- 020_seed_all_equipment.sql / 021_seed_all_consumables.sql during a
-- technical-accuracy review.
--
-- Issues addressed:
--   1. Sub-micron polishing-abrasive `grit_size` is 100x too large because
--      the leading "0." was dropped. Affects diamond pastes/suspensions,
--      colloidal silica, and sub-micron alumina (~80+ rows). The product
--      description text is correct; only the structured `grit_size` column
--      is wrong, so any recommendation logic that filters by particle size
--      treats final-polish abrasives as coarse grinding media.
--   2. All SiC abrasive papers are tagged
--      `suitable_for_hardness = ['hard','very-hard']` only. SiC is the
--      universal grinding abrasive across the entire hardness spectrum;
--      it is in fact the preferred abrasive for soft, ductile materials
--      (Cu, Al, etc.) where alumina would smear. Excluding 'soft' and
--      'medium' breaks soft-metal recommendations.
--   3. Every mounting-resin row is tagged compatible with the full equipment
--      lineup (TP-7100S, TP-7500S, TeraVAC, TeraVAC Pro, TeraUV) regardless
--      of whether the resin is hot-press compression, room-temp castable,
--      or UV-cure. Compression resins cannot be cured in vacuum/UV systems;
--      castable resins cannot be cured in heated compression presses.
--   4. ORION composite disks have `grit_size = '6 micron'` while the
--      description states they are precharged with 3 µm diamond. The 3 µm
--      value better reflects how step-recommendation logic should match
--      these pads.
--   5. Reusable mounting cups/molds at 1.25" and 1.5" have absurd
--      `size_mm` (625 / 125) and `size_inches` (25 / 5) values from a
--      data-entry error.
--   6. "Kgf" misspelled as "Kgr" in two Superficial Rockwell tester
--      descriptions.
--   7. "3015 kg" typo in S30W10 hardness test block description (should
--      be "30 kg").

-- 1. Sub-micron grit_size — restore the leading "0." -------------------------
-- Constrain by description so legitimate 10/25/30/50 micron products are
-- not affected.

UPDATE consumables SET grit_size = '0.02 micron'
  WHERE grit_size = '02 micron'
    AND (description ILIKE '%0.02 um%' OR description ILIKE '%0.02 micron%');

UPDATE consumables SET grit_size = '0.05 micron'
  WHERE grit_size = '05 micron'
    AND (description ILIKE '%0.05 um%' OR description ILIKE '%0.05 micron%');

UPDATE consumables SET grit_size = '0.06 micron'
  WHERE grit_size = '06 micron'
    AND (description ILIKE '%0.06 um%' OR description ILIKE '%0.06 micron%');

UPDATE consumables SET grit_size = '0.10 micron'
  WHERE grit_size = '10 micron'
    AND (description ILIKE '%0.10 um%' OR description ILIKE '%0.10 micron%');

UPDATE consumables SET grit_size = '0.25 micron'
  WHERE grit_size = '25 micron'
    AND (description ILIKE '%0.25 um%' OR description ILIKE '%0.25 micron%');

UPDATE consumables SET grit_size = '0.30 micron'
  WHERE grit_size = '30 micron'
    AND (description ILIKE '%0.30 um%' OR description ILIKE '%0.30 micron%');

UPDATE consumables SET grit_size = '0.50 micron'
  WHERE grit_size = '50 micron'
    AND (description ILIKE '%0.50 um%' OR description ILIKE '%0.50 micron%');

-- 2. SiC papers are appropriate across the entire hardness spectrum ----------
UPDATE consumables
SET suitable_for_hardness = ARRAY['soft', 'medium', 'hard', 'very-hard']
WHERE material_composition = 'silicon-carbide';

-- 3. Resin compatible_with_equipment — split by curing method ----------------
-- Compression resins (cured under heat + pressure in heated presses only)
UPDATE consumables
SET compatible_with_equipment = ARRAY['TP-7100S', 'TP-7500S']
WHERE category = 'mounting'
  AND description ILIKE '%compression%';

-- UV-cure castable acrylic (cured under UV light)
UPDATE consumables
SET compatible_with_equipment = ARRAY['TeraUV']
WHERE category = 'mounting'
  AND description ILIKE '%UV Acrylic%';

-- Liquid castable acrylic / epoxy / polyester (room-temperature cure;
-- TeraVAC = vacuum-impregnation chamber, TeraVAC Pro = upgraded variant)
UPDATE consumables
SET compatible_with_equipment = ARRAY['TeraVAC', 'TeraVAC Pro']
WHERE category = 'mounting'
  AND (description ILIKE '%Castable%'
       OR description ILIKE '%EPOCAST%'
       OR description ILIKE '%QUICKMOUNT%'
       OR description ILIKE '%ULTRATHIN%'
       OR description ILIKE '%EPOXY ELITE%'
       OR description ILIKE '%POLYCAST%')
  AND description NOT ILIKE '%compression%'
  AND description NOT ILIKE '%UV Acrylic%';

-- 4. ORION pads are 3 µm precharged ------------------------------------------
UPDATE consumables
SET grit_size = '3 micron'
WHERE item_id IN ('ORION-MD08', 'ORION-MD10', 'ORION-MD12');

-- 5. Reusable mounting cup / mold size fixes --------------------------------
-- 1.25" cups and molds: actual size ~32 mm, integer-inch column nulled out
-- since 1.25 cannot be represented exactly.
UPDATE consumables
SET size_mm = 32, size_inches = NULL
WHERE item_id IN ('METPREP-0125', 'RMOUNT-0125', 'RMOUNT-0125C');

-- 1.5" cups and molds: actual size ~38 mm
UPDATE consumables
SET size_mm = 38, size_inches = NULL
WHERE item_id IN ('METPREP-0150', 'RMOUNT-0150', 'RMOUNT-0150C');

-- 6. Kgf misspelled as Kgr in Superficial Rockwell descriptions --------------
UPDATE equipment
SET description = REPLACE(description, ' Kgr', ' Kgf')
WHERE item_id IN ('OMEGA-DIGI-ST', 'OMEGA-DIGI-RST');

-- 7. S30W10 test-block load typo --------------------------------------------
UPDATE consumables
SET description = '30 W Scale, 1/8-inch Ball, 30 kg, All, Brass, Superficial hardness test blocks'
WHERE item_id = 'S30W10';
