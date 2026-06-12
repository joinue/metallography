import { Metadata } from 'next'
import Image from 'next/image'
import ProductLink from '@/components/ProductLink'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import MaterialTooltip from '@/components/MaterialTooltip'

export const metadata: Metadata = {
  title: 'Nickel Alloys Sample Preparation Guide | Metallography.org',
  description: 'Complete step-by-step guide to preparing nickel and nickel-based superalloy samples for metallographic analysis. Learn specialized techniques for high-temperature alloys.',
  keywords: [
    'nickel alloys preparation',
    'nickel superalloys',
    'nickel metallography',
    'nickel sample preparation',
    'superalloy preparation',
    'Inconel preparation',
    'metallographic analysis',
    'microstructure analysis',
  ],
  openGraph: {
    title: 'Nickel Alloys Sample Preparation Guide | Metallography.org',
    description: 'Complete step-by-step guide to preparing nickel and nickel-based superalloy samples for metallographic analysis.',
    url: 'https://metallography.org/guides/nickel-alloys-preparation',
    siteName: 'Metallography.org',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Nickel alloys microstructure',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nickel Alloys Sample Preparation Guide',
    description: 'Complete step-by-step guide to preparing nickel and nickel-based superalloy samples for metallographic analysis.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://metallography.org/guides/nickel-alloys-preparation',
  },
}

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'sectioning', label: 'Sectioning' },
  { id: 'mounting', label: 'Mounting' },
  { id: 'grinding', label: 'Grinding' },
  { id: 'polishing', label: 'Polishing' },
  { id: 'etching', label: 'Etching' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
]

