-- Materials Prep — combine "Beaudry and Daane" / "Myklebust and Daane"
-- Apply via Supabase SQL Editor on top of 0057.
--
-- Pair 4 from the post-0049 dedupe audit. Don confirmed the two
-- citations should stay merged (rare Ames-lab rare-earth etchants;
-- not enough evidence to split them apart). Updating the canonical's
-- common_name so users searching either author credit find the
-- etchant — same pattern as 0056's ASTM number consolidations.

begin;

update public.etchants
   set common_name = 'Beaudry and Daane / Myklebust and Daane'
 where id = '17dcf546-c87b-40fa-a917-e5e23f624ed3'
   and deleted_at is null;

-- Sanity check (run manually after applying):
--
--   select common_name, material_families
--     from public.etchants
--    where id = '17dcf546-c87b-40fa-a917-e5e23f624ed3'
--      and deleted_at is null;
--   -- Expect "Beaudry and Daane / Myklebust and Daane".

commit;
