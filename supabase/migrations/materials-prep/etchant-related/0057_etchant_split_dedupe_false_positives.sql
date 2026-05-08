-- Materials Prep — split etchants the 0049 dedupe wrongly collapsed
-- Apply via Supabase SQL Editor on top of 0056.
--
-- Web-research audit of the Category B candidates from the post-0049
-- dedupe found that 10 of 11 suspected mis-merges are confirmed (or
-- lean) DIFFERENT etchants — distinct historical citations from
-- different labs, decades, and target materials that happen to share
-- a numeric composition signature. The 0049 dedupe-by-composition
-- generates false positives in this regime because many historical
-- etchants share common reagent families (HF/HNO3/H2O,
-- HNO3/ethanol, CuSO4/HCl/H2O).
--
-- This migration restores the retired canonicals and repoints their
-- original applications back. After applying, each etchant gets its
-- own catalog entry preserving its citation provenance.
--
-- Repoint heuristic: applications are repointed back to the restored
-- retired canonical when the application's (material_family, alloy)
-- matches the retired canonical's original (material_family, alloy).
-- This is correct for cases where the two collapsed etchants targeted
-- DIFFERENT materials (e.g. Cain for Be vs Kroll's for Ti, where each
-- has its own family). It is approximate where the two etchants
-- targeted the same family — there may be edge cases needing manual
-- review afterwards.
--
-- Pair 4 (Beaudry and Daane vs Myklebust and Daane) is DEFERRED
-- pending Don's confirmation — same Ames Lab, same senior author,
-- two-year gap. Could plausibly be the same lab-standard etchant
-- re-published under different paper credits.

begin;

-- =============================================================================
-- Helper: split one (canonical, retired_name) pair
-- =============================================================================
-- Inlined as DO blocks below for transparency. Each block:
--   1. Locates the retired canonical by (composition_key, method,
--      scale, common_name, deleted_at not null).
--   2. Restores it (deleted_at = null).
--   3. Repoints etchant_applications from canonical to retired where
--      (material_family, alloy) matches the retired canonical's
--      original values.
-- The trigger on etchant_applications refreshes denormalized fields
-- on both etchants for each repointed row.

-- =============================================================================
-- Pair 1: Cain (canonical) <- Kroll's reagent (retired)
-- =============================================================================
-- Cain = beryllium etchant; Kroll's = titanium / Group IV (Kroll 1937,
-- ASTM E407 #192). Different historical citations; same HF/HNO3/H2O
-- numeric signature.

do $$
declare
  v_canonical_id uuid := '3bd1ea85-fd36-4802-9fc6-ce19bca742d4';
  v_retired_name text := 'Kroll''s reagent';
  v_retired_id uuid;
  v_retired_family text;
  v_retired_alloy text;
begin
  select er.id, er.material_family, er.alloy
    into v_retired_id, v_retired_family, v_retired_alloy
    from public.etchants er, public.etchants ec
   where ec.id = v_canonical_id
     and er.id <> v_canonical_id
     and composition_key(er.composition) = composition_key(ec.composition)
     and er.method = ec.method
     and er.scale = ec.scale
     and er.common_name = v_retired_name
     and er.deleted_at is not null
   limit 1;
  if v_retired_id is null then
    raise notice 'Skip: no retired canonical found for % under %', v_retired_name, v_canonical_id;
  else
    update public.etchants set deleted_at = null where id = v_retired_id;
    update public.etchant_applications
       set etchant_id = v_retired_id
     where etchant_id = v_canonical_id
       and material_family = v_retired_family
       and alloy is not distinct from v_retired_alloy;
    raise notice 'Pair 1 split: % -> % (family=%, alloy=%)',
                 v_canonical_id, v_retired_id, v_retired_family, v_retired_alloy;
  end if;
end $$;

-- =============================================================================
-- Pair 2: Modified Marble's etchant <- Marble's reagent (retired)
-- =============================================================================
-- Marble's = ASTM E407 #25 (10g CuSO4 / 50ml HCl / 50ml H2O), 300-series
-- SS + Ni superalloys. Modified Marble's = documented variant for
-- Ni-Nb superalloys (Inconel 718, Rene 41).

