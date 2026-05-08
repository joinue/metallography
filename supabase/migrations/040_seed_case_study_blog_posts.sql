-- Seed five long-form case-study blog posts.
-- Source: distilled from PACE Metallographic Handbook (Zipperian) §17 Defect
-- Troubleshooter, paraphrased and expanded for blog format. Content is original
-- prose, not verbatim from any copyrighted source.

-- 1. Edge rounding case study --------------------------------------------------
INSERT INTO blog_posts (
  title, slug, excerpt, content, category, tags, image, author, read_time,
  status, featured, published_at
) VALUES (
  'Why Your Edges Are Rounded — and the One Mount Change That Usually Fixes It',
  'edge-rounding-mount-fix',
  'Edge rounding eats the first 10–50 µm of the sample, exactly where coatings, case-hardened layers, and decarburization live. The fix is almost always upstream of polishing.',
  $$<p>Edge rounding is the single most expensive prep defect in failure analysis and case-depth work. It eats the first 10–50 µm of the sample — exactly where coatings, case-hardened layers, decarburization, and crack initiation sites live. If you see "the coating disappears as the field of view approaches the mount," or "near-edge grains look blurred in SEM," or "thickness measurements drift between operators," you are looking at edge rounding.</p>

<p>The frustrating part is that operators usually try to fix it at the polishing step, where it shows up. The actual cause is upstream.</p>

<h2>The diagnostic question</h2>

<p>Before changing anything, ask: <em>What is the mount made of, and how long is the final polish step?</em></p>

<p>Two cause families dominate. Mount-material differential is by far the more common.</p>

<h3>Cause 1: Mount is much softer than the sample</h3>

<p>Compression-mounted phenolic ("Bakelite") is significantly softer than steel, stainless, superalloys, and most coatings. During polishing, the polishing pad — particularly napped chemotextile pads at the final step — conforms to the soft mount and lifts away from the harder sample at the edge. The result is a gradual chamfer over 10–50 µm.</p>

<p>The fix is to mount in a material whose hardness matches the sample more closely:</p>

<ul>
  <li><strong>Glass-filled epoxy thermosets</strong> are the gold standard for edge retention. Glass particulate keeps the mount stiff and resistant to differential wear.</li>
  <li><strong>Diallyl phthalate</strong> is harder than phenolic and a good middle-ground choice for general work.</li>
  <li><strong>Castable epoxy with vacuum impregnation</strong> handles porous samples and thermal-spray coatings where compression mounting would crush the structure.</li>
</ul>

<h3>Cause 2: Final polish is too long on too soft a pad</h3>

<p>Even with a perfect mount, an extended final polish — say 5+ minutes on a chemotextile pad with colloidal silica — gives the pad time to conform and round the edge. Tighten the final step to 60–90 seconds plus a 30-second water flush. If you cannot get a clean surface in that time, the upstream steps left damage that the final step is now trying (and failing) to remove.</p>

<h3>Cause 3 (rarer): Rotation direction</h3>

<p>Vendor recipes split on this. Some default to contra-rotation (head and platen turning opposite directions) on the grounds that it removes material more uniformly across the sample face. Others, including PACE, default to co-rotation because it runs gentler at the edge. Both work; the differences are real but second-order. Fix the mount and the final-step pad first — rotation direction is a tunable, not a primary lever.</p>

<h2>The proper fix</h2>

<p>For routine work that needs decent edge retention: glass-filled epoxy compression mount, 5–7 minute hot-mount cycle, cooled under pressure. This combination eliminates the problem at its source so the polishing recipe does not have to compensate.</p>

<p>For coatings, thermal sprays, and electronic die packages where edge retention is paramount: castable epoxy with vacuum impregnation, then a hard pad through the entire ladder including the final step (synthetic suede instead of chemotextile), and a final polish kept under 2 minutes.</p>

<h2>Quick-fix checklist</h2>

<ul>
  <li>Switch from phenolic to glass-filled epoxy or diallyl phthalate.</li>
  <li>Cap final polish at 90 seconds + 30 second water flush.</li>
  <li>Use a harder final-step pad (synthetic suede) before reaching for chemotextile.</li>
  <li>If still rounding after the above, try counter-rotation as a tunable.</li>
</ul>

<p>For a deeper read on when each mount family is appropriate, see the <a href="/guides/metallographic-mounting">Metallographic Mounting</a> guide. For case-depth measurement protocols specifically, see the <a href="/guides/heat-treatment-verification">Heat Treatment Verification</a> guide.</p>$$,
  'Troubleshooting',
  ARRAY['edge retention','mounting','case depth','prep artifacts','troubleshooting'],
  '/images/microstructures/Ferrite-Pearlite steel.JPG',
  'Metallography.org Team',
  '6 min read',
  'published',
  true,
  '2026-01-15T10:00:00Z'
);

