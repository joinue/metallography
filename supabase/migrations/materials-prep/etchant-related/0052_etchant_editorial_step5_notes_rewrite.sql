-- Materials Prep — etchant editorial pass, step 5 (notes rewrite, batch 1)
-- Apply via Supabase SQL Editor on top of 0051.
--
-- Hand-crafted rewrites of the 30 most cluttered application_notes
-- entries in the catalog. Original facts preserved; reorganized into a
-- consistent format (primary purpose -> specific materials -> variants
-- / procedural tips). OCR errors fixed in passing where unambiguous
-- (siga -> sigma, Wk.-Co -> WC-Co).
--
-- Identity per UPDATE: composition_key(composition) + method + scale
-- + material_family + alloy. After 0049 dedupe each canonical etchant
-- has a unique (composition_key, method, scale) tuple, and within each
-- canonical the (material_family, alloy) tuple identifies exactly one
-- application row.
--
-- Family values in WHERE clauses are post-0028 / post-step-1 normalized
-- (e.g. Steel -> Carbon & alloy steel; Aluminum + Al-bronze moved to
-- Copper).

begin;

-- #1. canonical: Iron / Ferrite grain boundaries, cementite, austenite / Chemical / Micro — common_name "Marshall's reagent"
update public.etchant_applications ea
   set application_notes = $rw$Reveals ferrite grain boundaries (uniform), cementite, and prior austenite grain boundaries in martensitic low-carbon steels. Attacks inclusions. Short etch life. Tips: 3 s nital pre-etch if no reaction; 20 s nital post-etch increases attack; hold sample vertical to reduce pitting.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$Solution A
  5 ml H2SO4
  8 g Oxalic acid
  100 ml Water
Solution B
  H2O2 (30%)$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Iron'
   and ea.alloy = 'Ferrite grain boundaries, cementite, austenite';

-- #2. canonical: Carbon & alloy steel / Martensite / Chemical / Micro — common_name "Bechet and Beaujard's etch"
update public.etchant_applications ea
   set application_notes = $rw$Prior austenite grain size etchant. Best on martensitic and bainite steels. Wetting agent: sodium tridecylbenzenesulfonate. Higher alloy steels: add 0.5 g CuCl2 per 100 ml or ~1 % HCl to produce etching. Room temperature is standard. Lightly back-polish to remove surface smut.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$Sat aq. Picric acid plus small amount of a wetting agent$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Carbon & alloy steel'
   and ea.alloy = 'Martensite';

-- #3. canonical: Tool steel / Prior-austenite / Chemical / Micro
update public.etchant_applications ea
   set application_notes = $rw$Prior-austenite grain boundary etch for hardened steels. Wetting agent: sodium tridecylbenzene sulfonate. Higher alloy grades: add 1 % HCl. Room temperature is standard, ultrasonic-cleaner immersion works well. Lightly back-polish to remove surface smut.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$Saturated aqueous Picric acid plus small amount of wetting agent$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Tool steel'
   and ea.alloy = 'Prior-austenite';

-- #4. canonical: Copper / General / Chemical / Micro
update public.etchant_applications ea
   set application_notes = $rw$Color etch for copper and copper alloys. Monophase: matrix grains, twins, inclusions, and undissolved particles colored differently. Polyphase: alpha violet/blue/green; beta red/yellow/green/blue; iron and iron-rich particles white. CuBe gamma phase bright against blue or violet matrix in beryllium copper.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$240 g sodium thiosulfate
24 g lead acetate
30 g Citric acid 
in 1000 ml distilled Water (use after ammonium persulfate pre-etch).$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Copper'
   and ea.alloy = 'General';

-- #5. canonical: Copper / General / Chemical / Micro
update public.etchant_applications ea
   set application_notes = $rw$Color etch for copper alloys. Monophase: grains and twins colored differently. Alpha-beta brass: alpha colored, beta bright. Iron and iron-rich phases bright. CuBe gamma (beryllium copper) colored differently from alpha. Complex brasses and bronzes: differential coloring distinguishes phases.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$2 ml hydrochloric acid (35 %), 0.5 ml selenic acid and 300 ml ethyl alcohol (80-85 %) (use after ammonium persulfate pre-etch).$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Copper'
   and ea.alloy = 'General';

-- #6. canonical: Carbon & alloy steel / High speed steels / Chemical / Micro — common_name 'Leitner and Kostler'
update public.etchant_applications ea
   set application_notes = $rw$Prior austenite grain size etchant for high-speed steels and as-quenched high-carbon steels. Examine under polarized light; sensitive tint emphasizes grain contrast. Also for samples treated by the oxidation method (Red).$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$10 ml HCl
3 ml HNO3
80-100 ml alcohol$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Carbon & alloy steel'
   and ea.alloy = 'High speed steels';