do $$
declare
  v_canonical_id uuid := '802d30b2-41b3-42cc-ae14-91a4026b47bf';
  v_retired_name text := 'Marble''s reagent';
  v_retired_id uuid;
  v_retired_family text;
  v_retired_alloy text;
begin
  select er.id, er.material_family, er.alloy
    into v_retired_id, v_retired_family, v_retired_alloy
    from public.etchants er, public.etchants ec
   where ec.id = v_canonical_id
     and er.id <> v_canonical_id
     and composition_key(er.composition) = composition_key(ec.composition)
     and er.method = ec.method
     and er.scale = ec.scale
     and er.common_name = v_retired_name
     and er.deleted_at is not null
   limit 1;
  if v_retired_id is null then
    raise notice 'Skip: no retired canonical found for % under %', v_retired_name, v_canonical_id;
  else
    update public.etchants set deleted_at = null where id = v_retired_id;
    update public.etchant_applications
       set etchant_id = v_retired_id
     where etchant_id = v_canonical_id
       and material_family = v_retired_family
       and alloy is not distinct from v_retired_alloy;
    raise notice 'Pair 2 split: % -> % (family=%, alloy=%)',
                 v_canonical_id, v_retired_id, v_retired_family, v_retired_alloy;
  end if;
end $$;

-- =============================================================================
-- Pair 3: Nital <- Chiotti and Mason (retired)
-- =============================================================================
-- Nital = ASTM E407 #74, 1-10% HNO3 in ethanol for Fe/steel.
-- Chiotti & Mason = Ames Lab actinide-metals etch (uranium, thorium)
-- — completely separate provenance.

do $$
declare
  v_canonical_id uuid := '92e9359c-99c7-40dc-ac18-0afa005e957d';
  v_retired_name text := 'Chiotti and Mason';
  v_retired_id uuid;
  v_retired_family text;
  v_retired_alloy text;
begin
  select er.id, er.material_family, er.alloy
    into v_retired_id, v_retired_family, v_retired_alloy
    from public.etchants er, public.etchants ec
   where ec.id = v_canonical_id
     and er.id <> v_canonical_id
     and composition_key(er.composition) = composition_key(ec.composition)
     and er.method = ec.method
     and er.scale = ec.scale
     and er.common_name = v_retired_name
     and er.deleted_at is not null
   limit 1;
  if v_retired_id is null then
    raise notice 'Skip: no retired canonical found for % under %', v_retired_name, v_canonical_id;
  else
    update public.etchants set deleted_at = null where id = v_retired_id;
    update public.etchant_applications
       set etchant_id = v_retired_id
     where etchant_id = v_canonical_id
       and material_family = v_retired_family
       and alloy is not distinct from v_retired_alloy;
    raise notice 'Pair 3 split: % -> % (family=%, alloy=%)',
                 v_canonical_id, v_retired_id, v_retired_family, v_retired_alloy;
  end if;
end $$;

-- =============================================================================
-- Pair 4: DEFERRED
-- =============================================================================
-- Beaudry and Daane vs Myklebust and Daane — pending Don's input on
-- whether the two Ames Lab papers used the same lab-standard etchant.

-- =============================================================================
-- Pair 5: Okazahi and Nagata (canonical) <- Beaudry and Daane (retired)
-- =============================================================================
-- Different countries, different labs, almost certainly different
-- target materials. Composition collision is a numeric coincidence.

do $$
declare
  v_canonical_id uuid := 'aa015872-2e4e-461c-a5e8-bffbf469757c';
  v_retired_name text := 'Beaudry and Daane';
  v_retired_id uuid;
  v_retired_family text;
  v_retired_alloy text;
