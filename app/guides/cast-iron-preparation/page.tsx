import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import MaterialTooltip from '@/components/MaterialTooltip'
import Link from 'next/link'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('cast-iron-preparation')!

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

export default function CastIronGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Cast Iron Preparation
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Material-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Cast Iron Sample Preparation</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to preparing cast iron samples for metallographic analysis, 
              with special emphasis on preserving graphite structure and revealing matrix microstructure.
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
                Cast iron preparation presents unique challenges that distinguish it from steel preparation.
                The defining characteristic of cast iron is its graphite structure, which must be preserved
                throughout the entire preparation process. Unlike steel, where the microstructure is revealed
                primarily through etching, cast iron's graphite is revealed by proper polishing — etching reveals
                the matrix structure (ferrite, pearlite, or bainite).
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded">
                <p className="text-sm text-amber-900">
                  <strong>Examine unetched first.</strong> The canonical cast iron workflow per <strong>ASTM A247</strong>
                  (graphite microstructure rating; ISO 945 is the international equivalent) is to assess graphite
                  morphology — flake, nodular, vermicular, temper carbon — on the as-polished surface <em>before</em>
                  any etching. Etching attacks the matrix and distorts apparent graphite shape, so post-etch
                  nodularity counts on ductile iron per ASTM A247 are unreliable. Document the unetched view first;
                  etch second.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
                <p className="text-sm text-blue-900">
                  <strong>Critical Principle:</strong> Graphite preservation is the most important aspect of 
                  cast iron preparation. Graphite is soft and can be easily removed or damaged during grinding 
                  and polishing. Gentle techniques and careful monitoring are essential.
                </p>
              </div>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/Nodular cast iron, 200X.JPG"
                  alt="Nodular cast iron microstructure showing spheroidal graphite and matrix structure, properly prepared"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">Nodular cast iron, 200X magnification. This image shows the characteristic spheroidal graphite structure and matrix. Proper preparation preserves graphite while revealing matrix microstructure through etching.</p>
              </div>
              <p>
                Cast iron types vary significantly in their graphite morphology and matrix structure:
              </p>
              <ul>
                <li><strong><MaterialTooltip materialName="Gray Cast Iron">Gray Cast Iron</MaterialTooltip> (ASTM A48):</strong> Flake graphite in pearlite or ferrite matrix (163-187 HB)</li>
                <li><strong><MaterialTooltip materialName="Ductile Cast Iron">Ductile Cast Iron</MaterialTooltip> (ASTM A536):</strong> Spheroidal (nodular) graphite in pearlite or ferrite matrix (217 HB) — nodularity rated per ASTM A247</li>
                <li><strong><MaterialTooltip materialName="Malleable Cast Iron">Malleable Cast Iron</MaterialTooltip> (ASTM A220):</strong> Temper carbon nodules in ferrite or pearlite matrix (163 HB)</li>
                <li><strong><MaterialTooltip materialName="Austempered Ductile Iron">Austempered Ductile Iron (ADI)</MaterialTooltip>:</strong> Spheroidal graphite in <em>ausferrite</em> matrix — acicular ferrite + retained austenite + bainite (310 HB, very hard)</li>
                <li><strong><MaterialTooltip materialName="Compacted Graphite Iron">Compacted Graphite Iron (CGI)</MaterialTooltip>:</strong> Vermicular (compacted) graphite in pearlite matrix (230 HB) — graphite shape is between gray and ductile</li>
                <li><strong>White Cast Iron / Ni-Hard / High-Cr Iron:</strong> Carbide-rich, abrasion-resistant cast iron with no free graphite. <strong>Diamond grinding ladder required</strong> — chromium carbides cannot be cleanly cut by SiC abrasive, the same SiC-vs-carbide issue that drives carbide pullout in tool steels. Etch with 4% Picral or Vilella's for carbide morphology.</li>
              </ul>
              <p>
                The first five types (gray, ductile, malleable, ADI, CGI) share a common preparation
                approach focused on graphite preservation; graphite morphology determines how easily it
                can be preserved (spheroidal &gt; vermicular &gt; flake &gt; temper carbon, in increasing
                pullout risk). White iron is the structural exception: there is no graphite to preserve,
                but the chromium carbides demand a different abrasive ladder — see the white-iron note
                in the Grinding section below.
              </p>
            </section>

            <section id="sectioning" className="scroll-mt-24">
              <h2>Sectioning</h2>
              <p>
                When sectioning cast iron samples, use standard cutting techniques similar to carbon steel. 
                Cast iron is generally softer than hardened steel, so standard abrasive cutoff wheels work well. 
                The key is to minimize damage that could affect graphite preservation later in the process.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/abrasive-blades"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/maxcut-d.webp"
                    alt="Medium resin-bonded Al₂O₃ abrasive blade for cast iron sectioning"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Medium resin-bonded Al₂O₃ blades designed for general ferrous metals including cast iron. For very hard cast irons like <MaterialTooltip materialName="Austempered Ductile Iron">ADI</MaterialTooltip>, a hard-bond blade for hardened steels may be more appropriate.</p>
              </div>
              <ul>
                <li>Use a medium resin-bonded Al₂O₃ blade (general ferrous category) for typical cast iron grades, or step up to a hard-bond Al₂O₃ blade (hardened/case-hardened steel category) for very hard cast irons like <MaterialTooltip materialName="Austempered Ductile Iron">ADI</MaterialTooltip></li>
                <li>Use a standard abrasive cut-off wheel (0.5-1.0 mm thickness)</li>
                <li>Apply steady, moderate pressure</li>
                <li>Use adequate coolant to prevent overheating</li>
                <li>Allow the wheel to do the cutting - avoid forcing</li>
              </ul>
              <p>
                <strong>Note:</strong> For very hard cast irons like <MaterialTooltip materialName="Austempered Ductile Iron">Austempered Ductile Iron</MaterialTooltip> (310 HB), 
                use slower cutting speeds similar to hardened steel to prevent excessive heat buildup.
              </p>
              <ProductLink 
                productName="Ferrous Abrasive Blades (General & Hardened)"
                href="https://shop.metallographic.com/collections/abrasive-blades"
                description="Medium resin-bonded Al₂O₃ blades for general cast iron, plus hard-bond Al₂O₃ blades for very hard cast irons like Austempered Ductile Iron (ADI)"
              />
            </section>

            <section id="mounting" className="scroll-mt-24">
              <h2>Mounting</h2>
              <p>
                Mounting provides edge retention and easier handling. For cast iron, both compression and cold
                mounting work well. The choice depends on whether edge retention is critical and the hardness
                of the specific cast iron grade.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded">
                <p className="text-sm text-amber-900">
                  <strong>Vacuum impregnation for porous castings.</strong> Real-world cast iron — especially
                  large gray iron castings with shrinkage porosity, or any sample with visible defects under
                  the as-received surface — needs <strong>vacuum (or pressure) impregnation with low-viscosity
                  epoxy</strong> before mounting. Impregnation fills the pores and supports surrounding features
                  during polishing; without it, the polishing pad levers material out at pore edges and the
                  artifact looks identical to real solidification porosity (see the Troubleshooting section
                  below for distinguishing the two). After impregnation, finish with a colloidal silica step —
                  it's effectively mandatory after vacuum impregnation to clean up pore-edge pull-out.
                </p>
              </div>
              <h3>Compression Mounting</h3>
              <p>
                Compression mounting with phenolic or epoxy resins is suitable for most cast irons. Phenolic 
                provides better edge retention, which can be important for preserving graphite near edges.
              </p>
              <ol>
                <li>Clean the sample thoroughly to remove cutting fluid and debris</li>
                <li>Place sample in mounting press with appropriate resin</li>
                <li>Apply pressure: 3000-4000 psi for phenolic, 2000-3000 psi for epoxy</li>
                <li>Heat to 150-180°C and hold for 5-8 minutes</li>
                <li>Cool under pressure to room temperature</li>
              </ol>
              <h3>Cold Mounting</h3>
              <p>
                Cold mounting with epoxy resin is also suitable and avoids any thermal effects. This is 
                particularly useful if you're concerned about any potential effects of heat on the graphite structure.
              </p>
              <ol>
                <li>Clean the sample thoroughly</li>
                <li>Place sample in mounting mold</li>
                <li>Mix epoxy resin according to manufacturer's instructions</li>
                <li>Pour into mold and allow to cure (typically 4-8 hours at room temperature)</li>
              </ol>
            </section>

            <section id="grinding" className="scroll-mt-24">
              <h2>Grinding</h2>
              <p>
                Grinding removes sectioning damage and prepares the surface for polishing. For cast iron,
                use gentle grinding techniques to avoid damaging or removing graphite. The graphite is soft
                and can be easily pulled out or smeared during grinding.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
                <p className="text-sm text-red-900">
                  <strong>White iron / Ni-Hard / high-Cr iron exception.</strong> The SiC ladder below is for
                  graphite-bearing cast irons (gray, ductile, malleable, ADI, CGI). For white cast iron and
                  Ni-Hard / high-Cr abrasion-resistant grades, switch to a <strong>diamond grinding ladder</strong>
                  (75 → 30 → 15 → 9 µm on diamond-impregnated discs or films). SiC at ~9.5 Mohs cannot cleanly
                  cut Cr-rich carbides; the abrasive plows them and tears them out, destroying the carbide
                  morphology that's the entire point of metallographic analysis on white iron.
                </p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
                <p className="text-sm text-yellow-900">
                  <strong>Important:</strong> Use lighter pressure than you would for steel. Graphite is soft 
                  and can be removed during grinding. Monitor the surface carefully and avoid over-grinding.
                </p>
              </div>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/sic-grinding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/abrasive grinding-SiC papers.webp"
                    alt="Silicon carbide grinding papers in various grit sizes for progressive grinding of cast iron"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Silicon carbide (SiC) grinding papers in various grit sizes (120, 240, 400, 600) for progressive grinding. Use lighter pressure than for steel to preserve graphite.</p>
              </div>
              <h3>Grinding Sequence</h3>
              <ol>
                <li><strong>120 grit:</strong> Remove sectioning damage (30-60 seconds per step, lighter pressure)</li>
                <li><strong>240 grit:</strong> Remove previous scratches (30-60 seconds, lighter pressure)</li>
                <li><strong>400 grit:</strong> Further refinement (30-60 seconds, lighter pressure)</li>
                <li><strong>600 grit:</strong> Final grinding step (30-60 seconds, lighter pressure)</li>
              </ol>
              <p>
                <strong>Critical Guidelines:</strong>
              </p>
              <ul>
                <li>Use <strong>lighter pressure</strong> than for steel - graphite is soft and can be removed</li>
                <li>Rotate the sample 90° between each grit to ensure complete removal of previous scratches</li>
                <li>Use water as a lubricant and maintain consistent, light pressure</li>
                <li>Monitor the surface - if graphite starts to pull out, reduce pressure further</li>
                <li>For very hard cast irons like <MaterialTooltip materialName="Austempered Ductile Iron">ADI</MaterialTooltip>, you can use slightly more pressure, but still be gentle</li>
              </ul>
            </section>

            <section id="polishing" className="scroll-mt-24">
              <h2>Polishing</h2>
              <p>
                Polishing is critical for cast iron because <strong>graphite is revealed by polishing, not etching</strong>. 
                The goal is to achieve a mirror-like surface that reveals the graphite structure clearly while 
                preparing the matrix for etching. Use gentle polishing techniques to avoid removing graphite.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
                <p className="text-sm text-blue-900">
                  <strong>Key Principle:</strong> Graphite is revealed by proper polishing. Etching reveals the 
                  matrix structure (ferrite, pearlite, bainite), but the graphite itself is visible in the 
                  polished state. Avoid over-polishing that could remove graphite.
                </p>
              </div>
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
                      alt="Polycrystalline diamond polishing compound for cast iron"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Polycrystalline diamond compound for polishing cast iron. Use gentle pressure to preserve graphite.</p>
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
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Various polishing pads and cloths. Use softer cloths and lighter pressure for cast iron to preserve graphite.</p>
                </div>
              </div>
              <h3>Diamond Polishing</h3>
              <ol>
                <li><strong>6 μm diamond:</strong> 2-4 minutes on a medium-hard cloth (e.g., Texmet), <strong>lighter pressure</strong></li>
                <li><strong>3 μm diamond:</strong> 2-4 minutes on a medium-hard cloth, <strong>lighter pressure</strong></li>
                <li><strong>1 μm diamond:</strong> 2-3 minutes on a soft cloth, <strong>lighter pressure</strong></li>
              </ol>
              <h3>Final Polishing</h3>
              <ol>
                <li><strong>0.05 μm colloidal silica:</strong> 1-2 minutes on a soft cloth, <strong>very light pressure</strong></li>
                <li>Rinse thoroughly with water and dry with compressed air</li>
              </ol>
              <p>
                <strong>Critical Guidelines:</strong>
              </p>
              <ul>
                <li>Use <strong>lighter pressure</strong> throughout polishing - graphite is soft and can be removed</li>
                <li>Use <strong>softer cloths</strong> than you would for steel to reduce the risk of graphite pullout</li>
                <li>Monitor the surface - graphite should be clearly visible after polishing</li>
                <li>Avoid over-polishing - extended times can remove graphite</li>
                <li>For very hard cast irons like <MaterialTooltip materialName="Austempered Ductile Iron">ADI</MaterialTooltip>, you can use slightly more pressure, but still be gentle</li>
              </ul>
              <p>
                After polishing, examine the sample under the microscope. The graphite should be clearly visible 
                as dark areas (flakes, nodules, or compacted shapes depending on the cast iron type). If graphite 
                is missing or appears damaged, you may need to reduce pressure or use softer cloths.
              </p>
              <ProductLink
                productName="Diamond Abrasives"
                href="https://shop.metallographic.com/collections/diamond-abrasives"
                description="High-quality diamond polishing compounds in various particle sizes"
              />
            </section>

            <section id="etching" className="scroll-mt-24">
              <h2>Etching</h2>
              <p>
                Etching reveals the <strong>matrix structure</strong> (ferrite, pearlite, bainite) but does not 
                reveal graphite - graphite is visible in the polished state. The same etchants used for carbon 
                steel work well for cast iron matrices. Nital (nitric acid in ethanol) is the most common etchant.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-2xl mx-auto">
                <Image
                  src="/images/microstructures/Ferrite-Pearlite steel.JPG"
                  alt="Cast iron microstructure after proper etching, showing matrix structure and graphite"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-2 italic text-center">Cast iron microstructure after proper etching. The matrix structure (ferrite/pearlite) is revealed by etching, while graphite is visible from polishing.</p>
              </div>
              <h3>Common Etchants for Cast Iron</h3>
              <ul>
                <li><strong>2% Nital:</strong> General-purpose matrix etch for gray, ductile, malleable, and CGI cast irons. Reveals ferrite grain boundaries and pearlite structure (2 mL HNO₃ in 98 mL ethanol). Swab 5-15 s.</li>
                <li><strong>4% Picral:</strong> Reveals cementite and pearlite cleanly without attacking ferrite boundaries (4 g picric acid in 100 mL ethanol). Swab 10-60 s. <strong>Picric safety:</strong> store the reagent and any picric acid stock <em>wetted</em> at all times — dry picric is friction- and shock-sensitive (effectively a primary explosive). Keep stock bottles topped up; never let them dry out.</li>
                <li><strong>Nital then 4% Picral (sequential etch):</strong> The canonical cast-iron matrix workflow when 2% Nital alone leaves pearlite washed out. Apply 2% Nital first (5-15 s swab), rinse, then a second swab of 4% Picral on top — Picral darkens cementite and sharpens the pearlite lamellae against the ferrite background.</li>
                <li><strong>Beraha's I (color tint — required for ADI ausferrite):</strong> 10 mL HCl + 90 mL H₂O + 1 g K₂S₂O₅ (potassium metabisulfite). Immerse 30-180 s. The handbook etch for <MaterialTooltip materialName="Austempered Ductile Iron">ADI</MaterialTooltip> because the ausferrite matrix is acicular ferrite + retained austenite + bainite, and grayscale Nital cannot separate those three phases. Beraha I tints them in distinct colors. Also useful for ferrite/pearlite/bainite color contrast in heat-treated ductile iron.</li>
                <li><strong>4% Picral or Vilella's (white iron / high-Cr iron):</strong> For revealing chromium-carbide morphology in white cast iron, Ni-Hard, and high-Cr abrasion-resistant grades. Vilella's = 1 g picric + 5 mL HCl + 95 mL ethanol; same picric storage rules apply.</li>
              </ul>
              <p className="text-sm text-gray-600 italic">
                Note: a 3-5% Nital bump is sometimes recommended for ADI; treat this as a fallback only.
                The right answer for ADI ausferrite imaging is Beraha I, not stronger Nital — Nital cannot
                separate retained austenite from ferrite or bainite no matter how concentrated it gets.
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
                    alt="Etching solutions and reagents for cast iron"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Etching solutions and reagents for cast iron. Common etchants include 2% Nital and 4% Picral. Etching reveals the matrix structure, not the graphite.</p>
              </div>
              <h3>Etching Procedure</h3>
              <ol>
                <li>Ensure sample is clean and dry after polishing</li>
                <li><strong>Examine the polished surface unetched first</strong> — document graphite morphology per ASTM A247 (nodularity rating, graphite type and size charts) before any etching. Etching attacks the matrix and distorts apparent graphite shape, so post-etch nodularity counts on ductile iron are unreliable.</li>
                <li>Select the etchant by family: 2% Nital (or sequential Nital→Picral) for gray/ductile/malleable/CGI matrix; Beraha I for ADI ausferrite; 4% Picral or Vilella's for white-iron carbide morphology</li>
                <li>Apply Nital/Picral/Vilella's by cotton swab; apply Beraha I by immersion</li>
                <li>Etch for 5-30 s (Nital, Picral, Vilella's) or 30-180 s (Beraha I tint)</li>
                <li>Immediately rinse with water, then ethanol</li>
                <li>Dry with compressed air</li>
              </ol>
              <p>
                <strong>Important Notes:</strong>
              </p>
              <ul>
                <li>Graphite is <strong>not revealed by etching</strong> — it should already be visible after polishing. Document the unetched view (per ASTM A247 nodularity rating) <em>before</em> etching, since etch attack distorts apparent graphite shape.</li>
                <li>Etching reveals the matrix structure (ferrite, pearlite, bainite, ausferrite)</li>
                <li>Start with shorter etching times (5-10 seconds) and increase if needed</li>
                <li>Default etch for gray, ductile, malleable, CGI: <strong>2% Nital</strong>; if pearlite washes out, follow with <strong>4% Picral</strong> sequentially</li>
                <li>Default etch for ADI ausferrite: <strong>Beraha I tint</strong> — not stronger Nital</li>
                <li>Default etch for white iron / Ni-Hard / high-Cr iron: <strong>4% Picral or Vilella's</strong> for carbide morphology</li>
              </ul>
              <ProductLink 
                productName="Etchants"
                href="https://shop.metallographic.com/collections/etchants"
                description="Pre-mixed and custom etching solutions for cast iron, including Nital and Picral"
              />
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <h2>Troubleshooting</h2>
              <h3>Common Issues and Solutions</h3>
              <ul>
                <li><strong>Graphite pullout or missing graphite:</strong> Too much pressure during grinding or polishing. Reduce pressure, use softer cloths, and monitor the surface carefully. Graphite is soft and easily removed.</li>
                <li><strong>Graphite appears smeared:</strong> Over-polishing or too aggressive polishing. Reduce polishing time and pressure, use softer cloths.</li>
                <li><strong>Scratches remaining:</strong> Insufficient grinding/polishing time or skipped grits. Ensure complete scratch removal at each step, but use lighter pressure.</li>
                <li><strong>Graphite not visible after polishing:</strong> May have been removed during preparation. Start over with lighter pressure throughout the process.</li>
                <li><strong>Relief around graphite:</strong> Over-polishing or too soft a cloth. Reduce polishing time or use slightly harder cloth, but still maintain light pressure.</li>
                <li><strong>Contamination:</strong> Clean between steps, use fresh abrasives, and ensure proper sample cleaning.</li>
                <li><strong>Poor edge retention:</strong> Consider using phenolic mounting material or different mounting technique.</li>
                <li><strong>Over-etching:</strong> Reduce etching time or use lower Nital concentration. Start with shorter times (10-15 seconds).</li>
                <li><strong>Under-etching:</strong> Increase etching time or use higher Nital concentration. Ensure sample is clean before etching.</li>
                <li><strong>Matrix structure not revealed:</strong> May need longer etching time or different etchant. Try Picral for pearlitic structures.</li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
                <p className="text-sm text-yellow-900">
                  <strong>Remember:</strong> The most common mistake in cast iron preparation is using too much 
                  pressure, which removes or damages the graphite. Always err on the side of lighter pressure 
                  and gentler techniques.
                </p>
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
                <Link href="/guides/carbon-steel-preparation" className="text-primary-600 hover:underline font-semibold">
                  → Carbon Steel Preparation
                </Link>
                <Link href="/guides/grinding-techniques" className="text-primary-600 hover:underline font-semibold">
                  → Grinding Techniques
                </Link>
                <Link href="/guides/polishing-methods" className="text-primary-600 hover:underline font-semibold">
                  → Polishing Methods
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

