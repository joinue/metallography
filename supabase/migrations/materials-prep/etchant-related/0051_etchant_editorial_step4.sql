-- Materials Prep — etchant editorial pass, step 4
-- Apply via Supabase SQL Editor on top of 0050.
--
-- Step 4 is the post-dedupe editorial polish on application notes plus a
-- second wave of common-name back-fills now that recipes are uniquely
-- identified by (composition, method, scale).
--
-- Sections:
--   A. Strip CAUTION:/WARNING: lines from application_notes (and the
--      legacy etchants.application column). The structured safety panel
--      from 0038 already surfaces hazard data; the duplicated CAUTION
--      blocks in application text were redundant and crowded the
--      detail-page "Applies to" section.
--   B. Strip leading "Color etching." prefix from application notes.
--      The method/scale tags already convey this on the card; the prefix
--      was a leftover from how the 2005 catalog organized its sections.
--   C. Whitespace normalization: collapse runs of spaces/tabs, collapse
--      blank-line gaps to single newlines, trim, drop empties.
--   D. Refresh denormalized etchants.applications_text after the bulk
--      edits (the trigger is disabled during the bulk to avoid 1500+
--      per-row trigger fires).
--   E. Common-name back-fills with composition patterns now reliable on
--      the deduped catalog: Kalling's No. 1 (CuCl2 + HCl + ethanol +
--      water), Kalling's No. 2 (CuCl2 + HCl + ethanol, no water),
--      Klemm's reagent (saturated Na thiosulfate + K metabisulfite).
--      Klemm's I / II / III variants share the same name and a similar
--      composition signature; the detail-page "Other Klemm's variants"
--      panel surfaces them side-by-side so a metallographer can pick
--      the right concentration at the bench.
--
-- Out of scope (requires per-row editorial review):
--   * Rewriting application notes into one-line TL;DRs.
--   * Disambiguating Klemm's I vs II vs III by metabisulfite amount.
--   * Disambiguating Keller's vs Tucker's (overlapping HF+HCl+HNO3+water
--     signatures on aluminum that need editorial judgment).
--   * Beraha's variants (too many sub-recipes).

begin;

-- Disable the denormalization trigger so bulk updates on
-- etchant_applications don't fire it 1500+ times. We re-enable and
-- refresh manually at the end of section D.
alter table public.etchant_applications
  disable trigger trg_etchant_apps_refresh_denorm;

-- =============================================================================
-- A. Strip CAUTION:/WARNING: lines
-- =============================================================================
-- Match the keyword anchored at start of string or after a newline,
-- followed by colon or space, capture leading anchor, drop the line.
-- Word boundaries on the keyword prevent matches inside words like
-- "PRECAUTION".

update public.etchant_applications
   set application_notes = regexp_replace(
         application_notes,
         '(^|\n)\s*\m(caution|warning)\M[: ][^\n]*\n?',
         E'\\1',
         'gi'
       )
 where application_notes ~* '\m(caution|warning)\M[: ]';

update public.etchants
   set application = regexp_replace(
         application,
         '(^|\n)\s*\m(caution|warning)\M[: ][^\n]*\n?',
         E'\\1',
         'gi'
       )
 where application ~* '\m(caution|warning)\M[: ]';

-- =============================================================================
-- B. Strip leading "Color etching." prefix
-- =============================================================================

update public.etchant_applications
   set application_notes = regexp_replace(
         application_notes,
         '^\s*Color etching\.\s*',
         '',
         'i'
       )
 where application_notes ~* '^\s*Color etching\.';

update public.etchants
   set application = regexp_replace(
         application,
         '^\s*Color etching\.\s*',
         '',
         'i'
       )
 where application ~* '^\s*Color etching\.';

-- =============================================================================
-- C. Whitespace normalization
-- =============================================================================
-- 1) Collapse runs of spaces/tabs within a line to one space.
-- 2) Collapse two-or-more consecutive newlines to a single newline.
-- 3) Trim leading/trailing whitespace.
-- 4) Set empty notes to null so they don't pollute the "Applies to" UI.

update public.etchant_applications
   set application_notes = btrim(
         regexp_replace(
           regexp_replace(application_notes, '[ \t]+', ' ', 'g'),
           E'\n{2,}', E'\n', 'g'
         )
       )
 where application_notes is not null;

update public.etchants
   set application = btrim(
         regexp_replace(
           regexp_replace(application, '[ \t]+', ' ', 'g'),
           E'\n{2,}', E'\n', 'g'
         )
       )
 where application is not null;

