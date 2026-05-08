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
  
  // Extract material type (common materials)
  const materialPatterns = [
    /(\d{4})\s*(?:steel|carbon\s*steel)/i,
    /(stainless\s*steel)/i,
    /(aluminum|aluminium|al)/i,
    /(titanium|ti)/i,
    /(copper|cu)/i,
    /(brass)/i,
    /(bronze)/i,
    /(nickel|ni)/i,
    /(cast\s*iron|gray\s*iron|nodular|white\s*iron)/i,
    /(alumina|al2o3)/i,
    /(zirconia|zro2)/i,
    /(silicon\s*carbide|sic)/i,
    /(silicon\s*nitride|si3n4)/i,
    /(composite)/i,
    /(ceramic)/i,
  ]
  let material: string | undefined
  for (const pattern of materialPatterns) {
    const match = baseName.match(pattern)
    if (match) {
      material = match[1]
      // Clean up material name
      if (material.match(/^\d{4}$/)) {
        material = `${material} Steel`
      } else if (material.toLowerCase() === 'al') {
        material = 'Aluminum'
      } else if (material.toLowerCase() === 'ti') {
        material = 'Titanium'
      } else if (material.toLowerCase() === 'cu') {
        material = 'Copper'
      } else if (material.toLowerCase() === 'ni') {
        material = 'Nickel'
      }
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
  const treatmentMatch = baseName.match(new RegExp(treatmentPatterns.map(p => p.source).join('|'), 'i'))
  const treatment = treatmentMatch ? treatmentMatch[1] : undefined
  
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
  } else if (material && (etchant || magnification)) {
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