begin
  select er.id, er.material_family, er.alloy
    into v_retired_id, v_retired_family, v_retired_alloy
    from public.etchants er, public.etchants ec
   where ec.id = v_canonical_id
     and er.id <> v_canonical_id
     and composition_key(er.composition) = composition_key(ec.composition)
     and er.method = ec.method
     and er.scale = ec.scale
     and er.common_name = v_retired_name
     and er.deleted_at is not null
   limit 1;
  if v_retired_id is null then
    raise notice 'Skip: no retired canonical found for % under %', v_retired_name, v_canonical_id;
  else
    update public.etchants set deleted_at = null where id = v_retired_id;
    update public.etchant_applications
       set etchant_id = v_retired_id
     where etchant_id = v_canonical_id
       and material_family = v_retired_family
       and alloy is not distinct from v_retired_alloy;
    raise notice 'Pair 5 split: % -> % (family=%, alloy=%)',
                 v_canonical_id, v_retired_id, v_retired_family, v_retired_alloy;
  end if;
end $$;

-- =============================================================================
-- Pair 6: Buchheit (canonical) <- Walker (retired)
-- =============================================================================
-- Walker = documented for Rene 95 (PM Ni superalloy chemical etch).
-- Buchheit composition not publicly verifiable but is a different
-- author citation. Conservative default: split.

do $$
declare
  v_canonical_id uuid := 'b447823d-a233-4bd2-874c-ad351617d30e';
  v_retired_name text := 'Walker';
  v_retired_id uuid;
  v_retired_family text;
  v_retired_alloy text;
begin
  select er.id, er.material_family, er.alloy
    into v_retired_id, v_retired_family, v_retired_alloy
    from public.etchants er, public.etchants ec
   where ec.id = v_canonical_id
     and er.id <> v_canonical_id
     and composition_key(er.composition) = composition_key(ec.composition)
     and er.method = ec.method
     and er.scale = ec.scale
     and er.common_name = v_retired_name
     and er.deleted_at is not null
   limit 1;
  if v_retired_id is null then
    raise notice 'Skip: no retired canonical found for % under %', v_retired_name, v_canonical_id;
  else
    update public.etchants set deleted_at = null where id = v_retired_id;
    update public.etchant_applications
       set etchant_id = v_retired_id
     where etchant_id = v_canonical_id
       and material_family = v_retired_family
       and alloy is not distinct from v_retired_alloy;
    raise notice 'Pair 6 split: % -> % (family=%, alloy=%)',
                 v_canonical_id, v_retired_id, v_retired_family, v_retired_alloy;
  end if;
end $$;

-- =============================================================================
-- Pair 7: Houle and Coble (canonical) <- Kegley and Leslie (retired)
-- =============================================================================
-- Coble = MIT ceramics work; Leslie = likely steel work. Different
-- domains, different citations.

do $$
declare
  v_canonical_id uuid := '018ede4e-b7d0-477a-8b3b-b6e581a2418b';
  v_retired_name text := 'Kegley and Leslie';
  v_retired_id uuid;
  v_retired_family text;
  v_retired_alloy text;
begin
  select er.id, er.material_family, er.alloy
    into v_retired_id, v_retired_family, v_retired_alloy
    from public.etchants er, public.etchants ec
   where ec.id = v_canonical_id
     and er.id <> v_canonical_id
     and composition_key(er.composition) = composition_key(ec.composition)
     and er.method = ec.method
     and er.scale = ec.scale
     and er.common_name = v_retired_name
     and er.deleted_at is not null
   limit 1;
  if v_retired_id is null then
    raise notice 'Skip: no retired canonical found for % under %', v_retired_name, v_canonical_id;
  else
    update public.etchants set deleted_at = null where id = v_retired_id;
    update public.etchant_applications
       set etchant_id = v_retired_id
     where etchant_id = v_canonical_id
       and material_family = v_retired_family
       and alloy is not distinct from v_retired_alloy;
    raise notice 'Pair 7 split: % -> % (family=%, alloy=%)',
                 v_canonical_id, v_retired_id, v_retired_family, v_retired_alloy;
  end if;
end $$;

-- =============================================================================
-- Pair 8: Kroll's reagent (canonical) <- Sara (retired)
-- =============================================================================
-- Kroll's = Ti (1937); Sara = refractory metals (W, 1960s). Different
-- historical citations.

do $$
declare
  v_canonical_id uuid := '948c516b-252a-4471-a42b-efeff799a4a1';
  v_retired_name text := 'Sara';
  v_retired_id uuid;
  v_retired_family text;
  v_retired_alloy text;