-- 2. Mirror finish but won't etch ---------------------------------------------
INSERT INTO blog_posts (
  title, slug, excerpt, content, category, tags, image, author, read_time,
  status, featured, published_at
) VALUES (
  'Mirror Finish, No Etch Reaction — The Smearing Problem in Soft Metals',
  'smearing-soft-metals-no-etch',
  'When the surface is mirror-bright but the etchant refuses to reveal anything, you have a smeared subsurface layer. Mechanical polishing flattened the deformation but left it in place.',
  $$<p>Here is a frustrating scenario every metallographer eventually hits: the polish looks perfect — mirror finish, no scratches, no relief — and you reach for nital, or Keller''s, or NH₄OH/H₂O₂, and nothing happens. Increase the time, get a faint blotchy etch. Increase the concentration, get a heavily etched surface that still does not show grain boundaries. The microstructure will not appear no matter what you try.</p>

<p>This is the classic <strong>smearing</strong> failure mode and it is most common on soft, ductile metals: copper, aluminum, magnesium, lead, tin, and to a lesser extent austenitic stainless and pure nickel.</p>

<h2>What is happening</h2>

<p>Mechanical polishing does not just remove material — it deforms the surface layer in the direction the abrasive is moving. On a hard sample like quenched 1095, that deformed layer is thin and brittle and the next finer step removes it cleanly. On copper, the deformed layer is plastic and flows. The diamond particles smear it across the surface like spreading butter, producing a perfectly flat layer that is no longer single-crystal — it is a mechanically-disturbed zone that has lost the orientation of the underlying grains.</p>

<p>Chemical etchants work by selectively attacking the boundaries between differently-oriented grains, or the boundaries between phases. A smeared surface has no orientation differences left at the surface — they have been mechanically homogenized. So the etchant finds no boundaries to attack, and you get either no reaction or a uniform overall darkening.</p>

<h2>The diagnostic question</h2>

<p>Ask yourself: when the etchant hits the surface, does it bead up, dry quickly, or change color?</p>

<ul>
  <li><strong>No reaction at all → smeared surface.</strong> The most common cause.</li>
  <li><strong>Etchant beads up → wettability problem.</strong> Surface is contaminated with hand oils, residual polishing compound, or skin contact. Rinse with ethanol and re-etch immediately.</li>
  <li><strong>Etchant changes color quickly but no structure appears → etchant is over-spent.</strong> Mix fresh.</li>
</ul>

<h2>The fix: chemo-mechanical final polish</h2>

<p>You cannot remove a smeared layer with more mechanical polishing alone — you just create a new smeared layer. The proper fix is a chemo-mechanical final step where chemistry attacks the deformation zone while mechanical action removes the products.</p>

<p>The standard combinations:</p>

<ul>
  <li><strong>Copper and brass:</strong> Colloidal silica + 5–10% hydrogen peroxide on a chemotextile pad, 3–5 minutes. The H₂O₂ chemically attacks the disturbed Cu surface; the silica abrades the oxide products away. Mix the H₂O₂ into the silica suspension shortly before use — the activity falls off over the course of an hour or so, so do not pre-mix at the start of the day.</li>
  <li><strong>Aluminum:</strong> Colloidal silica alone on chemotextile is usually sufficient. For stubborn cases, vibratory polish for 1–4 hours.</li>
  <li><strong>Titanium:</strong> Colloidal silica + 30% H₂O₂ at a 5:1 ratio. The peroxide is essential — Ti maintains its deformation layer stubbornly without the chemical assist.</li>
  <li><strong>Magnesium:</strong> Cannot tolerate water in the final polish. Use ethanol-based colloidal silica.</li>
  <li><strong>Lead, tin, very soft metals:</strong> Vibratory polishing with colloidal silica for several hours is often the only path to a clean surface.</li>
</ul>

<h2>Verification</h2>

<p>After the chemo-mechanical step, the surface should still look mirror-bright but the etchant will now reveal structure within seconds. If it still does not, examine the surface with differential interference contrast (DIC) or polarized light: a smeared surface looks featureless under DIC, while a properly-prepared surface shows the height contrast of grain orientations.</p>

<h2>The lesson</h2>

<p>Soft, ductile metals do not give you a properly prepared surface from purely mechanical polishing. The recipe must include a chemo-mechanical or vibratory finishing step. If your standard recipe ends with 1 µm diamond, you are leaving the deformation in place. Add the chemo-mechanical step and the etch behavior changes from "I cannot get this to work" to "this is the easy part."</p>

<p>For more on the underlying physics, see the <a href="/guides/polishing-methods">Polishing Methods</a> guide. For copper-specific recipes, see the <a href="/guides/copper-alloys-preparation">Copper Alloys Preparation</a> guide.</p>$$,
  'Troubleshooting',
  ARRAY['smearing','soft metals','copper','aluminum','chemo-mechanical polishing','etching'],
  '/images/microstructures/Tough pitch copper, ASTM-30 200X.JPG',
  'Metallography.org Team',
  '7 min read',
  'published',
  true,
  '2026-01-22T10:00:00Z'
);

