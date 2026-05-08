// Hardness conversion data based on ASTM E140-12b for non-austenitic steels (Table 1).
// HRC = Rockwell C (150 kgf, diamond cone)
// HRB = Rockwell B (100 kgf, 1/16" ball)
// HRA = Rockwell A (60 kgf, diamond cone)
// HV  = Vickers (diamond pyramid)
// HK  = Knoop (500 gf load)
// HB  = Brinell, 3000 kgf load with tungsten carbide ball (HB W)
//
// Values are approximate. ASTM E140 explicitly states conversions are not exact
// and that direct measurement should always be preferred for critical work.
// HB is omitted (—) where Brinell measurement is not practical (above ~654 HB);
// HRB is omitted in the very-hard range and HRC is omitted in the very-soft range.

export type HardnessScale = 'HRC' | 'HRB' | 'HRA' | 'HV' | 'HK' | 'HB'

export interface HardnessRow {
  hrc: number | null
  hrb: number | null
  hra: number | null
  hv: number | null
  hk: number | null
  hb: number | null
  // approximate tensile strength (steels only) in MPa, when defined
  tensileMpa?: number | null
}

// Anchor table — ASTM E140-12b Table 1 (non-austenitic steels), 5-step
// HRC anchors plus the HRB-only soft-material extension. Linear interpolation
// (in convertHardness below) fills in intermediate values consistent with the
// ASTM curve. Tensile-strength column derives from ASTM A370 / SAE J417 for
// carbon and low-alloy steels and is undefined where the source has no value.
export const hardnessTable: HardnessRow[] = [
  // ===== Soft material range — Rockwell B (no HRC equivalent until HRB ~100) =====
  // Per ASTM E140 Table 6: HRB to HB / HV (SAE-J417 tensile estimates).
  { hrc: null, hrb: 60,  hra: null, hv: 105, hk: 109, hb: 106, tensileMpa: 386 },
  { hrc: null, hrb: 65,  hra: null, hv: 114, hk: 116, hb: 114, tensileMpa: 414 },
  { hrc: null, hrb: 70,  hra: null, hv: 124, hk: 124, hb: 121, tensileMpa: 448 },
  { hrc: null, hrb: 75,  hra: null, hv: 134, hk: 132, hb: 130, tensileMpa: 483 },
  { hrc: null, hrb: 80,  hra: null, hv: 144, hk: 142, hb: 141, tensileMpa: 524 },
  { hrc: null, hrb: 85,  hra: null, hv: 156, hk: 151, hb: 154, tensileMpa: 579 },
  { hrc: null, hrb: 90,  hra: null, hv: 175, hk: 168, hb: 172, tensileMpa: 648 },
  { hrc: null, hrb: 95,  hra: null, hv: 199, hk: 192, hb: 196, tensileMpa: 738 },
  { hrc: null, hrb: 100, hra: null, hv: 226, hk: 219, hb: 218, tensileMpa: 855 },

  // ===== Rockwell C range — ASTM E140-12b Table 1 (5-step anchors) =====
  // Anchors only; the interpolation routine fills in every integer HRC value
  // consistently. These match the canonical published values exactly.
  { hrc: 20, hrb: 100, hra: 60.2, hv: 240, hk: 251, hb: 226, tensileMpa: 779 },
  { hrc: 25, hrb: null, hra: 62.8, hv: 266, hk: 277, hb: 253, tensileMpa: 875 },
  { hrc: 30, hrb: null, hra: 65.3, hv: 302, hk: 313, hb: 286, tensileMpa: 999 },
  { hrc: 35, hrb: null, hra: 67.9, hv: 345, hk: 357, hb: 327, tensileMpa: 1145 },
  { hrc: 40, hrb: null, hra: 70.4, hv: 392, hk: 401, hb: 371, tensileMpa: 1310 },
  { hrc: 45, hrb: null, hra: 72.9, hv: 451, hk: 459, hb: 428, tensileMpa: 1530 },
  { hrc: 50, hrb: null, hra: 75.4, hv: 513, hk: 528, hb: 481, tensileMpa: null },
  { hrc: 55, hrb: null, hra: 78.0, hv: 595, hk: 612, hb: 560, tensileMpa: null },
  { hrc: 60, hrb: null, hra: 80.6, hv: 697, hk: 723, hb: 654, tensileMpa: null },
  { hrc: 65, hrb: null, hra: 83.3, hv: 832, hk: 866, hb: null, tensileMpa: null },
  { hrc: 68, hrb: null, hra: 85.0, hv: 940, hk: 972, hb: null, tensileMpa: null },
]

