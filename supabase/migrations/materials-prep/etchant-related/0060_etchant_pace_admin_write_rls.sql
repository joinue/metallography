-- Materials Prep — Pace org admin write access on etchants
-- Apply via Supabase SQL Editor on top of 0059.
--
-- Lets admins of Pace Technologies (org_id d3a5e368-d341-41ed-a394-
-- 1bfbb4e8b29f) edit the etchants catalog directly through the app
-- instead of opening a ticket each time Don or Michael spots a
-- correction. Other orgs do not get write access.
--
-- Etchants are a global reference catalog (no org_id column), so the
-- gate is structural: the policy hard-codes the Pace org_id rather
-- than keying on a per-row owner. If a second org ever needs editor
-- access, replace the literal with a list of allowed orgs. The
-- existing select policy ("etchants_select_authenticated") stays in
-- place for read access from every signed-in user.
--
-- Audit logging is the responsibility of server actions, not the
-- policy — actions write `audit_log` rows with entity_type =
-- 'etchant' / 'etchant_application' so org admins can review the
-- change history.

begin;

-- =============================================================================
-- A. etchants — INSERT and UPDATE for Pace org admins
-- =============================================================================

create policy "etchants_insert_pace_admin" on public.etchants
  for insert
  to authenticated
  with check (
    'd3a5e368-d341-41ed-a394-1bfbb4e8b29f'::uuid in (
      select public.user_admin_org_ids(auth.uid())
    )
  );

create policy "etchants_update_pace_admin" on public.etchants
  for update
  to authenticated
  using (
    'd3a5e368-d341-41ed-a394-1bfbb4e8b29f'::uuid in (
      select public.user_admin_org_ids(auth.uid())
    )
  )
  with check (
    'd3a5e368-d341-41ed-a394-1bfbb4e8b29f'::uuid in (
      select public.user_admin_org_ids(auth.uid())
    )
  );

-- Soft-delete via deleted_at goes through the UPDATE policy. We do
-- not grant a DELETE policy — hard-deletion of catalog rows would
-- break referential integrity with etchant_applications and any
-- legacy citations. If a Pace admin needs to retire an etchant,
-- they set deleted_at via the editor UI.

-- =============================================================================
-- B. etchant_applications — full CRUD for Pace org admins
-- =============================================================================
-- Editors need to add applications, edit notes / family / alloy on
-- existing applications, and remove applications. The existing select
-- policy ("etchant_apps_select_authenticated") stays for read.

create policy "etchant_apps_write_pace_admin" on public.etchant_applications
  for all
  to authenticated
  using (
    'd3a5e368-d341-41ed-a394-1bfbb4e8b29f'::uuid in (
      select public.user_admin_org_ids(auth.uid())
    )
  )
  with check (
    'd3a5e368-d341-41ed-a394-1bfbb4e8b29f'::uuid in (
      select public.user_admin_org_ids(auth.uid())
    )
  );

-- =============================================================================
-- Sanity checks (run manually after applying):
--
--   -- New policies present:
--   select polname, polcmd
--     from pg_policy
--    where polrelid = 'public.etchants'::regclass
--    order by polname;
--   -- Expect "etchants_insert_pace_admin", "etchants_select_authenticated",
--   -- "etchants_update_pace_admin".
--
--   select polname, polcmd
--     from pg_policy
--    where polrelid = 'public.etchant_applications'::regclass
--    order by polname;
--   -- Expect "etchant_apps_select_authenticated", "etchant_apps_write_pace_admin".
--
--   -- Verify Pace admin function: pass any user_id that's in
--   -- org_memberships with role='org_admin' for the Pace org and
--   -- check the function returns the Pace org id.
--   select 'd3a5e368-d341-41ed-a394-1bfbb4e8b29f'::uuid in (
--     select public.user_admin_org_ids('YOUR-USER-ID-HERE'::uuid)
--   ) as is_pace_admin;
-- =============================================================================

commit;
