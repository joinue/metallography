// Utility functions for microstructure image gallery

export interface MicrostructureImage {
  filename: string
  url: string
  material?: string
  treatment?: string
  etchant?: string
  magnification?: string
  technique?: string
  description?: string
  /**
   * Confidence level for the parsed metadata.
   * - 'high': filename contains an explicit, descriptive label (etchant + magnification + at least one of material/phase/treatment), e.g. "1095 Steel furnace cooled, pearlite, 2% nital, 400X.JPG".
   * - 'medium': filename has the material name but is missing etchant or magnification, e.g. "Tungsten.jpg".
   * - 'low': filename is a bare alloy code or shorthand with no descriptive context, e.g. "1018FC.jpg".
   */
  labelConfidence: 'high' | 'medium' | 'low'
}

// Parse filename to extract metadata
export function parseImageMetadata(filename: string): MicrostructureImage {
  // Properly encode the filename for URL using encodeURIComponent
  // This handles special characters like %, spaces, parentheses, etc.
  const encodedFilename = encodeURIComponent(filename)
  const url = `/images/microstructures/${encodedFilename}`
  const baseName = filename.replace(/\.(jpg|JPG|jpeg|JPEG|png|PNG|webp|WEBP)$/i, '')
  
  // Extract magnification (e.g., "400X", "1000X")
  const magMatch = baseName.match(/(\d+)X/i)
  const magnification = magMatch ? `${magMatch[1]}X` : undefined
  
  // Extract technique (DIC, BF, DF, SEM, etc.)
  const techniques = ['DIC', 'BF', 'DF', 'SEM', 'polarized', 'cross polarized', 'sputter coated', 'as-polished', 'etched']
  const technique = techniques.find(t => baseName.toLowerCase().includes(t.toLowerCase()))
  
  // Extract common etchants
  const etchantPatterns = [
    /(\d+%?\s*nital)/i,
    /(picral)/i,
    /(kallings?\s*no\.?\s*\d+)/i,
    /(vilella'?s?)/i,
    /(adler'?s?)/i,
    /(kellers?)/i,
    /(astm[-\s]?\d+)/i,
    /(alcoholic\s*fecl3)/i,
    /(h2o2nh4oh)/i,
    /(chromic[-\s]?naso4)/i,
  ]
  let etchant: string | undefined
  for (const pattern of etchantPatterns) {
    const match = baseName.match(pattern)
    if (match) {
      etchant = match[1]
      break
    }
  }
  
  // Extract material type (common materials).
  // Order matters: specific compounds and alloy families are matched before
  // bare element symbols, and short symbols (Al, Ti, Cu, Ni) require word
  // boundaries so that e.g. "Steatite", "Barium titanate", "AlN" or "Al2O3"
  // are not mislabeled as Titanium / Aluminum.
  const materialPatterns = [
    /(\d{4})\s*(?:steel|carbon\s*steel)/i,
    /(stainless)(?:\s*steel)?/i,
    /(white\s*cast\s*iron|cast\s*iron|gray\s*iron|nodular|white\s*iron)/i,
    /(brass)/i,
    /(bronze)/i,
    /(inconel|hastelloy|nimonic)/i,
    /(barium\s*titanate)/i,
    /(ti[\s-]*6[\s-]*al[\s-]*4[\s-]*v)/i,
    /(aluminum|aluminium|alumiunm)/i,
    /\b(al)\b/i,
    /(titanium)/i,
    /\b(ti)\b/i,
    /(copper)/i,
    /\b(cu)\b/i,
    /(nickel)/i,
    /\b(ni)\b/i,
    /(tungsten)/i,
    /(cobalt)/i,
    /(graphite)/i,
    /(alumina|al2o3)/i,
    /(zirconia|zro2)/i,
    /(silicon\s*carbide|sic)/i,
    /(silicon\s*nitride|si3n4)/i,
    /(composite)/i,
    /(ceramic)/i,
    /(steel)/i,
  ]
  let material: string | undefined
  for (const pattern of materialPatterns) {
    const match = baseName.match(pattern)
    if (match) {
      material = match[1]
      // Clean up / normalize material name
      const lower = material.toLowerCase()
      if (material.match(/^\d{4}$/)) {
        material = `${material} Steel`
      } else if (lower === 'al' || lower === 'aluminium' || lower === 'alumiunm') {
        material = 'Aluminum'
      } else if (lower.replace(/[\s-]/g, '') === 'ti6al4v') {
        material = 'Ti-6Al-4V'
      } else if (lower === 'ti') {
        material = 'Titanium'
      } else if (lower === 'cu') {
        material = 'Copper'
      } else if (lower === 'ni') {
        material = 'Nickel'
      } else if (lower === 'stainless') {
        material = 'Stainless Steel'
      } else if (lower === 'inconel' || lower === 'hastelloy' || lower === 'nimonic') {
        // De-branded display name for trademarked Ni-base alloy families
        material = 'Nickel Superalloy'
      } else if (lower === 'nodular') {
        material = 'Nodular Cast Iron'
      } else if (lower === 'white iron' || lower === 'white cast iron') {
        material = 'White Cast Iron'
      } else if (lower === 'steel') {
        material = 'Steel'
      }
      // Title-case so filter values dedupe ("brass" / "Brass" -> "Brass")
      material = material.replace(/\b[a-z]/g, c => c.toUpperCase())
      break
    }
  }
  
  // Extract treatment/condition
  const treatmentPatterns = [
    /(furnace\s*cooled|fc)/i,
    /(water\s*quenched|wq)/i,
    /(air\s*cooled|ac)/i,
    /(annealed)/i,
    /(normalized)/i,
    /(tempered)/i,
    /(quenched)/i,
    /(rolled)/i,
    /(cast)/i,
    /(wrought)/i,
  ]
  // Use match[0] (the full matched text): the alternatives are joined into one
  // regex, so match[1] is only populated for the first alternative and e.g.
  // "water quenched" or "rolled" would silently be dropped.
  const treatmentMatch = baseName.match(new RegExp(treatmentPatterns.map(p => p.source).join('|'), 'i'))
  const treatment = treatmentMatch ? treatmentMatch[0] : undefined
  
  // Build description
  const parts: string[] = []
  if (material) parts.push(material)
  if (treatment) parts.push(treatment)
  if (etchant) parts.push(`etched with ${etchant}`)
  if (magnification) parts.push(magnification)
  if (technique) parts.push(technique)
  const description = parts.length > 0 ? parts.join(', ') : baseName

  // Confidence rating from how explicit the filename is.
  // High: at least three of {material, etchant, magnification, treatment} parsed,
  //       and the filename uses descriptive separators (commas / spaces) rather
  //       than a bare alloy code.
  // Medium: a parsed material is present but other axes are missing.
  // Low: bare alloy codes (1018FC.jpg, Cu.jpg) — the gallery shows these but
  //       a reviewer should verify the phase claim before treating the image
  //       as authoritative reference.
  const explicitFields = [material, etchant, magnification, treatment].filter(Boolean).length
  const hasDescriptiveSeparators = /[,]/.test(baseName) || /\s\d/.test(baseName)
  let labelConfidence: 'high' | 'medium' | 'low'
  if (explicitFields >= 3 && hasDescriptiveSeparators) {
    labelConfidence = 'high'
  } else if (material) {
    labelConfidence = 'medium'
  } else {
    labelConfidence = 'low'
  }

  return {
    filename,
    url,
    material,
    treatment,
    etchant,
    magnification,
    technique,
    description,
    labelConfidence,
  }
}

// Get all microstructure images (this would typically come from a database or file system)
// For now, we'll create a static list - in production, this could be generated from the file system
export async function getAllMicrostructureImages(): Promise<MicrostructureImage[]> {
  // This is a sample list - in production, you'd read from the file system or database
  // For now, we'll return an empty array and populate it client-side
  return []
}

