import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import MaterialTooltip from '@/components/MaterialTooltip'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('copper-alloys-preparation')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'sectioning', label: 'Sectioning' },
  { id: 'mounting', label: 'Mounting' },
  { id: 'grinding', label: 'Grinding' },
  { id: 'polishing', label: 'Polishing' },
  { id: 'etching', label: 'Etching' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
]

export default function CopperAlloysGuide() {
  const { articleStructuredData, courseStructuredData, breadcrumbStructuredData } = getGuideStructuredData(guide)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <article className="py-12">
      <GuideSideNav sections={sections} />
      <div className="container-custom lg:pl-0 xl:pl-0">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Copper Alloys Preparation
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Material-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Copper and Copper Alloys Sample Preparation</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to preparing copper and copper alloy samples (brass, bronze) for metallographic analysis, 
              covering sectioning, mounting, grinding, polishing, and etching techniques.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet (below lg/1024px) */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
              <li><a href="#sectioning" className="text-primary-600 hover:underline">Sectioning</a></li>
              <li><a href="#mounting" className="text-primary-600 hover:underline">Mounting</a></li>
              <li><a href="#grinding" className="text-primary-600 hover:underline">Grinding</a></li>
              <li><a href="#polishing" className="text-primary-600 hover:underline">Polishing</a></li>
              <li><a href="#etching" className="text-primary-600 hover:underline">Etching</a></li>
              <li><a href="#troubleshooting" className="text-primary-600 hover:underline">Troubleshooting</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                Copper and its alloys (brass, bronze) are commonly analyzed materials in metallography. 
                Common examples include <MaterialTooltip materialName="C11000 Electrolytic Tough Pitch Copper">electrolytic tough pitch copper</MaterialTooltip>, 
                <MaterialTooltip materialName="C26000 Cartridge Brass">cartridge brass</MaterialTooltip>, and various bronze alloys. 
                Proper preparation is essential to reveal the true microstructure without introducing 
                artifacts such as deformation, scratches, smearing, or contamination. This guide will walk you 
                through the complete preparation process.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/Tough pitch copper, ASTM-30 200X.JPG"
                  alt="Tough pitch copper microstructure at 200X magnification, properly prepared and etched with ASTM No. 30"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center"><MaterialTooltip materialName="C11000 Electrolytic Tough Pitch Copper">Tough pitch copper</MaterialTooltip>, ASTM No. 30 etchant, 200X magnification. This image demonstrates the proper microstructure revealed through correct preparation techniques.</p>
              </div>
              <p>
                Copper alloys can be challenging due to their softness and tendency to deform and smear easily.
                The key is to use appropriate abrasives, maintain light pressure throughout the process, and avoid
                over-polishing which can introduce relief and smearing. Different copper alloys may require slight variations in technique.
                For example, softer alloys like <MaterialTooltip materialName="C11000 Electrolytic Tough Pitch Copper">electrolytic tough pitch copper</MaterialTooltip>
                require extra care to prevent smearing, while harder alloys like <MaterialTooltip materialName="C17200 Beryllium Copper">beryllium copper</MaterialTooltip>
                can tolerate slightly higher pressures during preparation.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
                <p className="text-sm text-red-900">
                  <strong>Beryllium safety — required reading before preparing any BeCu (C17200, C17500, C17510) sample.</strong>
                  Beryllium dust is a chronic respiratory hazard — inhalation causes Chronic Beryllium Disease (CBD),
                  an irreversible lung condition that can develop years after exposure. Visible damage during the prep
                  session is not the warning signal. <strong>Mandatory practice for BeCu:</strong>
                </p>
                <ul className="text-sm text-red-900 mt-2 list-disc list-inside space-y-1">
                  <li><strong>Wet cutting and grinding only</strong> — never dry-grind BeCu. Flood coolant during sectioning, water lubricant on every grit step.</li>
                  <li><strong>Respiratory protection</strong> appropriate for soluble Be dust if there is any chance of dry abrasive contact (N95 minimum, P100 for routine BeCu work).</li>
                  <li><strong>Sealed disposal</strong> of all grinding waste — used papers, polishing pad surfaces, swarf, rinse water. Treat as hazardous waste per institutional procedure.</li>
                  <li><strong>Decontaminate work surfaces</strong> after each sample (wet wipe, not dry brush).</li>
                </ul>
                <p className="text-sm text-red-900 mt-2">
                  After these controls are in place, BeCu preps as a standard hard copper alloy (NH₄OH + H₂O₂ etch,
                  Klemm I for color). The hazard is the dust generation, not the chemistry.
                </p>
              </div>
            </section>

            <section id="sectioning" className="scroll-mt-24">
              <h2>Sectioning</h2>
              <p>
                When sectioning copper and copper alloy samples, use a slow cutting speed to minimize heat generation 
                and deformation. A cutting speed of 100-200 RPM is typically appropriate for most copper alloys. 
                Copper's softness requires careful handling to prevent deformation and smearing. This is especially important 
                for pure copper grades like <MaterialTooltip materialName="C11000 Electrolytic Tough Pitch Copper">C11000</MaterialTooltip> 
                and softer brass alloys like <MaterialTooltip materialName="C26000 Cartridge Brass">C26000 cartridge brass</MaterialTooltip>.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link
                  href="https://shop.metallographic.com/collections/abrasive-blades"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/maxcut-c.webp"
                    alt="Soft-bond abrasive cut-off blade for copper and copper alloys sectioning"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Soft-bond abrasive cut-off blades formulated for soft non-ferrous metals (aluminum, copper, brass). Thin blades (0.5-1.0 mm) minimize heat generation and deformation.</p>
              </div>
              <ul>
                <li>Use a <strong>soft-bond abrasive blade formulated for soft non-ferrous metals</strong> (Al, Cu, brass). Do <em>not</em> substitute a hard non-ferrous (titanium-class) blade or any steel-class blade — the bond chemistry is wrong and the blade will glaze or load.</li>
                <li>Use a thin abrasive cut-off wheel (0.5-1.0 mm thickness)</li>
                <li>Apply steady, light pressure to avoid deformation</li>
                <li>Use adequate coolant to prevent overheating and smearing</li>
                <li>Allow the wheel to do the cutting - avoid forcing</li>
                <li>Consider using a slower feed rate than for harder materials</li>
              </ul>
              <ProductLink
                productName="Soft Non-Ferrous Abrasive Blades"
                href="https://shop.metallographic.com/collections/abrasive-blades"
                description="Soft-bond abrasive blades formulated for soft non-ferrous metals — aluminum, copper, and brass"
              />
            </section>

            <section id="mounting" className="scroll-mt-24">
              <h2>Mounting</h2>
              <p>
                Mounting provides edge retention and easier handling. For copper and copper alloys, compression 
                mounting with phenolic or epoxy resins works well. Cold mounting with epoxy is also suitable and 
                avoids potential heat-related issues that could affect the microstructure.
              </p>
              <h3>Compression Mounting</h3>
              <ol>
                <li>Clean the sample thoroughly to remove cutting fluid and debris</li>
                <li>Place sample in mounting press with appropriate resin</li>
                <li>Apply pressure: 3000-4000 psi for phenolic, 2000-3000 psi for epoxy</li>
                <li>Heat to 150-180°C and hold for 5-8 minutes</li>
                <li>Cool under pressure to room temperature</li>
              </ol>
              <h3>Cold Mounting</h3>
              <ol>
                <li>Clean and dry the sample</li>
                <li>Place in mounting cup with epoxy resin</li>
                <li>Allow to cure at room temperature (typically 4-8 hours)</li>
                <li>Cold mounting avoids heat that could affect copper microstructure</li>
              </ol>
            </section>

            <section id="grinding" className="scroll-mt-24">
              <h2>Grinding</h2>
              <p>
                Grinding removes sectioning damage and prepares the surface for polishing. Start with
                coarse grits and progressively move to finer grits. For copper and copper alloys, use lighter pressure
                than for harder materials to avoid deformation. We recommend starting with 240-320 grit and progressing
                through finer grits. This approach works well for common alloys like <MaterialTooltip materialName="C26000 Cartridge Brass">C26000 cartridge brass</MaterialTooltip>
                and <MaterialTooltip materialName="C36000 Free-Cutting Brass">C36000 free-cutting brass</MaterialTooltip>:
              </p>
              <p>
                <strong>Abrasive choice — alumina vs. SiC:</strong> Copper is soft enough that SiC particles can
                liberate from the paper and embed in the matrix, where they resist removal in subsequent steps.
                The standard recommendation for soft non-ferrous (Al, Cu, brass) is an <strong>alumina (Al₂O₃) abrasive paper</strong> —
                bonded more strongly into the backing than SiC, with less liberation and less embedment. SiC is acceptable
                as a fallback (especially on harder bronzes that don't smear as easily as pure Cu), but inspect for
                embedded dark specks after fine grinding. The sequence below uses SiC as the most widely stocked
                option:
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/sic-grinding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/abrasive grinding-SiC papers.webp"
                    alt="Silicon carbide grinding papers in various grit sizes for progressive grinding"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Silicon carbide (SiC) grinding papers in various grit sizes (240, 320, 400, 600) for progressive grinding. Rotate sample 90° between each grit to ensure complete scratch removal.</p>
              </div>
              <h3>Grinding Sequence</h3>
              <ol>
                <li><strong>240 grit:</strong> Remove sectioning damage (20-40 seconds per step)</li>
                <li><strong>320 grit:</strong> Remove previous scratches (20-40 seconds)</li>
                <li><strong>400 grit:</strong> Further refinement (20-40 seconds)</li>
                <li><strong>600 grit:</strong> Final grinding step (20-40 seconds)</li>
              </ol>
              <p>
                <strong>Important:</strong> Rotate the sample 90° between each grit to ensure complete 
                removal of previous scratches. Use water as a lubricant and maintain <strong>light</strong> pressure 
                to avoid deformation. Copper alloys require less time per step than harder materials. For very soft 
                copper alloys, you may start with 240 grit instead of 120 grit to minimize deformation.
              </p>
              <ProductLink 
                productName="Silicon Carbide Grinding Papers"
                href="https://shop.metallographic.com/collections/sic-grinding"
                description="Premium SiC papers in all grit sizes for consistent grinding"
              />
            </section>

            <section id="polishing" className="scroll-mt-24">
              <h2>Polishing</h2>
              <p>
                Polishing removes grinding scratches and prepares a mirror-like surface. For copper and copper alloys, 
                diamond polishing followed by oxide polishing typically yields excellent results. Use softer cloths and 
                lighter pressure to avoid smearing and relief. The recommended sequence is 6 μm → 3 μm → 1 μm diamond, 
                followed by final polishing with 0.05 μm colloidal silica.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 max-w-2xl mx-auto">
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/diamond-abrasives"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/polycrystalline-diamond-high-viscosity.webp"
                      alt="Polycrystalline diamond polishing compound for copper alloys"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Polycrystalline diamond compound provides consistent cutting action for copper alloys.</p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/polishing-pads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/polishing-pads.webp"
                      alt="Polishing pads for different polishing stages"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Soft to medium polishing pads are recommended for copper alloys to prevent smearing and excessive relief.</p>
                </div>
              </div>
              <h3>Diamond Polishing</h3>
              <ol>
                <li><strong>6 μm diamond:</strong> 2-3 minutes on a medium-soft cloth (e.g., Microcloth)</li>
                <li><strong>3 μm diamond:</strong> 2-3 minutes on a soft cloth</li>
                <li><strong>1 μm diamond:</strong> 1-2 minutes on a soft cloth</li>
              </ol>
              <h3>Final Polishing — Chemo-Mechanical with H₂O₂</h3>
              <p>
                <strong>Plain colloidal silica is not enough on copper.</strong> Pure Cu maintains a stubborn
                deformation/smear layer from polishing that ordinary mechanical action won't lift — the surface
                looks mirror-bright but won't take NH₄OH+H₂O₂ etchant cleanly because mechanical homogenization
                has wiped out the orientation differences between grains. The canonical Cu final step is a
                <em> chemo-mechanical attack-polish</em>: colloidal silica modified with hydrogen peroxide.
              </p>
              <ol>
                <li><strong>0.04-0.05 μm colloidal silica + 5-10% H₂O₂ (3% strength)</strong>: 3 minutes on a chemotextile pad at light pressure (~10 N), followed by a 30 s water flush on the same pad to clear silica residue. Mix the silica + H₂O₂ fresh; the peroxide loses activity within hours.</li>
                <li>Rinse with water, then ethanol, and air-dry. The surface should now etch within seconds rather than blotchy or not at all.</li>
              </ol>
              <p>
                <strong>Important:</strong> Use lighter pressure than for steel. Over-polishing can
                introduce relief around second phases and inclusions. Monitor the surface frequently —
                if smearing returns, the H₂O₂ has decayed; mix fresh rather than polishing longer.
              </p>
            </section>

            <section id="etching" className="scroll-mt-24">
              <h2>Etching</h2>
              <p>
                Etching reveals the microstructure by selectively attacking grain boundaries and phases.
                The canonical first-pass etch for Cu, brass, and bronze is <strong>NH₄OH + H₂O₂</strong>
                (also known as ASTM No. 30 in pre-mixed bottle form). For phase color contrast in brass,
                bronze, and aluminum bronze, layer Klemm I or Klemm II tint etches on top — these produce
                vivid blues/reds that distinguish α-eutectoid phases that grayscale Nital-style etches cannot.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/Tough pitch copper, ASTM-30 200X.JPG"
                  alt="Tough pitch copper microstructure after proper etching with ASTM No. 30, showing grain boundaries and structure at 200X"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center"><MaterialTooltip materialName="C11000 Electrolytic Tough Pitch Copper">Tough pitch copper</MaterialTooltip> etched with ASTM No. 30, 200X magnification. Proper etching reveals grain boundaries and phase structure without over-etching artifacts.</p>
              </div>
              <h3>Common Etchants for Copper and Copper Alloys</h3>
              <ul>
                <li><strong>NH₄OH + H₂O₂ (also called ASTM No. 30 — the canonical Cu/brass etch):</strong> Equal volumes of 28% NH₄OH and 3% H₂O₂. Apply by swab for 10-60 s. <strong>Mix immediately before use</strong> — activity decays within minutes; if the etch starts working sluggishly, mix a fresh batch. The default first-pass etch for <MaterialTooltip materialName="C11000 Electrolytic Tough Pitch Copper">C11000 ETP</MaterialTooltip>, OFHC, <MaterialTooltip materialName="C26000 Cartridge Brass">C26000 cartridge brass</MaterialTooltip>, <MaterialTooltip materialName="C36000 Free-Cutting Brass">C36000 free-cutting brass</MaterialTooltip>, and most phosphor and aluminum bronzes. Reveals grain boundaries and twin boundaries.</li>
                <li><strong>Klemm I (color tint — Cu and brass):</strong> 50 mL stock (saturated Na₂S₂O₃) + 1 g K₂S₂O₅. Immerse 30-180 s. Stock for Klemm I = 250 g Na₂S₂O₃ in 100 mL H₂O. Produces vivid blue/red color contrast that distinguishes grain orientations in pure Cu and brass — very useful for automated grain-size counts and orientation studies. <strong>Surface must be deformation-free</strong> for Klemm to develop properly (this is where the H₂O₂ chemo-mechanical final polish above pays off).</li>
                <li><strong>Klemm II (color tint — brass, bronze, aluminum bronze):</strong> Same stock as Klemm I with a different metabisulfite addition. The canonical answer for <strong>Cu-Al aluminum bronze</strong> (C61000, C63000) — gives vivid α-eutectoid phase contrast that no grayscale etch can match. Also strong on brass for general phase imaging.</li>
                <li><strong>Copper No. 1 (more aggressive HNO₃ variant):</strong> 50% HNO₃ in H₂O (typically 125 mL HNO₃ + 125 mL H₂O). Faster and more aggressive than NH₄OH+H₂O₂ — useful when the standard etch under-attacks a heavily-deformed surface, but tends to over-etch and produce pitting. Not the default first-pass choice.</li>
                <li><strong>Potassium Dichromate (K₂Cr₂O₇ + H₂SO₄):</strong> 2 g K₂Cr₂O₇, 8 mL H₂SO₄, 4 mL saturated NaCl, 100 mL H₂O. For specialty grain-boundary work in brass and bronze. Cr(VI) — disposal regulated as hazardous waste.</li>
                <li><strong>Ammonium Persulfate (50 g (NH₄)₂S₂O₈ in 245 mL H₂O):</strong> For brasses with Sn or Mn additions. Gentler than HNO₃; stable on the bench longer than NH₄OH+H₂O₂.</li>
              </ul>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/etchants"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/etching.webp"
                    alt="Etching solutions and reagents for copper and copper alloys"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Etching solutions and reagents for copper and copper alloys. The canonical first-pass etch is NH₄OH + 3% H₂O₂ in equal volumes (also called ASTM No. 30); follow with Klemm I for color contrast in pure Cu and brass, or Klemm II for vivid α-eutectoid contrast in aluminum bronze. Mix NH₄OH + H₂O₂ fresh — activity decays in minutes.</p>
              </div>
              <h3>Etching Procedure</h3>
              <ol>
                <li>Ensure sample is clean and dry</li>
                <li>Apply etchant with cotton swab or immerse sample</li>
                <li>Etch for 5-45 seconds (time varies by etchant and alloy - Copper No. 1 typically 5-45 sec at 20°C)</li>
                <li>Immediately rinse with water, then alcohol</li>
                <li>Dry with compressed air</li>
              </ol>
              <p>
                <strong>Tip:</strong> Start with shorter etching times (5-10 seconds) and increase if needed.
                NH₄OH + H₂O₂ (ASTM No. 30) must be mixed fresh — activity decays within minutes, and a sluggish
                etch is a fresh-batch problem, not a longer-time problem. For phase color work on brass and
                aluminum bronze, follow the NH₄OH+H₂O₂ general etch with Klemm II by immersion 30-180 s — the
                Klemm tint develops on top of the structural etch. Klemm requires a deformation-free surface;
                if the colors come out muddy or uneven, the H₂O₂ chemo-mechanical final polish was incomplete.
              </p>
              <ProductLink
                productName="Etchants"
                href="https://shop.metallographic.com/collections/etchants"
                description="Pre-mixed and custom etching solutions for copper and copper alloys, including ASTM No. 30 (NH₄OH + H₂O₂) and Klemm tint etches for brass and bronze color contrast"
              />
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <h2>Troubleshooting</h2>
              <h3>Common Issues and Solutions</h3>
              <ul>
                <li><strong>Scratches remaining:</strong> Insufficient grinding/polishing time or skipped grits. Ensure complete scratch removal at each step.</li>
                <li><strong>Smearing (mirror finish that won't take an etch):</strong> The dominant Cu prep failure. Mechanical polishing has homogenized the surface — orientation differences between grains have been smeared flat, so chemical etchants find no boundaries to attack. <strong>The fix is the chemo-mechanical final polish with H₂O₂</strong> (5-10% H₂O₂ in colloidal silica on a chemotextile pad, 3 min + flush) — the peroxide chemically removes the smear layer that plain silica leaves behind. Softer cloths alone do not fix smearing on Cu; they just produce a fresh smear layer at lower pressure. If smearing returns after the H₂O₂ step, the peroxide has decayed; mix a fresh batch.</li>
                <li><strong>Relief around second phases:</strong> Over-polishing or too soft a cloth. Reduce polishing time or use slightly harder cloth.</li>
                <li><strong>Contamination:</strong> Clean between steps, use fresh abrasives, and ensure proper sample cleaning. Copper can easily pick up contamination.</li>
                <li><strong>Deformation:</strong> Too much pressure during grinding or polishing. Use lighter pressure throughout the process.</li>
                <li><strong>Over-etching:</strong> Reduce etching time or dilute etchant. Start with shorter times (5-10 seconds).</li>
                <li><strong>Pitting after etching:</strong> Etchant too strong or etching time too long. Dilute etchant or reduce time. Ensure fresh etchant solution.</li>
                <li><strong>Poor grain boundary contrast:</strong> Try different etchant or increase etching time slightly. Ensure sample is properly polished before etching.</li>
              </ul>
            </section>

            {/* CTA Section */}
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mt-12 rounded">
              <h2 className="text-2xl font-semibold mb-4">Explore More Procedures</h2>
              <p className="mb-4">
                Browse our comprehensive procedure guides for material-specific preparation methods and get personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/guides?category=Material-Specific"
                  className="btn-primary text-center"
                >
                  Browse Procedure Guides
                </Link>
                <Link 
                  href="https://shop.metallographic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  View Example Products
                </Link>
                <Link 
                  href="https://metallographic.com/equipment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  Browse Equipment Examples
                </Link>
              </div>
            </div>

            {/* Related Guides */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/guides/grinding-techniques" className="text-primary-600 hover:underline font-semibold">
                  → Grinding Techniques
                </Link>
                <Link href="/guides/polishing-methods" className="text-primary-600 hover:underline font-semibold">
                  → Polishing Methods
                </Link>
                <Link href="/resources/troubleshooting-guide" className="text-primary-600 hover:underline font-semibold">
                  → Troubleshooting Common Issues
                </Link>
                <Link href="/guides/etching-procedures" className="text-primary-600 hover:underline font-semibold">
                  → Etching Procedures
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </article>
    </>
  )
}

