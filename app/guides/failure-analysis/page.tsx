import { Metadata } from 'next';
import Link from 'next/link';
import GuideSideNav from '@/components/GuideSideNav';
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo';

const guide = getGuideBySlug('failure-analysis')!;

export const metadata: Metadata = getGuideMetadata(guide);

const sections = [
  { id: 'introduction', label: 'Introduction to Failure Analysis' },
  { id: 'types-of-failures', label: 'Types of Material Failures' },
  { id: 'methodology', label: 'Failure Analysis Methodology' },
  { id: 'techniques', label: 'Common Failure Analysis Techniques' },
  { id: 'case-studies', label: 'Failure Analysis Case Studies' },
  { id: 'prep-artifacts', label: 'Common Prep Artifacts' },
  { id: 'best-practices', label: 'Best Practices in Failure Analysis' },
  { id: 'tools-equipment', label: 'Tools and Equipment' },
  { id: 'standards-references', label: 'Standards and References' },
  { id: 'conclusion', label: 'Conclusion' },
];

export default function FailureAnalysisPage() {
  const { articleStructuredData, courseStructuredData, breadcrumbStructuredData } = getGuideStructuredData(guide);

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
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold mb-6">Failure Analysis in Metallography</h1>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
              <p className="text-blue-800">
                <strong>Overview:</strong> Failure analysis is a critical application of metallography that helps identify the root causes of material failures, enabling engineers to prevent future occurrences and improve material design.
              </p>
            </div>

            <section id="introduction" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Introduction to Failure Analysis</h2>
          <p className="mb-4">
            Failure analysis in metallography involves the systematic investigation of material failures to determine their root causes. This process combines macroscopic examination, metallographic preparation, and microscopic analysis to understand why a component failed and how similar failures can be prevented.
          </p>
          <p className="mb-4">
            The goal of failure analysis is not just to identify what failed, but to understand <em>why</em> it failed, <em>when</em> it failed, and <em>how</em> to prevent similar failures in the future. This makes it a valuable tool in materials engineering, quality control, and product development.
          </p>
        </section>

            <section id="types-of-failures" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Types of Material Failures</h2>
          
          <h3 className="text-2xl font-semibold mb-3 mt-6">1. Ductile Failure</h3>
          <p className="mb-4">
            Ductile failures occur when materials undergo significant plastic deformation before fracture. Characteristics include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Necking and reduction in cross-sectional area</li>
            <li>Cup-and-cone fracture surfaces</li>
            <li>Dimpled fracture appearance at high magnification</li>
            <li>Evidence of plastic deformation in the microstructure</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">2. Brittle Failure</h3>
          <p className="mb-4">
            Brittle failures occur with little or no plastic deformation. Characteristics include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Flat, featureless fracture surfaces</li>
            <li>Cleavage facets (in crystalline materials)</li>
            <li>River patterns on fracture surfaces</li>
            <li>Minimal plastic deformation in surrounding material</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">3. Fatigue Failure</h3>
          <p className="mb-4">
            Fatigue failures result from cyclic loading below the material&apos;s ultimate strength. Characteristics include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Beach marks (macroscopic, optical):</strong> Concentric ring patterns visible to the naked eye or under low-power stereomicroscope. Each beach mark records a stretch of cycling under one set of conditions; transitions between beach marks correspond to load or environment changes (start/stop cycles, overload events). Useful for reconstructing the failure history.</li>
            <li><strong>Striations (microscopic, SEM):</strong> Fine parallel ridges only resolvable under SEM. Each striation corresponds to <em>one load cycle</em> of crack advance. Used to back-calculate cycle counts and crack growth rates. Beach marks and striations are different scales of feature, not synonyms — a single beach mark may contain thousands of striations.</li>
            <li>Multiple crack initiation sites (typical when stress concentrators or surface defects are present)</li>
            <li>Progressive crack growth patterns radiating from initiation</li>
            <li>Final fast fracture region (often ductile dimples in tough materials, cleavage in brittle ones)</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">4. Corrosion-Related Failure</h3>
          <p className="mb-4">
            Failures caused by environmental degradation. Types include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Stress corrosion cracking (SCC)</li>
            <li>Corrosion fatigue</li>
            <li>Intergranular corrosion</li>
            <li>Pitting and crevice corrosion</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">5. Creep Failure</h3>
          <p className="mb-4">
            Failures occurring under sustained loads at elevated temperatures. Characteristics include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Grain boundary cavitation</li>
            <li>Elongated grains in the direction of stress</li>
            <li>Intergranular fracture surfaces</li>
            <li>Time-dependent deformation</li>
          </ul>
        </section>

            <section id="methodology" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Failure Analysis Methodology</h2>
          
          <h3 className="text-2xl font-semibold mb-3 mt-6">Step 1: Background Information Collection</h3>
          <p className="mb-4">
            Before beginning any analysis, gather comprehensive information:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Component history and service conditions</li>
            <li>Material specifications and heat treatment</li>
            <li>Manufacturing processes and quality records</li>
            <li>Operating environment and loading conditions</li>
            <li>Failure chronology and witness accounts</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Step 2: Macroscopic Examination</h3>
          <p className="mb-4">
            Initial visual inspection provides critical information:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Document fracture surface appearance</li>
            <li>Identify crack initiation sites</li>
            <li>Note deformation patterns</li>
            <li>Record corrosion or environmental damage</li>
            <li>Photograph all relevant features</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Step 3: Sample Selection and Preparation</h3>
          <p className="mb-4">
            Careful sample selection is important for meaningful analysis:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Select samples from failure origin and unaffected areas</li>
            <li>Preserve fracture surfaces when possible</li>
            <li>Prepare cross-sections perpendicular to fracture surface</li>
            <li>Follow standard metallographic preparation techniques</li>
            <li>Use appropriate etching to reveal microstructure</li>
          </ul>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded">
            <h4 className="font-semibold mb-2">Two FA-specific prep rules that decide whether the analysis is defensible:</h4>
            <ul className="list-disc pl-6 mb-0 text-sm">
              <li className="mb-2"><strong>Mount in glass-filled epoxy, not phenolic.</strong> Most FA cross-section work — case-depth measurement, near-edge crack analysis, decarburization assessment, coating thickness — is exactly the case where edge retention matters most. Phenolic (Bakelite-style) mount wears 2-3× faster than steel during long polishes and rounds the sample-mount boundary by 10-50 µm — which is the same dimension scale as the features being measured. Glass-filled epoxy is the canonical FA mount.</li>
              <li><strong>Examine unetched first, then etch.</strong> Critical for distinguishing real defects from prep artifacts. Smooth, rounded pit walls = real porosity (gas, shrinkage, intentional sintered porosity). Irregular, fresh-fracture pit walls = pull-out, an artifact of polishing too aggressively. Etching obscures this distinction by attacking the matrix and changing apparent pit morphology. For cast iron specifically, the unetched view is also the only valid view for graphite morphology rating per ASTM A247.</li>
            </ul>
          </div>
          <p className="mb-4">
            Refer to our <Link href="/guides/sectioning" className="text-blue-600 hover:underline">sectioning</Link>, <Link href="/guides/grinding-techniques" className="text-blue-600 hover:underline">grinding</Link>, <Link href="/guides/polishing-methods" className="text-blue-600 hover:underline">polishing</Link>, and <Link href="/guides/metallographic-mounting" className="text-blue-600 hover:underline">mounting</Link> guides for proper sample preparation.
          </p>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Step 4: Microscopic Examination</h3>
          <p className="mb-4">
            Detailed microstructural analysis reveals failure mechanisms:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Examine microstructure at failure origin</li>
            <li>Compare with unaffected areas</li>
            <li>Identify microstructural anomalies</li>
            <li>Document grain size, phase distribution, and inclusions</li>
            <li>Look for evidence of degradation or damage</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Step 5: Fractography</h3>
          <p className="mb-4">
            Fracture surface examination (fractography) provides direct evidence of failure mode:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use scanning electron microscopy (SEM) for high-resolution imaging</li>
            <li>Identify fracture features (dimples, cleavage, striations)</li>
            <li>Determine crack propagation direction</li>
            <li>Identify secondary cracks and damage</li>
            <li>Correlate with microstructural features</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Step 6: Additional Testing</h3>
          <p className="mb-4">
            Supplementary tests may be necessary:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Hardness testing to verify heat treatment</li>
            <li>Chemical analysis to verify composition</li>
            <li>Mechanical property testing on unaffected material</li>
            <li>Corrosion testing if environmental factors are suspected</li>
            <li>Residual stress measurements</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Step 7: Root Cause Analysis</h3>
          <p className="mb-4">
            Synthesize all information to determine root cause:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Correlate findings with service conditions</li>
            <li>Identify primary and contributing factors</li>
            <li>Distinguish between design, material, manufacturing, and service issues</li>
            <li>Consider multiple failure mechanisms if applicable</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Step 8: Recommendations and Reporting</h3>
          <p className="mb-4">
            Document findings and provide actionable recommendations:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Prepare comprehensive written report</li>
            <li>Include high-quality micrographs and photographs</li>
            <li>Provide specific recommendations for prevention</li>
            <li>Suggest material or design improvements</li>
            <li>Document lessons learned</li>
          </ul>
        </section>

            <section id="techniques" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Common Failure Analysis Techniques</h2>
          
          <h3 className="text-2xl font-semibold mb-3 mt-6">Fracture Surface Analysis</h3>
          <p className="mb-4">
            The fracture surface contains the most direct evidence of failure mode. Key features to identify:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Crack initiation site:</strong> Usually at stress concentrators, defects, or surface damage</li>
            <li><strong>Propagation zone:</strong> Shows the mechanism of crack growth</li>
            <li><strong>Final fracture zone:</strong> Indicates the final failure mechanism</li>
            <li><strong>Secondary features:</strong> Corrosion products, debris, or environmental deposits</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Microstructural Analysis</h3>
          <p className="mb-4">
            Microstructural examination reveals material condition and degradation:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Grain size and distribution</li>
            <li>Phase composition and morphology</li>
            <li>Inclusion content and distribution</li>
            <li>Heat treatment condition</li>
            <li>Evidence of deformation or damage</li>
            <li>Corrosion or environmental attack</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Cross-Sectional Analysis</h3>
          <p className="mb-4">
            Examining cross-sections through the failure provides three-dimensional context:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Crack path through microstructure</li>
            <li>Relationship to grain boundaries or phases</li>
            <li>Depth of environmental attack</li>
            <li>Deformation patterns</li>
            <li>Microstructural gradients</li>
          </ul>
        </section>

            <section id="case-studies" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Failure Analysis Case Studies</h2>
          
          <h3 className="text-2xl font-semibold mb-3 mt-6">Case Study 1: Fatigue Failure of a Shaft</h3>
          <p className="mb-4">
            A rotating shaft (typically <Link href="/guides/carbon-steel-preparation" className="text-blue-600 hover:underline">4140 or 4340 carbon/low-alloy steel</Link> in the Q&amp;T condition, or fully hardened <Link href="/guides/tool-steel-preparation" className="text-blue-600 hover:underline">tool steel</Link>) failed after extended service. Analysis revealed:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Multiple fatigue crack initiation sites at keyway corners</li>
            <li>Beach marks (macroscopic) at low magnification, with striations resolvable under SEM showing per-cycle crack advance</li>
            <li>Final ductile overload region with dimpled fracture morphology</li>
            <li>Root cause: Stress concentration at sharp keyway corners combined with cyclic loading</li>
            <li>Solution: Redesign with radiused keyway corners and shot peening</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Case Study 2: Brittle Fracture of a Weld</h3>
          <p className="mb-4">
            A welded structure failed catastrophically. Investigation showed:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Cleavage fracture initiating from weld defects</li>
            <li>Coarse grain structure in heat-affected zone</li>
            <li>Low toughness at service temperature</li>
            <li>Root cause: Inadequate post-weld heat treatment and low-temperature service</li>
            <li>Solution: Proper PWHT and material selection for low-temperature applications</li>
          </ul>
          <p className="mb-4 text-sm">
            For the prep workflow specific to weld cross-sections — fusion zone, HAZ, and base metal each
            requiring its own etch — see the <Link href="/guides/welding-analysis" className="text-blue-600 hover:underline">welding analysis guide</Link>.
            Weld defect investigation per <strong>ASTM E340</strong> uses macroetching to expose fusion-zone
            penetration, HAZ extent, and weld-line discontinuities at the macroscopic scale before
            microstructural work.
          </p>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Case Study 3: Stress Corrosion Cracking</h3>
          <p className="mb-4">
            <Link href="/guides/stainless-steel-preparation" className="text-blue-600 hover:underline">Stainless steel</Link> component failed in service. Analysis identified:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Intergranular crack propagation</li>
            <li>Corrosion products in crack</li>
            <li>Sensitized microstructure (grain boundary carbides)</li>
            <li>Root cause: Sensitization from welding and exposure to corrosive environment</li>
            <li>Solution: Use low-carbon or stabilized grades (304L, 321, 347) and proper welding procedures</li>
          </ul>
          <p className="mb-4">
            <strong>Diagnostic etch that catches this pre-failure:</strong> <strong>10% oxalic acid electrolytic at 6 V for 90 s</strong> — the canonical sensitization detection per <strong>ASTM A262 Practice A</strong>.
            The etch reveals the &quot;ditched&quot; structure characteristic of continuous chromium-carbide precipitation along grain boundaries in sensitized 304/316. Any stainless component that has been welded and is destined for hot-water, chloride, or general corrosive service should pass A262 Practice A before commissioning. See the <Link href="/guides/stainless-steel-preparation" className="text-blue-600 hover:underline">stainless steel preparation guide</Link> for the full electrolytic-etch workflow.
          </p>
          <p className="mb-4">
            <strong>Cross-references for the other case studies:</strong> Case Study 1 (fatigue shaft) prep workflow lives in the <Link href="/guides/carbon-steel-preparation" className="text-blue-600 hover:underline">carbon and low-alloy steel guide</Link> for through-hardened 4140/4340-class shafts, and the <Link href="/guides/tool-steel-preparation" className="text-blue-600 hover:underline">tool steel guide</Link> if the shaft is fully hardened. Case Study 2 (welded structure brittle fracture) prep workflow lives in the <Link href="/guides/welding-analysis" className="text-blue-600 hover:underline">welding analysis guide</Link>.
          </p>
        </section>

            <section id="prep-artifacts" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Common Prep Artifacts in FA — Don&apos;t Mistake These for Defects</h2>
              <p className="mb-4">
                The most expensive failure-analysis mistakes are not technical fractography errors —
                they are <em>prep artifacts misreported as real component defects</em>. A pull-out crater
                misidentified as gas porosity will reject a perfectly good casting; a smeared surface
                misread as &quot;no microstructure&quot; will hide a real sensitization or decarburization
                problem. Each of the five common FA prep artifacts has a clean diagnostic question and
                a known fix. The longer-form troubleshooters below cover each in detail:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <Link href="/blog/edge-rounding-mount-fix" className="text-blue-600 hover:underline font-semibold">Edge rounding</Link> —
                  the coating disappears as the field of view approaches the mount; thickness measurements
                  drift between operators. Almost always a mount-material problem (phenolic instead of
                  glass-filled epoxy), not a polishing problem.
                </li>
                <li>
                  <Link href="/blog/smearing-soft-metals-no-etch" className="text-blue-600 hover:underline font-semibold">Mirror finish that won&apos;t etch (smearing)</Link> —
                  mechanical polishing has homogenized the surface so chemical etchants find no boundaries
                  to attack. Common on Cu, Al, Mg, and pure Ni. Fix: chemo-mechanical final polish with
                  H₂O₂ in colloidal silica.
                </li>
                <li>
                  <Link href="/blog/comet-tails-hard-particle-drag" className="text-blue-600 hover:underline font-semibold">Comet tails behind hard particles</Link> —
                  unidirectional scratches trailing carbides, slag inclusions, MMC reinforcement, or
                  cast-iron graphite. Fix: lower polishing force, harder pad, 90° rotation between
                  intervals.
                </li>
                <li>
                  <Link href="/blog/sic-embedment-soft-metals" className="text-blue-600 hover:underline font-semibold">Embedded SiC dark specks on soft metals</Link> —
                  random dots scattered across a polished Al, Mg, Pb, or Sn sample. Liberated SiC grit
                  pressed into the soft matrix during grinding. Fix: switch to alumina (ALO) papers
                  instead of SiC for soft non-ferrous.
                </li>
                <li>
                  <Link href="/blog/pullout-versus-real-porosity" className="text-blue-600 hover:underline font-semibold">Pull-out vs. real porosity</Link> —
                  the diagnostic that determines whether you reject a casting or reprep your sample. Smooth,
                  rounded pit walls = real porosity. Irregular, fresh-fracture walls = pull-out artifact.
                  Examine unetched first.
                </li>
              </ul>
              <p className="mb-4">
                When the FA conclusion turns on the presence or absence of a defect, run through the
                five questions above before signing the report.
              </p>
            </section>

            <section id="best-practices" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Best Practices in Failure Analysis</h2>
          
          <h3 className="text-2xl font-semibold mb-3 mt-6">Preservation of Evidence</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Protect fracture surfaces from damage and contamination</li>
            <li>Document everything before destructive testing</li>
            <li>Maintain chain of custody for legal cases</li>
            <li>Store samples properly to prevent further degradation</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Systematic Approach</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Follow a structured methodology</li>
            <li>Document all observations and measurements</li>
            <li>Use standardized terminology and classifications</li>
            <li>Maintain objectivity and avoid premature conclusions</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Quality Documentation</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>High-quality photographs at all stages</li>
            <li>Clear, labeled micrographs with scale bars</li>
            <li>Detailed written descriptions</li>
            <li>Comprehensive reports with conclusions and recommendations</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">Interdisciplinary Collaboration</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Work with design engineers, materials scientists, and manufacturing experts</li>
            <li>Consider all aspects: design, materials, manufacturing, and service</li>
            <li>Use expertise from multiple fields</li>
            <li>Ensure recommendations are practical and implementable</li>
          </ul>
        </section>

            <section id="tools-equipment" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Tools and Equipment</h2>
          <p className="mb-4">
            Effective failure analysis requires appropriate tools:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Macroscopic examination:</strong> Stereo microscopes, digital cameras, measuring tools</li>
            <li><strong>Metallographic preparation:</strong> Sectioning, mounting, grinding, and polishing equipment</li>
            <li><strong>Optical microscopy:</strong> Light microscopes with various illumination modes</li>
            <li><strong>Electron microscopy:</strong> SEM for high-resolution fractography</li>
            <li><strong>Hardness testing:</strong> Various scales for material characterization</li>
            <li><strong>Chemical analysis:</strong> EDS, XRF, or wet chemistry methods</li>
          </ul>
          <p className="mb-4">
            See our <Link href="/guides/equipment-overview" className="text-blue-600 hover:underline">equipment overview</Link> guide for more information on metallographic equipment.
          </p>
        </section>

            <section id="standards-references" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Standards and References</h2>
          <p className="mb-4">
            Standards directly relevant to failure analysis practice:
          </p>
          <h3 className="text-xl font-semibold mb-2 mt-4">General preparation and terminology</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>ASTM E3</strong> — Standard Practice for Preparation of Metallographic Specimens</li>
            <li><strong>ASTM E407</strong> — Standard Practice for Microetching Metals and Alloys (the canonical etchant reference; assigns numeric IDs to standard etchants like Nital, Glyceregia, Keller&apos;s, Kroll&apos;s, Marble&apos;s)</li>
            <li><strong>ASTM E883</strong> — Standard Guide for Reflected-Light Photomicrography</li>
            <li><strong>ASTM E1823</strong> — Standard Terminology Relating to Fatigue and Fracture Testing</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2 mt-4">Defect-specific diagnostic standards</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>ASTM A262</strong> — Detecting Susceptibility to Intergranular Attack in Austenitic Stainless Steels (Practice A: oxalic acid electrolytic etch — the canonical sensitization diagnostic)</li>
            <li><strong>ASTM A923</strong> — Detecting Detrimental Intermetallic Phase in Duplex Austenitic/Ferritic Stainless Steels</li>
            <li><strong>ASTM A763</strong> — Detecting Susceptibility to Intergranular Attack in Ferritic Stainless Steels</li>
            <li><strong>ASTM A247</strong> — Evaluating the Microstructure of Graphite in Iron Castings (nodularity rating; <em>required to be performed on as-polished, unetched specimens</em>)</li>
            <li><strong>ASTM E45</strong> — Determining the Inclusion Content of Steel (worst-field method; A-D classification charts)</li>
            <li><strong>ASTM E340</strong> — Macroetching Metals and Alloys (weld penetration, HAZ extent, segregation, flow lines — relevant to weld and forging FA)</li>
            <li><strong>ASTM E1077</strong> — Estimating the Depth of Decarburization of Steel Specimens</li>
            <li><strong>ASTM E1351</strong> — Production and Evaluation of Field Metallographic Replicas (in-service non-destructive examination)</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2 mt-4">Coatings and surface treatments</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>ASTM E1920</strong> — Standard Guide for Metallographic Preparation of Thermal Sprayed Coatings</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2 mt-4">Reference handbooks</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>ASM Handbook Volume 11 — Failure Analysis and Prevention</li>
            <li>ASM Handbook Volume 12 — Fractography</li>
            <li>ASM Handbook Volume 9 — Metallography and Microstructures (recipe reference for etchants and prep ladders)</li>
          </ul>
          <p className="mb-4">
            Refer to our <Link href="/resources/astm-standards-reference" className="text-blue-600 hover:underline">ASTM standards reference</Link> for the full list with descriptions.
          </p>
        </section>

            <section id="conclusion" className="mb-8 scroll-mt-24">
              <h2 className="text-3xl font-semibold mb-4">Conclusion</h2>
          <p className="mb-4">
            Failure analysis is a critical discipline that combines metallographic techniques with engineering analysis to understand material failures. By systematically investigating failures, engineers can identify root causes, prevent future occurrences, and improve material and component design.
          </p>
          <p className="mb-4">
            Success in failure analysis requires:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Thorough understanding of metallographic techniques</li>
            <li>Knowledge of material behavior and failure mechanisms</li>
            <li>Systematic, methodical approach</li>
            <li>Attention to detail and preservation of evidence</li>
            <li>Clear communication of findings and recommendations</li>
          </ul>
          <p className="mb-4">
            For more information on metallographic techniques, see our guides on <Link href="/guides/sectioning" className="text-blue-600 hover:underline">sectioning</Link>, <Link href="/guides/grinding-techniques" className="text-blue-600 hover:underline">grinding</Link>, <Link href="/guides/polishing-methods" className="text-blue-600 hover:underline">polishing</Link>, and <Link href="/guides/microstructural-analysis" className="text-blue-600 hover:underline">microstructural analysis</Link>.
          </p>
        </section>

            <div className="mt-12 pt-8 border-t">
              <h2 className="text-2xl font-semibold mb-4">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/guides/microstructural-analysis" className="block p-4 border rounded-lg hover:bg-gray-50">
                  <h3 className="font-semibold text-lg mb-2">Microstructural Analysis</h3>
                  <p className="text-gray-600">Learn techniques for analyzing material microstructures</p>
                </Link>
                <Link href="/guides/safety-fundamentals" className="block p-4 border rounded-lg hover:bg-gray-50">
                  <h3 className="font-semibold text-lg mb-2">Safety Fundamentals</h3>
                  <p className="text-gray-600">Essential safety practices for metallographic work</p>
                </Link>
                <Link href="/guides/equipment-overview" className="block p-4 border rounded-lg hover:bg-gray-50">
                  <h3 className="font-semibold text-lg mb-2">Equipment Overview</h3>
                  <p className="text-gray-600">Overview of metallographic equipment and tools</p>
                </Link>
                <Link href="/guides/purpose-and-applications" className="block p-4 border rounded-lg hover:bg-gray-50">
                  <h3 className="font-semibold text-lg mb-2">Purpose and Applications</h3>
                  <p className="text-gray-600">Understanding the applications of metallography</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </article>
    </>
  );
}