-- #7. canonical: Carbon & alloy steel / Tempered martensite / Chemical / Micro — common_name "Vilella's reagent"
update public.etchant_applications ea
   set application_notes = $rw$Prior austenite grain size etchant. Best on martensite tempered at 592-932 F (300-500 C). May produce grain contrast (improved with several polish-etch cycles). High alloy steels: occasional grain boundary attack. Variant: add HCl to 4 % picral.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$100 ml Ethanol
1 g picric
5 ml HCl$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Carbon & alloy steel'
   and ea.alloy = 'Tempered martensite';

-- #8. canonical: Carbon & alloy steel / Ferrite and carbides / Chemical / Micro — common_name "Vilella's reagent"
update public.etchant_applications ea
   set application_notes = $rw$Reveals ferrite-carbide structures and grain contrast for estimating prior-austenite grain size. Best on martensite tempered at 572-932 F (300-500 C). Occasionally reveals prior-austenite grain boundaries in high alloy steels. Outlines constituents in stainless steel.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$100 ml Ethanol
5 ml HCl
1 g Picric acid$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Carbon & alloy steel'
   and ea.alloy = 'Ferrite and carbides';

-- #9. canonical: Stainless steel / Austenitic / Thermal / Micro
update public.etchant_applications ea
   set application_notes = $rw$Selective heat tint for stainless steel. Coloring sequence: austenite first, then sigma, then carbide. After 20 min: austenite blue-green, sigma orange, carbide white. Very effective. Requires good polish; light pre-etch sharpens resolution.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$Heat tint in air$comp$)
   and e.method = 'Thermal'
   and e.scale = 'Micro'
   and ea.material_family = 'Stainless steel'
   and ea.alloy = 'Austenitic';

-- #10. canonical: Cemented carbide (WC-Co) / WC-Co / Tint / Micro
update public.etchant_applications ea
   set application_notes = $rw$Heat tint for WC-Co and similar sintered carbides. 5 min at 600 C colors Co brown. Co preferentially colored up to ~399 C; WC begins coloring at ~538 C (5 min). Time affects color.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$Heat in air$comp$)
   and e.method = 'Tint'
   and e.scale = 'Micro'
   and ea.material_family = 'Cemented carbide (WC-Co)'
   and ea.alloy = 'WC-Co';

-- #11. canonical: Nickel-base superalloy / Wrought heat-resistant / Electrolytic / Micro
update public.etchant_applications ea
   set application_notes = $rw$For nickel-base alloys. Use under hood. Mix H3PO4 and HNO3, then add H2SO4. Stains matrix when gamma prime is present. Good for revealing segregation and examining gamma prime with TEM replicas. Attacks Bakelite. Stop etch when specimen edge is brownish.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$12 ml H3PO4
47 ml H2SO4
41 ml HNO3$comp$)
   and e.method = 'Electrolytic'
   and e.scale = 'Micro'
   and ea.material_family = 'Nickel-base superalloy'
   and ea.alloy = 'Wrought heat-resistant';

-- #12. canonical: Copper / Al-bronze / Chemical / Micro
update public.etchant_applications ea
   set application_notes = $rw$For Cu, brasses, bronzes, Al bronzes, Cu-Ni and Cu-Ag alloys, German silver. Reveals grain contrast in alpha brass; Cu welds. Macroetch capable. Variant: increase ammonia persulfate to 20 g to verify (100) rolling texture in Cu.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$100 ml distilled Water
10 g ammonium persulfate
10 ml hydrochloric acid$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Copper'
   and ea.alloy = 'Al-bronze';

-- #13. canonical: Manganese / General / Chemical / Micro
update public.etchant_applications ea
   set application_notes = $rw$For most Cu and Cu alloys, Cu-Ag solder layers, and Mn / P / Be / Al-Si bronzes. Small H2O2 addition etches grain boundaries; more H2O2 for grain contrast.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$25 ml distilled Water
25 ml ammonia Water
5-25 ml hydrogen peroxide (30 %)$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Manganese'
   and ea.alloy = 'General';

-- #14. canonical: Silver / Cu-Ag solder / Chemical / Micro
update public.etchant_applications ea
   set application_notes = $rw$For most Cu and Cu alloys, Cu-Ag solder layers, and Mn / P / Be / Al-Si bronzes. Small H2O2 addition for grain boundary etch; higher H2O2 for grain contrast.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$25 ml distilled Water
25 ml ammonia Water
5-25 ml hydrogen peroxide (30 %)$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Silver'
   and ea.alloy = 'Cu-Ag solder';

-- #15. canonical: Copper / Al-Si bronze / Chemical / Micro
update public.etchant_applications ea
   set application_notes = $rw$For most Cu and Cu alloys, Cu-Ag solder layers, and Mn / P / Be / Al-Si bronzes. Small H2O2 addition etches grain boundaries; more H2O2 for grain contrast.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$25 ml distilled Water
