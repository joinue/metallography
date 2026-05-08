// Static, authoritative hazard summaries for the etchants most commonly
// referenced across metallography.org. These are conservative summaries
// suitable for educational callouts; they do NOT replace SDS review.
//
// Keys are lowercase canonical names; resolveHazards() does fuzzy matching
// against alt-spellings ("Kalling's No. 2", "Kallings No. 2", "kallings 2").

export type HazardLevel = 'caution' | 'danger' | 'extreme'

export interface EtchantHazard {
  /** Canonical display name */
  name: string
  /** Highest-severity level for the worst-actor in the recipe */
  level: HazardLevel
  /** Short tag-line summary shown at the top of a callout */
  headline: string
  /** Bullet items: specific hazards present */
  hazards: string[]
  /** Bullet items: required PPE / handling */
  handling: string[]
  /** Bullet items: storage / disposal rules */
  storage?: string[]
}

export const etchantHazards: Record<string, EtchantHazard> = {
  // ---- HF-containing ----
  'kroll': {
    name: "Kroll's Reagent",
    level: 'extreme',
    headline: 'Contains hydrofluoric acid (HF). HF is bone-seeking and can cause delayed, lethal injury from small skin exposures.',
    hazards: [
      'HF penetrates skin and reaches deep tissue and bone, causing systemic toxicity hours after exposure.',
      'Symptoms can be delayed; a small splash that does not feel painful is still a medical emergency.',
      'NOₓ fumes from HNO₃ are toxic to the respiratory tract.',
    ],
    handling: [
      'Mix and apply only in a fume hood.',
      'HF-rated nitrile or neoprene gloves over standard nitrile, full face shield, lab coat, splash apron.',
      'Calcium gluconate gel must be on hand BEFORE you mix the etchant.',
      'Never let the surface dry between application and rinse — HF residue continues to attack.',
    ],
    storage: [
      'Store in HF-compatible (PE/PP) bottle, never glass.',
      'Neutralize spent etchant with calcium hydroxide or carbonate before disposal.',
    ],
  },
  "keller": {
    name: "Keller's Reagent",
    level: 'extreme',
    headline: 'Contains hydrofluoric acid (HF) plus HCl and HNO₃. HF requires special PPE and a calcium gluconate antidote.',
    hazards: [
      'HF causes deep, delayed-onset tissue and bone damage from skin and inhalation exposure.',
      'HCl + HNO₃ generate toxic NOₓ and HCl vapors when mixed.',
    ],
    handling: [
      'Fume hood mandatory.',
      'HF-rated gloves, full face shield, splash apron.',
      'Calcium gluconate gel within arm\'s reach before opening any bottle.',
      'Apply by swab, never immerse a finger or thumb to wipe.',
    ],
    storage: [
      'Store in PE/PP, never glass — HF etches glass.',
      'Neutralize with Ca(OH)₂ or limestone before disposal.',
    ],
  },

  // ---- Picric-acid containing ----
  'picral': {
    name: 'Picral / Picric acid solutions',
    level: 'danger',
    headline: 'Picric acid is shock-sensitive and explosive when dry. Store wetted with at least 30% water by weight; 10% is the regulatory shipping minimum, not a safe lab-bench storage threshold.',
    hazards: [
      'Dry picric acid (or its metal picrate salts) can detonate from friction, shock, or heat.',
      'Picric acid forms shock-sensitive picrates with metals — never store in metal-capped bottles or near copper, lead, or zinc.',
      'Toxic by ingestion and skin absorption; stains skin yellow as a warning sign of contact.',
    ],
    handling: [
      'Always confirm the bottle is wetted (visible water layer) BEFORE opening.',
      'Use plastic or amber-glass containers with plastic-lined caps; never metal caps or metal-lined closures.',
      'Mix in a fume hood; standard PPE — gloves, goggles, lab coat.',
      'Never evaporate to dryness when concentrating; never grind dry crystals.',
    ],
    storage: [
      'Store wetted with ≥30% water by weight in a labeled plastic or amber-glass bottle, away from acids and metals (Cu, Pb, Zn, Fe).',
      'Inspect periodically for water-layer loss; refill before crystals begin to dry out.',
      'Bottles with crusted necks or dried crystals must be handled by hazardous-materials specialists — do not open.',
      'Spent picral solutions remain toxic; collect for organic-acid waste stream.',
    ],
  },
  'vilella': {
    name: "Vilella's Reagent",
    level: 'danger',
    headline: 'Contains picric acid — explosive when dry — plus HCl. Store wetted; mix only in a fume hood.',
    hazards: [
      'Dry picric acid is shock-sensitive and explosive.',
      'HCl produces respiratory-irritant vapors; mixed with picric in ethanol, splash potential is higher than nital.',
    ],
    handling: [
      'Confirm picric source bottle is wetted before opening.',
      'Mix in fume hood. Standard PPE plus splash apron.',
      'Do not store in metal-capped bottles.',
    ],
    storage: [
      'Mix small batches; stock solutions degrade and concentrate as ethanol evaporates.',
      'Picric-acid waste to organic-waste stream after dilution.',
    ],
  },

  // ---- Nital ----
  'nital': {
    name: 'Nital (HNO₃ in ethanol)',
    level: 'caution',
    headline: 'Flammable (ethanol base) and corrosive (nitric acid). Releases toxic NOₓ vapors.',
    hazards: [
      'Ethanol is flammable; ignition sources (open flames, hot plates, sparks) must be eliminated.',
      'Nitric acid produces NO₂ vapors (orange-brown) — toxic to lungs and eyes, can cause delayed pulmonary edema.',
      'Concentration matters: 5–10% nital is significantly more aggressive and produces more NOₓ than 2% nital.',
    ],
    handling: [
      'Mix and apply in a fume hood.',
      'Standard PPE: nitrile gloves, safety glasses, lab coat.',
      'Always pour acid into ethanol slowly — never the reverse — and not above 30 °C; mixing is exothermic.',
      'Cap bottle tightly; nital evolves NOₓ slowly even sealed.',
    ],
    storage: [
      'Amber bottle, away from sunlight; replace every 3–6 months.',
      'Spent nital: dilute heavily, neutralize with NaHCO₃ to pH 6–8 before disposal.',
    ],
  },

  // ---- Glyceregia / aqua regia ----
  'glyceregia': {
    name: 'Glyceregia',
    level: 'danger',
    headline: 'Mixed HNO₃ + HCl in glycerol. Generates toxic NOₓ + Cl₂; activity decays — never store mixed.',
    hazards: [
      'Generates NOₓ (orange-brown) and Cl₂ (greenish-yellow) vapors that attack lungs and mucous membranes.',
      'Mixed solution can decompose energetically if stored in a sealed container — pressure buildup risk.',
      'Glycerol is hygroscopic; old solution can become unpredictably more reactive.',
    ],
    handling: [
      'Mix in a fume hood, in small batches, immediately before use.',
      'Standard PPE plus splash apron.',
      'Discard mixed etchant within hours of preparation; never seal-store.',
    ],
    storage: [
      'Stock acids only — never the mixture.',
      'Dilute spent etchant heavily, neutralize with NaHCO₃, dispose per local regulations.',
    ],
  },
  'aqua regia': {
    name: 'Aqua Regia',
    level: 'danger',
    headline: '3 HCl : 1 HNO₃. Generates NOₓ, Cl₂, and NOCl; pressurizes if sealed — never store mixed.',
    hazards: [
      'NOₓ + Cl₂ + NOCl evolution; severe respiratory and eye irritant.',
      'Reacts violently with organics, ammonia, sulfides, and many metals — generates heat and toxic gases.',
      'Pressure buildup ruptures sealed containers.',
    ],
    handling: [
      'Mix only in a fume hood, in small volumes, immediately before use.',
      'PPE: nitrile gloves, full face shield, lab coat, splash apron.',
      'Add HNO₃ to HCl, slowly, with cooling.',
    ],
    storage: [
      'Never store mixed. Discard unused aqua regia by slow dilution into a large volume of cold water in the fume hood; neutralize and dispose.',
    ],
  },

  // ---- Color etchants ----
  'klemm': {
    name: "Klemm's Reagents",
    level: 'caution',
    headline: 'Sodium thiosulfate / potassium metabisulfite stock. Releases SO₂ when acidified or heated.',
    hazards: [
      'Potassium metabisulfite + acid evolves sulfur dioxide (SO₂) — irritant to lungs.',
      'Stock and working solutions are not stable — color response degrades quickly.',
    ],
    handling: [
      'Mix and apply in a fume hood; standard PPE.',
      'Avoid adding strong acids directly to dry K₂S₂O₅.',
    ],
    storage: [
      'Saturated Na₂S₂O₃ stock keeps for months in amber glass; mixed working solution should be discarded the same day.',
    ],
  },
  'beraha': {
    name: "Beraha's Tint Etchants",
    level: 'caution',
    headline: 'HCl plus K₂S₂O₅ working solutions. SO₂ evolution and acid splash risk.',
    hazards: [
      'SO₂ evolution from metabisulfite-acid reaction.',
      'HCl mist; dilute solutions still produce vapors.',
    ],
    handling: ['Fume hood; standard PPE; mix small volumes immediately before use.'],
    storage: ['Discard mixed working solution within hours.'],
  },

  // ---- Murakami's ----
  'murakami': {
    name: "Murakami's Reagent",
    level: 'caution',
    headline: 'Strongly alkaline (NaOH) plus potassium ferricyanide. Toxic if acidified — never mix with acids.',
    hazards: [
      'Potassium ferricyanide + acid releases hydrogen cyanide (HCN). NEVER add acid.',
      'NaOH is severely caustic to skin and eyes.',
    ],
    handling: [
      'Mix NaOH into water FIRST (always), then dissolve ferricyanide.',
      'Fume hood; nitrile gloves, splash apron, full face shield.',
      'Heated Murakami\'s for refractory metals — keep below 80 °C and watch for splashes.',
    ],
    storage: [
      'Discard within the working session; ferricyanide is light-sensitive.',
      'Cyanide-containing waste — collect for hazardous-waste pickup, never down the drain.',
    ],
  },

  // ---- Marble's, Kalling's, Adler's (CuCl₂ + HCl) ----
  'marble': {
    name: "Marble's Reagent",
    level: 'caution',
    headline: 'CuSO₄ + HCl. HCl mist generation; copper ion environmental concern.',
    hazards: [
      'HCl produces respiratory irritant vapor.',
      'Copper sulfate is toxic to aquatic life — never down the drain undiluted.',
    ],
    handling: ['Fume hood; standard PPE; swab application reduces fume exposure vs. immersion.'],
    storage: ['Stable in amber glass; collect spent solution for heavy-metal hazardous waste.'],
  },
  'kalling': {
    name: "Kalling's No. 2 (waterless) / Modified Kalling's",
    level: 'caution',
    headline: 'CuCl₂ + HCl in ethanol. HCl vapor + flammable solvent + heavy metal.',
    hazards: [
      'HCl vapor; ethanol flammability.',
      'Copper-chloride waste is toxic; do not pour to drain.',
    ],
    handling: ['Fume hood, ignition-source control, standard PPE.'],
    storage: ['Stable; collect spent solution for heavy-metal hazardous waste.'],
  },
  'adler': {
    name: "Adler's Etchant",
    level: 'danger',
    headline: 'Cu(NH₄)Cl₂ + FeCl₃ + concentrated HCl. Strong HCl fumes; CuCl₂/FeCl₃ heavy-metal waste.',
    hazards: [
      'Concentrated HCl produces severe respiratory-irritant mist.',
      'Iron and copper salt mixture; toxic effluent.',
    ],
    handling: ['Fume hood mandatory; PPE includes splash apron and full face shield.'],
    storage: ['Stable in amber glass; spent solution to heavy-metal hazardous waste.'],
  },

  // ---- Electrolytic etchants and perchloric ----
  'oxalic': {
    name: 'Oxalic Acid (electrolytic)',
    level: 'caution',
    headline: 'Oxalic acid is moderately toxic and an irritant. Electrolytic application adds shock hazard.',
    hazards: [
      'Oxalic acid is poisonous if ingested and a skin / eye irritant.',
      'Electrolytic cell at 6 V is low-shock-risk but the wet apparatus near a power supply demands attention.',
    ],
    handling: ['Standard PPE; ensure power supply is grounded and DRY around the cell.'],
    storage: ['Stock keeps for months. Neutralize spent acid before disposal.'],
  },
  'perchloric': {
    name: 'Perchloric acid solutions',
    level: 'extreme',
    headline: 'Perchloric acid + organic solvents = explosion risk. Use only in a perchloric-rated fume hood.',
    hazards: [
      'Anhydrous or hot perchloric mixtures with organics (alcohols, acetic anhydride) are powerful explosives.',
      'Even cold dilute mixtures accumulate explosive residues in fume-hood ductwork over time.',
    ],
    handling: [
      'Use only purpose-built electropolishing equipment with a perchloric-rated wash-down hood.',
      'Most labs should use a commercial Lectropol-style cell with chilled solution, not bench mixes.',
    ],
    storage: ['Per institutional policy. Spent solution must not be poured down a drain shared with organic waste.'],
  },

  // ---- Ferric chloride, ammonium-based ----
  'fecl3': {
    name: 'Ferric Chloride (FeCl₃) etchants',
    level: 'caution',
    headline: 'Strongly acidic in solution; stains skin and clothing; toxic to aquatic life.',
    hazards: ['Acidic; corrosive to metals and many surfaces.', 'Persistent yellow-brown stain.'],
    handling: ['Standard PPE; rinse spills immediately to prevent staining and corrosion.'],
    storage: ['Amber glass; spent solution to heavy-metal hazardous waste.'],
  },
  'h2o2 nh4oh': {
    name: 'NH₄OH + H₂O₂ (Cu/brass etch)',
    level: 'caution',
    headline: 'Decomposes rapidly; pressurizes if sealed. Mix immediately before use.',
    hazards: [
      'Ammonia vapor — respiratory irritant.',
      'H₂O₂ decomposes exothermically; sealed containers can rupture.',
    ],
    handling: ['Fume hood; standard PPE; mix in an OPEN beaker, never a closed bottle.'],
    storage: ['Discard within hours of mixing; never store sealed.'],
  },

  // ---- NaOH-based aluminum etchants ----
  'naoh': {
    name: 'NaOH-based aluminum etchants',
    level: 'caution',
    headline: 'Strongly caustic. NaOH attacks skin and eyes more aggressively than most acids.',
    hazards: [
      'Severely caustic — direct contact causes deep burns.',
      'Generates hydrogen gas when reacting with aluminum — flammable.',
    ],
    handling: ['Standard PPE plus splash apron and full face shield. Add NaOH to water slowly with stirring; mixing is exothermic.'],
    storage: ['Plastic bottle (not glass — caustic etches glass over time). Neutralize spent solution to pH 6–8.'],
  },
}

