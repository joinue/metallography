import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import MaterialTooltip from '@/components/MaterialTooltip'
import Link from 'next/link'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('titanium-preparation')!

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

export default function TitaniumGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Titanium Preparation
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Material-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Titanium Sample Preparation</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to preparing titanium samples for metallographic analysis, 
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
                Titanium and its alloys are important materials in aerospace, medical, and industrial 
                applications. Proper preparation is essential to reveal the true microstructure without 
                introducing artifacts such as deformation, scratches, or contamination. Titanium is 
                particularly challenging due to its reactivity and tendency to form surface oxides. 
                This guide will walk you through the complete preparation process.
              </p>
              <p>
                Common titanium alloys include <MaterialTooltip materialName="Ti-6Al-4V">Ti-6Al-4V (Grade 5)</MaterialTooltip>, 
                the most widely used titanium alloy, as well as <MaterialTooltip materialName="Commercially Pure Titanium (Grade 2)">commercially pure titanium (Grade 2)</MaterialTooltip> 
                and various alpha-beta alloys like <MaterialTooltip materialName="Ti-3Al-2.5V">Ti-3Al-2.5V (Grade 9)</MaterialTooltip>. 
                Titanium can be challenging due to its reactivity with oxygen and tendency to form 
                surface contamination. The key is to use appropriate abrasives, maintain consistent 
                pressure, and avoid contamination throughout the process. Titanium alloys vary in 
                hardness, with some being relatively soft while others can be quite hard.
              </p>
            </section>

            <section id="sectioning" className="scroll-mt-24">
              <h2>Sectioning</h2>
              <p>
                Titanium is extremely ductile and is prone to <strong>mechanical twinning</strong> when
                sectioned at high force — the twins look like microstructural features but are prep
                artifacts. The right answer for Ti sectioning is a <strong>precision (low-speed) saw with
                a diamond wafering blade</strong> whenever the sample geometry allows. The reduced load
                and the cutting action of a diamond blade keep the deformation layer thin and minimize
                twin generation. When a precision saw isn't an option, fall back to a standard abrasive
                cutoff at typical metallographic surface speeds (~2,500-4,500 SFM) with copious flood
                coolant. Keep the wheel inside its rated speed band and control damage with light feed
                instead — running far below rated speed doesn't reduce damage, it just upsets the bond's
                self-dressing behavior and wears the blade prematurely.
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
                    alt="Abrasive cut-off blade for hard non-ferrous metals, used for titanium sectioning"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">When abrasive cutoff is unavoidable, use a medium-hard-bond blade rated for hard non-ferrous metals (titanium, zirconium) — the dedicated titanium category. Thin blades (0.5-1.0 mm) and copious flood coolant are mandatory.</p>
              </div>
              <ul>
                <li><strong>Preferred:</strong> precision (low-speed) saw with a diamond wafering blade — reduces twinning and keeps the damage layer thin</li>
                <li><strong>Fallback:</strong> standard abrasive cutoff with a <strong>medium-hard-bond blade rated for hard non-ferrous metals (titanium, zirconium)</strong> — the dedicated titanium category; blades in this class are sold with alumina, silicon carbide, or CBN abrasive. Avoid blades formulated for soft non-ferrous metals or for steels; the bond is wrong for Ti.</li>
                <li>Use a thin abrasive cut-off wheel (0.5-1.0 mm thickness)</li>
                <li>Apply <strong>light, steady force</strong> — heavy load is what produces deformation twinning in Ti</li>
                <li>Use generous flood coolant; surface contamination from cutting fluid is real, clean immediately after sectioning</li>
                <li><strong>Never dry-cut titanium</strong> — fine Ti swarf is pyrophoric and can self-ignite. Flood coolant keeps it wet; collect and dispose of swarf wet, never in a dry dust-collection system</li>
                <li>Allow the wheel to do the cutting - avoid forcing</li>
              </ul>
              <ProductLink
                productName="Hard Non-Ferrous Abrasive Blades (Titanium)"
                href="https://shop.metallographic.com/collections/abrasive-blades"
                description="Abrasive blades rated for titanium and other hard non-ferrous alloys — the right blade category when a precision saw isn’t an option"
              />
            </section>

            <section id="mounting" className="scroll-mt-24">
              <h2>Mounting</h2>
              <p>
                Mounting provides edge retention and easier handling. For titanium, compression 
                mounting with phenolic or epoxy resins works well. Cold mounting with epoxy is also 
                suitable and avoids potential heat-related issues. Ensure the sample is thoroughly 
                cleaned before mounting to prevent contamination.
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
                <li>Clean and dry the sample thoroughly</li>
                <li>Place in mounting cup with epoxy resin</li>
                <li>Allow to cure at room temperature (typically 6-12 hours for slow-cure epoxy)</li>
                <li>Cold mounting avoids heat that could affect titanium microstructure</li>
              </ol>
            </section>

            <section id="grinding" className="scroll-mt-24">
              <h2>Grinding</h2>
              <p>
                Grinding removes sectioning damage and prepares the surface for polishing. Start with
                coarse grits and progressively move to finer grits. The dominant Ti-specific concern
                here is <strong>mechanical twinning</strong>, not classical work-hardening: heavy grinding
                pressure introduces deformation twins that survive into the polished surface and read as
                false microstructural features under Kroll's. <strong>Light, consistent force</strong> at
                every grit step is the lever that controls this — much more so than time per step.
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
                <p className="text-sm text-gray-600 mt-2 italic text-center">Silicon carbide (SiC) grinding papers in various grit sizes (120, 240, 400, 600) for progressive grinding. Rotate sample 90° between each grit to ensure complete scratch removal.</p>
              </div>
              <h3>Grinding Sequence</h3>
              <ol>
                <li><strong>120 grit (only when needed):</strong> Reserve for heavy stock removal after abrasive cutoff (30-60 seconds). The standard Ti ladder starts at 240 grit — on titanium a coarse grit drives deformation twins deeper even as it removes damage. If the sample was cut on a precision saw, always start at 240.</li>
                <li><strong>240 grit:</strong> Remove previous scratches (30-60 seconds)</li>
                <li><strong>400 grit:</strong> Further refinement (30-60 seconds)</li>
                <li><strong>600 grit:</strong> Final grinding step (30-60 seconds)</li>
              </ol>
              <p>
                <strong>Important:</strong> Rotate the sample 90° between each grit to ensure complete
                removal of previous scratches. Use water as a lubricant and keep force light — heavy
                downforce on Ti drives deformation twins into the surface that the rest of the prep
                ladder cannot remove. Clean the sample thoroughly between steps to prevent contamination.
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
                Polishing removes grinding scratches and prepares a mirror-like surface. For titanium, 
                diamond polishing followed by oxide polishing typically yields excellent results. Use 
                appropriate cloths and maintain consistent pressure to avoid contamination and relief.
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
                      alt="Polycrystalline diamond polishing compound for titanium"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Polycrystalline diamond compound provides consistent cutting action for titanium alloys.</p>
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
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Various polishing pads and cloths for different polishing stages. Select pad hardness based on titanium alloy and polishing stage.</p>
                </div>
              </div>
              <h3>Diamond Polishing</h3>
              <ol>
                <li><strong>9 μm diamond:</strong> 3-5 minutes on a hard woven cloth</li>
                <li><strong>3 μm diamond:</strong> 3-5 minutes on a medium-napped cloth</li>
              </ol>
              <p>
                There is deliberately <strong>no 1 μm diamond step</strong> in the Ti ladder. Finer diamond
                doesn't refine a titanium surface — each diamond pass keeps re-introducing mechanical
                deformation that the final step then has to strip, so go straight from 3 μm to the attack
                polish. (On commercially pure titanium the effect is strongest; some labs minimize diamond
                polishing on CP Ti altogether and lean on the chemo-mechanical step.)
              </p>
              <h3>Final Polishing — "Attack Polishing"</h3>
              <p>
                <strong>Plain colloidal silica is not enough on titanium.</strong> Ti maintains a stubborn
                deformation layer that ordinary mechanical polishing won't break through, and that layer
                obscures the α/β structure when you etch. The canonical Ti final step is a <em>chemo-mechanical</em>
                attack-polish: colloidal silica modified with hydrogen peroxide.
              </p>
              <ol>
                <li><strong>0.04-0.05 μm colloidal silica + 30% H₂O₂ at a 1:5 ratio</strong> (one part 30% H₂O₂ to five parts colloidal silica): 5 minutes on a soft napped pad at ~15 N, followed by a 30 s water flush on the same pad to clear residue.</li>
                <li>Rinse with water, then ethanol, and air-dry.</li>
              </ol>
              <p>
                Use light, consistent pressure. The H₂O₂ does the chemical share of the work; pushing
                harder doesn't speed it up, just introduces relief between α and β regions of different
                hardness. Mix the silica + H₂O₂ fresh; the peroxide loses activity over hours.
              </p>
            </section>

            <section id="etching" className="scroll-mt-24">
              <h2>Etching</h2>
              <p>
                Etching reveals the microstructure by selectively attacking grain boundaries and phases. 
                The choice of etchant depends on the titanium alloy and what features you want to reveal. 
                Common etchants include Kroll's reagent, hydrofluoric acid solutions, and various 
                electrolytic solutions. Titanium requires careful etching due to its reactivity.
              </p>
              <h3>Common Etchants for Titanium</h3>
              <ul>
                <li><strong>Kroll's Reagent (general purpose — CP Ti, α-β, β alloys):</strong> 2 mL HF + 6 mL HNO₃ + 92 mL H₂O. Apply by swab for 5-15 s. The default first-pass etch for every Ti family — <MaterialTooltip materialName="Commercially Pure Titanium (Grade 2)">CP Ti</MaterialTooltip>, <MaterialTooltip materialName="Ti-6Al-4V">Ti-6Al-4V</MaterialTooltip>, <MaterialTooltip materialName="Ti-3Al-2.5V">Ti-3Al-2.5V</MaterialTooltip>, and Ti-10V-2Fe-3Al-class β alloys. <strong>HF safety:</strong> work in a fume hood, wear HF-rated gloves and face shield, and keep calcium gluconate gel on hand. <strong>Never let the surface dry between application and rinse</strong> — HF residues continue to attack until the surface is flushed.</li>
                <li><strong>10% Oxalic acid, electrolytic — for β-phase imaging:</strong> 10 g oxalic acid in 100 mL H₂O. Apply at <strong>5 V</strong> for 30-60 s. Where Kroll's gives general structure, oxalic electrolytic preferentially responds to β-phase chemistry, so it's the canonical follow-up etch on α-β alloys (Ti-6Al-4V, Ti-3Al-2.5V) when you need to image the β fraction cleanly, and the primary etch for β-dominant alloys (Beta-C, Beta-21S, Ti-10V-2Fe-3Al).</li>
              </ul>
              <p>
                The recipe matrix above is intentionally short. Kroll's itself is published as a range
                (1-3 mL HF and 2-6 mL HNO₃ per 100 mL water, adjusted to the alloy), so there is no single
                "modified Kroll's" the literature agrees on — treat the 2/6/92 mix as the standard starting
                point. A genuine Weck's tint <em>for titanium</em> does exist (5 g ammonium bifluoride in
                100 mL water — a different recipe from the aluminum Weck's) and is the classic choice for
                color/grain-orientation work and for revealing the brittle, oxygen-enriched α-case layer
                that Kroll's does not bring out; reserve it for those specific jobs. For routine work,
                stick with standard Kroll's plus an oxalic electrolytic for β-phase imaging.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/etchants"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/etching.webp"
                    alt="Etching solutions and reagents for titanium"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Etching solutions and reagents for titanium. The standard pair is Kroll's reagent (2 mL HF + 6 mL HNO₃ + 92 mL H₂O) for general microstructure, followed by 10% oxalic acid at 5 V electrolytic for β-phase imaging on α-β and β alloys. <strong>Warning:</strong> Hydrofluoric acid is extremely hazardous — fume hood, HF-rated PPE, calcium gluconate on hand.</p>
              </div>
              <h3>Etching Procedure</h3>
              <ol>
                <li>Ensure sample is clean and dry</li>
                <li>Apply Kroll's by cotton swab in the fume hood (HF-rated PPE on)</li>
                <li>Swab 5-15 s; <strong>do not let the surface dry — keep it wet with reagent until you rinse</strong> (HF residues continue to attack until flushed)</li>
                <li>Immediately rinse with water, then ethanol</li>
                <li>Air-dry, or let the ethanol evaporate</li>
              </ol>
              <p>
                <strong>Tip:</strong> Start with shorter etching times (5-10 seconds) and increase if needed.
                Over-etching with Kroll's produces uniform pitting that obscures grain structure. For
                β-phase imaging, follow Kroll's with the oxalic electrolytic step rather than pushing
                Kroll's longer.
              </p>
              <ProductLink 
                productName="Etchants"
                href="https://shop.metallographic.com/collections/etchants"
                description="Pre-mixed and custom etching solutions for titanium, including Kroll's Reagent"
              />
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <h2>Troubleshooting</h2>
              <h3>Common Issues and Solutions</h3>
              <ul>
                <li><strong>Scratches remaining:</strong> Insufficient grinding/polishing time or skipped grits. Ensure complete scratch removal at each step.</li>
                <li><strong>Contamination:</strong> Titanium is highly reactive. Clean between steps thoroughly, use fresh abrasives, and avoid cross-contamination from other materials.</li>
                <li><strong>Surface oxidation:</strong> Titanium forms oxides easily. Minimize exposure to air, clean immediately after polishing, and etch promptly after final polish.</li>
                <li><strong>Relief around second phases:</strong> Over-polishing or too soft a cloth. Reduce polishing time or use slightly harder cloth.</li>
                <li><strong>Deformation twinning (false microstructural features):</strong> Heavy force during sectioning or grinding drives mechanical twins into the surface that look like real twins or grain features under Kroll's. Mitigation: precision saw with diamond wafering blade where possible, light force throughout grinding, and the H₂O₂ chemo-mechanical attack-polish at the final step to lift the deformation layer.</li>
                <li><strong>Persistent deformation layer / α-β contrast won't develop:</strong> Plain colloidal silica isn't enough on Ti. Switch the final step to colloidal silica + 30% H₂O₂ at a 1:5 ratio for 5 min + flush.</li>
                <li><strong>Over-etching:</strong> Reduce etching time or dilute etchant. Start with shorter times (5-10 seconds).</li>
                <li><strong>Pitting after etching:</strong> Etchant too strong or etching time too long. Dilute etchant or reduce time. HF-based etchants are particularly aggressive.</li>
                <li><strong>Poor edge retention:</strong> Switch to a harder, lower-shrinkage compression mount — glass-filled epoxy gives the best edge retention (phenolic is only fair) — and keep final polishing steps short on soft pads.</li>
                <li><strong>Inconsistent etching:</strong> Ensure sample is clean and dry before etching. Surface contamination can cause uneven etching — residual colloidal silica from the final polish is a common culprit (mottled etch); flush on the pad, then rinse with water and ethanol before etching.</li>
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