25 ml ammonia Water
5-25 ml hydrogen peroxide (30 %)$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Copper'
   and ea.alloy = 'Al-Si bronze';

-- #16. canonical: Cast iron / Ferrite / Chemical / Micro
update public.etchant_applications ea
   set application_notes = $rw$Color etch for cast iron. Short immersion (20-40 s): only ferrite colored (red or violet). Longer immersion: all phases colored. Phosphides brown-orange, ferrite yellow or light blue, cementite red-violet or blue.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$240 g sodium thiosulfate
30 g Citric acid
20-25 g cadmium chloride
 in 1000 ml distilled Water$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Cast iron'
   and ea.alloy = 'Ferrite';

-- #17. canonical: Copper / Al-brass / Chemical / Micro
update public.etchant_applications ea
   set application_notes = $rw$For Cu, alpha-beta brass, special brass, Al brass, red cast bronze, German silver, and Cu-Sn alloys.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$120 ml distilled Water
10 g copper (II) ammonia chloride
Add ammonia Water; precipitate dissolves$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Copper'
   and ea.alloy = 'Al-brass';

-- #18. canonical: Aluminum / 1xxx / Chemical / Macro — common_name 'Caustic etch'
update public.etchant_applications ea
   set application_notes = $rw$For commercial-purity aluminum (1xxx); high-copper alloys (2xxx and casting); Al-Mn alloys (3xxx); Al-Mg alloys (5xxx); Al-Mg-Si alloys (6xxx and casting); Al-Cu-Mg-Zn alloys (7xxx and casting).$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$10 g NaOH
90 ml Water$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Macro'
   and ea.material_family = 'Aluminum'
   and ea.alloy = '1xxx';

-- #19. canonical: Carbon & alloy steel / Martensite / Chemical / Micro — common_name 'Klimek'
update public.etchant_applications ea
   set application_notes = $rw$Darkens martensite for maximum contrast with retained austenite (light brown to black). Solution (b) without HNO3: shelf life ~1 month. After HNO3 added: shelf life of hours.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$Solution A:
944 ml Water
14.2 g CuSO4
7.4 ml H2SO4
Solution B (pH 5):
1 g sodium sulfide
100 ml Water
1 ml HNO3$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Carbon & alloy steel'
   and ea.alloy = 'Martensite';

-- #20. canonical: Iron / General / Tint / Micro — common_name "Beraha's tint etch"
update public.etchant_applications ea
   set application_notes = $rw$Beraha's cadmium sulfide tint etch for Fe, steel, and ferritic / martensitic stainless steel. Short immersion (20-40 s): only ferrite colored (red or violet). Longer: all constituents colored. Ferrite yellow or light blue, phosphide brown, carbide violet or blue.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$240 g anhydrous sodium thiosulfate
30 g Citric acid
20-25 g cadmium chloride
1000 ml Water$comp$)
   and e.method = 'Tint'
   and e.scale = 'Micro'
   and ea.material_family = 'Iron'
   and ea.alloy = 'General';

-- #21. canonical: Aluminum / CuAl2 / Color / Micro
update public.etchant_applications ea
   set application_notes = $rw$Color etch. CuAl2 phase slightly colored. Al-Cu-Fe-Mn script blue; FeSiAl3 brown-blue; NiAl or FeNiAl9 phase brown. Aluminum matrix remains bright (uncolored).$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$2-3 g sodium molybdate
5 ml hydrochloric acid (35 %)
1-2 g ammonium bifluoride
100 ml distilled Water$comp$)
   and e.method = 'Color'
   and e.scale = 'Micro'
   and ea.material_family = 'Aluminum'
   and ea.alloy = 'CuAl2';

-- #22. canonical: Phosphorus / General / Chemical / Micro
update public.etchant_applications ea
   set application_notes = $rw$For most Cu and Cu alloys, Cu-Ag solder layers, and Mn / P / Be / Al-Si bronzes. Small H2O2 addition etches grain boundaries; more H2O2 for grain contrast.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$25 ml distilled Water
25 ml ammonia Water
5-25 ml hydrogen peroxide (30 %)$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Phosphorus'
   and ea.alloy = 'General';

-- #23. canonical: Tool steel / Ferrites / Chemical / Micro — common_name 'Nital'
update public.etchant_applications ea
   set application_notes = $rw$Reveals ferrite grain boundaries and ferrite-carbide interfaces in annealed samples. Preferred for martensite. Reveals prior-austenite grain boundaries in as-quenched and lightly tempered high alloy steels. 2-3 % nital is most common; 5-10 % for high alloy grades.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$1-10 ml HNO3
90-99 ml methanol or Ethanol$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Tool steel'
   and ea.alloy = 'Ferrites';