// Resolve a (possibly fuzzy) etchant name to its hazard record.
// Returns null if no entry maps; callers should fall back to the generic
// "all etchants need PPE + fume hood" notice rather than going silent.
export function resolveHazards(name: string | null | undefined): EtchantHazard | null {
  if (!name) return null
  const n = name.toLowerCase()

  // Direct key match
  for (const key of Object.keys(etchantHazards)) {
    if (n.includes(key)) return etchantHazards[key]
  }

  // Composition-based matches (when only the recipe is known)
  if (n.includes('hydrofluoric') || /\bhf\b/.test(n)) return etchantHazards['kroll']
  if (n.includes('picric')) return etchantHazards['picral']
  if (n.includes('aqua regia') || (n.includes('hno3') && n.includes('hcl') && n.includes('3:1'))) {
    return etchantHazards['aqua regia']
  }
  if (n.includes('nital') || (n.includes('hno3') && n.includes('ethanol'))) return etchantHazards['nital']

  return null
}

// Generic baseline reminder for any etchant not matched above.
export const genericEtchantSafety: EtchantHazard = {
  name: 'General etchant handling',
  level: 'caution',
  headline: 'All metallographic etchants are corrosive, toxic, or both. Always work in a fume hood with full PPE.',
  hazards: [
    'Acids and bases cause skin and eye burns; many evolve toxic vapors.',
    'Mixed solutions can be more reactive than their constituents.',
  ],
  handling: [
    'Read the SDS for every component before mixing.',
    'Standard PPE: nitrile gloves, safety glasses, lab coat. Add splash apron and face shield for concentrated acids.',
    'Always pour acid into water — never the reverse.',
    'Have an eyewash, safety shower, and acid neutralizer (NaHCO₃) within reach.',
  ],
  storage: [
    'Label every container with date mixed and full composition.',
    'Neutralize and dilute spent etchant before disposal; collect heavy-metal solutions for hazardous-waste pickup.',
  ],
}