-- 3. Comet tails -------------------------------------------------------------
INSERT INTO blog_posts (
  title, slug, excerpt, content, category, tags, image, author, read_time,
  status, featured, published_at
) VALUES (
  'Comet Tails Behind Hard Particles — Diagnosing and Fixing Drag Damage',
  'comet-tails-hard-particle-drag',
  'Comet tails are the visual signature of hard particles dragged across a soft matrix during polishing. The fix is force, rotation, and pad selection — not more polishing time.',
  $$<p>You finish polishing what looks like a clean surface, etch it, and look down the microscope to see streaks of damage trailing behind every hard particle in the field of view. The streaks all point the same direction. They start at carbides, inclusions, fibers, or graphite nodules, and run "downstream" of the polishing direction.</p>

<p>These are <strong>comet tails</strong>, and they are the visual signature of a hard particle that broke loose from the matrix during polishing and got dragged across the surface, leaving scratches in its wake.</p>

<h2>Where you see them</h2>

<p>Any system with hard inclusions or hard second-phase particles in a softer matrix:</p>

<ul>
  <li>Cast iron with graphite (graphite is much softer than ferrite, so it tears loose easily during polishing and then the released particles drag across the matrix)</li>
  <li>Tool steels with primary carbides — D2, M2, high-speed steels</li>
  <li>Inconel and other Ni-base superalloys with MC carbides</li>
  <li>Welds with slag inclusions</li>
  <li>Metal-matrix composites (SiC particles in Al, B₄C in steel, etc.)</li>
  <li>Manganese sulfide stringers in rolled steels</li>
</ul>

<p>If your sample has visible hard particles and your scratches all point one way, you have comet tails.</p>

<h2>The diagnostic question</h2>

<p>What is the matrix material, and what are the hard particles? The answer dictates the fix.</p>

<h2>What causes the drag</h2>

<p>Three things can dislodge a particle:</p>

<ol>
  <li><strong>Polishing force is too high.</strong> The pad pushes the particle deep enough to fracture the matrix-particle interface. 25–30 N on a small mount is fine for plain steel but excessive for an MMC or a tool steel with primary carbides.</li>
  <li><strong>Pad is too soft.</strong> Soft pads conform around the particle, gripping it on multiple sides and increasing the lateral force when the platen rotates.</li>
  <li><strong>Suspension flow is inadequate.</strong> A dragged particle should be flushed off the pad before it has a chance to scratch. Insufficient suspension flow lets it ride the pad through several revolutions.</li>
</ol>

<h2>The fix</h2>

<p>Address all three causes simultaneously — comet tails respond best to a combination, not any one change:</p>

<ul>
  <li><strong>Reduce polishing force:</strong> drop from 25–30 N to 15–20 N. On very soft matrices, go to 10–15 N.</li>
  <li><strong>Switch to a harder pad:</strong> woven or hard synthetic instead of napped. Save the napped chemotextile for the very last step if at all.</li>
  <li><strong>Rotate the sample 90° between polishing intervals:</strong> if you polish 90 seconds, stop, rotate the holder, polish another 90 seconds. Any tail that formed in the first interval gets cut perpendicular to its scratch direction in the second, breaking the pattern.</li>
  <li><strong>Increase suspension flow rate:</strong> a wet pad flushes loose particles. A drying pad concentrates them.</li>
  <li><strong>Use diamond throughout:</strong> on MMC, switch from SiC and Al₂O₃ to diamond grinding films and diamond polishing suspensions. Diamond cuts both the matrix and the reinforcement at similar rates, reducing the relief that exposes particles to drag.</li>
</ul>

<h2>The lesson</h2>

<p>Comet tails are not solved by more polishing time — additional time at high force on a soft pad just generates more comets. They are solved by changing the conditions: lower force, harder pad, sample rotation, and adequate suspension flow. Diagnose the streak direction, change the conditions, and the tails disappear within one polishing cycle.</p>

<p>For materials especially prone to this, see the <a href="/guides/cast-iron-preparation">Cast Iron Preparation</a> guide (graphite drag), the <a href="/guides/tool-steel-preparation">Tool Steel Preparation</a> guide (carbide drag), and the <a href="/guides/composites-preparation">Composites Preparation</a> guide (reinforcement drag in MMCs).</p>$$,
  'Troubleshooting',
  ARRAY['comet tails','drag damage','hard particles','MMC','tool steel','cast iron','polishing'],
  '/images/microstructures/Gray iron, 2% nital, 400X.JPG',
  'Metallography.org Team',
  '6 min read',
  'published',
  false,
  '2026-01-29T10:00:00Z'
);

