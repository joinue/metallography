// Curated microstructure-quiz question bank.
//
// Each question references a real image already in /public/images/microstructures/
// that has been hand-reviewed for label accuracy. Filenames map to the same set
// used by the gallery (lib/microstructure-images.ts) so we don't ship duplicate
// assets — we just curate which images make pedagogically clean quiz questions.
//
// Question shape: identify the microstructural phase / constituent visible in
// the image. Each question carries 4 plausible distractors and a one-paragraph
// explanation that names the diagnostic features.

export interface QuizQuestion {
  id: string
  imageFilename: string
  question: string
  options: string[]
  correct: number // index into options
  explanation: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  topic: 'phase-id' | 'material-id' | 'etchant-id' | 'treatment-id'
}

export const quizQuestions: QuizQuestion[] = [
  // ===== Phase ID — the most pedagogically useful set =====
  {
    id: 'q1',
    imageFilename: '1095 Steel water quenched, martensite, Vilellas, 1000X.JPG',
    question: 'What is the dominant microstructural constituent visible here?',
    options: ['Pearlite', 'Bainite', 'Martensite', 'Ferrite'],
    correct: 2,
    explanation:
      'The needle-like / lath morphology and the high apparent hardness contrast under Vilella\'s reagent are diagnostic for martensite. This is 1095 (high-carbon eutectoid steel) water-quenched from austenite — the rapid cool traps carbon in a body-centered tetragonal (BCT) structure with no time for diffusion. Pearlite would show alternating lamellar lines; bainite would show a feathery or acicular but coarser plate structure.',
    difficulty: 'beginner',
    topic: 'phase-id',
  },
  {
    id: 'q2',
    imageFilename: '1095 Steel furnace cooled, pearlite, 2% nital, 400X.JPG',
    question: 'The lamellar (alternating-layer) structure shown here is characteristic of which constituent?',
    options: ['Bainite', 'Martensite', 'Pearlite', 'Widmanstätten ferrite'],
    correct: 2,
    explanation:
      'Pearlite is the classic eutectoid product of slow cooling from austenite — alternating plates of soft ferrite (light) and hard cementite (dark under nital). The lamellar spacing depends on cooling rate: slower furnace-cool produces coarser pearlite as shown here in 1095 steel. Etched with 2% nital, ferrite stays light and cementite darkens.',
    difficulty: 'beginner',
    topic: 'phase-id',
  },
  {
    id: 'q3',
    imageFilename: 'Ferrite-Pearlite steel.JPG',
    question: 'In this hypoeutectoid steel, the light areas free of lamellae are:',
    options: ['Cementite networks', 'Proeutectoid ferrite', 'Retained austenite', 'Bainite islands'],
    correct: 1,
    explanation:
      'Hypoeutectoid steels (less than 0.77% C) form proeutectoid ferrite first as they cool through the gamma+alpha region; the remaining austenite then transforms to pearlite at the eutectoid temperature. So the homogeneous light grains = ferrite, and the lamellar islands = pearlite. The ferrite-to-pearlite ratio is a quick visual indicator of carbon content.',
    difficulty: 'beginner',
    topic: 'phase-id',
  },
  {
    id: 'q4',
    imageFilename: 'Nodular cast iron, 200X.JPG',
    question: 'The dark, near-spherical features in this matrix are:',
    options: [
      'Manganese sulfide inclusions',
      'Graphite nodules (spheroidal graphite)',
      'Chromium carbides',
      'Porosity from prep pull-out',
    ],
    correct: 1,
    explanation:
      'Nodular (ductile / SG) cast iron is defined by its spheroidal graphite, produced by inoculation with magnesium or cerium during melting. The roundness rating and nodule count per ASTM A247 control the iron\'s mechanical properties — round, well-distributed nodules give the highest ductility. If the features looked irregular and torn-walled, you\'d suspect prep pull-out instead.',
    difficulty: 'beginner',
    topic: 'material-id',
  },
  {
    id: 'q5',
    imageFilename: 'Gray iron, 2% nital, 400X.JPG',
    question: 'The dark elongated flakes embedded in this matrix are:',
    options: ['Sulfide stringers', 'Flake graphite', 'Martensite needles', 'Retained austenite'],
    correct: 1,
    explanation:
      'Gray cast iron contains carbon as flake (lamellar) graphite — the flakes are the source of the iron\'s name (the freshly broken surface is gray from the graphite). Flake morphology gives gray iron its low strength and high damping capacity but limits ductility. Per ASTM A247 the Type A random flake distribution shown here is the most desirable for general castings.',
    difficulty: 'beginner',
    topic: 'material-id',
  },
  {
    id: 'q6',
    imageFilename: '70-30 rolled brass, 200X.JPG',
    question: 'The straight, parallel-sided lines crossing many grains in this rolled brass are:',
    options: [
      'Slip bands from cold work',
      'Annealing twins',
      'Grain boundaries',
      'Etch-pit alignments',
    ],
    correct: 1,
    explanation:
      'Annealing twins are a hallmark of FCC metals with low stacking-fault energy after recrystallization — Cu, brass, austenitic stainless, and Ni all show them. Twins are bounded by perfectly straight, parallel coherent boundaries that cut across grains. Don\'t confuse them with slip bands (curved, follow grain orientation) or grain boundaries (irregular curves).',
    difficulty: 'intermediate',
    topic: 'phase-id',
  },
  {
    id: 'q7',
    imageFilename: '431 Stainless steel, Kallings no. 2, 400X.JPG',
    question: 'Etched with Kalling\'s No. 2, this 431-grade stainless reveals what microstructure?',
    options: [
      'Austenite + ferrite (duplex)',
      'Pure austenite with twins',
      'Tempered martensite with fine carbides',
      'Sigma phase precipitates',
    ],
    correct: 2,
    explanation:
      '431 is a martensitic precipitation-hardening stainless (about 16% Cr, 2% Ni). After tempering it shows a tempered-martensite matrix with fine alloy carbides — Kalling\'s No. 2 (CuCl₂ + HCl + ethanol) preferentially attacks the martensite to give this contrast. Duplex grades like 2205 would show a two-phase ferrite + austenite morphology; austenitic grades show twins similar to brass.',
    difficulty: 'advanced',
    topic: 'phase-id',
  },
  {
    id: 'q8',
    imageFilename: 'White Iron (Hyper-Eutectic), Picral, 100X.JPG',
    question: 'The large white plates in this hypereutectic white iron are:',
    options: [
      'Proeutectic cementite (Fe₃C)',
      'Primary austenite dendrites',
      'Graphite flakes',
      'Ferrite grains',
    ],
    correct: 0,
    explanation:
      'A hypereutectic white iron (carbon above the eutectic at ~4.3%) freezes proeutectic cementite first — these large, blade-like white plates — surrounded by ledeburite (austenite + cementite eutectic). Picral attacks cementite weakly and the matrix more strongly, so cementite stays light and the matrix darkens. White irons have no graphite; that\'s the difference from gray iron.',
    difficulty: 'advanced',
    topic: 'phase-id',
  },
  {
    id: 'q9',
    imageFilename: 'Al-Si alloy, Kellers, 400X.JPG',
    question: 'In this Al-Si casting alloy etched with Keller\'s, the dark needle-like / acicular phase is:',
    options: [
      'Iron-rich intermetallic (β-AlFeSi)',
      'Eutectic silicon',
      'Magnesium silicide',
      'Recrystallized aluminum grains',
    ],
    correct: 1,
    explanation:
      'Hypoeutectic Al-Si casting alloys solidify with primary aluminum dendrites surrounded by Al-Si eutectic. Without modification (Sr, Na), the eutectic silicon appears as coarse acicular plates as shown here. With proper modification it would refine into fibrous Si rosettes. Keller\'s (HF + HNO₃ + HCl + H₂O) etches the Al matrix and leaves the Si dark.',
    difficulty: 'intermediate',
    topic: 'phase-id',
  },
  {
    id: 'q10',
    imageFilename: 'Inconel-500x-weld.jpg',
    question: 'In this Inconel weld, the long columnar grains are:',
    options: [
      'Heat-affected-zone (HAZ) recrystallized grains',
      'Solidification grains in the fusion zone',
      'Sigma phase precipitates',
      'Carbide stringers from rolling',
    ],
    correct: 1,
    explanation:
      'Weld fusion zones solidify epitaxially from the partially-melted base metal grains and grow as columnar dendrites along the heat-flow direction. The result is the long parallel grains pointing inward toward the weld centerline as shown here. The HAZ is on either side and consists of base-metal grains modified by heat without melting; carbides/sigma in superalloys appear as fine precipitates, not coarse columnar features.',
    difficulty: 'advanced',
    topic: 'material-id',
  },
  {
    id: 'q11',
    imageFilename: 'Ti6Al4V.jpg',
    question: 'Ti-6Al-4V in the alpha-beta condition typically shows what morphology?',
    options: [
      'Single-phase columnar grains',
      'Lamellar / Widmanstätten alpha+beta basket-weave',
      'Pearlitic colonies',
      'Spheroidized cementite',
    ],
    correct: 1,
    explanation:
      'Ti-6Al-4V is the workhorse alpha-beta titanium alloy. Slow-cooled or beta-annealed, it produces a Widmanstätten / basketweave structure of alpha laths separated by beta. Faster cooling gives finer laths; very rapid cooling can produce alpha-prime martensite. The dual-phase morphology distinguishes it from pure alpha or beta titanium.',
    difficulty: 'intermediate',
    topic: 'phase-id',
  },
  {
    id: 'q12',
    imageFilename: 'Mn-Al Bronze (alcoholic FeCl3) 400X.JPG',
    question: 'The lighter and darker phases in this Mn-Al bronze etched with alcoholic FeCl₃ represent:',
    options: [
      'Ferrite and pearlite (this is steel, not bronze)',
      'Alpha (FCC Cu-rich) and kappa (intermetallic) phases',
      'Tempered martensite and austenite',
      'Eutectic silicon and aluminum dendrites',
    ],
    correct: 1,
    explanation:
      'Mn-Al bronzes (Cu-Al-Mn-Fe-Ni) solidify with an alpha matrix (FCC Cu-rich) plus various kappa intermetallic phases (κII, κIII, κIV) that contain Fe, Mn, Ni, Al. Alcoholic FeCl₃ attacks the alpha matrix preferentially, leaving the harder kappa phases as the lighter relief features. This system is the basis of high-strength marine bronzes for ship propellers.',
    difficulty: 'advanced',
    topic: 'phase-id',
  },
  // ===== Etchant ID =====
  {
    id: 'q13',
    imageFilename: '1018FC.jpg',
    question: 'You want to differentiate ferrite from pearlite in a 1018 furnace-cooled steel. What\'s the standard first-choice etchant?',
    options: [
      'Aqua Regia',
      "Kalling's No. 2",
      '2% Nital',
      "Marble's Reagent",
    ],
    correct: 2,
    explanation:
      '2% Nital (2 mL HNO₃ in 98 mL ethanol) is the classic carbon-steel etchant. It darkens pearlite (because cementite gets attacked at lamellar boundaries and creates a fine relief that scatters light) while leaving ferrite light. For finer pearlite-vs-cementite distinction, picral is the next step. Kalling\'s is for stainless; aqua regia is for stainless / nickel; Marble\'s is for nickel-based superalloys.',
    difficulty: 'beginner',
    topic: 'etchant-id',
  },
  {
    id: 'q14',
    imageFilename: '6061-Aluminum.jpg',
    question: "Which etchant is the standard general-purpose choice for revealing grain structure in aluminum alloys?",
    options: [
      'Picral',
      "Keller's Reagent",
      'Vilella\'s Reagent',
      "Murakami's Reagent",
    ],
    correct: 1,
    explanation:
      'Keller\'s Reagent (HF + HCl + HNO₃ + H₂O) is the universal aluminum etchant. The HF makes it aggressive on the Al oxide layer and reveals grain boundaries and second-phase precipitates. Picral and Vilella\'s are steel etchants; Murakami\'s is for tungsten / refractory metals and tool-steel carbides. CAUTION — Keller\'s contains HF and requires special PPE.',
    difficulty: 'beginner',
    topic: 'etchant-id',
  },
  {
    id: 'q15',
    imageFilename: 'Cast-titanium.jpg',
    question: 'The standard etchant for titanium and Ti alloys (Kroll\'s reagent) contains which signature ingredient?',
    options: [
      'Picric acid',
      'Hydrofluoric acid (HF)',
      'Potassium ferricyanide',
      'Sodium thiosulfate',
    ],
    correct: 1,
    explanation:
      'Kroll\'s Reagent is 2 mL HF + 6 mL HNO₃ + 92 mL H₂O. The HF is essential — it cuts through the tenacious TiO₂ passivation layer that forms instantly on titanium and prevents normal etchants from working. Apply by swab in 5–15 seconds in a fume hood with HF-rated PPE; never let the surface dry between application and rinse.',
    difficulty: 'intermediate',
    topic: 'etchant-id',
  },
]

// Pull a random subset for a quiz session
export function pickRandomQuestions(n: number, seed?: number): QuizQuestion[] {
  const pool = [...quizQuestions]
  // Lightweight seeded shuffle (Fisher-Yates with mulberry32 for determinism in tests)
  let s = seed ?? Date.now()
  const rng = () => {
    s |= 0
    s = (s + 0x6D2B79F5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, Math.min(n, pool.length))
}
