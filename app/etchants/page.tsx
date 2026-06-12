import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, FlaskConical, AlertTriangle, BookOpen, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Etchants - Common Etchant Reference | Metallography.org',
  description:
    'Quick reference for common metallographic etchants — compositions, target materials, and application methods — plus where to find a comprehensive, maintained etchant database.',
  alternates: { canonical: 'https://metallography.org/etchants' },
  openGraph: {
    title: 'Etchants - Common Etchant Reference',
    description:
      'Quick reference for common metallographic etchants with compositions, applications, and safety notes.',
    url: 'https://metallography.org/etchants',
    siteName: 'Metallography.org',
  },
}

interface QuickRefEtchant {
  name: string
  composition: string
  materials: string
  application: string
}

const commonEtchants: QuickRefEtchant[] = [
  {
    name: '2–5% Nital',
    composition: '2–5 mL HNO₃ in 95–98 mL ethanol',
    materials: 'Carbon and low-alloy steels, cast iron matrix',
    application: 'Swab 5–30 s',
  },
  {
    name: '4% Picral',
    composition: '4 g picric acid + 100 mL ethanol',
    materials: 'Carbon, alloy, and tool steels (cementite, pearlite)',
    application: 'Swab 10–60 s; store picric acid wetted',
  },
  {
    name: "Vilella's",
    composition: '1 g picric acid + 5 mL HCl + 95 mL ethanol',
    materials: 'Tool steels, martensitic and ferritic stainless',
    application: 'Swab 5–60 s',
  },
  {
    name: 'Glyceregia',
    composition: '10 mL HNO₃ + 20 mL HCl + 30 mL glycerol',
    materials: 'Stainless steels (general)',
    application: 'Immersion 10–60 s; mix fresh — activity decays',
  },
  {
    name: '10% Oxalic (electrolytic)',
    composition: '10 g oxalic acid + 100 mL H₂O',
    materials: 'Austenitic stainless; sensitization per ASTM A262-A',
    application: '6 V, 30–90 s',
  },
  {
    name: "Marble's",
    composition: '4 g CuSO₄ + 20 mL HCl + 20 mL H₂O',
    materials: 'Nickel-base superalloys',
    application: 'Swab 10–60 s',
  },
  {
    name: "Modified Kalling's",
    composition: '5 g CuCl₂ + 100 mL HCl + 100 mL ethanol',
    materials: 'Nickel alloys, duplex stainless',
    application: 'Immersion 10–30 s',
  },
  {
    name: "Keller's",
    composition: '2 mL HF + 3 mL HCl + 5 mL HNO₃ + 190 mL H₂O',
    materials: 'Aluminum and aluminum alloys',
    application: 'Swab 5–30 s; HF safety precautions',
  },
  {
    name: "Weck's (Al)",
    composition: '4 g KMnO₄ + 1 g NaOH + 100 mL H₂O',
    materials: 'Aluminum alloys (color/tint etch)',
    application: 'Immersion 30–60 s',
  },
  {
    name: "Barker's (anodizing)",
    composition: '5 mL HBF₄ + 200 mL H₂O',
    materials: 'Aluminum grain orientation (polarized light)',
    application: '20 V, 60–120 s — electrolytic anodizing, not a chemical etch',
  },
  {
    name: "Kroll's",
    composition: '2 mL HF + 6 mL HNO₃ + 92 mL H₂O',
    materials: 'Titanium and titanium alloys',
    application: 'Swab 5–15 s; HF safety precautions',
  },
  {
    name: 'Ammonium hydroxide + peroxide',
    composition: 'Equal volumes 28% NH₄OH + 3% H₂O₂',
    materials: 'Copper, brass, bronze',
    application: 'Swab 10–60 s; mix immediately before use',
  },
  {
    name: "Klemm's I",
    composition: '50 mL saturated Na₂S₂O₃ + 1 g K₂S₂O₅',
    materials: 'Copper alloys, duplex stainless (color/tint etch)',
    application: 'Immersion 30–180 s; needs deformation-free surface',
  },
  {
    name: "Beraha's I",
    composition: '10 mL HCl + 90 mL H₂O + 1 g K₂S₂O₅',
    materials: 'Ferrous alloys, duplex stainless (color/tint etch)',
    application: 'Immersion 30–180 s',
  },
  {
    name: "Murakami's",
    composition: '10 g K₃Fe(CN)₆ + 10 g NaOH + 100 mL H₂O',
    materials: 'Carbides, tool steels, cermets, refractory metals',
    application: 'Swab 5–30 s (heated for refractories)',
  },
  {
    name: 'Acetic-glycol',
    composition: '20 mL acetic acid + 1 mL HNO₃ + 60 mL ethylene glycol + 19 mL H₂O',
    materials: 'Magnesium and magnesium alloys',
    application: 'Swab 5–30 s',
  },
]

