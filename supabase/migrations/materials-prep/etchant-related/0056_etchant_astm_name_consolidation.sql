-- Materials Prep — consolidate ASTM-variant names from dedupe collapse
-- Apply via Supabase SQL Editor on top of 0055.
--
-- Discovered during the Pace-list audit: 0049's dedupe (composition_key
-- + method + scale) collapsed multiple ASTM E407 letter variants of the
-- same recipe (1a/1b/1c/1d, 13a/13b/13c, 74a/74b/74d/74e, etc.) into a
-- single canonical, retiring the alternate-letter siblings as soft-
-- deleted duplicates. The collapse itself is correct — these letters
-- are the same recipe applied to different materials — but the
-- canonical kept only one of the names. Users searching for the retired
-- letter codes don't find the etchant.
--
-- Fix: append the retired ASTM numbers to each canonical's common_name
-- using the existing " / " convention from the seed (which already
-- combines some ASTM ranges this way). After this migration, searching
-- "ASTM No. 1a" or "ASTM No. 1b" or "ASTM No. 1c" will all hit the
-- same canonical (currently named "ASTM No. 1d").
--
-- Also fixes formatting-only duplicates ("ASTM 129" / "ASTM No. 129")
-- and one trailing-period variant.
--
-- Out of scope (deferred for Don's review): Category B suspected
-- mis-merges. Those are tracked in a separate report — not changed
-- by this migration.

begin;

-- =============================================================================
-- A. ASTM letter-variant consolidation
-- =============================================================================
-- Format: common_name = "ASTM No. <range>" with comma- or slash-joined
-- variants. Matches the seed's existing convention for some entries.

update public.etchants
   set common_name = 'ASTM No. 1a / 1b / 1c / 1d'
 where id = '03fe6881-26b9-4a2c-ac0b-615227481dc4';

update public.etchants
   set common_name = 'ASTM No. 3 / 3a / 3b'
 where id = '04914ccb-ba6f-4848-a4d9-236544ae22f3';

update public.etchants
   set common_name = 'ASTM No. 13a / 13b / 13c'
 where id = '9f8756c8-f4f5-4b42-b465-4f840f491441';

update public.etchants
   set common_name = 'ASTM No. 19 / 19b'
 where id = '14090168-c37a-4f01-b0b6-e39a65e0d2b7';

update public.etchants
   set common_name = 'ASTM No. 22a / 22b'
 where id = '96d6180a-fd0f-496b-b501-2910911aa145';

update public.etchants
   set common_name = 'ASTM No. 31a / 31b / 31d'
 where id = '0180fa64-3109-4e8d-a96a-4cccbab047ab';

update public.etchants
   set common_name = 'ASTM No. 34 / 34b'
 where id = '16708efd-b631-4fd5-958c-0dd5d2be9aa6';

update public.etchants
   set common_name = 'ASTM No. 64a / 64b'
 where id = '3141ee7c-222b-4f0b-89f7-2b003020b90f';

update public.etchants
   set common_name = 'ASTM No. 73a / 73b / 73c'
 where id = '41f11eeb-a41e-4f09-94f7-3b63a0f869bf';

update public.etchants
   set common_name = 'ASTM No. 74a / 74b / 74d / 74e'
 where id = '104935da-a860-4f26-b957-bdfab04fb634';

update public.etchants
   set common_name = 'ASTM No. 83a / 83b'
 where id = '23c0fc0f-b68b-4d72-ab61-2aad81355ef8';

update public.etchants
   set common_name = 'ASTM No. 98 / 98c / 99'
 where id = '0f7d2584-534b-4f63-9663-0b83e5462fff';

update public.etchants
   set common_name = 'ASTM No. 113 / 114'
 where id = '44a15f83-c294-4e89-8550-ba57e1f88770';

update public.etchants
   set common_name = 'ASTM No. 117a / 117b'
 where id = '3681f516-69ab-44e6-8841-467ff49ddc86';

update public.etchants
   set common_name = 'ASTM No. 132a / 132b'
 where id = '091d219d-3cfd-4b8c-a56a-066e3aada08b';

update public.etchants
   set common_name = 'ASTM No. 165a / 165b (Buchheit)'
 where id = '04237f34-1396-4d82-8ceb-b2f5a4aa3ff5';

update public.etchants
   set common_name = 'ASTM No. 170a / 170b'
 where id = '20eb7a12-b394-4749-9756-d9592424803c';

-- =============================================================================
-- B. Formatting-only duplicates (whitespace / punctuation in ASTM number)
-- =============================================================================
-- Same number, slightly different format. These were already correctly
-- deduped; we just normalize the canonical name to the standard form.

update public.etchants
   set common_name = 'ASTM No. 66'
 where id = '1e4f69c6-07d7-4d1a-b002-4eab7bf09e15';

update public.etchants
   set common_name = 'ASTM No. 129'
 where id = '0a74d34d-351d-4aef-afea-b6d2e9ae112f';

update public.etchants
   set common_name = 'ASTM No. 159'
 where id = '13dc5a57-53f8-4e0c-be80-c259691c4ab5';

update public.etchants
   set common_name = 'ASTM No. 178'
 where id = '65dfc047-2530-4362-a22b-66aa7ec6e880';

-- =============================================================================
-- C. Historical name + ASTM number consolidation
-- =============================================================================
-- ASTM No. 85 IS Alkaline sodium picrate (the historical name predates
-- the ASTM standard). Both are legitimate; combine.

update public.etchants
   set common_name = 'ASTM No. 85 / Alkaline sodium picrate'
 where id = '4a9ad3e2-e69a-48ef-bcb8-1dde38a4ae27';

-- =============================================================================
-- D. Punctuation cleanup
-- =============================================================================

update public.etchants
   set common_name = 'Klemm''s I'
 where id = '5334f0b9-f104-419b-a44a-c0eb70a13cc6';

-- =============================================================================
-- Sanity checks (run manually after applying):
--
--   -- Spot-check ASTM consolidations:
--   select common_name from public.etchants
--    where id in (
--      '03fe6881-26b9-4a2c-ac0b-615227481dc4', -- 1a/b/c/d
--      '9f8756c8-f4f5-4b42-b465-4f840f491441', -- 13a/b/c
--      '104935da-a860-4f26-b957-bdfab04fb634'  -- 74a/b/d/e
--    );
--
--   -- Verify no duplicate canonical names introduced:
--   select common_name, count(*)
--     from public.etchants
--    where common_name is not null
--      and deleted_at is null
--    group by common_name
--   having count(*) > 1
--    order by count(*) desc, common_name
--    limit 20;
--   -- Expect rows like Nital/Picral/Vilella's that have legitimate
--   -- multi-canonical entries (different concentrations / methods);
--   -- nothing surprising.
-- =============================================================================

commit;