update public.etchant_applications
   set application_notes = null
 where application_notes is not null
   and length(application_notes) = 0;

update public.etchants
   set application = null
 where application is not null
   and length(application) = 0;

-- =============================================================================
-- D. Re-enable trigger and refresh applications_text
-- =============================================================================
-- The trigger was disabled while we ran the bulk updates. Re-enable it
-- so future edits on etchant_applications stay in sync, then run a
-- single pass to recompute the denormalized applications_text on every
-- canonical etchant.

alter table public.etchant_applications
  enable trigger trg_etchant_apps_refresh_denorm;

update public.etchants e
   set applications_text = coalesce((
         select string_agg(distinct ea.application_notes, ' / '
                           order by ea.application_notes)
           filter (where ea.application_notes is not null
                   and length(trim(ea.application_notes)) > 0)
           from public.etchant_applications ea
          where ea.etchant_id = e.id
       ), '')
 where e.deleted_at is null;

-- =============================================================================
-- E. Common-name back-fills, round 3
-- =============================================================================
-- material_families && array[...] uses array overlap so a canonical that
-- applies to ANY of the named families qualifies. method stays scalar on
-- the canonical (part of identity), so direct equality is fine.

-- Kalling's No. 1: CuCl2 + HCl + ethanol + water, on stainless / carbon /
-- tool steels. Equal-volume solvents in the canonical recipe; we don't
-- match by volume, only by presence of all three solvents.
update public.etchants
   set common_name = 'Kalling''s No. 1'
 where common_name is null
   and method = 'Chemical'
   and material_families && array['Stainless steel', 'Carbon & alloy steel', 'Tool steel']::text[]
   and (composition ~* '\mCuCl2\M' or composition ~* 'copper.*chloride')
   and composition ~* '(HCl|hydrochloric)'
   and composition ~* '(ethanol|methanol|alcohol)'
   and composition ~* 'water'
   and composition !~* '(picric|HF|hydrofluoric|HNO3|nitric|sulfuric|H2SO4|chromium|CrO3|persulfate|perchloric)';

-- Kalling's No. 2: CuCl2 + HCl + ethanol with NO water. The defining
-- distinction from No. 1.
update public.etchants
   set common_name = 'Kalling''s No. 2'
 where common_name is null
   and method = 'Chemical'
   and material_families && array['Stainless steel', 'Tool steel', 'Carbon & alloy steel']::text[]
   and (composition ~* '\mCuCl2\M' or composition ~* 'copper.*chloride')
   and composition ~* '(HCl|hydrochloric)'
   and composition ~* '(ethanol|methanol|alcohol)'
   and composition !~* 'water'
   and composition !~* '(picric|HF|hydrofluoric|HNO3|nitric|sulfuric|H2SO4|chromium|CrO3|persulfate|perchloric)';

-- Klemm's reagent (covers I / II / III). The pattern is saturated sodium
-- thiosulfate plus potassium metabisulfite in water. The variants differ
-- in metabisulfite concentration; surface them via the detail-page
-- variants panel rather than trying to disambiguate here.
update public.etchants
   set common_name = 'Klemm''s reagent'
 where common_name is null
   and method in ('Tint', 'Color', 'Chemical')
   and (composition ~* 'sodium thiosulfate' or composition ~* '\mNa2S2O3\M')
   and (composition ~* 'metabisulfite' or composition ~* '\mK2S2O5\M')
   and composition ~* 'water'
   and composition !~* '(picric|HF|hydrofluoric|HNO3|nitric|HCl|hydrochloric|CrO3|chromium)';

-- =============================================================================
-- Sanity checks (run manually after applying):
--
--   -- A. CAUTION/WARNING gone from notes:
--   select count(*) as remaining_caution from public.etchant_applications
--    where application_notes ~* '\m(caution|warning)\M[: ]';
--   -- Expect 0.
--
--   -- B. "Color etching." prefix gone:
--   select count(*) as remaining_color_prefix from public.etchant_applications
--    where application_notes ~* '^\s*Color etching\.';
--   -- Expect 0.
--
--   -- E. New common names populated:
--   select common_name, count(*) from public.etchants
--    where deleted_at is null
--      and common_name in ('Kalling''s No. 1', 'Kalling''s No. 2', 'Klemm''s reagent')
--    group by common_name order by 1;
-- =============================================================================

commit;