begin
  select er.id, er.material_family, er.alloy
    into v_retired_id, v_retired_family, v_retired_alloy
    from public.etchants er, public.etchants ec
   where ec.id = v_canonical_id
     and er.id <> v_canonical_id
     and composition_key(er.composition) = composition_key(ec.composition)
     and er.method = ec.method
     and er.scale = ec.scale
     and er.common_name = v_retired_name
     and er.deleted_at is not null
   limit 1;
  if v_retired_id is null then
    raise notice 'Skip: no retired canonical found for % under %', v_retired_name, v_canonical_id;
  else
    update public.etchants set deleted_at = null where id = v_retired_id;
    update public.etchant_applications
       set etchant_id = v_retired_id
     where etchant_id = v_canonical_id
       and material_family = v_retired_family
       and alloy is not distinct from v_retired_alloy;
    raise notice 'Pair 8 split: % -> % (family=%, alloy=%)',
                 v_canonical_id, v_retired_id, v_retired_family, v_retired_alloy;
  end if;
end $$;

-- =============================================================================
-- Pair 9: May and Henderson (canonical) <- Petrak (retired)
-- =============================================================================

do $$
declare
  v_canonical_id uuid := '1d418c20-a82b-4ecc-a983-7809f7860405';
  v_retired_name text := 'Petrak';
  v_retired_id uuid;
  v_retired_family text;
  v_retired_alloy text;
begin
  select er.id, er.material_family, er.alloy
    into v_retired_id, v_retired_family, v_retired_alloy
    from public.etchants er, public.etchants ec
   where ec.id = v_canonical_id
     and er.id <> v_canonical_id
     and composition_key(er.composition) = composition_key(ec.composition)
     and er.method = ec.method
     and er.scale = ec.scale
     and er.common_name = v_retired_name
     and er.deleted_at is not null
   limit 1;
  if v_retired_id is null then
    raise notice 'Skip: no retired canonical found for % under %', v_retired_name, v_canonical_id;
  else
    update public.etchants set deleted_at = null where id = v_retired_id;
    update public.etchant_applications
       set etchant_id = v_retired_id
     where etchant_id = v_canonical_id
       and material_family = v_retired_family
       and alloy is not distinct from v_retired_alloy;
    raise notice 'Pair 9a split: % -> % (family=%, alloy=%)',
                 v_canonical_id, v_retired_id, v_retired_family, v_retired_alloy;
  end if;
end $$;

-- =============================================================================
-- Pair 9: May and Henderson (canonical) <- Slepian (retired)
-- =============================================================================
-- Slepian (& Prohaska) = 1976 Cu-alloy tint etch (Metallography 9:51-61).
-- Independent citation from May and Henderson.

do $$
declare
  v_canonical_id uuid := '1d418c20-a82b-4ecc-a983-7809f7860405';
  v_retired_name text := 'Slepian';
  v_retired_id uuid;
  v_retired_family text;
  v_retired_alloy text;
begin
  select er.id, er.material_family, er.alloy
    into v_retired_id, v_retired_family, v_retired_alloy
    from public.etchants er, public.etchants ec
   where ec.id = v_canonical_id
     and er.id <> v_canonical_id
     and composition_key(er.composition) = composition_key(ec.composition)
     and er.method = ec.method
     and er.scale = ec.scale
     and er.common_name = v_retired_name
     and er.deleted_at is not null
   limit 1;
  if v_retired_id is null then
    raise notice 'Skip: no retired canonical found for % under %', v_retired_name, v_canonical_id;
  else
    update public.etchants set deleted_at = null where id = v_retired_id;
    update public.etchant_applications
       set etchant_id = v_retired_id
     where etchant_id = v_canonical_id
       and material_family = v_retired_family
       and alloy is not distinct from v_retired_alloy;
    raise notice 'Pair 9b split: % -> % (family=%, alloy=%)',
                 v_canonical_id, v_retired_id, v_retired_family, v_retired_alloy;
  end if;
end $$;

-- =============================================================================
-- Pair 10: Accary (canonical) <- Oak Ridge (retired)
-- =============================================================================
-- Accary = CEA France (uranium / U-C alloys); Oak Ridge = ORNL
-- actinide work. Both legitimate independent attributions.