export default function EtchantsPage() {
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Etchants</h1>
            <p className="text-sm md:text-xl text-gray-600">
              A quick reference for the most widely used metallographic etchants, and where to go
              when you need more than the basics.
            </p>
          </div>

          {/* Referral card */}
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 md:p-8 mb-10">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex w-12 h-12 rounded-lg bg-primary-100 items-center justify-center flex-shrink-0">
                <FlaskConical className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-2">
                  Looking for a complete etchant database?
                </h2>
                <p className="text-gray-700 mb-4">
                  Materials Prep hosts an extensive, professionally maintained etchant database
                  built by PACE Technologies — thousands of etchants searchable by material family,
                  alloy, application method, and the features they reveal, with compositions,
                  procedures, and safety data. It goes well beyond what a static reference page can
                  cover, and free-tier memberships are available.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <a
                    href="https://materialsprep.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center justify-center gap-2"
                  >
                    Browse the etchant database
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <Link
                    href="/materials-prep"
                    className="btn-secondary inline-flex items-center justify-center gap-2"
                  >
                    About Materials Prep
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Materials Prep is a PACE Technologies product with free and paid tiers.
                  Metallography.org is PACE&apos;s free educational resource, run with editorial
                  separation.
                </p>
              </div>
            </div>
          </div>

          {/* Safety warning */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 md:p-5 rounded mb-8 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <strong>Safety:</strong> Always add acid to water, never water to acid. HF-bearing
              etchants (Keller&apos;s, Kroll&apos;s) require a fume hood, HF-rated gloves, a face
              shield, and calcium gluconate gel on hand. Picric-bearing etchants (Picral,
              Vilella&apos;s) must be stored wetted — picric acid is explosive when dry. Review the{' '}
              <Link href="/guides/safety-fundamentals" className="text-primary-600 hover:underline">
                safety fundamentals guide
              </Link>{' '}
              and the relevant SDS before mixing any etchant.
            </div>
          </div>

          {/* Quick reference table */}
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Common Etchants Quick Reference</h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Etchant</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Composition</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Materials</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Application</th>
                </tr>
              </thead>
              <tbody>
                {commonEtchants.map((etchant, i) => (
                  <tr key={etchant.name} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                    <td className="border border-gray-300 px-3 py-2 font-medium whitespace-nowrap">
                      {etchant.name}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">{etchant.composition}</td>
                    <td className="border border-gray-300 px-3 py-2">{etchant.materials}</td>
                    <td className="border border-gray-300 px-3 py-2">{etchant.application}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mb-10">
            Compositions and times are typical starting points; adjust for the specific alloy and
            condition. Color/tint etchants require a deformation-free, colloidal-silica-finished
            surface.
          </p>

          {/* Further reading */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/resources/common-etchants-guide"
              className="border border-gray-200 rounded-lg p-5 hover:border-primary-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-5 h-5 text-primary-600" />
                <span className="font-semibold text-primary-600 group-hover:underline">
                  Common Etchants Reference Guide
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Detailed per-material etchant guidance with safety notes and selection tips.
              </p>
            </Link>
            <Link
              href="/guides/etching-procedures"
              className="border border-gray-200 rounded-lg p-5 hover:border-primary-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-5 h-5 text-primary-600" />
                <span className="font-semibold text-primary-600 group-hover:underline">
                  Etching Procedures Guide
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Chemical, electrolytic, and tint etching techniques — how and when to use each.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
