import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import MaterialTooltip from '@/components/MaterialTooltip'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('aluminum-sample-preparation')!

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

export default function AluminumGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Aluminum Sample Preparation
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Material-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Aluminum Sample Preparation</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to preparing aluminum samples for metallographic analysis, 
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
            <AnimateOnScroll animation="fadeInUp" delay={0}>
              <section id="introduction" className="scroll-mt-24">
                <h2>Introduction</h2>
                <p>
                  Aluminum and its alloys are among the most commonly analyzed materials in metallography. 
                  Common alloys include <MaterialTooltip materialName="6061 Aluminum">6061</MaterialTooltip> (the most widely used aluminum alloy), 
                  <MaterialTooltip materialName="7075 Aluminum">7075</MaterialTooltip> (high-strength aerospace alloy), and many others. 
                  Proper preparation is essential to reveal the true microstructure without introducing 
                  artifacts such as deformation, scratches, or contamination. This guide will walk you 
                  through the complete preparation process.
                </p>
                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                    <Image
                      src="/images/microstructures/Aluminum-silicon, Kellers, 400X.JPG"
                      alt="Aluminum-silicon alloy microstructure at 400X magnification, properly prepared and etched with Keller's reagent"
                      width={600}
                      height={450}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                    />
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Aluminum-silicon alloy, Keller's reagent, 400X magnification. This image demonstrates the proper microstructure revealed through correct preparation techniques.</p>
                  </div>
                </AnimateOnScroll>
                <p>
                  Aluminum can be challenging due to its softness and tendency to deform easily. The key 
                  is to use appropriate abrasives, maintain light pressure, and avoid over-polishing which 
                  can introduce relief and smearing.
                </p>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="sectioning" className="scroll-mt-24">
                <h2>Sectioning</h2>
                <p>
                  When sectioning aluminum samples, run the abrasive cutoff wheel at typical
                  metallographic surface speeds (roughly 2,500-4,500 SFM) and control heat with a light
                  feed rate and copious coolant rather than by slowing the wheel — an under-speeded wheel
                  glazes and rubs instead of cutting. Softer alloys like <MaterialTooltip materialName="6061 Aluminum">6061</MaterialTooltip> require
                  particularly careful handling to prevent deformation, while harder alloys such as
                  <MaterialTooltip materialName="7075 Aluminum">7075</MaterialTooltip> tolerate slightly more aggressive feed rates.
                  For the lowest possible damage layer, a precision (low-speed) saw with a thin blade and
                  controlled load is also an option.
                </p>
                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                    <Link 
                      href="https://shop.metallographic.com/collections/abrasive-blades"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src="/images/consumables/maxcut-e.webp"
                        alt="Soft-bond abrasive cut-off blade for aluminum sectioning"
                        width={500}
                        height={375}
                        className="w-full h-auto"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                      />
                    </Link>
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Soft-bond abrasive cut-off blades formulated for soft non-ferrous metals (aluminum, copper, brass). Thin blades (0.5-1.0 mm) minimize heat generation and deformation.</p>
                  </div>
                </AnimateOnScroll>
              <ul>
                <li>Use a <strong>soft-bond abrasive blade formulated for soft non-ferrous metals</strong> (aluminum, copper, brass). Do <em>not</em> substitute a hard non-ferrous (titanium-class) blade or any steel-class blade — the bond chemistry is wrong and the blade will glaze or load.</li>
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
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="mounting" className="scroll-mt-24">
                <h2>Mounting</h2>
              <p>
                Mounting provides edge retention and easier handling. For aluminum, compression 
                mounting with phenolic or epoxy resins works well. Cold mounting with epoxy is also 
                suitable and avoids potential heat-related issues.
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
                <li>Allow to cure at room temperature (typically 6-12 hours for slow-cure epoxy)</li>
                <li>Cold mounting avoids heat that could affect aluminum microstructure</li>
              </ol>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="grinding" className="scroll-mt-24">
                <h2>Grinding</h2>
              <p>
                Grinding removes sectioning damage and prepares the surface for polishing. Start with
                the finest grit that will still remove the sectioning damage and flatten the sample,
                then move progressively to finer grits. For aluminum, use lighter pressure
                than for harder materials to avoid deformation.
              </p>
              <p>
                <strong>Abrasive choice — alumina vs. SiC:</strong> Aluminum is soft enough that SiC particles
                can embed in the surface and resist removal in subsequent steps. The softer the aluminum, the
                worse the risk — commercially pure 1xxx grades and soft, non-heat-treatable alloys (3xxx, 5xxx)
                are the most susceptible, while age-hardened alloys
                like <MaterialTooltip materialName="2024 Aluminum">2024</MaterialTooltip>, 6xxx, and 7xxx are
                harder and less prone.
                When available, prefer alumina (Al₂O₃) papers or a fixed alumina grinding disc for the
                planar step. SiC is acceptable for the harder age-hardened alloys and as a fallback, but inspect
                for embedded particles after fine grinding. The sequence below uses SiC as the most widely
                stocked option:
              </p>
                <AnimateOnScroll animation="fadeInUp" delay={100}>
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
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                      />
                    </Link>
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Silicon carbide (SiC) grinding papers in various grit sizes (240, 400, 600) for progressive grinding. Rotate sample 90° between each grit to ensure complete scratch removal.</p>
                  </div>
                </AnimateOnScroll>
              <h3>Grinding Sequence</h3>
              <ol>
                <li><strong>240 grit:</strong> Planar step — remove sectioning damage and establish flatness (30-60 seconds, or until plane). Avoid coarser starting grits on aluminum; they drive deformation deep into the soft surface. Reserve them for heavy sectioning damage on large castings.</li>
                <li><strong>400 grit:</strong> Remove previous scratches (1-2 minutes)</li>
                <li><strong>600 grit:</strong> Final grinding step (1-2 minutes)</li>
              </ol>
              <p>
                <strong>Important:</strong> Rotate the sample 90° between each grit to ensure complete
                removal of previous scratches. Use water as a lubricant and maintain <strong>light</strong> pressure
                to avoid deformation. Softer alloys like <MaterialTooltip materialName="6061 Aluminum">6061</MaterialTooltip> require
                even lighter pressure, while precipitation-hardened alloys
                like <MaterialTooltip materialName="7075 Aluminum">7075</MaterialTooltip> may need slightly longer times per step.
                Run each step just long enough to remove the previous step&apos;s damage — roughly twice the
                time it takes for the previous scratches to disappear.
              </p>
                <ProductLink 
                  productName="Silicon Carbide Grinding Papers"
                  href="https://shop.metallographic.com/collections/sic-grinding"
                  description="Premium SiC papers in all grit sizes for consistent grinding"
                />
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="polishing" className="scroll-mt-24">
                <h2>Polishing</h2>
              <p>
                Polishing removes grinding scratches and prepares a mirror-like surface. For aluminum,
                diamond polishing followed by oxide polishing typically yields excellent results. Use
                lighter pressure than for harder metals, and match cloth hardness to the step — hard
                woven cloths early, soft napped cloths only at the end — to control smearing and relief.
              </p>
                <AnimateOnScroll animation="fadeInUp" delay={100}>
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
                          alt="Polycrystalline diamond polishing compound for aluminum"
                          width={300}
                          height={225}
                          className="w-full h-auto"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                        />
                      </Link>
                      <p className="text-xs text-gray-600 mt-2 italic text-center">Polycrystalline diamond compound provides consistent cutting action for aluminum alloys.</p>
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
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                        />
                      </Link>
                      <p className="text-xs text-gray-600 mt-2 italic text-center">Start diamond polishing on a hard woven cloth and reserve softer napped cloths for the final steps to limit smearing and relief.</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              <h3>Diamond Polishing</h3>
              <ol>
                <li><strong>9 μm diamond:</strong> 3-4 minutes on a hard woven cloth. A soft napped cloth at this stage will smear aluminum and create relief — save soft cloths for later steps.</li>
                <li><strong>3 μm diamond:</strong> 2-3 minutes on a medium napped cloth</li>
                <li><strong>1 μm diamond:</strong> 1-2 minutes on a soft napped cloth (optional — colloidal silica will close the gap)</li>
              </ol>
              <h3>Final Polishing</h3>
              <ol>
                <li><strong>0.04-0.05 μm colloidal silica:</strong> 2-3 minutes on a soft chemotextile, followed by a 30 s water flush on the same pad to clear silica residue</li>
                <li>Rinse with water, then ethanol, and dry with <strong>room-temperature air</strong> (let the ethanol evaporate, or use unheated compressed air). Do not use heated air — recrystallization of the deformed surface layer is a known artifact on freshly polished aluminum.</li>
              </ol>
              <p>
                <strong>Important:</strong> Use lighter pressure than for steel. Over-polishing can 
                introduce relief around second phases and inclusions. Monitor the surface frequently 
                to avoid smearing, which is common with soft materials like aluminum. This is especially 
                critical for softer alloys such as <MaterialTooltip materialName="6061 Aluminum">6061</MaterialTooltip>, 
                while higher-strength alloys like <MaterialTooltip materialName="7075 Aluminum">7075</MaterialTooltip> 
                are slightly more forgiving but still require careful pressure control.
              </p>
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="etching" className="scroll-mt-24">
                <h2>Etching</h2>
              <p>
                Etching reveals the microstructure by selectively attacking grain boundaries and phases. 
                The choice of etchant depends on the aluminum alloy and what features you want to reveal. 
                For common alloys like <MaterialTooltip materialName="6061 Aluminum">6061</MaterialTooltip> and 
                <MaterialTooltip materialName="7075 Aluminum">7075</MaterialTooltip>, Keller's reagent is typically the first choice. 
                Common etchants include Keller's reagent, Weck's reagent, and various electrolytic solutions.
              </p>
                <AnimateOnScroll animation="fadeInUp" delay={100}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                    <Image
                      src="/images/microstructures/Aluminum-silicon, Kellers, 400X.JPG"
                      alt="Aluminum-silicon alloy microstructure after proper etching with Keller's reagent, showing grain boundaries and structure at 400X"
                      width={600}
                      height={450}
                      className="w-full h-auto"
                    />
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Aluminum-silicon alloy etched with Keller's reagent, 400X magnification. Proper etching reveals grain boundaries and phase structure without over-etching artifacts.</p>
                  </div>
                </AnimateOnScroll>
              <h3>Common Etchants for Aluminum</h3>
              <ul>
                <li><strong>Keller's Reagent:</strong> General purpose, reveals grain boundaries and second phases (1% HF, 1.5% HCl, 2.5% HNO₃, 95% H₂O — equivalently 2 mL HF, 3 mL HCl, 5 mL HNO₃ in 190 mL H₂O). <strong>HF safety:</strong> work in a fume hood, wear HF-rated gloves and face shield, and keep calcium gluconate gel on hand.</li>
                <li><strong>Weck's Reagent:</strong> Tint etch for color contrast of phases and grain boundaries (4g KMnO₄, 1g NaOH, 100ml H₂O — immerse 30-60 s)</li>
                <li><strong>Barker's Reagent:</strong> Electrolytic anodizing (not a chemical etch) for grain orientation contrast under polarized light. 5 ml HBF₄ in 200 ml H₂O at 20 V for 60-120 s.</li>
                <li><strong>Graff & Sargent's Reagent:</strong> For age-hardened alloys</li>
              </ul>
                <AnimateOnScroll animation="fadeInUp" delay={150}>
                  <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                    <Link 
                      href="https://shop.metallographic.com/collections/etchants"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src="/images/consumables/etching.webp"
                        alt="Etching solutions and reagents for aluminum"
                        width={500}
                        height={375}
                        className="w-full h-auto"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                      />
                    </Link>
                    <p className="text-sm text-gray-600 mt-2 italic text-center">Etching solutions and reagents for aluminum. Common etchants include Keller's Reagent, Weck's Reagent, and electrolytic solutions. Etching time typically ranges from 5-30 seconds depending on the etchant and alloy.</p>
                  </div>
                </AnimateOnScroll>
              <h3>Etching Procedure</h3>
              <ol>
                <li>Ensure sample is clean and dry</li>
                <li>Apply etchant with cotton swab or immerse sample (HF-containing etchants like Keller's must be used in a fume hood with HF-rated PPE; never let the surface dry between application and rinse — HF residues continue to attack)</li>
                <li>Etch for 5-30 seconds (time varies by etchant and alloy)</li>
                <li>Immediately rinse with water, then ethanol</li>
                <li>Dry with room-temperature air (still air or unheated compressed air). Avoid heated drying to prevent surface recrystallization.</li>
              </ol>
              <p>
                <strong>Tip:</strong> Start with shorter etching times (5-10 seconds) and increase if needed. 
                Over-etching can obscure fine details and create pitting. For electrolytic etching, 
                use appropriate voltage and time settings.
              </p>
                <ProductLink 
                  productName="Etchants"
                  href="https://shop.metallographic.com/collections/etchants"
                  description="Pre-mixed and custom etching solutions for aluminum"
                />
              </section>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp" delay={50}>
              <section id="troubleshooting" className="scroll-mt-24">
                <h2>Troubleshooting</h2>
              <h3>Common Issues and Solutions</h3>
              <ul>
                <li><strong>Scratches remaining:</strong> Insufficient grinding/polishing time or skipped grits. Ensure complete scratch removal at each step.</li>
                <li><strong>Smearing:</strong> Too much mechanical work without enough chemical removal — the classic soft-aluminum defect. Reduce pressure and rely on the chemo-mechanical colloidal silica step to remove the smeared layer; switching to soft napped cloths too early makes it worse.</li>
                <li><strong>Relief around second phases:</strong> Over-polishing or too soft a cloth. Reduce polishing time or use slightly harder cloth.</li>
                <li><strong>Contamination:</strong> Clean between steps, use fresh abrasives, and ensure proper sample cleaning.</li>
                <li><strong>Deformation:</strong> Too much pressure during grinding or polishing. Use lighter pressure throughout.</li>
                <li><strong>Over-etching:</strong> Reduce etching time or dilute etchant. Start with shorter times.</li>
                <li><strong>Pitting after etching:</strong> Etchant too strong or etching time too long. Dilute etchant or reduce time.</li>
              </ul>
              </section>
            </AnimateOnScroll>

            {/* CTA Section */}
            <AnimateOnScroll animation="fadeInUp" delay={50}>
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
            </AnimateOnScroll>

            {/* Related Guides */}
            <AnimateOnScroll animation="fadeInUp" delay={50}>
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
            </AnimateOnScroll>
          </div>
        </div>
      </div>
      </article>
    </>
  )
}

