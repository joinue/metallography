'use client'

import { useState } from 'react'
import Link from 'next/link'

type CalculationMethod = 'number-to-diameter' | 'diameter-to-number' | 'intercept' | 'planimetric'

export default function GrainSizeCalculator() {
  const [method, setMethod] = useState<CalculationMethod>('number-to-diameter')
  const [grainSizeNumber, setGrainSizeNumber] = useState('')
  const [averageDiameter, setAverageDiameter] = useState('')
  const [interceptCount, setInterceptCount] = useState('')
  const [interceptLength, setInterceptLength] = useState('')
  const [grainCount, setGrainCount] = useState('')
  const [testArea, setTestArea] = useState('')
  const [magnification, setMagnification] = useState('100')
  const [result, setResult] = useState<{ label: string; value: string }[] | null>(null)

  // ASTM E112 relationships:
  //   N = 2^(G-1) where N = grains per square inch at 100x
  //   N_A = 15.50 * 2^(G-1) grains per mm² at 1x
  //   Mean grain diameter d (mm, actual) = sqrt(1/N_A) = 0.254 / 2^((G-1)/2)
  //   Intercept (Heyn): G = -6.643856*log10(l) - 3.288, l = mean lineal intercept in mm at 1x
  //   Planimetric (Jeffries): G = 3.321928*log10(N_A) - 2.954

  const calculateFromNumber = () => {
    const G = parseFloat(grainSizeNumber)
    if (isNaN(G) || G < 0 || G > 14) {
      setResult([{ label: 'Error', value: 'Grain size number must be between 0 and 14' }])
      return
    }

    const N = Math.pow(2, G - 1) // Grains per square inch at 100x
    const NA = 15.50 * Math.pow(2, G - 1) // Grains per mm² at 1x
    const d_mm = 0.254 / Math.pow(2, (G - 1) / 2) // Mean grain diameter in mm (actual size)
    const l_mm = Math.pow(10, -(G + 3.288) / 6.643856) // Mean lineal intercept in mm (actual size)

    setResult([
      { label: 'ASTM Grain Size Number (G)', value: G.toFixed(1) },
      { label: 'Grains per square inch at 100x', value: N.toFixed(N < 10 ? 1 : 0) },
      { label: 'Grains per mm² at 1x', value: NA.toFixed(NA < 10 ? 1 : 0) },
      { label: 'Mean grain diameter', value: `${d_mm.toFixed(4)} mm (${(d_mm * 1000).toFixed(1)} μm)` },
      { label: 'Mean lineal intercept', value: `${(l_mm * 1000).toFixed(1)} μm` },
    ])
  }

  const calculateFromDiameter = () => {
    const d = parseFloat(averageDiameter)

    if (isNaN(d) || d <= 0) {
      setResult([{ label: 'Error', value: 'Diameter must be greater than 0' }])
      return
    }

    // Input is the actual (specimen-scale) mean grain diameter.
    // Values < 1 are treated as mm; values >= 1 are treated as μm.
    const d_mm = d < 1 ? d : d / 1000

    // Solve for G: d_mm = 0.254 / 2^((G-1)/2)
    // G = 1 + 2*log2(0.254 / d_mm)
    const G = 1 + 2 * Math.log2(0.254 / d_mm)
    const N = Math.pow(2, G - 1)
    const NA = 15.50 * Math.pow(2, G - 1)

    if (G < 0 || G > 14) {
      setResult([{ label: 'Error', value: 'Calculated grain size number is outside ASTM E112 range (0-14)' }])
      return
    }

    setResult([
      { label: 'ASTM Grain Size Number (G)', value: G.toFixed(2) },
      { label: 'Grains per square inch at 100x', value: N.toFixed(N < 10 ? 1 : 0) },
      { label: 'Grains per mm² at 1x', value: NA.toFixed(NA < 10 ? 1 : 0) },
      { label: 'Mean grain diameter', value: `${d_mm.toFixed(4)} mm (${(d_mm * 1000).toFixed(1)} μm)` },
    ])
  }

  const calculateFromIntercept = () => {
    const count = parseFloat(interceptCount)
    const length = parseFloat(interceptLength)
    const M = parseFloat(magnification) || 100
    
    if (isNaN(count) || isNaN(length) || count <= 0 || length <= 0) {
      setResult([{ label: 'Error', value: 'Intercept count and length must be greater than 0' }])
      return
    }

    // Mean lineal intercept at actual (1x) scale:
    // test-line length is measured on the image at magnification M,
    // so the true line length is length/M.
    const l_mm = (length / M) / count

    // ASTM E112 (Heyn intercept): G = -6.643856*log10(l) - 3.288, l in mm at 1x
    const G = -6.643856 * Math.log10(l_mm) - 3.288
    const N = Math.pow(2, G - 1)
    const NA = 15.50 * Math.pow(2, G - 1)

    if (G < 0 || G > 14) {
      setResult([{ label: 'Error', value: 'Calculated grain size number is outside ASTM E112 range (0-14)' }])
      return
    }

    setResult([
      { label: 'ASTM Grain Size Number (G)', value: G.toFixed(2) },
      { label: 'Mean lineal intercept', value: `${(l_mm * 1000).toFixed(1)} μm (${l_mm.toFixed(4)} mm)` },
      { label: 'Grains per square inch at 100x', value: N.toFixed(N < 10 ? 1 : 0) },
      { label: 'Grains per mm² at 1x', value: NA.toFixed(NA < 10 ? 1 : 0) },
    ])
  }

  const calculateFromPlanimetric = () => {
    const count = parseFloat(grainCount)
    const area = parseFloat(testArea)
    const M = parseFloat(magnification) || 100
    
    if (isNaN(count) || isNaN(area) || count <= 0 || area <= 0) {
      setResult([{ label: 'Error', value: 'Grain count and test area must be greater than 0' }])
      return
    }

    // Jeffries planimetric method: the grain count is
    // N = n_inside + n_intercepted/2 over a known area.
    // Area is measured on the image at magnification M, so the
    // true (1x) area is area/M². N_A = grains per mm² at 1x.
    const NA = count / (area / Math.pow(M, 2))

    // ASTM E112 (planimetric): G = 3.321928*log10(N_A) - 2.954
    const G = 3.321928 * Math.log10(NA) - 2.954
    const N = Math.pow(2, G - 1) // Grains per square inch at 100x

    if (G < 0 || G > 14) {
      setResult([{ label: 'Error', value: 'Calculated grain size number is outside ASTM E112 range (0-14)' }])
      return
    }

    const d_mm = 0.254 / Math.pow(2, (G - 1) / 2) // Mean grain diameter, actual size

    setResult([
      { label: 'ASTM Grain Size Number (G)', value: G.toFixed(2) },
      { label: 'Grains per mm² at 1x', value: NA.toFixed(NA < 10 ? 1 : 0) },
      { label: 'Grains per square inch at 100x', value: N.toFixed(N < 10 ? 1 : 0) },
      { label: 'Mean grain diameter', value: `${d_mm.toFixed(4)} mm (${(d_mm * 1000).toFixed(1)} μm)` },
    ])
  }

  const handleCalculate = () => {
    setResult(null)
    if (method === 'number-to-diameter') {
      calculateFromNumber()
    } else if (method === 'diameter-to-number') {
      calculateFromDiameter()
    } else if (method === 'intercept') {
      calculateFromIntercept()
    } else if (method === 'planimetric') {
      calculateFromPlanimetric()
    }
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div>
          <h1 className="text-4xl font-bold mb-4">Grain Size Calculator</h1>
          <p className="text-xl text-gray-600 mb-8">
            Calculate ASTM grain size numbers and convert between different grain size measurements 
            using ASTM E112 standard methods. Grain size significantly affects material properties 
            including strength, toughness, and ductility.
          </p>

          <div className="card mb-8">
            <div className="mb-6">
              <label htmlFor="method" className="block text-sm font-semibold text-gray-700 mb-2">
                Calculation Method
              </label>
              <select
                id="method"
                value={method}
                onChange={(e) => {
                  setMethod(e.target.value as CalculationMethod)
                  setResult(null)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="number-to-diameter">Grain Size Number → Average Diameter</option>
                <option value="diameter-to-number">Average Diameter → Grain Size Number</option>
                <option value="intercept">Intercept Method (from measurements)</option>
                <option value="planimetric">Planimetric Method (from grain count)</option>
              </select>
            </div>

            {method === 'number-to-diameter' && (
              <div className="mb-6">
                <label htmlFor="grainSizeNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                  ASTM Grain Size Number (G)
                </label>
                <input
                  id="grainSizeNumber"
                  type="number"
                  step="0.1"
                  min="0"
                  max="14"
                  value={grainSizeNumber}
                  onChange={(e) => setGrainSizeNumber(e.target.value)}
                  placeholder="e.g., 5.0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">Range: 0 to 14 (ASTM E112). Results are actual (specimen-scale) sizes.</p>
              </div>
            )}

            {method === 'diameter-to-number' && (
              <div className="mb-6">
                <label htmlFor="averageDiameter" className="block text-sm font-semibold text-gray-700 mb-2">
                  Average Grain Diameter (actual size)
                </label>
                <input
                  id="averageDiameter"
                  type="number"
                  step="0.001"
                  min="0"
                  value={averageDiameter}
                  onChange={(e) => setAverageDiameter(e.target.value)}
                  placeholder="e.g., 0.050 (mm) or 50 (μm)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Actual (specimen-scale) mean grain diameter, not the size measured on a magnified image.
                  Values &lt; 1 are treated as mm; values ≥ 1 as μm.
                </p>
              </div>
            )}

            {method === 'intercept' && (
              <>
                <div className="mb-6">
                  <label htmlFor="interceptCount" className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Intercepts
                  </label>
                  <input
                    id="interceptCount"
                    type="number"
                    min="1"
                    value={interceptCount}
                    onChange={(e) => setInterceptCount(e.target.value)}
                    placeholder="e.g., 100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Total grain-boundary intersections counted along the test line(s).
                    Count an intersection at a triple point as 1.5; a line end terminating inside a grain as 0.5.
                  </p>
                </div>
                <div className="mb-6">
                  <label htmlFor="interceptLength" className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Intercept Length (mm)
                  </label>
                  <input
                    id="interceptLength"
                    type="number"
                    step="0.01"
                    min="0"
                    value={interceptLength}
                    onChange={(e) => setInterceptLength(e.target.value)}
                    placeholder="e.g., 25.0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Total length of test line(s) in mm as measured on the image at the test magnification</p>
                </div>
                <div className="mb-6">
                  <label htmlFor="magnification" className="block text-sm font-semibold text-gray-700 mb-2">
                    Magnification
                  </label>
                  <input
                    id="magnification"
                    type="number"
                    value={magnification}
                    onChange={(e) => setMagnification(e.target.value)}
                    placeholder="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Magnification used for intercept measurement</p>
                </div>
              </>
            )}

            {method === 'planimetric' && (
              <>
                <div className="mb-6">
                  <label htmlFor="grainCount" className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Grains Counted
                  </label>
                  <input
                    id="grainCount"
                    type="number"
                    min="1"
                    value={grainCount}
                    onChange={(e) => setGrainCount(e.target.value)}
                    placeholder="e.g., 50"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Jeffries count: grains entirely inside the test area count as 1;
                    grains intercepted by the area boundary count as ½ (N = n<sub>inside</sub> + n<sub>intercepted</sub>/2)
                  </p>
                </div>
                <div className="mb-6">
                  <label htmlFor="testArea" className="block text-sm font-semibold text-gray-700 mb-2">
                    Test Area (mm²)
                  </label>
                  <input
                    id="testArea"
                    type="number"
                    step="0.01"
                    min="0"
                    value={testArea}
                    onChange={(e) => setTestArea(e.target.value)}
                    placeholder="e.g., 0.5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Area of test region in mm² as measured on the image at the test magnification</p>
                </div>
                <div className="mb-6">
                  <label htmlFor="magnification" className="block text-sm font-semibold text-gray-700 mb-2">
                    Magnification
                  </label>
                  <input
                    id="magnification"
                    type="number"
                    value={magnification}
                    onChange={(e) => setMagnification(e.target.value)}
                    placeholder="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Magnification used for grain counting</p>
                </div>
              </>
            )}

            <button
              onClick={handleCalculate}
              className="btn-primary w-full"
            >
              Calculate
            </button>
          </div>

          {result && (
            <div className="card mb-8">
              <h2 className="text-2xl font-semibold mb-4">Results</h2>
              <div className="space-y-3">
                {result.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="text-gray-700 font-medium">{item.label}</span>
                    <span className="text-lg font-semibold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">About Grain Size Measurement</h3>
            <p className="text-gray-700 text-sm mb-4">
              Grain size is a critical microstructural parameter that affects material properties. 
              ASTM E112 provides standardized methods for determining average grain size:
            </p>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside mb-4">
              <li><strong>ASTM Grain Size Number (G):</strong> Logarithmic scale where G = log₂(N) + 1, where N is grains per square inch at 100x (equivalently, N<sub>A</sub> = 15.50 × 2<sup>G−1</sup> grains per mm² at 1x)</li>
              <li><strong>Intercept (Heyn) Method:</strong> Count grain-boundary intersections along test lines; triple-point intersections count as 1.5. G = −6.6439·log₁₀(ℓ) − 3.288, with ℓ the mean lineal intercept in mm at 1x</li>
              <li><strong>Planimetric (Jeffries) Method:</strong> Count grains within a known test area — grains inside count 1, grains cut by the boundary count ½. G = 3.3219·log₁₀(N<sub>A</sub>) − 2.954</li>
              <li><strong>Comparison Method:</strong> Compare microstructure to standard charts</li>
            </ul>
            <p className="text-gray-700 text-sm mb-4">
              <strong>Sample preparation:</strong> Reliable grain size measurement requires a deformation-free,
              uniformly etched surface with clearly delineated grain boundaries. Residual polishing deformation
              or uneven etching will bias both intercept and planimetric counts.
            </p>
            <p className="text-gray-700 text-sm">
              <strong>Note:</strong> This calculator uses formulas from ASTM E112. For official grain size
              determination, follow the complete ASTM E112 standard procedures.
            </p>
          </div>

          <div className="mt-8 bg-primary-50 border-l-4 border-primary-600 p-6 rounded">
            <h3 className="text-lg font-semibold mb-3">Need More Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Learn more about microstructural analysis and grain size measurement in our guides.
            </p>
            <Link href="/guides/microstructural-analysis" className="text-primary-600 font-semibold hover:underline">
              View Microstructural Analysis Guide →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

