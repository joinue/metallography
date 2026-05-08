import { Metadata } from 'next'
import Image from 'next/image'
import GuideSideNav from '@/components/GuideSideNav'
import Link from 'next/link'
import { getGuideMetadata, getGuideStructuredData, getGuideBySlug } from '@/lib/guide-seo'

const guide = getGuideBySlug('quality-control-inspection')!

export const metadata: Metadata = getGuideMetadata(guide)

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'quality-control-principles', label: 'Quality Control Principles' },
  { id: 'inspection-procedures', label: 'Inspection Procedures' },
  { id: 'standards-compliance', label: 'Standards and Compliance' },
  { id: 'documentation', label: 'Documentation and Reporting' },
  { id: 'common-issues', label: 'Common Quality Issues' },
  { id: 'quality-checkpoints', label: 'Quality Control Checkpoints' },
  { id: 'statistical-control', label: 'Statistical Process Control' },
  { id: 'certification', label: 'Certification and Accreditation' },
  { id: 'best-practices', label: 'Best Practices' },
]

export default function QualityControlInspectionGuide() {
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
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / Quality Control and Inspection
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2 block">
              Process Guide
            </span>
            <h1 className="text-4xl font-bold mb-4">Quality Control and Inspection in Metallography</h1>
            <p className="text-xl text-gray-600">
              Learn about quality control procedures, inspection protocols, standards compliance, and best practices 
              for ensuring reliable and reproducible metallographic analysis results.
            </p>
          </header>

          {/* Table of Contents - Mobile/Tablet (below lg/1024px) */}
          <div className="lg:hidden bg-gray-50 border-l-4 border-primary-600 p-6 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#introduction" className="text-primary-600 hover:underline">Introduction</a></li>
              <li><a href="#quality-control-principles" className="text-primary-600 hover:underline">Quality Control Principles</a></li>
              <li><a href="#inspection-procedures" className="text-primary-600 hover:underline">Inspection Procedures</a></li>
              <li><a href="#standards-compliance" className="text-primary-600 hover:underline">Standards and Compliance</a></li>
              <li><a href="#documentation" className="text-primary-600 hover:underline">Documentation and Reporting</a></li>
              <li><a href="#common-issues" className="text-primary-600 hover:underline">Common Quality Issues</a></li>
              <li><a href="#quality-checkpoints" className="text-primary-600 hover:underline">Quality Control Checkpoints</a></li>
              <li><a href="#statistical-control" className="text-primary-600 hover:underline">Statistical Process Control</a></li>
              <li><a href="#certification" className="text-primary-600 hover:underline">Certification and Accreditation</a></li>
              <li><a href="#best-practices" className="text-primary-600 hover:underline">Best Practices</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduction" className="scroll-mt-24">
              <h2>Introduction</h2>
              <p>
                Quality control and inspection are fundamental to reliable metallographic analysis. Without proper 
                quality control procedures, results can be inconsistent, inaccurate, or misleading. Quality control 
                ensures that every step of the metallographic process (from sample selection through final analysis) meets 
                established standards and produces reliable, reproducible results.
              </p>
              <p>
                This guide covers the essential aspects of quality control and inspection in metallography, including 
                procedures, standards compliance, documentation, and best practices. Implementing robust quality control 
                systems protects against errors, ensures consistency, and provides confidence in your results.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Why Quality Control Matters:</strong> In metallography, quality control is not optional; it's 
                  essential. Poor quality control can lead to incorrect material assessments, failed components, safety 
                  issues, and legal problems. Good quality control ensures reliable results that can be trusted for 
                  critical decisions.
                </p>
              </div>
              <p>
                Quality control in metallography involves systematic procedures to ensure that:
              </p>
              <ul>
                <li>Samples are properly selected and representative</li>
                <li>Preparation procedures are followed consistently</li>
                <li>Equipment is properly calibrated and maintained</li>
                <li>Results are accurate and reproducible</li>
                <li>Documentation is complete and traceable</li>
                <li>Standards and specifications are met</li>
              </ul>
            </section>

            <section id="quality-control-principles" className="scroll-mt-24">
              <h2>Quality Control Principles</h2>
              <p>
                Effective quality control in metallography is based on fundamental principles that ensure consistency, 
                accuracy, and reliability. Understanding these principles helps you establish and maintain effective 
                quality control systems.
              </p>

              <h3>Consistency</h3>
              <p>
                Consistency means following standardized procedures every time. This includes:
              </p>
              <ul>
                <li><strong>Standardized procedures:</strong> Documented, step-by-step procedures that are followed 
                consistently for all samples</li>
                <li><strong>Consistent materials:</strong> Using the same consumables, etchants, and supplies for 
                comparable results</li>
                <li><strong>Consistent timing:</strong> Following established times for grinding, polishing, and etching</li>
                <li><strong>Consistent conditions:</strong> Maintaining consistent environmental conditions (temperature, 
                humidity) when possible</li>
              </ul>

              <h3>Reproducibility</h3>
              <p>
                Reproducibility means that the same sample, prepared and analyzed by different operators or at different 
                times, produces the same results. Achieving reproducibility requires:
              </p>
              <ul>
                <li><strong>Detailed documentation:</strong> Recording all parameters and conditions</li>
                <li><strong>Operator training:</strong> Ensuring all operators are properly trained</li>
                <li><strong>Calibrated equipment:</strong> Regular calibration of microscopes, hardness testers, and
                other instruments — see Microscope Calibration below for the specific procedures that &quot;calibration&quot;
                means in practice for an optical microscope used for measurement.</li>
                <li><strong>Reference standards:</strong> Using reference samples to verify procedures</li>
              </ul>

              <h3>Microscope Calibration — What &quot;Calibrated Equipment&quot; Means in Practice</h3>
              <p>
                &quot;The microscope is calibrated&quot; is a common audit-finding gap because operators
                often interpret it as &quot;the manufacturer set it up correctly,&quot; when accreditation
                bodies and most ASTM measurement standards expect verifiable, recurring calibration steps
                performed in your lab on your instrument. The minimum verifiable set:
              </p>
              <ul>
                <li><strong>Stage micrometer verification at every objective used for measurement:</strong> Use a certified stage micrometer (typically 1 mm divided into 0.01 mm increments, with NIST or equivalent traceability) to verify that each objective magnification reads correctly. Any objective used for grain-size measurement (E112), inclusion rating (E45/E1245), case-depth measurement (E1077), or any other quantitative ASTM method must be verified, not assumed. Document the date, objective, certified value, observed value, and operator.</li>
                <li><strong>Photomicrograph scale-bar calibration against the stage micrometer:</strong> The on-image scale bar from your camera/software must match the stage-micrometer reading, not a value the software calculated from the nominal objective magnification. Recalibrate any time the camera or coupler changes.</li>
                <li><strong>Digital camera pixel-size verification:</strong> For software-driven measurements (most labs now), the pixels-per-micron value the software uses must be verified against the stage micrometer at every objective. This is the value that propagates into every grain-size, area-fraction, and length measurement; an error here corrupts every measurement made on that microscope.</li>
                <li><strong>Köhler illumination check:</strong> Not strictly &quot;calibration&quot; but a recurring optical-alignment check; mis-aligned illumination produces uneven background that biases automated thresholding for inclusion/phase ratings.</li>
                <li><strong>Hardness tester verification:</strong> Test blocks of known hardness (per ASTM E92, E384, E18, E10) at the start of each shift or per the standard&apos;s frequency. Out-of-range readings on a test block invalidate any sample readings made afterward until the tester is recertified.</li>
              </ul>
              <p>
                Cadence depends on accreditation scope (ISO/IEC 17025 typically annually; NADCAP labs often
                more frequently for the objectives used most). Document everything — the calibration record
                is what an auditor checks, and missing records is the most common 17025 finding in
                metallography labs.
              </p>

              <h3>Traceability</h3>
              <p>
                Traceability means being able to track a sample and its results back through all steps of the process. 
                This includes:
              </p>
              <ul>
                <li><strong>Sample identification:</strong> Unique identifiers for each sample</li>
                <li><strong>Chain of custody:</strong> Documentation of who handled the sample and when</li>
                <li><strong>Procedure documentation:</strong> Records of all preparation steps and parameters</li>
                <li><strong>Result documentation:</strong> Complete records of observations and measurements</li>
              </ul>

              <h3>Validation</h3>
              <p>
                Validation means verifying that procedures produce correct results. This involves:
              </p>
              <ul>
                <li><strong>Reference samples:</strong> Using samples with known microstructures to verify procedures</li>
                <li><strong>Inter-laboratory comparisons:</strong> Comparing results with other laboratories</li>
                <li><strong>Proficiency testing:</strong> Participating in round-robin tests</li>
                <li><strong>Method validation:</strong> Verifying that methods are appropriate for the materials being 
                analyzed</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Key Principle:</strong> Quality control is not a one-time activity; it's an ongoing process 
                  that must be integrated into every aspect of metallographic work. Every sample, every procedure, and 
                  every result should be subject to quality control.
                </p>
              </div>
            </section>

            <section id="inspection-procedures" className="scroll-mt-24">
              <h2>Inspection Procedures</h2>
              <p>
                Systematic inspection procedures ensure that samples are properly prepared and results are accurate. 
                Inspection should occur at multiple stages throughout the preparation and analysis process.
              </p>

              <h3>Pre-Preparation Inspection</h3>
              <p>
                Before beginning preparation, inspect the sample to ensure it's suitable:
              </p>
              <ul>
                <li><strong>Sample identification:</strong> Verify sample ID matches documentation</li>
                <li><strong>Sample condition:</strong> Check for damage, contamination, or other issues</li>
                <li><strong>Sample orientation:</strong> Verify orientation is correct for the analysis needed</li>
                <li><strong>Sample size:</strong> Ensure sample is appropriate size for mounting and preparation</li>
                <li><strong>Documentation:</strong> Verify all required information is available</li>
              </ul>

              <h3>Post-Mounting Inspection</h3>
              <p>
                After mounting, inspect the mount to ensure quality:
              </p>
              <ul>
                <li><strong>Mount integrity:</strong> Check for cracks, voids, or other defects in the mount</li>
                <li><strong>Sample position:</strong> Verify sample is properly positioned and not too close to edges</li>
                <li><strong>Edge retention:</strong> Check that edges are protected (if edge analysis is needed)</li>
                <li><strong>Mount surface:</strong> Ensure mount surface is flat and suitable for grinding</li>
              </ul>

              <h3>Post-Grinding Inspection</h3>
              <p>
                After each grinding step, inspect the surface:
              </p>
              <ul>
                <li><strong>Scratch pattern:</strong> Verify scratches are uniform and in one direction</li>
                <li><strong>Previous scratches removed:</strong> Ensure all scratches from previous step are removed</li>
                <li><strong>Surface flatness:</strong> Check that surface is flat and not rounded</li>
                <li><strong>No contamination:</strong> Verify no embedded abrasives or contamination</li>
              </ul>

              <h3>Post-Polishing Inspection</h3>
              <p>
                After polishing, inspect the surface before etching:
              </p>
              <ul>
                <li><strong>Scratch-free surface:</strong> Verify no scratches remain from grinding</li>
                <li><strong>Mirror finish:</strong> Surface should be mirror-like and reflective</li>
                <li><strong>No relief:</strong> Check for excessive relief between phases</li>
                <li><strong>Clean surface:</strong> Verify no contamination, embedded abrasives, or water spots</li>
                <li><strong>Edge quality:</strong> If edge analysis is needed, verify edges are sharp and well-defined</li>
              </ul>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <h4 className="font-semibold mb-2">Visual Inspection Checklist</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Surface is mirror-like with no visible scratches</li>
                  <li>✓ No embedded abrasives or contamination visible</li>
                  <li>✓ Surface is clean and dry</li>
                  <li>✓ No excessive relief between phases</li>
                  <li>✓ Edges are sharp (if edge analysis required)</li>
                  <li>✓ Sample is properly oriented</li>
                </ul>
              </div>

              <h3>Post-Etching Inspection</h3>
              <p>
                After etching, inspect the microstructure:
              </p>
              <ul>
                <li><strong>Etching quality:</strong> Verify microstructure is revealed without over-etching</li>
                <li><strong>Contrast:</strong> Check that phases are clearly distinguishable</li>
                <li><strong>Grain boundaries:</strong> Verify grain boundaries are visible (if applicable)</li>
                <li><strong>No artifacts:</strong> Check for etching artifacts or contamination</li>
                <li><strong>Representative area:</strong> Verify the area examined is representative</li>
              </ul>

              <h3>Microscopic Inspection</h3>
              <p>
                During microscopic examination, systematic inspection ensures thorough analysis:
              </p>
              <ul>
                <li><strong>Low magnification survey:</strong> Examine entire sample at low magnification first</li>
                <li><strong>Systematic scanning:</strong> Use a systematic pattern to ensure complete coverage</li>
                <li><strong>Multiple magnifications:</strong> Examine features at appropriate magnifications</li>
                <li><strong>Representative areas:</strong> Document representative areas, not just unusual features</li>
                <li><strong>Edge examination:</strong> If needed, examine edges systematically</li>
              </ul>
            </section>

            <section id="standards-compliance" className="scroll-mt-24">
              <h2>Standards and Compliance</h2>
              <p>
                Compliance with established standards ensures that metallographic work meets industry requirements and 
                produces results that are accepted by customers, regulators, and other stakeholders. Standards provide 
                guidelines for procedures, equipment, and reporting.
              </p>

              <h3>ASTM Standards</h3>
              <p>
                ASTM International publishes numerous standards relevant to metallography. The standards
                most commonly cited in QC and inspection workflows fall into four families: general
                preparation and terminology, hardness testing, defect-specific diagnostics, and lab safety.
              </p>
              <h4 className="text-lg font-semibold mt-6 mb-2">General Preparation, Photomicrography, and Grain Size</h4>
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Standard</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Title</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E3</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Guide for Preparation of Metallographic Specimens</td>
                      <td className="border border-gray-300 px-4 py-3">General preparation procedures</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E112</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Test Methods for Determining Average Grain Size</td>
                      <td className="border border-gray-300 px-4 py-3">Grain size measurement (comparison-chart, intercept, planimetric)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E407</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Practice for Microetching Metals and Alloys</td>
                      <td className="border border-gray-300 px-4 py-3">The canonical etchant reference (numeric IDs for standard etchants)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E883</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Guide for Reflected-Light Photomicrography</td>
                      <td className="border border-gray-300 px-4 py-3">Photomicrography procedures, scale-bar requirements</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E1382</td>
                      <td className="border border-gray-300 px-4 py-3">Determining Average Grain Size Using Semiautomatic and Automatic Image Analysis</td>
                      <td className="border border-gray-300 px-4 py-3">Automated/digital grain-size measurement</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h4 className="text-lg font-semibold mt-6 mb-2">Hardness Testing — Foundational for Heat-Treatment Verification QC</h4>
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Standard</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Title</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E92</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Test Methods for Vickers Hardness and Knoop Hardness of Metallic Materials</td>
                      <td className="border border-gray-300 px-4 py-3">Macro Vickers (&gt;1 kgf)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E384</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Test Method for Microindentation Hardness of Materials</td>
                      <td className="border border-gray-300 px-4 py-3">Vickers and Knoop microhardness (10 g - 1 kgf); case-depth profiles</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E18</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Test Methods for Rockwell Hardness of Metallic Materials</td>
                      <td className="border border-gray-300 px-4 py-3">Rockwell B/C and superficial scales</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E10</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Test Method for Brinell Hardness of Metallic Materials</td>
                      <td className="border border-gray-300 px-4 py-3">Brinell hardness (10 mm WC ball) — large samples, cast iron</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h4 className="text-lg font-semibold mt-6 mb-2">Defect-Specific Diagnostic Standards</h4>
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Standard</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Title</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM A262</td>
                      <td className="border border-gray-300 px-4 py-3">Detecting Susceptibility to Intergranular Attack in Austenitic Stainless Steels</td>
                      <td className="border border-gray-300 px-4 py-3">Practice A oxalic electrolytic — sensitization detection on welded 304/316</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM A923</td>
                      <td className="border border-gray-300 px-4 py-3">Detecting Detrimental Intermetallic Phase in Duplex Austenitic/Ferritic Stainless Steels</td>
                      <td className="border border-gray-300 px-4 py-3">Sigma/chi phase QC for 2205, 2507</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E45</td>
                      <td className="border border-gray-300 px-4 py-3">Determining the Inclusion Content of Steel</td>
                      <td className="border border-gray-300 px-4 py-3">Worst-field method, A-D classification charts (sulfides, alumina, silicates, globular)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E1245</td>
                      <td className="border border-gray-300 px-4 py-3">Determining the Inclusion or Second-Phase Constituent Content</td>
                      <td className="border border-gray-300 px-4 py-3">Quantitative second-phase rating by automatic image analysis</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E1077</td>
                      <td className="border border-gray-300 px-4 py-3">Estimating the Depth of Decarburization of Steel Specimens</td>
                      <td className="border border-gray-300 px-4 py-3">Direct QC measurement for carburized / decarburized parts</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM A247</td>
                      <td className="border border-gray-300 px-4 py-3">Evaluating the Microstructure of Graphite in Iron Castings</td>
                      <td className="border border-gray-300 px-4 py-3">Cast iron nodularity rating — <em>required to be performed on as-polished, unetched specimens</em></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E340</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Practice for Macroetching Metals and Alloys</td>
                      <td className="border border-gray-300 px-4 py-3">Weld penetration, HAZ extent, segregation, flow lines</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h4 className="text-lg font-semibold mt-6 mb-2">Lab Safety Compliance</h4>
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Standard</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Title</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">ASTM E2014</td>
                      <td className="border border-gray-300 px-4 py-3">Standard Guide on Metallographic Laboratory Safety</td>
                      <td className="border border-gray-300 px-4 py-3">Acid handling, ventilation, PPE, electrical/mechanical hazards from prep equipment, emergency response</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                For a comprehensive reference to ASTM standards, see our{' '}
                <Link href="/resources/astm-standards-reference" className="text-primary-600 hover:underline font-semibold">
                  ASTM Standards Reference
                </Link>.
              </p>

              <h3>ISO Standards</h3>
              <p>
                International Organization for Standardization (ISO) standards are important for international work:
              </p>
              <ul>
                <li><strong>ISO 643:</strong> Steels: Micrographic determination of the apparent grain size</li>
                <li><strong>ISO 4499:</strong> Hardmetals: Metallographic determination of microstructure</li>
                <li><strong>ISO 4967:</strong> Steel: Determination of content of non-metallic inclusions - Micrographic method</li>
                <li><strong>ISO 14250:</strong> Steel: Metallographic characterization of duplex grain size and distributions</li>
              </ul>

              <h3>Industry-Specific Standards</h3>
              <p>
                Many industries have specific standards for metallographic work:
              </p>
              <ul>
                <li><strong>Aerospace:</strong> AMS (Aerospace Material Specifications), NADCAP requirements</li>
                <li><strong>Automotive:</strong> SAE standards, OEM specifications</li>
                <li><strong>Nuclear:</strong> ASME codes, nuclear regulatory requirements</li>
                <li><strong>Medical devices:</strong> FDA requirements, ISO 13485</li>
                <li><strong>Oil and gas:</strong> API standards, NACE requirements</li>
              </ul>

              <h3>Compliance Requirements</h3>
              <p>
                Ensuring compliance involves:
              </p>
              <ul>
                <li><strong>Understanding requirements:</strong> Know which standards apply to your work</li>
                <li><strong>Current versions:</strong> Use current versions of standards (standards are regularly updated)</li>
                <li><strong>Documentation:</strong> Document compliance with standards in reports</li>
                <li><strong>Training:</strong> Ensure staff are trained on applicable standards</li>
                <li><strong>Audits:</strong> Regular internal audits to verify compliance</li>
                <li><strong>External audits:</strong> Prepare for customer or regulatory audits</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Important:</strong> Standards are living documents that are regularly updated. Ensure you&apos;re
                  using current versions and stay informed about updates. Subscribing to standards organizations or
                  checking for updates regularly is essential.
                </p>
              </div>

              <h3>High-Hazard Reagent and Material Compliance</h3>
              <p>
                Lab-safety audits (per ASTM E2014 and most institutional EHS protocols) routinely check
                a small number of high-hazard items where storage or handling errors carry serious
                consequences. These should be on every QC inspection checklist and verified on a recurring
                schedule:
              </p>
              <ul>
                <li>
                  <strong>Picric acid (used in Picral, Vilella&apos;s, Acetic Picral, Bechet-Beaujard
                  PAGB etchants):</strong> Must be stored <em>wetted at all times</em> — water-saturated or
                  ethanol-saturated. Dry picric acid is friction- and shock-sensitive (effectively a
                  primary explosive). Verify stock-bottle wet status on a recurring schedule. Stock that
                  has crystallized at the bottle neck must be remediated by a qualified hazardous-materials
                  technician — never by the operator.
                </li>
                <li>
                  <strong>Hydrofluoric acid (HF, used in Keller&apos;s, Kroll&apos;s, modified glass etchants,
                  ALON/AlN/SiAlON etchants):</strong> Fume hood mandatory; HF-rated gloves and face shield;
                  <strong> calcium gluconate gel kept on-site within reach of the etching station</strong>
                  with non-expired stock. HF burns are insidious — pain often appears hours after exposure,
                  by which point bone-deep damage may already be irreversible. Calcium gluconate availability
                  is a verifiable compliance item; expired tubes should fail QC.
                </li>
                <li>
                  <strong>Beryllium-containing materials (BeCu C17200 / C17500 / C17510, Be-bearing alloys):</strong>
                  Wet cutting and grinding only — never dry-grind. Respiratory protection (N95 minimum, P100
                  for routine work) for any chance of dry abrasive contact. Sealed disposal of grinding
                  waste, papers, pad surfaces, swarf, rinse water — treat as hazardous waste per
                  institutional procedure. Beryllium dust causes Chronic Beryllium Disease (CBD), an
                  irreversible lung condition that develops years after exposure; visible damage during
                  the prep session is not the warning signal.
                </li>
                <li>
                  <strong>Perchloric acid (used in some electropolishing solutions for stainless and refractory metals):</strong>
                  Stored separately from organic compounds; concentrated HClO₄ + organics is an explosion
                  hazard. Perchloric fume hoods (with washdown) are required for heating perchloric
                  solutions. Most labs that don&apos;t need it should not stock it.
                </li>
                <li>
                  <strong>Cr(VI) reagents (chromic acid, K₂Cr₂O₇ in dichromate etchants, electropolishing chromic):</strong>
                  Carcinogenic; disposal regulated as hazardous waste in most jurisdictions. Storage and
                  disposal records subject to audit.
                </li>
              </ul>
              <p>
                Each of these items is verifiable on a single physical inspection of the etching station
                and reagent cabinet — they are some of the easiest QC items to implement and some of the
                most consequential to miss.
              </p>
            </section>

            <section id="documentation" className="scroll-mt-24">
              <h2>Documentation and Reporting</h2>
              <p>
                Complete and accurate documentation is essential for quality control. Documentation provides a record 
                of what was done, enables traceability, supports reproducibility, and provides evidence of compliance 
                with standards and procedures.
              </p>

              <h3>Sample Documentation</h3>
              <p>
                Each sample should have complete documentation including:
              </p>
              <ul>
                <li><strong>Sample identification:</strong> Unique identifier, source, date received</li>
                <li><strong>Sample description:</strong> Material type, composition, condition, dimensions</li>
                <li><strong>Orientation:</strong> How sample was oriented (longitudinal, transverse, etc.)</li>
                <li><strong>Purpose:</strong> Reason for analysis, specific questions to answer</li>
                <li><strong>Chain of custody:</strong> Who handled the sample and when</li>
              </ul>

              <h3>Preparation Documentation</h3>
              <p>
                Document all preparation steps and parameters:
              </p>
              <ul>
                <li><strong>Sectioning:</strong> Method, blade type, cutting parameters</li>
                <li><strong>Mounting:</strong> Method, resin type, mounting parameters</li>
                <li><strong>Grinding:</strong> Grit sizes, times, pressures, wheel types</li>
                <li><strong>Polishing:</strong> Cloth types, abrasives, times, pressures</li>
                <li><strong>Etching:</strong> Etchant type, concentration, time, temperature</li>
                <li><strong>Operator:</strong> Who performed each step</li>
                <li><strong>Date and time:</strong> When each step was performed</li>
              </ul>

              <h3>Analysis Documentation</h3>
              <p>
                Document all analysis activities:
              </p>
              <ul>
                <li><strong>Microscope:</strong> Type, magnification, illumination mode</li>
                <li><strong>Observations:</strong> Detailed description of microstructure</li>
                <li><strong>Measurements:</strong> Grain size, phase fractions, inclusion ratings, etc.</li>
                <li><strong>Photomicrographs:</strong> Images with proper documentation (magnification, etchant, etc.)</li>
                <li><strong>Standards used:</strong> Which standards were followed</li>
                <li><strong>Results:</strong> Quantitative and qualitative results</li>
              </ul>

              <h3>Report Requirements</h3>
              <p>
                Reports should include:
              </p>
              <ul>
                <li><strong>Executive summary:</strong> Key findings and conclusions</li>
                <li><strong>Introduction:</strong> Purpose, background, sample information</li>
                <li><strong>Procedures:</strong> Detailed description of methods used</li>
                <li><strong>Results:</strong> Observations, measurements, photomicrographs</li>
                <li><strong>Discussion:</strong> Interpretation of results</li>
                <li><strong>Conclusions:</strong> Summary of findings</li>
                <li><strong>Appendices:</strong> Supporting data, additional photomicrographs</li>
              </ul>

              <h3>Photomicrograph Documentation</h3>
              <p>
                Every photomicrograph should include:
              </p>
              <ul>
                <li><strong>Magnification:</strong> Clearly indicated (e.g., "500x")</li>
                <li><strong>Etchant:</strong> Etchant used (if applicable)</li>
                <li><strong>Illumination:</strong> Illumination mode (brightfield, darkfield, DIC, etc.)</li>
                <li><strong>Sample identification:</strong> Which sample the image represents</li>
                <li><strong>Location:</strong> Where on the sample (if relevant)</li>
                <li><strong>Scale bar:</strong> Physical scale (preferred over magnification alone)</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Documentation Principle:</strong> If it's not documented, it didn't happen. Complete 
                  documentation is essential for quality control, traceability, and reproducibility. Good documentation 
                  also protects you and your organization if questions arise about results.
                </p>
              </div>
            </section>

            <section id="common-issues" className="scroll-mt-24">
              <h2>Common Quality Issues</h2>
              <p>
                Understanding common quality issues helps you identify and prevent problems. Many quality issues can 
                be prevented with proper procedures and inspection.
              </p>

              <h3>Preparation Issues</h3>
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Issue</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Impact</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Prevention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Remaining scratches</td>
                      <td className="border border-gray-300 px-4 py-3">Obscures microstructure, can be mistaken for features</td>
                      <td className="border border-gray-300 px-4 py-3">Complete all grinding steps, adequate polishing time</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Excessive relief</td>
                      <td className="border border-gray-300 px-4 py-3">Focus problems, incorrect phase identification</td>
                      <td className="border border-gray-300 px-4 py-3">Reduce polishing pressure and time</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Edge rounding</td>
                      <td className="border border-gray-300 px-4 py-3">Cannot analyze edges; biases case-depth, coating-thickness, and decarburization measurements by 10-50 µm — exactly the dimension scale of the features being measured</td>
                      <td className="border border-gray-300 px-4 py-3"><strong>Mount in glass-filled epoxy</strong>, not phenolic. Phenolic wears 2-3× faster than steel/stainless/superalloy and rounds the sample-mount boundary during long polishes. Also cap final-polish time at 90 s + flush, and use a harder final-step pad (synthetic suede instead of chemotextile).</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Contamination</td>
                      <td className="border border-gray-300 px-4 py-3">False features, incorrect interpretation</td>
                      <td className="border border-gray-300 px-4 py-3">Thorough cleaning between steps, clean equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Over-etching</td>
                      <td className="border border-gray-300 px-4 py-3">Obscures fine details, creates artifacts</td>
                      <td className="border border-gray-300 px-4 py-3">Reduce etching time, use fresh etchant</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Under-etching</td>
                      <td className="border border-gray-300 px-4 py-3">Microstructure not revealed</td>
                      <td className="border border-gray-300 px-4 py-3">Increase etching time, use fresh etchant</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Analysis Issues</h3>
              <ul>
                <li><strong>Non-representative sampling:</strong> Examining only unusual areas, not representative areas</li>
                <li><strong>Incorrect magnification:</strong> Using inappropriate magnification for the analysis</li>
                <li><strong>Poor photomicrography:</strong> Out of focus, incorrect exposure, missing documentation</li>
                <li><strong>Incorrect interpretation:</strong> Misidentifying phases or features</li>
                <li><strong>Measurement errors:</strong> Incorrect grain size measurements, wrong standards used</li>
                <li><strong>Bias:</strong> Confirmation bias, looking for expected results</li>
              </ul>

              <h3>Documentation Issues</h3>
              <ul>
                <li><strong>Incomplete documentation:</strong> Missing parameters, dates, or other information</li>
                <li><strong>Incorrect documentation:</strong> Wrong magnification, etchant, or other parameters</li>
                <li><strong>Poor photomicrograph labeling:</strong> Missing or incorrect labels on images</li>
                <li><strong>Lost data:</strong> Inadequate backup or storage of data</li>
                <li><strong>Inconsistent format:</strong> Reports don&apos;t follow standard format</li>
              </ul>

              <h3>Distinguishing Real Defects from Prep Artifacts</h3>
              <p>
                The most consequential QC errors are not measurement mistakes — they are <em>prep artifacts
                misreported as real defects</em>. A pull-out crater identified as gas porosity rejects a
                perfectly good casting; a smeared surface read as &quot;no microstructure&quot; lets a real
                sensitization or decarburization issue slip through to a production audit. Each of the
                five common prep artifacts has a clean diagnostic question and a known fix:
              </p>
              <ul>
                <li>
                  <Link href="/blog/edge-rounding-mount-fix" className="text-primary-600 hover:underline font-semibold">
                    Edge rounding
                  </Link> — Coating thickness drifts between operators; near-edge structure looks blurred. The
                  mount-material problem masquerading as a polishing problem.
                </li>
                <li>
                  <Link href="/blog/smearing-soft-metals-no-etch" className="text-primary-600 hover:underline font-semibold">
                    Mirror finish that won&apos;t etch (smearing)
                  </Link> — Mechanical polishing has homogenized the surface; chemical etchants find nothing
                  to attack. Common on Cu, Al, Mg, austenitic stainless, pure Ni.
                </li>
                <li>
                  <Link href="/blog/comet-tails-hard-particle-drag" className="text-primary-600 hover:underline font-semibold">
                    Comet tails behind hard particles
                  </Link> — Unidirectional scratches behind every carbide / inclusion / fiber. Hard-particle
                  drag artifact, not a real material defect.
                </li>
                <li>
                  <Link href="/blog/sic-embedment-soft-metals" className="text-primary-600 hover:underline font-semibold">
                    Embedded SiC dark specks
                  </Link> — Random dark dots scattered across polished Al, Mg, Pb, or Sn. Liberated SiC grit
                  pressed into the soft matrix. Easy to mistake for inclusions.
                </li>
                <li>
                  <Link href="/blog/pullout-versus-real-porosity" className="text-primary-600 hover:underline font-semibold">
                    Pull-out vs. real porosity
                  </Link> — Smooth rounded pit walls = real porosity (accept/reject the casting on this).
                  Irregular fresh-fracture pit walls = pull-out artifact (reprep the sample). Examine
                  unetched first.
                </li>
              </ul>
              <p>
                When a QC accept/reject decision turns on the presence or absence of a defect, run through
                these five questions before signing the report. The diagnostic confirmations are quick
                (under 60 seconds at the microscope) and avoid the much more expensive consequences of a
                wrongly-rejected production lot.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Prevention is Key:</strong> Most quality issues can be prevented with proper procedures,
                  training, and inspection. Establishing checkpoints and review processes helps catch issues before they
                  affect results. See our{' '}
                  <Link href="/resources/troubleshooting-guide" className="text-primary-600 hover:underline font-semibold">
                    Troubleshooting Guide
                  </Link> for detailed solutions to common problems.
                </p>
              </div>
            </section>

            <section id="quality-checkpoints" className="scroll-mt-24">
              <h2>Quality Control Checkpoints</h2>
              <p>
                Establishing quality control checkpoints at critical stages ensures that issues are identified and 
                corrected before they affect final results. Checkpoints should be built into standard procedures.
              </p>

              <h3>Checkpoint 1: Sample Receipt</h3>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <h4 className="font-semibold mb-2">Verification Checklist</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Sample ID matches documentation</li>
                  <li>✓ Sample condition is acceptable</li>
                  <li>✓ Required information is available</li>
                  <li>✓ Sample orientation is correct</li>
                  <li>✓ Sample size is appropriate</li>
                </ul>
              </div>

              <h3>Checkpoint 2: After Mounting</h3>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <h4 className="font-semibold mb-2">Mount Quality Checklist</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Mount is intact (no cracks or voids)</li>
                  <li>✓ Sample is properly positioned</li>
                  <li>✓ Edges are protected (if needed)</li>
                  <li>✓ Mount surface is flat</li>
                  <li>✓ Mount is properly labeled</li>
                </ul>
              </div>

              <h3>Checkpoint 3: After Each Grinding Step</h3>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <h4 className="font-semibold mb-2">Grinding Quality Checklist</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Scratches are uniform and in one direction</li>
                  <li>✓ Previous scratches are removed</li>
                  <li>✓ Surface is flat (no rounding)</li>
                  <li>✓ No embedded abrasives</li>
                  <li>✓ Sample is clean</li>
                </ul>
              </div>

              <h3>Checkpoint 4: After Polishing</h3>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <h4 className="font-semibold mb-2">Polishing Quality Checklist</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Surface is mirror-like</li>
                  <li>✓ No scratches visible</li>
                  <li>✓ No excessive relief</li>
                  <li>✓ Surface is clean and dry</li>
                  <li>✓ Edges are sharp (if needed)</li>
                </ul>
              </div>

              <h3>Checkpoint 5: After Etching</h3>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <h4 className="font-semibold mb-2">Etching Quality Checklist</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Microstructure is revealed</li>
                  <li>✓ Phases are distinguishable</li>
                  <li>✓ Grain boundaries are visible (if applicable)</li>
                  <li>✓ No over-etching artifacts</li>
                  <li>✓ Etching is uniform</li>
                </ul>
              </div>

              <h3>Checkpoint 6: Before Final Analysis</h3>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <h4 className="font-semibold mb-2">Pre-Analysis Checklist</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ Sample preparation is complete and acceptable</li>
                  <li>✓ Microscope is calibrated</li>
                  <li>✓ Appropriate standards are available</li>
                  <li>✓ Documentation is up to date</li>
                  <li>✓ All required information is available</li>
                </ul>
              </div>

              <h3>Checkpoint 7: Before Reporting</h3>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <h4 className="font-semibold mb-2">Report Quality Checklist</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>✓ All required sections are included</li>
                  <li>✓ Procedures are documented</li>
                  <li>✓ Results are accurate and complete</li>
                  <li>✓ Photomicrographs are properly labeled</li>
                  <li>✓ Standards compliance is documented</li>
                  <li>✓ Report has been reviewed</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Checkpoint Benefits:</strong> Quality control checkpoints prevent problems from propagating 
                  through the process. Catching issues early saves time and ensures quality. Don't skip checkpoints; they 
                  are essential for quality control.
                </p>
              </div>
            </section>

            <section id="statistical-control" className="scroll-mt-24">
              <h2>Statistical Process Control</h2>
              <p>
                Statistical process control (SPC) uses statistical methods to monitor and control processes. In 
                metallography, SPC can help identify trends, detect problems, and ensure consistency.
              </p>

              <h3>Control Charts</h3>
              <p>
                Control charts track measurements over time to identify trends and out-of-control conditions:
              </p>
              <ul>
                <li><strong>Grain size measurements:</strong> Track grain size measurements to ensure consistency</li>
                <li><strong>Hardness measurements:</strong> Monitor hardness test results</li>
                <li><strong>Phase fractions:</strong> Track phase fraction measurements</li>
                <li><strong>Preparation times:</strong> Monitor preparation times to identify efficiency issues</li>
              </ul>

              <h3>Measurement System Analysis</h3>
              <p>
                Measurement system analysis (MSA) evaluates the quality of measurement systems:
              </p>
              <ul>
                <li><strong>Repeatability:</strong> Variation when same operator measures same sample multiple times</li>
                <li><strong>Reproducibility:</strong> Variation when different operators measure same sample</li>
                <li><strong>Accuracy:</strong> How close measurements are to true values</li>
                <li><strong>Linearity:</strong> Consistency across measurement range</li>
                <li><strong>Stability:</strong> Consistency over time</li>
              </ul>

              <h3>Proficiency Testing</h3>
              <p>
                Participating in proficiency testing programs helps verify laboratory performance:
              </p>
              <ul>
                <li><strong>Round-robin tests:</strong> Multiple laboratories analyze same samples</li>
                <li><strong>Inter-laboratory comparisons:</strong> Compare results with other laboratories</li>
                <li><strong>Reference materials:</strong> Analyze certified reference materials</li>
                <li><strong>Internal comparisons:</strong> Compare results between operators</li>
              </ul>

              <h3>Data Analysis</h3>
              <p>
                Statistical analysis of data helps identify issues and trends:
              </p>
              <ul>
                <li><strong>Trend analysis:</strong> Identify trends in measurements over time</li>
                <li><strong>Outlier detection:</strong> Identify unusual results that may indicate problems</li>
                <li><strong>Correlation analysis:</strong> Identify relationships between variables</li>
                <li><strong>Capability analysis:</strong> Evaluate whether process meets requirements</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Statistical Thinking:</strong> Statistical process control helps you understand variation in 
                  your processes. Some variation is normal, but excessive variation or trends indicate problems that 
                  need attention. Regular monitoring helps maintain quality.
                </p>
              </div>
            </section>

            <section id="certification" className="scroll-mt-24">
              <h2>Certification and Accreditation</h2>
              <p>
                Certification and accreditation provide external validation of laboratory quality. They demonstrate 
                that a laboratory meets established standards and can produce reliable results.
              </p>

              <h3>Laboratory Accreditation</h3>
              <p>
                Accreditation demonstrates that a laboratory meets international standards for quality:
              </p>
              <ul>
                <li><strong>ISO/IEC 17025:</strong> General requirements for the competence of testing and calibration 
                laboratories</li>
                <li><strong>Scope:</strong> Accredited laboratories have defined scopes of accreditation</li>
                <li><strong>Audits:</strong> Regular audits verify continued compliance</li>
                <li><strong>Proficiency testing:</strong> Participation in proficiency testing is required</li>
                <li><strong>Documentation:</strong> Comprehensive quality system documentation is required</li>
              </ul>

              <h3>NADCAP Accreditation</h3>
              <p>
                NADCAP (National Aerospace and Defense Contractors Accreditation Program, administered by
                the Performance Review Institute) is specific to aerospace and defense industries.
                Metallography labs supporting aerospace customers — particularly those performing heat-treat
                verification, fastener inspection, weld qualification, or single-crystal turbine-blade
                analysis — are typically required to hold NADCAP accreditation in addition to ISO/IEC 17025.
              </p>
              <ul>
                <li><strong>Audit criteria documents:</strong> NADCAP accreditation is administered through a series of Audit Criteria (AC) documents that define industry-specific requirements. The AC documents covering Materials Testing Laboratories include specific sections on metallographic examination, etchant handling, hardness testing, and microscope calibration. Verify the current AC document number applicable to your scope before audit preparation — the AC documents are revised periodically and the current revision is what auditors check against.</li>
                <li><strong>Audits:</strong> Regular on-site audits by PRI-qualified auditors against the current AC criteria. Findings are tracked and must be closed within defined timeframes.</li>
                <li><strong>Continuous improvement:</strong> Findings, corrective actions, and root-cause analysis are themselves audited at each subsequent visit — &quot;repeat findings&quot; are weighted more heavily than first-time findings.</li>
                <li><strong>Customer recognition:</strong> Recognized by major aerospace and defense primes (Boeing, Airbus, Lockheed, Pratt &amp; Whitney, GE Aviation, Rolls-Royce). Many primes require NADCAP accreditation as a condition of supplier qualification.</li>
                <li><strong>Subscriber program:</strong> NADCAP membership lets primes share audit data and reduces the duplication of audits across the supply chain — one accreditation, many customer recognitions.</li>
              </ul>

              <h3>Operator Certification</h3>
              <p>
                Operator certification programs verify individual competence:
              </p>
              <ul>
                <li><strong>Training requirements:</strong> Completion of required training</li>
                <li><strong>Examinations:</strong> Written and practical examinations</li>
                <li><strong>Continuing education:</strong> Requirements for maintaining certification</li>
                <li><strong>Professional organizations:</strong> Various organizations offer certification programs</li>
              </ul>

              <h3>Benefits of Certification and Accreditation</h3>
              <ul>
                <li><strong>Customer confidence:</strong> Demonstrates capability and reliability</li>
                <li><strong>Market access:</strong> Required for many customers and industries</li>
                <li><strong>Quality improvement:</strong> Process of achieving and maintaining accreditation improves quality</li>
                <li><strong>Competitive advantage:</strong> Differentiates from non-accredited laboratories</li>
                <li><strong>Risk reduction:</strong> Reduces risk of errors and problems</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-4 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Investment in Quality:</strong> Certification and accreditation require investment of time and 
                  resources, but they provide significant benefits. They demonstrate commitment to quality and provide 
                  external validation of capabilities.
                </p>
              </div>
            </section>

            <section id="best-practices" className="scroll-mt-24">
              <h2>Best Practices for Quality Control</h2>
              <p>
                Following best practices ensures effective quality control. These practices should be integrated into 
                daily operations and become standard procedures.
              </p>

              <h3>Establish Standard Procedures</h3>
              <ul>
                <li><strong>Document procedures:</strong> Write down all procedures in detail</li>
                <li><strong>Standardize methods:</strong> Use consistent methods for all similar work</li>
                <li><strong>Review regularly:</strong> Review and update procedures regularly</li>
                <li><strong>Train operators:</strong> Ensure all operators are trained on procedures</li>
                <li><strong>Follow procedures:</strong> Don't take shortcuts or deviate without justification</li>
              </ul>

              <h3>Maintain Equipment</h3>
              <ul>
                <li><strong>Regular calibration:</strong> Calibrate equipment according to schedule</li>
                <li><strong>Preventive maintenance:</strong> Perform regular maintenance to prevent problems</li>
                <li><strong>Equipment records:</strong> Maintain records of calibration and maintenance</li>
                <li><strong>Proper use:</strong> Use equipment as designed and intended</li>
                <li><strong>Report problems:</strong> Report equipment problems immediately</li>
              </ul>

              <h3>Use Reference Materials</h3>
              <ul>
                <li><strong>Certified reference materials:</strong> Use certified reference materials when available</li>
                <li><strong>Internal standards:</strong> Maintain internal reference samples</li>
                <li><strong>Regular verification:</strong> Use reference materials to verify procedures</li>
                <li><strong>Document results:</strong> Document reference material results</li>
              </ul>

              <h3>Implement Review Processes</h3>
              <ul>
                <li><strong>Peer review:</strong> Have results reviewed by another qualified person</li>
                <li><strong>Technical review:</strong> Review technical aspects of work</li>
                <li><strong>Administrative review:</strong> Review documentation and compliance</li>
                <li><strong>Management review:</strong> Regular management review of quality system</li>
              </ul>

              <h3>Continuous Improvement</h3>
              <ul>
                <li><strong>Monitor performance:</strong> Track quality metrics and performance</li>
                <li><strong>Identify problems:</strong> Actively identify and address problems</li>
                <li><strong>Root cause analysis:</strong> Investigate root causes of problems</li>
                <li><strong>Corrective actions:</strong> Implement corrective actions to prevent recurrence</li>
                <li><strong>Preventive actions:</strong> Identify and prevent potential problems</li>
                <li><strong>Learn from mistakes:</strong> Use problems as learning opportunities</li>
              </ul>

              <h3>Training and Competence</h3>
              <ul>
                <li><strong>Initial training:</strong> Comprehensive training for new operators</li>
                <li><strong>Ongoing training:</strong> Regular training to maintain and improve skills</li>
                <li><strong>Competence assessment:</strong> Regular assessment of operator competence</li>
                <li><strong>Documentation:</strong> Document training and competence</li>
                <li><strong>Knowledge sharing:</strong> Share knowledge and best practices</li>
              </ul>

              <h3>Communication</h3>
              <ul>
                <li><strong>Clear procedures:</strong> Procedures should be clear and understandable</li>
                <li><strong>Regular meetings:</strong> Regular quality meetings to discuss issues</li>
                <li><strong>Open communication:</strong> Encourage reporting of problems and concerns</li>
                <li><strong>Feedback:</strong> Provide feedback on quality performance</li>
                <li><strong>Documentation:</strong> Document communications and decisions</li>
              </ul>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-6 my-6 rounded">
                <h3 className="text-lg font-semibold mb-3">Quality Culture</h3>
                <p className="text-sm text-gray-700">
                  Quality control is not just about procedures and checklists; it's about creating a culture where 
                  quality is valued and everyone takes responsibility for quality. When quality becomes part of the 
                  organizational culture, it becomes natural and sustainable. Everyone should understand that quality 
                  is everyone's responsibility, not just the quality department's.
                </p>
              </div>
            </section>

            {/* CTA Section */}
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mt-12 rounded">
              <h2 className="text-2xl font-semibold mb-4">Continue Your Quality Control Education</h2>
              <p className="mb-4">
                Quality control is an ongoing process. Continue to learn and improve your quality control practices 
                to ensure reliable and reproducible results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/resources/checklist"
                  className="btn-primary text-center"
                >
                  View Preparation Checklist
                </Link>
                <Link 
                  href="/resources/astm-standards-reference"
                  className="btn-secondary text-center"
                >
                  ASTM Standards Reference
                </Link>
                <Link 
                  href="/guides"
                  className="btn-secondary text-center"
                >
                  Browse All Guides
                </Link>
              </div>
            </div>

            {/* Related Guides */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/guides/microstructural-analysis" className="text-primary-600 hover:underline font-semibold">
                  → Microstructural Analysis
                </Link>
                <Link href="/guides/introduction-to-metallography" className="text-primary-600 hover:underline font-semibold">
                  → Introduction to Metallography
                </Link>
                <Link href="/guides/polishing-methods" className="text-primary-600 hover:underline font-semibold">
                  → Polishing Methods
                </Link>
                <Link href="/guides/grinding-techniques" className="text-primary-600 hover:underline font-semibold">
                  → Grinding Techniques
                </Link>
                <Link href="/resources/troubleshooting-guide" className="text-primary-600 hover:underline font-semibold">
                  → Troubleshooting Guide
                </Link>
                <Link href="/resources/checklist" className="text-primary-600 hover:underline font-semibold">
                  → Preparation Checklist
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