export default function NickelAlloysGuide() {
  // Article structured data
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Nickel Alloys Sample Preparation Guide',
    description: 'Complete step-by-step guide to preparing nickel and nickel-based superalloy samples for metallographic analysis, including sectioning, mounting, grinding, polishing, and etching techniques.',
    image: 'https://metallography.org/logo.png',
    author: {
      '@type': 'Organization',
      name: 'Metallography.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Metallography.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://metallography.org/logo.png',
      },
    },
    datePublished: '2024-10-01', // Original publication date
    dateModified: new Date().toISOString().split('T')[0], // Current date for freshness
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://metallography.org/guides/nickel-alloys-preparation',
    },
    articleSection: 'Material-Specific',
    about: {
      '@type': 'Thing',
      name: 'Nickel Alloys Metallography',
    },
  }

  // HowTo structured data
  const howToStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Prepare Nickel Alloy Samples for Metallographic Analysis',
    description: 'Step-by-step guide to preparing nickel and nickel-based superalloy samples for metallographic analysis',
    image: 'https://metallography.org/logo.png',
    totalTime: 'PT50M',
    tool: [
      { '@type': 'HowToTool', name: 'Abrasive cutting saw' },
      { '@type': 'HowToTool', name: 'Mounting press' },
      { '@type': 'HowToTool', name: 'Grinding papers' },
      { '@type': 'HowToTool', name: 'Polishing equipment' },
    ],
    step: [
      {
        '@type': 'HowToStep',
        name: 'Sectioning',
        text: 'Use an abrasive blade formulated for nickel and cobalt superalloys (typically a CBN or Al₂O₃ wheel with a medium-hard bond) with continuous flood coolant. Apply light, steady pressure and let the blade do the work — Ni and Co superalloys work-harden quickly under high force.',
        position: 1,
      },
      {
        '@type': 'HowToStep',
        name: 'Mounting',
        text: 'Use compression mounting. For superalloys, glass-filled epoxy is preferred for its superior edge retention; reserve plain phenolic for general-structure work where edge fidelity is not critical.',
        position: 2,
      },
      {
        '@type': 'HowToStep',
        name: 'Grinding',
        text: 'Progressive grinding: 120, 240, 400, 600, 800 grit. Use light pressure and rotate 90° between grits.',
        position: 3,
      },
      {
        '@type': 'HowToStep',
        name: 'Polishing',
        text: 'Diamond polishing: 9 μm, 6 μm, 3 μm, 1 μm. Final polish with 0.05 μm colloidal silica or alumina.',
        position: 4,
      },
      {
        '@type': 'HowToStep',
        name: 'Etching',
        text: 'Marble\'s reagent (4 g CuSO₄ + 20 mL HCl + 20 mL H₂O) by swab is the canonical general etch for Ni-base superalloys, Inconel, Hastelloy, and Co-base alloys. Modified Kalling\'s for Inconel/Hastelloy detail. For γ′ precipitate imaging, use 5% chromic acid electrolytic at 5 V for 5-10 s.',
        position: 5,
      },
    ],
  }

  // Course structured data
  const courseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Nickel Alloys Sample Preparation Guide',
    description: 'Complete in-depth guide to preparing nickel and nickel-based superalloy samples for metallographic analysis',
    provider: {
      '@type': 'Organization',
      name: 'Metallography.org',
    },
    educationalLevel: 'Advanced',
    timeRequired: 'PT14M',
    courseCode: 'MET-NICKEL-ALLOYS',
  }

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://metallography.org',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: 'https://metallography.org/guides',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Nickel Alloys Preparation',
        item: 'https://metallography.org/guides/nickel-alloys-preparation',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Nickel and Cobalt Superalloys Preparation
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Material-Specific Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Nickel and Cobalt Superalloys Sample Preparation</h1>
            <p className="text-xl text-gray-600">
              A comprehensive guide to preparing nickel and cobalt superalloy samples for metallographic analysis, 
              covering specialized techniques for high-temperature alloys including <MaterialTooltip materialName="Inconel 718">Inconel</MaterialTooltip>, <MaterialTooltip materialName="Hastelloy C-276">Hastelloy</MaterialTooltip>, <MaterialTooltip materialName="Cobalt-Chromium Alloy (Stellite 6)">Stellite</MaterialTooltip>, and other superalloys.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-primary-600 hover:underline">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                Nickel and cobalt superalloys are among the most challenging materials to prepare for 
                metallographic analysis. These materials are used in high-temperature applications, aerospace, 
                chemical processing, and wear-resistant applications due to their excellent corrosion resistance, 
                high strength, temperature stability, and hardness.
              </p>
              <p>
                Common nickel alloys include <MaterialTooltip materialName="Inconel 718">Inconel</MaterialTooltip> (600, 625, 718, 738), <MaterialTooltip materialName="Hastelloy C-276">Hastelloy</MaterialTooltip> (C-276, X), Monel, and various 
                superalloys. Cobalt alloys like <MaterialTooltip materialName="Cobalt-Chromium Alloy (Stellite 6)">Stellite</MaterialTooltip> are also high-temperature, 
                wear-resistant materials with similar preparation challenges. These materials often contain complex 
                microstructures with multiple phases including gamma prime (γ'), carbides, and other precipitates 
                that require careful preparation to reveal.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
                <p className="text-sm text-blue-900">
                  <strong>Key Challenge:</strong> Nickel and cobalt superalloys are typically very hard and work-harden easily. 
                  They require slow cutting speeds, careful grinding, and extended polishing times to avoid 
                  introducing deformation artifacts. Cobalt alloys like <MaterialTooltip materialName="Cobalt-Chromium Alloy (Stellite 6)">Stellite</MaterialTooltip> are particularly hard (450+ HB) 
                  and contain carbides that must be preserved.
                </p>
              </div>
            </section>

            <section id="sectioning" className="scroll-mt-24">
              <h2>Sectioning</h2>
              <p>
                Nickel and cobalt superalloys are extremely hard and work-harden rapidly during cutting. Proper sectioning is 
                critical to minimize deformation and heat generation. Cobalt alloys like <MaterialTooltip materialName="Cobalt-Chromium Alloy (Stellite 6)">Stellite</MaterialTooltip> are particularly hard 
                (450+ HB) and require careful cutting techniques.
              </p>
              
              <h3>Cutting Parameters</h3>
              <ul>
                <li><strong>Blade Selection:</strong> an <strong>abrasive blade formulated for nickel and cobalt superalloys</strong> — a CBN or Al₂O₃ wheel with a medium-hard bond, rated for Inconel, Hastelloy, and Co-base superalloys. Do <em>not</em> substitute a soft-bond non-ferrous (Al/Cu/brass) blade — its soft bond breaks down and wears away far too fast on a hard superalloy, while a blade bonded too hard for the alloy will glaze and burn.</li>
                <li><strong>Cooling:</strong> Continuous flood coolant is non-negotiable — Ni and Co superalloys generate heat fast and work-harden under it</li>
                <li><strong>Feed Rate:</strong> Slow, steady feed; let the blade cut at its own pace. Heavy force drives mechanical deformation deeper than the next plane-grind step can remove.</li>
                <li><strong>Wheel speed:</strong> Standard metallographic abrasive cutoff range (typical machines run 2,500-4,500 SFM)</li>
              </ul>

              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <ProductLink
                  productName="Nickel/Superalloy Abrasive Blades"
                  href="https://shop.metallographic.com/collections/abrasive-blades"
                  description="Medium-hard bond CBN and Al₂O₃ abrasive blades formulated for nickel and cobalt superalloys — appropriate for Inconel, Hastelloy, Waspaloy, Stellite, and other hard Ni- and Co-base alloys."
                />
              </div>

              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/cutting-fluids"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/maxcut-cutting-fluids.webp"
                    alt="Cutting fluids for nickel alloy sectioning"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Cutting fluids are essential for nickel and cobalt superalloy sectioning to prevent overheating and minimize deformation. Continuous cooling throughout the cut is critical.</p>
              </div>

              <h3>Best Practices</h3>
              <ul>
                <li>Use thin blades (0.5-1.0 mm) to minimize kerf loss and heat generation</li>
                <li>Maintain constant cooling throughout the cut</li>
                <li>Avoid excessive pressure - let the blade do the work</li>
                <li>For small, delicate, or very hard superalloy samples, consider a precision wafering saw at low feed — it leaves a damage layer roughly 10× thinner than abrasive cutoff</li>
              </ul>
            </section>

            <section id="mounting" className="scroll-mt-24">
              <h2>Mounting</h2>
              <p>
                The canonical mount for superalloy work is <strong>glass-filled epoxy compression
                mount</strong>. Plain phenolic (Bakelite-style) is the wrong choice on Ni and Co superalloys
                whenever edge retention matters — turbine blade cross-sections, fastener fatigue analysis,
                near-edge γ′/γ″ precipitate distribution, single-crystal orientation studies — because phenolic wears
                faster than the alloy and rounds the sample-mount boundary, biasing every near-edge
                measurement. Reserve plain phenolic for low-stakes general-structure work where edge fidelity
                isn't a deliverable.
              </p>

              <h3>Mounting Materials</h3>
              <ul>
                <li><strong>Glass-filled epoxy (preferred for superalloy work):</strong> Best edge retention; matches the differential-wear profile of Ni/Co superalloys. The right answer for Inconel 718 γ′/γ″ work, Hastelloy fatigue cross-sections, and any case where near-edge structure is the analysis goal.</li>
                <li><strong>Plain epoxy:</strong> Acceptable when the analysis goal is bulk microstructure rather than near-edge features. Low shrinkage reduces mount-sample gaps.</li>
                <li><strong>Phenolic resins:</strong> Acceptable for general-structure low-stakes work only. Will round the sample-mount edge during long polishes; not appropriate when edge retention matters.</li>
                <li><strong>Mounting Cycle:</strong> 150-180°C at 3,000-4,500 psi (about 4,200 psi is typical); cure ~5 minutes, then cool under pressure</li>
              </ul>

              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/mounting-materials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/epoxy-compression-mounting.webp"
                    alt="Epoxy compression mounting materials for nickel alloys"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Glass-filled epoxy compression mounting materials are preferred for nickel superalloys because they wear at a rate close to the alloy, preserving the sample-mount edge during long polishing cycles.</p>
              </div>

              <h3>Mounting Procedure</h3>
              <ol>
                <li>Clean the sample thoroughly to remove cutting fluid and debris</li>
                <li>Select appropriate mold size (typically 1.25" or 1.5" diameter)</li>
                <li>Place sample in mold with the surface of interest facing up</li>
                <li>Add mounting compound and mount at recommended temperature and pressure</li>
                <li>Allow to cool slowly to room temperature before removing from mold</li>
              </ol>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
                <p className="text-sm text-yellow-900">
                  <strong>Important:</strong> Avoid rapid cooling of mounted samples as this can cause cracking 
                  in both the mount and the sample, especially for superalloys.
                </p>
              </div>
            </section>

            <section id="grinding" className="scroll-mt-24">
              <h2>Grinding</h2>
              <p>
                Progressive grinding is essential for nickel alloys. These materials work-harden easily, so 
                consistent pressure and proper grit progression are critical.
              </p>

              <h3>Grinding Sequence</h3>
              <ol>
                <li><strong>120 grit:</strong> Remove sectioning damage - 2-3 minutes per sample</li>
                <li><strong>240 grit:</strong> Remove 120 grit scratches - 2-3 minutes</li>
                <li><strong>400 grit:</strong> Further refinement - 2-3 minutes</li>
                <li><strong>600 grit:</strong> Fine grinding - 2-3 minutes</li>
                <li><strong>800 grit:</strong> Optional for superalloys - 2 minutes</li>
              </ol>

              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/sic-grinding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/abrasive grinding-SiC papers.webp"
                    alt="Silicon carbide grinding papers for nickel alloys"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Silicon carbide (SiC) grinding papers in various grit sizes (120, 240, 400, 600, 800) for progressive grinding. Rotate sample 90° between each grit to ensure complete scratch removal.</p>
              </div>

              <h3>Grinding Parameters</h3>
              <ul>
                <li><strong>Pressure:</strong> Moderate (25-30 N, about 5-7 lbs per sample) — enough to keep the paper cutting; excessive force work-hardens the surface</li>
                <li><strong>Rotation:</strong> Rotate sample 90° between each grit</li>
                <li><strong>Water Flow:</strong> Continuous water flow to remove debris and prevent loading</li>
                <li><strong>Speed:</strong> 240-300 RPM for grinding wheels</li>
              </ul>

              <ProductLink 
                productName="Silicon Carbide Grinding Papers"
                href="https://shop.metallographic.com/collections/sic-grinding"
                description="Premium SiC papers in all grit sizes for consistent grinding of nickel alloys"
              />

              <div className="bg-gray-50 p-4 my-6 rounded">
                <h4 className="font-semibold mb-2">Grinding Tips for Nickel Alloys</h4>
                <ul className="text-sm space-y-1">
                  <li>• Use fresh grinding papers - nickel alloys can quickly load papers</li>
                  <li>• Maintain consistent pressure throughout each step</li>
                  <li>• Ensure all scratches from previous grit are removed before proceeding</li>
                  <li>• For superalloys, consider using SiC papers up to 1200 grit</li>
                </ul>
              </div>
            </section>

            <section id="polishing" className="scroll-mt-24">
              <h2>Polishing</h2>
              <p>
                Diamond polishing is essential for nickel alloys. These materials require extended polishing times 
                and careful attention to avoid introducing deformation or pullout of hard phases.
              </p>

              <h3>Diamond Polishing Sequence</h3>
              <ol>
                <li><strong>9 μm diamond:</strong> 5-8 minutes on a hard woven cloth (silk or woven nylon)</li>
                <li><strong>6 μm diamond:</strong> 4-6 minutes on medium-hard cloth</li>
                <li><strong>3 μm diamond:</strong> 4-6 minutes on medium cloth</li>
                <li><strong>1 μm diamond:</strong> 3-5 minutes on soft cloth</li>
                <li><strong>Final polish:</strong> 0.05 μm colloidal silica or 0.3 μm alumina - 2-4 minutes; with colloidal silica, flush with water for the last 30-60 seconds while still polishing to prevent silica residue and staining</li>
              </ol>

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
                      alt="Polycrystalline diamond polishing compound for nickel alloys"
                      width={300}
                      height={225}
                      className="w-full h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                  </Link>
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Polycrystalline diamond compound provides aggressive cutting action ideal for hard nickel alloys and superalloys.</p>
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
                  <p className="text-xs text-gray-600 mt-2 italic text-center">Various polishing pads and cloths for different polishing stages. Select pad hardness based on nickel alloy and polishing stage.</p>
                </div>
              </div>

              <h3>Polishing Parameters</h3>
              <ul>
                <li><strong>Pressure:</strong> Moderate (20-25 N, about 4-5 lbs) for the diamond steps, easing to 15-20 N on the final steps - avoid excessive pressure</li>
                <li><strong>Speed:</strong> 120-150 RPM for diamond polishing</li>
                <li><strong>Lubricant:</strong> Diamond suspension in water or oil-based lubricant</li>
                <li><strong>Cloth Selection:</strong> Harder cloths for coarse steps, softer for fine steps</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
                <p className="text-sm text-blue-900">
                  <strong>Superalloy Consideration:</strong> Nickel superalloys with gamma prime (γ') precipitates
                  require careful polishing to avoid pullout. Use light pressure and extend polishing times at
                  each step. Final polish with colloidal silica is essential to reveal fine precipitates.
                </p>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded">
                <p className="text-sm text-amber-900">
                  <strong>Inconel MC-carbide comet tails — watch for these on the diamond steps.</strong>
                  Inconel and most Ni-base superalloys carry MC carbides (NbC, TiC) that drag during
                  diamond polishing, leaving unidirectional comet-tail scratches behind the carbides. The
                  fix is <strong>rotating the sample 90° between polishing intervals</strong> (e.g., polish
                  90 s, stop, rotate the holder, polish another 90 s) — this breaks up the directional drag
                  pattern. Lighter pressure helps, as does switching to a harder pad. Simply extending the
                  polish time without rotating won't remove comet tails — the unidirectional drag pattern
                  keeps reforming in the same direction.
                </p>
              </div>

              <h3>Final Polishing</h3>
              <p>
                For nickel alloys, especially superalloys, final polishing with colloidal silica (0.05 μm) or 
                fine alumina (0.3 μm) is critical. This step removes any remaining deformation and reveals the 
                true microstructure including fine precipitates.
              </p>
              <div className="my-6 rounded-lg overflow-hidden max-w-xl mx-auto">
                <Link 
                  href="https://shop.metallographic.com/collections/final-polishing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/images/consumables/final-polishing-coloidal-silica.webp"
                    alt="Colloidal silica for final polishing of nickel alloys"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Colloidal silica (0.05 μm) is essential for final polishing of nickel superalloys to reveal fine precipitates like gamma prime (γ') without pullout.</p>
              </div>
            </section>

            <section id="etching" className="scroll-mt-24">
              <h2>Etching</h2>
              <p>
                Nickel and cobalt superalloys take Marble's reagent as the canonical first-pass etch, with
                Modified Kalling's for sharper detail on Inconel and Hastelloy. The classic γ′ imaging etch
                is electrolytic 5% chromic acid at 5 V — chemical etches don't give the same crisp γ matrix /
                γ′ precipitate contrast that the chromic gives at SEM magnification. Murakami's reagent darkens
                the Cr-rich carbides in Stellite-class Co-base wear alloys.
              </p>

              <h3>Common Etchants for Nickel and Cobalt Superalloys</h3>

              <div className="overflow-x-auto my-6">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Etchant</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Composition</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Application</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Method &amp; Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2"><strong>Marble's Reagent</strong></td>
                      <td className="border border-gray-300 px-4 py-2">4 g CuSO₄ + 20 mL HCl + 20 mL H₂O</td>
                      <td className="border border-gray-300 px-4 py-2">General Ni-base structure — <MaterialTooltip materialName="Inconel 718">Inconel</MaterialTooltip>, <MaterialTooltip materialName="Hastelloy C-276">Hastelloy</MaterialTooltip>, Co-base alloys (Stellite). The default first-pass etch for the entire family.</td>
                      <td className="border border-gray-300 px-4 py-2">Swab 10-60 s</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2"><strong>Modified Kalling's (Kalling's No. 2)</strong></td>
                      <td className="border border-gray-300 px-4 py-2">5 g CuCl₂ + 100 mL HCl + 100 mL ethanol</td>
                      <td className="border border-gray-300 px-4 py-2">Inconel and Hastelloy detail — sharper grain-boundary contrast than Marble's; also a respectable γ′ outline if no chromic electrolyte is available.</td>
                      <td className="border border-gray-300 px-4 py-2">Immersion 10-30 s</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2"><strong>5% Chromic Acid (electrolytic) — for γ′ imaging</strong></td>
                      <td className="border border-gray-300 px-4 py-2">5 g CrO₃ in 100 mL H₂O</td>
                      <td className="border border-gray-300 px-4 py-2">The canonical γ′ etch for Ni superalloys (Waspaloy, Rene 41/N5, Nimonic; in <MaterialTooltip materialName="Inconel 718">Inconel 718</MaterialTooltip> it reveals the γ″/γ′ dispersion). Selective electrolytic attack throws the precipitates into sharp contrast against the γ matrix — best at SEM magnification.</td>
                      <td className="border border-gray-300 px-4 py-2">5 V, 5-10 s</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2"><strong>Murakami's Reagent</strong></td>
                      <td className="border border-gray-300 px-4 py-2">10 g K₃[Fe(CN)₆] + 10 g NaOH + 100 mL H₂O</td>
                      <td className="border border-gray-300 px-4 py-2">Carbide imaging in Co-base wear alloys (<MaterialTooltip materialName="Cobalt-Chromium Alloy (Stellite 6)">Stellite 6, 12, 21</MaterialTooltip>) — the Cr-rich carbides are the metallographic interest in these alloys, and Murakami's selectively attacks them.</td>
                      <td className="border border-gray-300 px-4 py-2">Swab 5-30 s (heated for refractory)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 italic">
                Note: Glyceregia and aqua regia are <em>stainless steel</em> etchants and should not lead a Ni-base
                workflow — Glyceregia is the canonical austenitic-stainless general etch and aqua regia is for
                noble metals. They occasionally work on Ni alloys but Marble's gives cleaner contrast on the same
                samples. Similarly, 10% oxalic at 6 V is the austenitic-stainless sensitization etch (ASTM A262
                Practice A), not a γ′ etch — for γ′ imaging, use the 5% chromic electrolytic above.
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
                    alt="Etching solutions and reagents for nickel alloys"
                    width={500}
                    height={375}
                    className="w-full h-auto"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                  />
                </Link>
                <p className="text-sm text-gray-600 mt-2 italic text-center">Etching solutions and reagents for nickel and cobalt superalloys. Common etchants include Marble's reagent, Modified Kalling's (Kalling's No. 2), Murakami's, and electrolytic chromic acid. Etching time typically ranges from 5-60 seconds depending on the etchant and alloy composition.</p>
              </div>

              <h3>Etching Procedure</h3>
              <ol>
                <li>Ensure sample is clean and dry before etching</li>
                <li>Apply etchant using cotton swab or immerse sample</li>
                <li>Agitate gently if using swab method</li>
                <li>Monitor etching progress - nickel alloys can over-etch quickly</li>
                <li>Rinse immediately with water, then ethanol</li>
                <li>Dry with compressed air or warm air stream</li>
              </ol>

              <ProductLink 
                productName="Etching Solutions"
                href="https://shop.metallographic.com/collections/etchants"
                description="Etching solutions and reagents for nickel alloys and superalloys"
              />

              <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
                <p className="text-sm text-red-900">
                  <strong>Safety Warning:</strong> Many nickel alloy etchants contain strong acids and are highly 
                  corrosive. Always use appropriate personal protective equipment including gloves, safety glasses, 
                  and work in a well-ventilated area or fume hood.
                </p>
              </div>

              <h3>Alloy-Specific Etching</h3>
              <ul>
                <li><strong><MaterialTooltip materialName="Inconel 718">Inconel 718</MaterialTooltip> (general structure):</strong> Marble's reagent by swab, or Modified Kalling's by immersion for sharper grain-boundary contrast</li>
                <li><strong>Inconel 718 (precipitate imaging):</strong> 5% chromic acid electrolytic at 5 V for 5-10 s. Note that 718 is strengthened primarily by γ″ (Ni₃Nb) with secondary γ′ — the chromic electrolytic reveals the combined dispersion. Best at SEM magnification.</li>
                <li><strong><MaterialTooltip materialName="Hastelloy C-276">Hastelloy C-276</MaterialTooltip>:</strong> Marble's for general structure; Modified Kalling's for detail</li>
                <li><strong>Waspaloy, Rene 41, Rene N5, Nimonic 80A/90/105 (aerospace γ′-strengthened):</strong> Marble's or Modified Kalling's for general structure; 5% chromic electrolytic for γ′</li>
                <li><strong>Monel 400, K-500:</strong> Treated as Ni-base — Marble's or Modified Kalling's</li>
                <li><strong><MaterialTooltip materialName="Cobalt-Chromium Alloy (Stellite 6)">Stellite 6, 12, 21</MaterialTooltip> (Co-base):</strong> Marble's for general structure; Murakami's for the Cr-rich carbides that are usually the analysis goal</li>
              </ul>
            </section>

            <section id="troubleshooting" className="scroll-mt-24">
              <h2>Troubleshooting</h2>
              
              <h3>Common Issues and Solutions</h3>
              
              <div className="space-y-4 my-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Problem: Excessive Deformation</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Symptoms:</strong> Smearing, distorted microstructure, difficulty revealing grain boundaries
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Solutions:</strong> Reduce cutting speed, use lighter grinding/polishing pressure, extend 
                    polishing times, ensure proper grit progression
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Problem: Pullout of Hard Phases</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Symptoms:</strong> Holes or pits in the surface, missing carbides or precipitates
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Solutions:</strong> Use lighter polishing pressure, extend polishing times, use softer 
                    polishing cloths for final steps, consider vibratory polishing for superalloys
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Problem: Over-Etching</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Symptoms:</strong> Dark, obscured microstructure, excessive relief
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Solutions:</strong> Reduce etching time, use weaker etchant concentration, rinse immediately 
                    after etching, re-polish and re-etch if necessary
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Problem: Incomplete Etching</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Symptoms:</strong> No contrast, grain boundaries not visible, flat appearance
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Solutions:</strong> Increase etching time, try different etchant, ensure sample is clean, 
                    check etchant freshness, consider electrolytic etching for difficult alloys
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Need More Help?</h3>
              <p className="text-gray-600 mb-4">
                Explore our other guides or use our tools to find the right products and procedures for your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/guides" className="btn-primary text-center">
                  Browse All Guides
                </Link>
                <Link href="/etchants" className="btn-secondary text-center">
                  Find Etchants
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