// Linear interpolation between two anchors.
function interpolate(
  inputValue: number,
  inputKey: keyof HardnessRow,
  outputKey: keyof HardnessRow
): number | null {
  // Filter rows where both input and output are defined
  const rows = hardnessTable
    .filter((r) => r[inputKey] != null && r[outputKey] != null)
    .map((r) => ({
      input: r[inputKey] as number,
      output: r[outputKey] as number,
    }))

  if (rows.length === 0) return null

  // Sort by input ascending
  rows.sort((a, b) => a.input - b.input)

  // Out of range: refuse rather than extrapolate aggressively
  const min = rows[0].input
  const max = rows[rows.length - 1].input
  if (inputValue < min - 0.5 || inputValue > max + 0.5) return null

  // Exact or bracketed
  for (let i = 0; i < rows.length - 1; i++) {
    const a = rows[i]
    const b = rows[i + 1]
    if (inputValue >= a.input && inputValue <= b.input) {
      if (b.input === a.input) return a.output
      const t = (inputValue - a.input) / (b.input - a.input)
      return a.output + t * (b.output - a.output)
    }
  }

  // Edge case: exactly at last point
  if (inputValue === max) return rows[rows.length - 1].output

  return null
}

const scaleKeyMap: Record<HardnessScale, keyof HardnessRow> = {
  HRC: 'hrc',
  HRB: 'hrb',
  HRA: 'hra',
  HV: 'hv',
  HK: 'hk',
  HB: 'hb',
}

export interface ConversionResult {
  hrc: number | null
  hrb: number | null
  hra: number | null
  hv: number | null
  hk: number | null
  hb: number | null
  tensileMpa: number | null
  tensileKsi: number | null
  inRange: boolean
  notes: string[]
}

export function convertHardness(
  value: number,
  fromScale: HardnessScale
): ConversionResult {
  const fromKey = scaleKeyMap[fromScale]
  const notes: string[] = []

  const result: ConversionResult = {
    hrc: null,
    hrb: null,
    hra: null,
    hv: null,
    hk: null,
    hb: null,
    tensileMpa: null,
    tensileKsi: null,
    inRange: false,
    notes,
  }

  // Compute each output (round sensibly per scale)
  const scales: { key: keyof HardnessRow; out: keyof ConversionResult; round: (n: number) => number }[] = [
    { key: 'hrc', out: 'hrc', round: (n) => Math.round(n) },
    { key: 'hrb', out: 'hrb', round: (n) => Math.round(n) },
    { key: 'hra', out: 'hra', round: (n) => Math.round(n * 10) / 10 },
    { key: 'hv', out: 'hv', round: (n) => Math.round(n) },
    { key: 'hk', out: 'hk', round: (n) => Math.round(n) },
    { key: 'hb', out: 'hb', round: (n) => Math.round(n) },
  ]

  for (const s of scales) {
    if (s.key === fromKey) {
      // Echo input back through round so display matches
      ;(result as any)[s.out] = s.round(value)
    } else {
      const v = interpolate(value, fromKey, s.key)
      ;(result as any)[s.out] = v == null ? null : s.round(v)
    }
  }

  // Tensile strength (steel approximation only)
  const tensile = interpolate(value, fromKey, 'tensileMpa')
  if (tensile != null) {
    result.tensileMpa = Math.round(tensile / 5) * 5
    result.tensileKsi = Math.round(tensile * 0.145038)
  }

  // Determine range / notes
  const validInputs = hardnessTable.filter((r) => r[fromKey] != null).map((r) => r[fromKey] as number)
  const minIn = Math.min(...validInputs)
  const maxIn = Math.max(...validInputs)
  result.inRange = value >= minIn && value <= maxIn

  if (!result.inRange) {
    notes.push(`Value out of conversion range (${minIn}–${maxIn} ${fromScale}). Direct measurement required.`)
  }

  // HB cap — Brinell becomes unreliable above ~654 HB / ~55 HRC because the
  // tungsten-carbide ball deforms. Drop the computed value rather than mislead.
  if (result.hb != null && result.hb > 654) {
    result.hb = null
    notes.push('Brinell (HB) is not reliable above ~55 HRC / 654 HB — the carbide ball indenter deforms. HV or HRC is preferred for hardened tool steels.')
  } else if (result.hb == null && fromScale !== 'HB' && result.hrc != null && result.hrc >= 56) {
    notes.push('Brinell (HB) is not reliable above ~55 HRC; the ball indenter deforms. HV or HRC is preferred for hardened tool steels.')
  }

  // HRB cap warning
  if (fromScale === 'HRB' && value > 100) {
    notes.push('HRB above 100 is unreliable; switch to HRC for harder materials.')
  }
  if (fromScale === 'HRC' && value < 20) {
    notes.push('HRC below 20 is unreliable; switch to HRB for softer materials.')
  }

  // General disclaimer
  notes.push('Conversions per ASTM E140-12b for non-austenitic steels. For austenitic stainless, copper alloys, aluminum, etc., use scale-specific tables — direct measurement is always preferred for critical work.')

  return result
}

// Validate input range for a scale.
export function validRangeFor(scale: HardnessScale): { min: number; max: number } {
  const key = scaleKeyMap[scale]
  const validInputs = hardnessTable.filter((r) => r[key] != null).map((r) => r[key] as number)
  return { min: Math.min(...validInputs), max: Math.max(...validInputs) }
}