do $$
declare
  v_canonical_id uuid := '16380a72-210e-46ea-bd48-4074212aa659';
  v_retired_name text := 'Oak Ridge';
  v_retired_id uuid;
  v_retired_family text;
  v_retired_alloy text;
begin
  select er.id, er.material_family, er.alloy
    into v_retired_id, v_retired_family, v_retired_alloy
    from public.etchants er, public.etchants ec
   where ec.id = v_canonical_id
     and er.id <> v_canonical_id
     and composition_key(er.composition) = composition_key(ec.composition)
     and er.method = ec.method
     and er.scale = ec.scale
     and er.common_name = v_retired_name
     and er.deleted_at is not null
   limit 1;
  if v_retired_id is null then
    raise notice 'Skip: no retired canonical found for % under %', v_retired_name, v_canonical_id;
  else
    update public.etchants set deleted_at = null where id = v_retired_id;
    update public.etchant_applications
       set etchant_id = v_retired_id
     where etchant_id = v_canonical_id
       and material_family = v_retired_family
       and alloy is not distinct from v_retired_alloy;
    raise notice 'Pair 10 split: % -> % (family=%, alloy=%)',
                 v_canonical_id, v_retired_id, v_retired_family, v_retired_alloy;
  end if;
end $$;

-- =============================================================================
-- Pair 11: Kopp and Linke (canonical) <- Veld and Bogers (retired)
-- =============================================================================
-- German Cu-alloy literature vs Dutch (TU Delft) steel-martensite work.
-- Different countries, different decades, different alloy families.

do $$
declare
  v_canonical_id uuid := '1dd2bffc-22c2-4d64-af74-f81bed15423d';
  v_retired_name text := 'Veld and Bogers';
  v_retired_id uuid;
  v_retired_family text;
  v_retired_alloy text;
begin
  select er.id, er.material_family, er.alloy
    into v_retired_id, v_retired_family, v_retired_alloy
    from public.etchants er, public.etchants ec
   where ec.id = v_canonical_id
     and er.id <> v_canonical_id
     and composition_key(er.composition) = composition_key(ec.composition)
     and er.method = ec.method
     and er.scale = ec.scale
     and er.common_name = v_retired_name
     and er.deleted_at is not null
   limit 1;
  if v_retired_id is null then
    raise notice 'Skip: no retired canonical found for % under %', v_retired_name, v_canonical_id;
  else
    update public.etchants set deleted_at = null where id = v_retired_id;
    update public.etchant_applications
       set etchant_id = v_retired_id
     where etchant_id = v_canonical_id
       and material_family = v_retired_family
       and alloy is not distinct from v_retired_alloy;
    raise notice 'Pair 11 split: % -> % (family=%, alloy=%)',
                 v_canonical_id, v_retired_id, v_retired_family, v_retired_alloy;
  end if;
end $$;

-- =============================================================================
-- Sanity checks (run manually after applying):
--
--   -- All 11 retired canonicals are now active again:
--   select common_name, material_family, alloy, method, scale,
--          (select count(*) from public.etchant_applications ea
--            where ea.etchant_id = e.id) as app_count
--     from public.etchants e
--    where e.common_name in (
--            'Kroll''s reagent', 'Marble''s reagent', 'Chiotti and Mason',
--            'Beaudry and Daane', 'Walker', 'Kegley and Leslie',
--            'Sara', 'Petrak', 'Slepian', 'Oak Ridge', 'Veld and Bogers'
--          )
--      and e.deleted_at is null
--    order by common_name;
--   -- Expect each name to appear at least once with non-zero applications.
--
--   -- Spot-check Cain canonical no longer claims Titanium applications:
--   select e.common_name, e.material_families, e.alloys
--     from public.etchants e
--    where e.id = '3bd1ea85-fd36-4802-9fc6-ce19bca742d4'
--      and e.deleted_at is null;
--   -- Expect material_families = ["Beryllium"] (or whatever Cain's
--   -- own family was). Titanium should NOT appear.
-- =============================================================================

commit;