-- 4. SiC embedment in soft metals ---------------------------------------------
INSERT INTO blog_posts (
  title, slug, excerpt, content, category, tags, image, author, read_time,
  status, featured, published_at
) VALUES (
  'Tiny Dark Specks in Your Aluminum Sample — Embedded SiC, and How to Stop It',
  'sic-embedment-soft-metals',
  'Those random dark dots on your polished Al, Pb, Sn, or Mg sample are loose silicon carbide grit ground into the surface. The fix is changing your grinding abrasive, not your polishing.',
  $$<p>You finish a clean polish on aluminum, look at the surface, and notice a scatter of small dark dots distributed across the field. They do not move when you increase the etch time. They do not align with any feature of the microstructure. They are about 5–20 µm across, and they are everywhere.</p>

<p>These are <strong>embedded SiC particles</strong>, and they are particularly common on aluminum, lead, tin, magnesium, and zinc — any soft, ductile metal. Many operators see them and conclude that something is wrong with the polishing. The actual cause happened steps earlier, during grinding.</p>

<h2>Why it happens</h2>

<p>Silicon carbide papers are not perfectly bonded. Under polishing pressure, individual SiC particles can break loose from the paper and become free abrasive. On a hard matrix like steel, free SiC just gets flushed away by the water. On a soft matrix like aluminum, the free particle gets pressed into the soft surface by the pressure of the next pass and lodges there permanently. No subsequent polishing step can lift it out — diamond polishing pushes it deeper, and chemo-mechanical polishing dissolves the matrix around it but leaves the SiC sticking up like a tooth.</p>

<p>The problem is most severe at the last few SiC grits — P800, P1200 — because the smaller particles embed more easily into a smoother, less-resistant surface.</p>

<h2>The diagnostic question</h2>

<p>Are you using SiC papers or alumina papers in grinding? If SiC and your matrix is soft non-ferrous, the embedded specks are almost certainly liberated SiC.</p>

<h2>How to confirm</h2>

<p>Two quick checks:</p>

<ol>
  <li>Switch to oblique illumination. SiC particles are dark gray to black, much darker than typical inclusions or precipitates in Al.</li>
  <li>SEM/EDS will show silicon and carbon at the dark spots if you have access. Conclusive.</li>
</ol>

<h2>The fix: change the abrasive</h2>

<p>This is one of the rare prep problems where the proper fix is not a polishing change but an abrasive change:</p>

<ul>
  <li><strong>Switch to alumina (Al₂O₃) papers</strong> for the entire grinding ladder on soft non-ferrous samples. Alumina particles are bonded more firmly into the paper backing and tend to fracture rather than pop free as intact grains; the few that do come loose are friable and break up in the polish water rather than embedding whole.</li>
  <li><strong>Use diamond grinding films instead of SiC papers.</strong> The diamond is bonded into a polymer film that releases very few free particles. This is the cleanest option and is standard for high-quality MMC and electronics work.</li>
  <li><strong>If you must use SiC for legacy or cost reasons, use fresh paper</strong> for every sample, lower the grinding force (15–20 N instead of 25–30 N), and skip the finest SiC grits (P800, P1200) in favor of starting on diamond at 9 µm directly after P600.</li>
</ul>

<h2>What if the sample is already embedded?</h2>

<p>If you only notice the embedment after polishing, you have limited options. The two that sometimes work:</p>

<ul>
  <li><strong>Vibratory polish with colloidal silica</strong> for 1–4 hours. The very low force and long contact time can tip out shallowly-embedded particles. Deep embedment (lateral pressure during grinding) is not recoverable this way.</li>
  <li><strong>Re-prep starting from grinding</strong>, switching to alumina or diamond films from the beginning. This is the reliable fix and usually faster than fighting embedded particles through a long vibratory cycle.</li>
</ul>

<h2>The lesson</h2>

<p>Embedment is not a polishing problem; it is a grinding-abrasive problem. The choice of abrasive should match the matrix hardness — SiC is appropriate for steel and harder, but alumina or diamond is the right choice for soft non-ferrous metals. Once you pick the correct grinding abrasive, the embedded-speck problem disappears entirely.</p>

<p>For more on grinding abrasive selection, see the <a href="/guides/grinding-techniques">Grinding Techniques</a> guide. For aluminum-specific recipes, see the <a href="/guides/aluminum-sample-preparation">Aluminum Sample Preparation</a> guide.</p>$$,
  'Troubleshooting',
  ARRAY['SiC embedment','aluminum','soft metals','grinding','prep artifacts'],
  '/images/microstructures/6061-Aluminum.jpg',
  'Metallography.org Team',
  '6 min read',
  'published',
  false,
  '2026-02-05T10:00:00Z'
);

