'use client'

import { useState } from 'react'

export default function GritSizeConverter() {
  const [inputValue, setInputValue] = useState('')
  const [inputType, setInputType] = useState('fepa')
  const [results, setResults] = useState<Record<string, string | null>>({})

  // US (ANSI/CAMI B74.18) ↔ FEPA P-grade ↔ approximate median particle size (µm)
  // for SiC grinding papers. The two scales track each other at the coarse end
  // but diverge sharply at the fine end (e.g. US 400 ≈ P800, NOT P400).
  // Values are approximate; vendors vary at the margin.
  const conversions = [
    { ansi: '60', fepa: 'P60', micron: '269' },
    { ansi: '80', fepa: 'P80', micron: '201' },
    { ansi: '120', fepa: 'P120', micron: '127' },
    { ansi: '180', fepa: 'P180', micron: '82' },
    { ansi: '220', fepa: 'P240', micron: '58' },
    { ansi: '240', fepa: 'P280', micron: '52' },
    { ansi: '320', fepa: 'P400', micron: '35' },
    { ansi: '400', fepa: 'P800', micron: '22' },
    { ansi: '600', fepa: 'P1200', micron: '15' },
    { ansi: '800', fepa: 'P1500', micron: '12' },
    { ansi: '1000', fepa: 'P2000', micron: '10' },
    { ansi: '1200', fepa: 'P2500', micron: '8' },
    { ansi: '1500', fepa: 'P3000', micron: '6' },
    { ansi: '2000', fepa: 'P4000', micron: '5' },
  ]

  const handleConvert = () => {
    const value = inputValue.trim().toUpperCase()
    if (!value) return

    let match: typeof conversions[0] | undefined

    if (inputType === 'fepa') {
      // Handle FEPA with or without P prefix
      const fepaValue = value.startsWith('P') ? value : `P${value}`
      match = conversions.find(c => c.fepa === fepaValue)
    } else if (inputType === 'ansi') {
      match = conversions.find(c => c.ansi === value)
    } else if (inputType === 'micron') {
      // Find the closest match by relative difference, within 20% tolerance
      const micronValue = parseFloat(value)
      if (!isNaN(micronValue) && micronValue > 0) {
        let bestDiff = Infinity
        for (const c of conversions) {
          const cMicron = parseFloat(c.micron)
          const diff = Math.abs(cMicron - micronValue) / cMicron
          if (diff < bestDiff) {
            bestDiff = diff
            match = c
          }
        }
        if (bestDiff > 0.2) match = undefined
      }
    }

    if (match) {
      setResults({
        ansi: match.ansi,
        fepa: match.fepa,
        micron: `≈ ${match.micron} μm`,
      })
    } else {
      setResults({
        ansi: 'Not found',
        fepa: 'Not found',
        micron: 'Not found',
      })
    }
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div>
          <h1 className="text-4xl font-bold mb-4">Grit Size Converter</h1>
          <p className="text-xl text-gray-600 mb-8">
            Convert between US (ANSI/CAMI) and European (FEPA P-grade) grit size standards for
            SiC grinding papers, with approximate particle sizes in microns. The two scales are
            not aliases — they diverge sharply at the fine end.
          </p>

          <div className="card mb-8">
            <div className="mb-6">
              <label htmlFor="inputType" className="block text-sm font-semibold text-gray-700 mb-2">
                Input Type
              </label>
              <select
                id="inputType"
                value={inputType}
                onChange={(e) => setInputType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="fepa">FEPA (P-Grade)</option>
                <option value="ansi">US (ANSI/CAMI)</option>
                <option value="micron">Micron (μm)</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="inputValue" className="block text-sm font-semibold text-gray-700 mb-2">
                Value
              </label>
              <input
                id="inputValue"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={inputType === 'micron' ? 'e.g., 127' : inputType === 'fepa' ? 'e.g., P120 or 120' : 'e.g., 320'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <button
              onClick={handleConvert}
              className="btn-primary w-full"
            >
              Convert
            </button>
          </div>

          {Object.keys(results).length > 0 && (
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">Conversion Results</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">US (ANSI/CAMI)</div>
                  <div className="text-lg font-semibold">{results.ansi}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">FEPA</div>
                  <div className="text-lg font-semibold">{results.fepa}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Micron</div>
                  <div className="text-lg font-semibold">{results.micron}</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Approximate equivalents; abrasive vendors vary at the margin.
              </p>
            </div>
          )}

          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">About Grit Sizes</h3>
            <p className="text-gray-700 text-sm mb-4">
              Different standards use different numbering systems for abrasive grit sizes.
              This converter helps you find equivalent sizes across standards.
            </p>
            <ul className="text-sm text-gray-700 space-y-2 mb-4">
              <li><strong>US (ANSI/CAMI B74.18):</strong> The grading printed on most North American grinding papers</li>
              <li><strong>FEPA (P-Grade):</strong> European / international standard, marked with a &quot;P&quot; prefix</li>
              <li><strong>Micron:</strong> Approximate median abrasive particle size in micrometers</li>
            </ul>
            <p className="text-gray-700 text-sm">
              <strong>Important:</strong> US and FEPA numbers are roughly equal at the coarse end but
              diverge sharply at the fine end — US 320 ≈ P400, US 400 ≈ P800, and US 600 ≈ P1200.
              Matching the printed numbers (&quot;400 grit = P400&quot;) can put a preparation ladder a full
              grade off. Conversions are approximate, and vendors vary at the margin; this table covers
              the grades commonly used for metallographic SiC papers (US 60–2000 / P60–P4000).
            </p>
          </div>

          <div className="mt-8 bg-primary-50 border-l-4 border-primary-600 p-6 rounded">
            <h3 className="text-lg font-semibold mb-3">Need More Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Check out our comprehensive guides on grinding techniques and sample preparation.
            </p>
            <a href="/guides/grinding-techniques" className="text-primary-600 font-semibold hover:underline">
              View Grinding Techniques Guide →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