-- #24. canonical: Chromium / General / Chemical / Micro
update public.etchant_applications ea
   set application_notes = $rw$For Cr, Mo, Mo-Cr alloys (up to 80 % Cr), Mo-Fe alloys, W and W-base alloys, Mo-Re alloys, and Re and Re-base alloys. Use only fresh.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$Solution A:
  100 ml distilled Water
  10 g potassium hydroxide
Solution B: 
  100 ml distilled Water
  10 g potassium ferricyanide$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Chromium'
   and ea.alloy = 'General';

-- #25. canonical: Stainless steel / Austenitic / Chemical / Micro
update public.etchant_applications ea
   set application_notes = $rw$Dilute aqua regia for austenitic stainless steel. Uniformly etches austenite; outlines carbides, sigma, and ferrite (in relief). Ferrite sometimes attacked. Good pre-etch before heat tinting or Murakami's reagent.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$15 ml HCl
5 ml HNO3
100 ml Water$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Stainless steel'
   and ea.alloy = 'Austenitic';

-- #26. canonical: Magnesium / Mg17Al12 / Chemical / Micro — common_name 'Hess and George'
update public.etchant_applications ea
   set application_notes = $rw$Phospho-picral etch for pure Mg and some alloys. Composition is critical. Estimates the amount of massive Mg17Al12 in heat-treated castings or wrought alloys. Stains solid solution; leaves compound white.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$0.7 ml H3PO4
5 g Picric acid
100 ml alcohol$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Magnesium'
   and ea.alloy = 'Mg17Al12';

-- #27. canonical: Copper / Al-bronze / Chemical / Micro
update public.etchant_applications ea
   set application_notes = $rw$For all types of Cu, Cu-Be alloys, brasses (colors beta brass), special bronzes, Al bronze with eutectoid, and German silver.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$100-120 ml distilled Water or Ethanol (95 %)
20-25 ml hydrochloric acid
5-10 ml iron (III) chloride$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Micro'
   and ea.material_family = 'Copper'
   and ea.alloy = 'Al-bronze';

-- #28. canonical: Titanium / TiAl / Thermal / Micro
update public.etchant_applications ea
   set application_notes = $rw$Color etch. Differentially colors matrix and phases. In titanium aluminide alloys: TiAl matrix typically yellow / brown; Ti3Al phase typically blue or green.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$Air oxidation.$comp$)
   and e.method = 'Thermal'
   and e.scale = 'Micro'
   and ea.material_family = 'Titanium'
   and ea.alloy = 'TiAl';

-- #29. canonical: Carbon & alloy steel / General / Chemical / Macro
update public.etchant_applications ea
   set application_notes = $rw$Macro etch for alloyed and unalloyed steels. Deep etchant for surface control and segregation. Reveals porosity, hardness indentations, fractures, inclusions, dendrites, flow lines, and ferrite.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$50 ml distilled Water
50 ml HCl (conc. variable)$comp$)
   and e.method = 'Chemical'
   and e.scale = 'Macro'
   and ea.material_family = 'Carbon & alloy steel'
   and ea.alloy = 'General';

-- #30. canonical: Carbon & alloy steel / High carbon steels / Electrolytic / Micro — common_name 'Alkaline sodium picrate'
update public.etchant_applications ea
   set application_notes = $rw$Prior austenite grain size etchant. Best for McQuaid-Ehn carburized samples. Darkens grain boundary cementite. Often effective on high carbon steels even when no grain boundary film is apparent.$rw$
  from public.etchants e
 where ea.etchant_id = e.id
   and composition_key(e.composition) = composition_key($comp$2 g Picric acid
25 g NaOH
100 ml Water$comp$)
   and e.method = 'Electrolytic'
   and e.scale = 'Micro'
   and ea.material_family = 'Carbon & alloy steel'
   and ea.alloy = 'High carbon steels';


-- Sanity checks (run manually after applying):
--
--   -- All 30 rewrites landed:
--   select count(*) as rewritten from public.etchant_applications
--    where application_notes like 'Reveals ferrite grain boundaries (uniform)%'
--       or application_notes like 'Prior austenite grain size etchant. Best on%'
--       or application_notes like 'Color etch for copper%'
--       or application_notes like 'Heat tint for WC-Co%'
--       or application_notes like 'For nickel-base alloys. Use under hood.%'
--       or application_notes like 'Phospho-picral%'
--       or application_notes like 'Dilute aqua regia%';
--   -- Expect at least 30 (some rewrites apply to multiple application rows).
--
--   -- Trigger refreshed denormalized applications_text:
--   select e.common_name, left(e.applications_text, 100) as preview
--     from public.etchants e
--    where e.common_name in ('Marshall''s reagent', 'Vilella''s reagent',
--                            'Bechet and Beaujard''s etch', 'Hess and George',
--                            'Klimek', 'Caustic etch')
--      and e.deleted_at is null
--    order by e.common_name;

commit;