-- 5. Pull-out vs porosity ------------------------------------------------------
INSERT INTO blog_posts (
  title, slug, excerpt, content, category, tags, image, author, read_time,
  status, featured, published_at
) VALUES (
  'Pull-Out vs. Real Porosity — Reading the Pit, Not Just Counting Pits',
  'pullout-versus-real-porosity',
  'Smooth, rounded pits are the original sample. Irregular, fresh-fracture pits are prep damage. Mistaking one for the other can mean a wrongly-rejected casting or a wrongly-accepted bad weld.',
  $$<p>You polish a cast iron sample and see a scatter of pits across the surface. Are they porosity from the casting (a real defect), or are they pull-out from polishing where graphite nodules used to be (an artifact)? The difference matters: reporting prep artifacts as porosity will get a perfectly good casting rejected; the inverse will pass a defective one.</p>

<p>The same question comes up in:</p>

<ul>
  <li>Cast irons and other graphite-containing alloys</li>
  <li>Sintered powder metallurgy parts</li>
  <li>Welds with slag inclusions</li>
  <li>MMCs where reinforcement particles can pull free</li>
  <li>Composites where fibers can pull from the matrix</li>
  <li>Thermal spray coatings with their lamellar splat structure</li>
</ul>

<h2>The diagnostic test</h2>

<p>Look at the pit walls under high magnification, ideally with DIC or oblique illumination.</p>

<ul>
  <li><strong>Smooth, rounded walls → real porosity.</strong> Solidification shrinkage, gas porosity, and intentional sintered porosity all show smooth pit walls because the void existed in the original sample as a free surface (or close to one). The morphology can be spherical (gas), interconnected (sintering), or shrinkage-dendritic, but the walls are not freshly fractured.</li>
  <li><strong>Irregular, fresh-fracture walls → pull-out.</strong> A particle that ripped out of the matrix during polishing leaves a jagged crater with sharp edges and a distinct color or texture difference from the surrounding matrix. The crater shape often shows the original particle outline.</li>
  <li><strong>Pits aligned with where graphite or inclusions should be → pull-out.</strong> If you see no graphite where ASTM A247 says you should, the graphite was there and got pulled out.</li>
</ul>

<h2>Confirming with the unetched view</h2>

<p>When in doubt, examine the sample <em>unetched</em> first. Real porosity is visible as voids on the as-polished surface. Pull-out craters are also visible but often have a different shape and surface texture than real porosity. The unetched view is also the only valid view for graphite morphology rating per ASTM A247 — etching attacks the matrix and changes apparent graphite shape.</p>

<h2>The fix for pull-out</h2>

<p>Once you confirm pull-out is happening:</p>

<ul>
  <li><strong>Lower force throughout grinding.</strong> Cast iron especially — drop to 15–20 N from 25–30 N.</li>
  <li><strong>Vacuum-impregnate the sample.</strong> If the casting has pre-existing porosity, the resin fills the pores and supports surrounding features during polishing. Mandatory for sintered iron.</li>
  <li><strong>Final polish with colloidal silica only.</strong> The 1 µm diamond step is the most aggressive at ripping graphite or inclusions free. Sometimes you can skip 1 µm diamond entirely, going from 3 µm directly to colloidal silica on a chemotextile pad.</li>
  <li><strong>Shorter polish times.</strong> Each second past the minimum risks pull-out. For nodular cast iron the recommendation is 2 minutes maximum at colloidal silica.</li>
  <li><strong>Hard pads only at the small grit sizes.</strong> Soft pads conform around protruding hard particles and grip them.</li>
</ul>

<h2>Don''t over-polish</h2>

<p>This is the most consistent piece of advice across cast iron, sintered metals, and composites: do not extend polishing in hopes of getting a "cleaner" result. Past the minimum polish time, you are net-damaging the sample. The conventional wisdom of "polish until you cannot see scratches" leads to over-polishing on these systems. Polish to the recipe time and stop.</p>

<h2>The lesson</h2>

<p>The pit walls tell the story. A microscope and oblique lighting can distinguish prep artifacts from real defects 95% of the time. When the answer matters — failure analysis, casting acceptance, weld qualification — examine unetched first, document the original morphology, and only then etch the matrix. If you etched first and now see ambiguous pits, mount and prep a fresh specimen.</p>

<p>For cast iron-specific procedures including the unetched-first protocol, see the <a href="/guides/cast-iron-preparation">Cast Iron Preparation</a> guide. For sintered and powder metallurgy work, the same principles apply but vacuum impregnation moves from "recommended" to "required."</p>$$,
  'Troubleshooting',
  ARRAY['pull-out','porosity','cast iron','prep artifacts','failure analysis','sintered'],
  '/images/microstructures/Nodular cast iron, 200X.JPG',
  'Metallography.org Team',
  '7 min read',
  'published',
  false,
  '2026-02-12T10:00:00Z'
);
