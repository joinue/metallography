'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, Info, AlertTriangle } from 'lucide-react'
import {
  convertHardness,
  validRangeFor,
  type HardnessScale,
} from '@/lib/hardness-conversion'

const SCALES: { value: HardnessScale; label: string; description: string }[] = [
  { value: 'HRC', label: 'HRC', description: 'Rockwell C — diamond cone, 150 kgf' },
  { value: 'HRB', label: 'HRB', description: 'Rockwell B — 1/16" ball, 100 kgf' },
  { value: 'HRA', label: 'HRA', description: 'Rockwell A — diamond cone, 60 kgf' },
  { value: 'HV',  label: 'HV',  description: 'Vickers — diamond pyramid' },
  { value: 'HK',  label: 'HK',  description: 'Knoop — elongated diamond' },
  { value: 'HB',  label: 'HB',  description: 'Brinell — 10 mm WC ball, 3000 kgf' },
]

export default function HardnessConverterPage() {
  const [fromScale, setFromScale] = useState<HardnessScale>('HRC')
  const [inputValue, setInputValue] = useState<string>('45')

  const range = useMemo(() => validRangeFor(fromScale), [fromScale])

  const numeric = parseFloat(inputValue)
  const isValidNumber = !isNaN(numeric) && inputValue.trim() !== ''
  const result = useMemo(() => {
    if (!isValidNumber) return null
    return convertHardness(numeric, fromScale)
  }, [numeric, fromScale, isValidNumber])

  return (
    <div className="py-12">
      <div className="container-custom">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:underline">Home</Link>
          {' / '}
          <Link href="/tools" className="hover:underline">Tools</Link>
          {' / Hardness Converter'}
        </nav>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Hardness Converter
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Convert between Rockwell (HRC, HRB, HRA), Vickers (HV), Knoop (HK), and
              Brinell (HB) for non-austenitic steels. Conversions follow ASTM E140-12b.
            </p>
          </div>

          {/* Input panel */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 md:p-8 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-end">
              {/* Value input */}
              <div className="md:col-span-2">
                <label htmlFor="hardness-input" className="block text-sm font-semibold text-gray-700 mb-2">
                  Measured value
                </label>
                <input
                  id="hardness-input"
                  type="number"
                  step="0.1"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g. 45"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
                <p className="text-xs text-gray-500 mt-1.5">
                  Valid {fromScale} range: <span className="font-medium">{range.min} – {range.max}</span>
                </p>
              </div>

              {/* Scale selector */}
              <div>
                <label htmlFor="from-scale" className="block text-sm font-semibold text-gray-700 mb-2">
                  Input scale
                </label>
                <select
                  id="from-scale"
                  value={fromScale}
                  onChange={(e) => setFromScale(e.target.value as HardnessScale)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
                >
                  {SCALES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label} — {s.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          {!isValidNumber && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center text-gray-500">
              Enter a value to see equivalent hardness on other scales.
            </div>
          )}

          {isValidNumber && result && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
                {SCALES.map((s) => {
                  const value = (result as any)[s.value.toLowerCase()] as number | null
                  const isInput = s.value === fromScale
                  return (
                    <div
                      key={s.value}
                      className={`rounded-lg p-4 border-2 ${
                        isInput
                          ? 'bg-primary-50 border-primary-300'
                          : value == null
                            ? 'bg-gray-50 border-gray-200'
                            : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          {s.label}
                        </span>
                        {isInput && (
                          <span className="text-[10px] text-primary-600 font-bold uppercase">Input</span>
                        )}
                      </div>
                      <div className={`text-2xl md:text-3xl font-bold ${value == null ? 'text-gray-300' : 'text-gray-900'}`}>
                        {value == null ? '—' : value}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{s.description.split('—')[0].trim()}</p>
                    </div>
                  )
                })}
              </div>

              {/* Tensile strength estimate */}
              {(result.tensileMpa != null || result.tensileKsi != null) && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-blue-900 mb-1">
                        Approximate tensile strength (steels only)
                      </p>
                      <p className="text-sm text-blue-800">
                        ≈ <strong>{result.tensileMpa} MPa</strong> ({result.tensileKsi} ksi)
                      </p>
                      <p className="text-xs text-blue-700 mt-2">
                        Per ASTM A370 / SAE J417. Valid only for unalloyed and low-alloy carbon steels;
                        does not apply to austenitic stainless, tool steels at very high hardness, or non-ferrous alloys.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes / warnings */}
              {result.notes.length > 0 && (
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded mb-6">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-900 mb-2">Notes</p>
                      <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
                        {result.notes.map((n, i) => (
                          <li key={i}>{n}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Educational section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-primary-600" />
                When to use which scale
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>HRB</strong> — soft to medium materials (annealed steels, brass, aluminum bronze).</li>
                <li><strong>HRC</strong> — hardened steels, carburized cases, tool steels in the 20–65 HRC range.</li>
                <li><strong>HV</strong> — universal scale; works on the same sample from soft matrix through hard precipitates.</li>
                <li><strong>HK</strong> — Knoop's elongated indent fits next to edges and into thin layers (case depth, coatings).</li>
                <li><strong>HB</strong> — bulk hardness on castings and forgings; loses accuracy above ~55 HRC.</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-primary-600" />
                Limits of conversion
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>ASTM E140 conversions apply to <strong>non-austenitic carbon and alloy steels</strong>. Stainless, copper, aluminum, and titanium have different curves.</li>
                <li>Conversions are <strong>not exact</strong> — published agreement is typically ±1 HRC at best.</li>
                <li>For acceptance testing or specifications, use the scale called out in the spec; do not substitute a converted value.</li>
                <li>HB readings above ~654 (≈ 55 HRC) are unreliable; the carbide ball begins to deform.</li>
              </ul>
            </div>
          </div>

          {/* Cross-links */}
          <div className="mt-8 bg-gray-50 border-l-4 border-primary-600 p-5 rounded">
            <h3 className="font-semibold text-gray-900 mb-2">Related</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link href="/resources/hardness-scale-conversion" className="text-primary-600 hover:underline">
                Printable hardness conversion chart →
              </Link>
              <Link href="/guides/hardness-testing-preparation" className="text-primary-600 hover:underline">
                Hardness testing preparation guide →
              </Link>
              <Link href="/guides/heat-treatment-verification" className="text-primary-600 hover:underline">
                Heat treatment verification →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
