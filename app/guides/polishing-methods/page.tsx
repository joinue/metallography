import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import MaterialTooltip from '@/components/MaterialTooltip'
import Link from 'next/link'
import YouTubeVideo from '@/components/YouTubeVideo'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('polishing-methods')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'diamond-polishing', label: 'Diamond Polishing' },
  { id: 'polishing-abrasives', label: 'Polishing Abrasives & Suspensions' },
  { id: 'polishing-cloths', label: 'Polishing Cloths & Pads' },
  { id: 'oxide-polishing', label: 'Oxide Polishing' },
  { id: 'final-polishing', label: 'Final Polishing' },
  { id: 'controlled-removal', label: 'Controlled Material Removal' },
  { id: 'vibratory-polishing', label: 'Vibratory Polishing' },
  { id: 'material-specific', label: 'Material-Specific Techniques' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
]

export default function PolishingMethodsGuide() {
  const { articleStructuredData, courseStructuredData, breadcrumbStructuredData, howToStructuredData } = getGuideStructuredData(guide)

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
      {howToStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
        />
      )}
      <GuideSideNav sections={sections} />
      <article className="py-12">
        <div className="container-custom lg:pl-0 xl:pl-0">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Polishing Methods
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Process Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Polishing Methods</h1>
            <p className="text-xl text-gray-600">
              Learn effective polishing techniques for different materials and applications, including 
              diamond polishing, oxide polishing, controlled removal, and final polishing strategies.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet (below lg/1024px) */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
              <li><a href="#diamond-polishing" className="text-primary-600 hover:underline">Diamond Polishing</a></li>
              <li><a href="#polishing-abrasives" className="text-primary-600 hover:underline">Polishing Abrasives & Suspensions</a></li>
              <li><a href="#polishing-cloths" className="text-primary-600 hover:underline">Polishing Cloths & Pads</a></li>
              <li><a href="#oxide-polishing" className="text-primary-600 hover:underline">Oxide Polishing</a></li>
              <li><a href="#final-polishing" className="text-primary-600 hover:underline">Final Polishing</a></li>
              <li><a href="#controlled-removal" className="text-primary-600 hover:underline">Controlled Material Removal</a></li>
              <li><a href="#vibratory-polishing" className="text-primary-600 hover:underline">Vibratory Polishing</a></li>
              <li><a href="#material-specific" className="text-primary-600 hover:underline">Material-Specific Techniques</a></li>
              <li><a href="#troubleshooting" className="text-primary-600 hover:underline">Troubleshooting</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                Polishing is the final step in metallographic sample preparation that removes grinding 
                scratches and creates a mirror-like surface suitable for microstructural analysis. 
                Proper polishing technique is essential for revealing true microstructures without 
                introducing artifacts such as relief, contamination, or deformation.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/final-polishing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/final polishing & analysis-cover.webp"
                    alt="Final polishing and analysis consumables for metallographic samples"
                    width={600}
                    height={450}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Final polishing consumables including diamond abrasives, oxide suspensions, and polishing pads. Proper selection ensures mirror-like surfaces suitable for microstructural analysis.</p>
              </div>
              <p>
                The polishing process typically involves multiple stages, progressing from coarse 
                diamond abrasives to fine oxide suspensions. Each stage must be carefully executed 
                to ensure complete removal of previous scratches while maintaining sample integrity.
              </p>
            </section>

            <section id="diamond-polishing" className="scroll-mt-24">
              <h2>Diamond Polishing</h2>
              <p>
                Diamond polishing is the primary method for removing grinding scratches and preparing 
                the surface for final polishing. Diamond abrasives are available in various particle 
                sizes and formulations to suit different materials and applications.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 max-w-2xl mx-auto">
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/diamond-abrasives"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/polycrystalline-diamond-high-viscosity.webp"
                      alt="Polycrystalline diamond polishing compound"
                      width={250}
                      height={250}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 250px"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Polycrystalline diamond: aggressive cutting, ideal for hard materials</p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/diamond-abrasives"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/monocrystalline-diamond-high-viscosity.webp"
                      alt="Monocrystalline diamond polishing compound"
                      width={250}
                      height={250}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 250px"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Monocrystalline diamond: gentler cutting, less aggressive</p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/diamond-abrasives"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/consumables/polycrystalline-diamond-paste.webp"
                      alt="Diamond paste for manual polishing applications"
                      width={250}
                      height={250}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Diamond paste: grease-based for manual polishing applications</p>
                </div>
              </div>
              <h3>Diamond Polishing Sequence</h3>
              <ol>
                <li><strong>9 μm diamond</strong> on a hard woven pad: Remove grinding scratches (3-5 minutes)</li>
                <li><strong>3 μm diamond</strong> on a medium napped pad: Further refinement (3-5 minutes)</li>
                <li><strong>1 μm diamond</strong> on a soft napped pad: Fine polishing (3-4 minutes)</li>
                <li><strong>0.25 μm diamond (optional):</strong> Ultra-fine preparation (1-2 minutes)</li>
              </ol>
              <p>
                Typical parameters: 20-25 N force per sample at around 150 RPM for the 9 and 3 μm steps,
                dropping to 15-20 N for the 1 μm step. Keep platen speeds in the 100-150 RPM range for
                polishing; the higher speeds used in grinding (200-300 RPM) generate too much heat and
                deformation here. Match the first diamond size to the last grinding step: each abrasive
                leaves subsurface damage roughly 1.5-3 times its particle diameter, and each polishing
                step must remove the previous step&apos;s damage, not just its visible scratches. Judge
                progress under the microscope, not by the clock - a useful rule of thumb is to continue
                for about twice the time it takes the previous scratches to disappear.
              </p>

              <YouTubeVideo
                videoId="PT2fRdSvhDM"
                title="Automated Grinding & Polishing with NANO 1000S & FEMTO 1100S"
                description="Watch Dr. Donald Zipperian demonstrate automated grinding and polishing using a manual polisher fitted with a semi-automatic power head. Learn how to program and operate automated systems for consistent, repeatable results in both grinding and polishing stages."
              />

              <h3>Diamond Abrasive Types</h3>
              <ul>
                <li><strong>Polycrystalline Diamond:</strong> Aggressive cutting, good for hard materials</li>
                <li><strong>Monocrystalline Diamond:</strong> Softer cutting action, less aggressive</li>
                <li><strong>Diamond Suspensions:</strong> Water-based or oil-based suspensions</li>
                <li><strong>Diamond Pastes:</strong> Grease-based for manual applications</li>
              </ul>
              <ProductLink 
                productName="Diamond Abrasives"
                href="https://shop.metallographic.com/collections/diamond-abrasives"
                description="Diamond suspensions, pastes, and lubricants in various particle sizes"
              />
            </section>

            <section id="polishing-abrasives" className="scroll-mt-24">
              <h2>Polishing Abrasives & Suspensions</h2>
              <p>
                Understanding the different types of polishing abrasives and their applications is 
                crucial for achieving optimal results. Each abrasive type has specific characteristics 
                that make it suitable for particular materials and polishing stages.
              </p>
              <h3>Diamond Abrasives</h3>
              <ul>
                <li><strong>Polycrystalline Diamond:</strong> Multiple cutting edges, aggressive removal, ideal for hard materials</li>
                <li><strong>Monocrystalline Diamond:</strong> Single crystal structure, gentler cutting, less deformation</li>
                <li><strong>Available Forms:</strong> Suspensions, pastes, sprays</li>
                <li><strong>Particle Sizes:</strong> 15 μm down to 0.25 μm</li>
              </ul>
              <h3>Oxide Abrasives</h3>
              <ul>
                <li><strong>Alumina (Alpha):</strong> Standard alpha-phase alumina for general polishing</li>
                <li><strong>Alumina (Deagglomerated):</strong> Processed to prevent agglomeration, more consistent</li>
                <li><strong>Alumina (Low Viscosity):</strong> Lower viscosity for better flow and coverage</li>
                <li><strong>Alumina (Polycrystalline):</strong> Multiple crystal structure for aggressive polishing</li>
                <li><strong>Colloidal Alumina:</strong> Ultra-fine particles in suspension, excellent for final polishing</li>
                <li><strong>Colloidal Silica:</strong> Very fine silica particles, produces mirror-like finishes</li>
                <li><strong>Cerium Oxide:</strong> Effective for glass and some ceramics</li>
                <li><strong>CMP Alumina Silica:</strong> Chemical-mechanical polishing blend</li>
              </ul>
            </section>

            <section id="polishing-cloths" className="scroll-mt-24">
              <h2>Polishing Cloths & Pads</h2>
              <p>
                The choice of polishing pad significantly affects polishing results. Different pad
                types provide varying levels of hardness, nap, and cutting action. Selecting the
                appropriate pad for each polishing stage is essential.
              </p>
              <p>
                The governing tradeoff is pad hardness versus relief: a harder pad produces a flatter
                surface with better edge retention but leaves more scratches, while a softer napped pad
                leaves fewer scratches but allows more relief between phases of different hardness.
                Work from harder pads early in the sequence toward softer pads at the end, and reach
                for the softest cloths only at the final step.
              </p>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Historical Note:</strong> The importance of polishing cloth selection was recognized early in 
                  metallography's development. In the 1920s-1930s, "kitten-ear" broadcloth was a popular polishing cloth 
                  that became unavailable due to fashion changes. Metallographers searched for substitutes, eventually 
                  working with manufacturers to produce specialized cloths for metallographic use. This early recognition 
                  of cloth importance led to the wide variety of specialized polishing pads available today, with 
                  "kitten-ear" style cloths still used for final polishing of soft metals where scratch removal is 
                  particularly difficult.
                </p>
              </div>
              <div className="mt-3 mb-1 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/polishing-pads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/polishing-pads.webp"
                    alt="Various polishing pads and cloths for different polishing stages"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Various polishing pads and cloths for different polishing stages. Pad selection affects hardness, nap, and cutting action - choose based on material and polishing stage.</p>
              </div>
              <h3>Polishing Pad Selection Guidelines</h3>
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Pad Type</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Use Case</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Polishing Stage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">Metal mesh</td>
                      <td className="border border-gray-300 px-4 py-3">Metal mesh pad used for semi-fixed abrasive coarse to intermediate lapping. Excellent for initial removal of damage from sectioning and hard materials.</td>
                      <td className="border border-gray-300 px-4 py-3">Coarse / Intermediate</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">Woven polyester</td>
                      <td className="border border-gray-300 px-4 py-3">Durable synthetic polyester pad ideal for intermediate polishing, especially with 6–15 µm diamond abrasives. Designed as a long-life nylon alternative.</td>
                      <td className="border border-gray-300 px-4 py-3">Intermediate</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">Non-woven textile</td>
                      <td className="border border-gray-300 px-4 py-3">Widely used non-woven intermediate polishing pad, compatible with most diamond suspensions. Effective across a broad range of materials.</td>
                      <td className="border border-gray-300 px-4 py-3">Intermediate</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">Porometric polymer</td>
                      <td className="border border-gray-300 px-4 py-3">Porometric polymer pad with rubber-like consistency, offering balanced action between low and high nap pads. Ideal for moderate nap intermediate polishing.</td>
                      <td className="border border-gray-300 px-4 py-3">Intermediate</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">Soft low-nap woven</td>
                      <td className="border border-gray-300 px-4 py-3">Low-napped soft polishing pad widely used in Europe for intermediate steps on metals. Suitable for 1–15 µm diamond abrasives.</td>
                      <td className="border border-gray-300 px-4 py-3">Intermediate</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">Low-nap silk</td>
                      <td className="border border-gray-300 px-4 py-3">Low-napped silk pad tailored for intermediate polishing of harder metals and alloys. Performs well with mid-size diamond abrasives.</td>
                      <td className="border border-gray-300 px-4 py-3">Intermediate</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">Firm low-nap</td>
                      <td className="border border-gray-300 px-4 py-3">Low-napped pad ideal for 1–9 µm polishing. Designed for consistent material removal and flatness control during final pre-polishing.</td>
                      <td className="border border-gray-300 px-4 py-3">Intermediate</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">Foam-backed low-nap woven</td>
                      <td className="border border-gray-300 px-4 py-3">Woven low-nap final polishing pad with foam backing for enhanced compliance. Ideal for 1–6 µm diamond. Great for critical surface flatness needs.</td>
                      <td className="border border-gray-300 px-4 py-3">Final</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">High-nap synthetic</td>
                      <td className="border border-gray-300 px-4 py-3">High-napped final polishing pad ideal for producing a mirror finish on metals and polymers. Recommended for &lt;1 µm diamond or colloidal silica.</td>
                      <td className="border border-gray-300 px-4 py-3">Final</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">Tight high-nap knit</td>
                      <td className="border border-gray-300 px-4 py-3">Tight high-napped final polishing pad for metals. Offers better control of surface texture and minimal abrasive drag.</td>
                      <td className="border border-gray-300 px-4 py-3">Final</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">Very high-nap flocked</td>
                      <td className="border border-gray-300 px-4 py-3">Very high-napped final polishing pad tailored for soft metals and polymers. Provides gentle polishing action to minimize pull-out and relief.</td>
                      <td className="border border-gray-300 px-4 py-3">Final</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">Wool cloth</td>
                      <td className="border border-gray-300 px-4 py-3">Wool-based final polishing cloth used when edge retention is not critical. Works well with alumina and colloidal silica on metals.</td>
                      <td className="border border-gray-300 px-4 py-3">Final</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">Felt</td>
                      <td className="border border-gray-300 px-4 py-3">Thick final polishing pad made for large samples or glass. Ideal for use with colloidal silica or alumina slurries where surface uniformity is key.</td>
                      <td className="border border-gray-300 px-4 py-3">Final</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ProductLink 
                productName="Polishing Pads"
                href="https://shop.metallographic.com/collections/polishing-pads"
                description="Polishing pads and cloths in various sizes and hardness levels"
              />
            </section>

            <section id="oxide-polishing" className="scroll-mt-24">
              <h2>Oxide Polishing</h2>
              <p>
                Oxide polishing follows diamond polishing and removes fine scratches while producing 
                a high-quality surface finish. Oxide abrasives are typically used in the final 
                polishing stages.
              </p>
              <h3>Oxide Polishing Sequence</h3>
              <ol>
                <li><strong>0.3 μm alumina:</strong> Remove fine diamond scratches (2-3 minutes)</li>
                <li><strong>0.05 μm colloidal silica:</strong> Final polish for mirror finish (about 3 minutes, plus water flush)</li>
              </ol>
              <p>
                <strong>Colloidal silica technique:</strong> polish for about 3 minutes with the active
                suspension, then flush with water for the final 30-60 seconds while still polishing.
                Skipping the flush leaves dried silica residue and stains on the surface. Colloidal
                silica works chemo-mechanically - it combines fine abrasion with mild chemical etching,
                which removes the residual deformation layer rather than just refining scratches.
              </p>
              <h3>Oxide Selection Guidelines</h3>
              <ul>
                <li><strong>Standard Alumina:</strong> General purpose, most materials</li>
                <li><strong>Deagglomerated Alumina:</strong> When consistency is critical</li>
                <li><strong>Colloidal Silica:</strong> For ultra-fine finishes, minimal relief</li>
                <li><strong>Low Viscosity Alumina:</strong> For better coverage and flow</li>
                <li><strong>Cerium Oxide:</strong> Specialized for glass and ceramics</li>
              </ul>
              <p>
                <strong>Important:</strong> Always use fresh oxide suspensions and clean the sample 
                thoroughly between diamond and oxide polishing to prevent contamination.
              </p>
            </section>

            <section id="final-polishing" className="scroll-mt-24">
              <h2>Final Polishing</h2>
              <p>
                Final polishing produces the mirror-like surface required for high-quality 
                microstructural analysis. This stage requires careful attention to detail and 
                appropriate selection of abrasives and cloths.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 max-w-2xl mx-auto">
                <div className="rounded-lg overflow-hidden">
                  <Link 
                    href="https://shop.metallographic.com/collections/final-polishing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <div className="w-full aspect-[4/3] relative">
                      <Image
                        src="/images/consumables/final-polishing-coloidal-silica.webp"
                        alt="Colloidal silica for final polishing"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Colloidal silica (0.05 μm) is the most common final polishing abrasive, producing excellent mirror-like finishes with minimal relief.</p>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <div className="w-full aspect-[4/3] relative">
                    <Image
                      src="/images/microstructures/431 Stainless steel, Kallings no. 2, 400X.JPG"
                      alt="Example of properly polished stainless steel microstructure"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Result of proper final polishing - <MaterialTooltip materialName="431">431 Stainless steel</MaterialTooltip>, 400X. The mirror-like surface reveals true microstructure without artifacts.</p>
                </div>
              </div>
              <h3>Final Polishing Techniques</h3>
              <ul>
                <li>Use soft napped cloths, chemotextile, or porous polyurethane pads</li>
                <li>Apply light force (10-15 N per sample, lighter than the diamond steps)</li>
                <li>Keep platen speed low (100-150 RPM)</li>
                <li>On powered heads, co-rotation (head and platen turning the same direction) is the gentler default; counter-rotation is situational, mainly for edge-retention-critical work</li>
                <li>Use fresh oxide suspensions</li>
                <li>Monitor polishing time to avoid over-polishing and relief</li>
                <li>For colloidal silica, flush with water for the last 30-60 seconds while still polishing</li>
                <li>Clean sample thoroughly after polishing</li>
              </ul>
              <h3>Final Polishing Abrasives</h3>
              <ul>
                <li><strong>Colloidal Silica (0.05 μm):</strong> Most common, produces excellent finishes</li>
                <li><strong>Colloidal Alumina (0.05 μm):</strong> Alternative to silica, less aggressive</li>
                <li><strong>Deagglomerated Alumina:</strong> For consistent, uniform polishing</li>
                <li><strong>Low Viscosity Alumina:</strong> Better flow and coverage</li>
              </ul>
              <ProductLink 
                productName="Final Polishing Abrasives"
                href="https://shop.metallographic.com/collections/final-polishing"
                description="Final polishing abrasives including colloidal silica, various alumina types, and cerium oxide"
              />
            </section>

            <section id="controlled-removal" className="scroll-mt-24">
              <h2>Controlled Material Removal</h2>
              <p>
                Controlled removal polishing, also known as metered removal, allows for precise 
                material removal in micron-level increments. This technique is essential for 
                applications requiring extreme precision, such as:
              </p>
              <ul>
                <li>IC Flip Chip preparation</li>
                <li>SEM (Scanning Electron Microscopy) sample preparation</li>
                <li>FIB (Focused Ion Beam) sample preparation</li>
                <li>TEM (Transmission Electron Microscopy) sample preparation</li>
                <li>AFM (Atomic Force Microscopy) sample preparation</li>
                <li>EBSD (Electron Backscatter Diffraction) sample preparation</li>
                <li>Petrographic analysis</li>
                <li>Optical analysis requiring specific depth</li>
              </ul>
              <h3>How Controlled Removal Works</h3>
              <p>
                Controlled removal systems use precision measurement and feedback to remove material 
                in exact increments. The system monitors removal in real-time with micrometer-level 
                resolution, allowing operators to polish to specific depths or remove precise amounts 
                of material.
              </p>
              <h3>Typical Capabilities</h3>
              <ul>
                <li>Micrometer-adjustable pitch and roll control of the sample plane</li>
                <li>Real-time removal monitoring with sub-micrometer resolution</li>
                <li>Light, precisely controlled sample loads (typically grams, not newtons)</li>
                <li>Variable speed control to tune material removal rates</li>
              </ul>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <div className="mb-3 rounded-lg overflow-hidden max-w-xs mx-auto">
                  <Link 
                    href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/atto.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/equipment/grinding & polishing/controlled removal polisher/atto-1000s/atto-polisher-cover.webp"
                      alt="Controlled removal polisher for micrometer-level material removal"
                      width={250}
                      height={188}
                      className="w-full h-auto"
                    />
                  </Link>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Equipment:</strong> Controlled Removal Polisher
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  A controlled removal polisher measures material removal in real time with
                  micrometer-level accuracy, used when polishing must stop at a specific depth or
                  point of interest.
                </p>
                <Link
                  href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/atto.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                >
                  View Controlled Removal Polishers →
                </Link>
              </div>
            </section>

            <section id="vibratory-polishing" className="scroll-mt-24">
              <h2>Vibratory Polishing</h2>
              <p>
                Vibratory polishing finishes the sample with low-energy oscillation (around 60 Hz)
                instead of a rotating platen and applied force. The sample sits face-down on the
                polishing cloth under gravity load alone - its own weight, or a stacked weight on the
                holder, typically 50-200 g total. Because there is no applied pressure, vibratory
                polishing removes the residual deformation layer without re-introducing mechanical
                damage, which is why it is the standard route to EBSD-grade surfaces and a good option
                for soft metals (magnesium, lead, copper) that smear under rotary polishing.
              </p>
              <h3>Advantages of Vibratory Polishing</h3>
              <ul>
                <li>Removes the residual deformation layer without applied pressure</li>
                <li>Minimal relief, even on multi-phase materials, because the load is so low</li>
                <li>Reduces operator variability - the process runs unattended</li>
                <li>Suited to batch processing of multiple samples</li>
                <li>Forgiving: over-polishing produces no benefit, but also little harm</li>
              </ul>

              <YouTubeVideo
                id="vibratory-polishing-video"
                videoId="cPkzthQbLcM"
                title="Vibratory Polishing with the GIGA S"
                description="Learn vibratory polishing techniques from Dr. Donald Zipperian. This video demonstrates how to use a vibratory polisher for final polishing, including setup, parameter selection, and preparing deformation-free surfaces for EBSD and high-quality microstructural analysis."
              />

              <h3>Vibratory Polishing Process</h3>
              <ol>
                <li>Prepare sample through standard grinding and mechanical polishing (through 1 μm diamond or the first oxide step)</li>
                <li>Add polishing suspension to the bowl - colloidal silica is the workhorse for EBSD; 0.05 μm alumina is the common alternative</li>
                <li>Set vibration amplitude or power for the desired polishing rate</li>
                <li>Place samples face-down in the bowl under gravity load only (50-200 g; no applied pressure)</li>
                <li>Allow 1-24 hours depending on material and the surface quality required</li>
                <li>Check the bowl periodically; extend or stop based on surface inspection</li>
              </ol>
              <h3>Applications</h3>
              <ul>
                <li>EBSD sample preparation</li>
                <li>Soft metals (Mg, Pb, Cu) that re-deform under rotary polishing</li>
                <li>Final polishing for high-quality microstructural analysis</li>
                <li>Batch processing multiple samples</li>
                <li>Applications requiring minimal deformation</li>
              </ul>
              <h3>Other Stress-Free Finishing Methods</h3>
              <p>
                Vibratory polishing is one of several alternative-physics finishing methods used when
                mechanical polishing cannot deliver a deformation-free surface:
              </p>
              <ul>
                <li>
                  <strong>Electropolishing:</strong> anodic dissolution in an electrolyte bath, typically
                  20-60 V. Voltage and current density together control the polishing-versus-etching
                  balance - too low and the surface etches, too high and it pits. Many electrolytes
                  require cooling to 0-5 °C to avoid runaway etching. Common for stainless steels,
                  copper, aluminum, and nickel alloys, and for thin foils or geometries that do not
                  suit mechanical polishing.
                </li>
                <li>
                  <strong>Ion milling and broad ion beam (BIB):</strong> an argon beam sputters away the
                  deformation layer at a shallow angle (1-6° for lowest damage). Used for TEM
                  preparation, semiconductor cross-sections, and the highest-quality EBSD surfaces.
                </li>
              </ul>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <div className="mb-3 rounded-lg overflow-hidden max-w-xs mx-auto">
                  <Link 
                    href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/giga.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/images/equipment/grinding & polishing/vibratory polisher/giga-s-cover.webp"
                      alt="Vibratory polisher with polishing bowl"
                      width={250}
                      height={188}
                      className="w-full h-auto"
                    />
                  </Link>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Equipment:</strong> Vibratory Polisher
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  A vibratory polisher finishes samples with low-energy oscillation under gravity load
                  only, producing deformation-free surfaces for EBSD and high-magnification analysis.
                </p>
                <Link
                  href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/giga.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                >
                  View Vibratory Polishers →
                </Link>
              </div>
            </section>

            <section id="material-specific" className="scroll-mt-24">
              <h2>Material-Specific Polishing Techniques</h2>
              <h3>Hard Materials (Hardened Steels, Ceramics)</h3>
              <ul>
                <li>Use polycrystalline diamond for aggressive cutting</li>
                <li>Longer polishing times may be required</li>
                <li>Can tolerate higher pressure</li>
                <li>May benefit from controlled removal for precision work</li>
              </ul>
              <h3>Soft Materials (Aluminum, Copper, Lead)</h3>
              <ul>
                <li>Use monocrystalline diamond for gentler cutting</li>
                <li>Shorter polishing times to avoid over-polishing</li>
                <li>Light pressure to prevent deformation</li>
                <li>Monitor carefully for smearing</li>
              </ul>
              <h3>Work-Hardening Materials (Stainless Steel, Nickel Alloys)</h3>
              <ul>
                <li>Use consistent, moderate pressure</li>
                <li>Avoid excessive polishing time</li>
                <li>Progress through grits systematically</li>
                <li>Consider vibratory polishing for final stage</li>
              </ul>
              <h3>Multi-Phase Materials</h3>
              <ul>
                <li>
                  <strong>Use harder pads to minimize relief.</strong> Relief is caused by softer napped pads
                  conforming around hard phases and recessing the softer matrix; a harder pad (woven or synthetic
                  suede) keeps the surface co-planar across the phase boundary. Reach for chemotextile only at
                  the very last step, if at all.
                </li>
                <li>Shorter polishing times to prevent over-polishing</li>
                <li>
                  Use chemo-mechanical action (colloidal silica, optionally with H₂O₂ for Cu) at the final step —
                  it removes the softer phase chemically rather than mechanically, reducing the height differential
                  that creates relief.
                </li>
                <li>Vibratory polishing under low load is excellent for multi-phase systems because the low force
                  minimizes mechanical relief while still finishing the surface.</li>
              </ul>
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <h2>Troubleshooting Common Issues</h2>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/Inclusion-oxide-2.jpg"
                  alt="Example of inclusions and surface quality issues that can occur during polishing"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">Proper polishing technique prevents relief and surface defects. This image shows how correct polishing maintains inclusion integrity without creating artifacts around different phases.</p>
              </div>
              <h3>Scratches Not Removing</h3>
              <ul>
                <li>Insufficient polishing time at current stage</li>
                <li>Grit progression too aggressive (skipped sizes)</li>
                <li>Cloth too hard or too soft for current stage</li>
                <li>Insufficient or contaminated abrasive</li>
              </ul>
              <h3>Relief Around Inclusions or Phases</h3>
              <ul>
                <li>Over-polishing - reduce polishing time</li>
                <li>Cloth too soft - use harder cloth</li>
                <li>Pressure too high - reduce pressure</li>
                <li>Consider vibratory polishing for final stage</li>
              </ul>
              <h3>Contamination</h3>
              <ul>
                <li>Not cleaning sample between stages</li>
                <li>Using contaminated abrasives or cloths</li>
                <li>Cross-contamination from previous steps</li>
                <li>Dirty polishing equipment</li>
              </ul>
              <h3>Poor Surface Quality</h3>
              <ul>
                <li>Incomplete removal of previous scratches</li>
                <li>Inappropriate cloth selection</li>
                <li>Incorrect abrasive type or size</li>
                <li>Insufficient polishing time</li>
              </ul>
              <h3>Over-Polishing</h3>
              <ul>
                <li>Excessive polishing time</li>
                <li>Too soft a cloth for material</li>
                <li>Pressure too high</li>
                <li>Inappropriate abrasive selection</li>
              </ul>
            </section>

            {/* Equipment Recommendations */}
            <section className="mt-12 bg-gray-50 border-l-4 border-primary-600 p-6 rounded">
              <h2 className="text-2xl font-semibold mb-4">Recommended Equipment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/grinding-polishing/nano.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/grinding & polishing/manual grinder polishers/nano-1000s/nano-1000s-cover.webp"
                        alt="Manual grinder-polisher with rotating platen"
                        width={250}
                        height={188}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold mb-1">Manual Polishers</h3>
                  <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                    Manual grinder-polishers provide variable platen speed for both grinding and
                    polishing steps. Available in single, double, or large wheel configurations.
                  </p>
                  <Link
                    href="https://metallographic.com/metallographic-equipment/grinding-polishing/nano.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                  >
                    View Manual Polishers →
                  </Link>
                </div>
                <div className="flex flex-col">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://metallographic.com/metallographic-equipment/grinding-polishing/femto.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/grinding & polishing/semi-auto grinder polishers/femto-1100s/femto-1100s-cover.webp"
                        alt="Semi-automatic power head attached to a manual polisher"
                        width={250}
                        height={188}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold mb-1">Semi-Automated Polishing Attachments</h3>
                  <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                    Semi-automatic power heads attach to manual polishers to automate force application
                    and improve consistency.
                  </p>
                  <Link
                    href="https://metallographic.com/metallographic-equipment/grinding-polishing/femto.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                  >
                    View Semi-Automatic Attachments →
                  </Link>
                </div>
                <div className="flex flex-col">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/atto.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/grinding & polishing/controlled removal polisher/atto-1000s/atto-polisher-cover.webp"
                        alt="Controlled removal polisher for micrometer-level material removal"
                        width={250}
                        height={188}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold mb-1">Controlled Removal Polisher</h3>
                  <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                    Controlled removal polishers measure material removal in real time with
                    micrometer-level precision for polishing to a specific depth.
                  </p>
                  <Link
                    href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/atto.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                  >
                    View Controlled Removal Polishers →
                  </Link>
                </div>
                <div className="flex flex-col">
                  <div className="mb-3 rounded-lg overflow-hidden h-48 flex items-center justify-center bg-white">
                    <Link 
                      href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/giga.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-90 transition-opacity w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src="/images/equipment/grinding & polishing/vibratory polisher/giga-s-cover.webp"
                        alt="Vibratory polisher with polishing bowl"
                        width={250}
                        height={188}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold mb-1">Vibratory Polisher</h3>
                  <p className="text-gray-700 mb-2 text-xs leading-relaxed flex-grow">
                    Vibratory polishers finish samples with low-energy oscillation under gravity load
                    only, removing the residual deformation layer for EBSD-grade surfaces.
                  </p>
                  <Link
                    href="https://www.metallographic.com/metallographic-equipment/grinding-polishing/giga.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs inline-flex items-center gap-1"
                  >
                    View Vibratory Polishers →
                  </Link>
                </div>
              </div>
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
                  href="https://shop.metallographic.com/collections/diamond-abrasives"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  Shop Diamond Abrasives
                </Link>
                <Link 
                  href="https://shop.metallographic.com/collections/polishing-pads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  Shop Polishing Pads
                </Link>
                <Link 
                  href="https://metallographic.com/equipment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  Browse Equipment
                </Link>
              </div>
            </div>

            {/* Recordkeeping aside */}
            <p className="mt-8 text-sm text-gray-600 leading-relaxed">
              Polishing is where "what worked last time" lives or dies. If a lab keeps polishing
              recipes in a binder or in someone's head, a metallography ELN like{' '}
              <Link href="/materials-prep" className="text-primary-600 hover:underline font-semibold">Materials Prep</Link>{' '}
              gives those recipes a structured home and links them to the batches where they were
              used.
            </p>

            {/* Related Guides */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/guides/grinding-techniques" className="text-primary-600 hover:underline font-semibold">
                  → Grinding Techniques
                </Link>
                <Link href="/guides/stainless-steel-preparation" className="text-primary-600 hover:underline font-semibold">
                  → Stainless Steel Preparation
                </Link>
                <Link href="/guides/etching-procedures" className="text-primary-600 hover:underline font-semibold">
                  → Etching Procedures
                </Link>
                <Link href="/resources/troubleshooting-guide" className="text-primary-600 hover:underline font-semibold">
                  → Troubleshooting Common Issues
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

