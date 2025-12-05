'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { 
  Wrench, 
  Cog, 
  Plane, 
  Rocket, 
  Plug, 
  Flame, 
  Grid3x3, 
  Gem, 
  Atom, 
  Sparkles, 
  Search, 
  Shuffle, 
  Zap, 
  Waves, 
  Circle, 
  BarChart3,
  Star,
  ShoppingCart,
  AlertTriangle,
  Lightbulb,
  Shield,
  ArrowUp,
  RotateCcw,
  X,
  CheckCircle2
} from 'lucide-react'
import { Material, Etchant, getAllMaterials, getAllEtchants, getPaceProductUrl } from '@/lib/supabase'

type PurposeFilter = 
  | 'grain-boundaries'
  | 'carbides'
  | 'phases'
  | 'precipitates'
  | 'inclusions'
  | 'twin-boundaries'
  | 'martensite'
  | 'pearlite'
  | 'ferrite'
  | 'austenite'
  | 'general'

interface EtchantMatch {
  etchant: Etchant
  score: number
  matchReasons: string[]
}

// Common materials for quick selection
const commonMaterials = [
  { category: 'carbon-steel', label: 'Carbon Steel', icon: Wrench },
  { category: 'stainless-steel', label: 'Stainless Steel', icon: Cog },
  { category: 'aluminum', label: 'Aluminum', icon: Plane },
  { category: 'titanium', label: 'Titanium', icon: Rocket },
  { category: 'copper-brass', label: 'Copper/Brass', icon: Plug },
  { category: 'nickel-alloys', label: 'Nickel Alloys', icon: Flame },
]

// Purpose icons
const purposeIcons: Record<PurposeFilter, typeof Grid3x3> = {
  'grain-boundaries': Grid3x3,
  'carbides': Gem,
  'phases': Atom,
  'precipitates': Sparkles,
  'inclusions': Search,
  'twin-boundaries': Shuffle,
  'martensite': Zap,
  'pearlite': Waves,
  'ferrite': Circle,
  'austenite': Circle,
  'general': BarChart3
}

export default function EtchantSelector() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [etchants, setEtchants] = useState<Etchant[]>([])
  const [loading, setLoading] = useState(true)
  
  // Selection state
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
  const [materialSearchQuery, setMaterialSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [purposeFilter, setPurposeFilter] = useState<PurposeFilter | ''>('')
  const [selectedEtchant, setSelectedEtchant] = useState<Etchant | null>(null)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [copiedText, setCopiedText] = useState<string | null>(null)

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(materialSearchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [materialSearchQuery])

  // Load data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [materialsData, etchantsData] = await Promise.all([
          getAllMaterials(),
          getAllEtchants()
        ])
        setMaterials(materialsData)
        setEtchants(etchantsData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Filter materials by search query
  const filteredMaterials = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      // Show featured materials or common ones first
      return materials
        .filter(m => m.status === 'published' || !m.status)
        .sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return (a.sort_order || 0) - (b.sort_order || 0)
        })
        .slice(0, 20) // Limit initial display
    }
    
    const query = debouncedSearchQuery.toLowerCase()
    return materials
      .filter(m => {
        if (m.status !== 'published' && m.status) return false
        const nameMatch = m.name.toLowerCase().includes(query)
        const categoryMatch = m.category?.toLowerCase().includes(query)
        const altNamesMatch = m.alternative_names?.some(alt => 
          alt.toLowerCase().includes(query)
        )
        const tagsMatch = m.tags?.some(tag => 
          tag.toLowerCase().includes(query)
        )
        return nameMatch || categoryMatch || altNamesMatch || tagsMatch
      })
      .slice(0, 20)
  }, [materials, debouncedSearchQuery])

  // Get materials by category for quick selection
  const getMaterialsByCategory = useCallback((category: string) => {
    return materials.filter(m => {
      const matCategory = getMaterialCategory(m)
      return matCategory === category
    }).slice(0, 1)[0] // Get first match
  }, [materials])

  // Get material category for matching
  const getMaterialCategory = (material: Material): string => {
    const category = material.category?.toLowerCase() || ''
    const name = material.name.toLowerCase()
    
    // Map to etchant compatible_materials format
    if (category.includes('carbon') || category.includes('low alloy') || name.includes('carbon steel')) {
      return 'carbon-steel'
    }
    if (category.includes('stainless') || name.includes('stainless')) {
      return 'stainless-steel'
    }
    if (category.includes('aluminum') || name.includes('aluminum') || name.includes('aluminium')) {
      return 'aluminum'
    }
    if (category.includes('copper') || category.includes('brass') || name.includes('copper') || name.includes('brass')) {
      return 'copper-brass'
    }
    if (category.includes('titanium') || name.includes('titanium')) {
      return 'titanium'
    }
    if (category.includes('nickel') || name.includes('nickel') || name.includes('inconel')) {
      return 'nickel-alloys'
    }
    if (category.includes('cast iron') || name.includes('cast iron')) {
      return 'cast-iron'
    }
    if (category.includes('tool steel') || name.includes('tool steel')) {
      return 'tool-steel'
    }
    
    return category
  }

  // Smart matching algorithm
  const matchedEtchants = useMemo((): EtchantMatch[] => {
    if (!selectedMaterial) return []

    const materialCategory = getMaterialCategory(selectedMaterial)
    
    const matches: EtchantMatch[] = []

    for (const etchant of etchants) {
      let score = 0
      const reasons: string[] = []

      // Check compatible materials
      const compatible = etchant.compatible_materials || []
      const incompatible = etchant.incompatible_materials || []
      
      // Direct material match
      if (compatible.includes(materialCategory)) {
        score += 100
        reasons.push(`✓ Compatible`)
      }
      
      // Check material's common etchants
      if (selectedMaterial.common_etchants?.some(name => 
        etchant.name.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(etchant.name.toLowerCase())
      )) {
        score += 80
        reasons.push('✓ Recommended')
      }

      // Check related material IDs
      if (etchant.related_material_ids?.includes(selectedMaterial.id)) {
        score += 70
        reasons.push('✓ Direct link')
      }

      // Purpose-based matching
      if (purposeFilter) {
        const reveals = etchant.reveals?.toLowerCase() || ''
        const typicalResults = etchant.typical_results?.toLowerCase() || ''
        const searchText = `${reveals} ${typicalResults}`
        
        const purposeKeywords: Record<PurposeFilter, string[]> = {
          'grain-boundaries': ['grain boundary', 'grain boundaries', 'grain structure'],
          'carbides': ['carbide', 'carbides'],
          'phases': ['phase', 'phases', 'phase structure', 'alpha', 'beta'],
          'precipitates': ['precipitate', 'precipitates', 'precipitation'],
          'inclusions': ['inclusion', 'inclusions'],
          'twin-boundaries': ['twin', 'twins', 'twin boundary'],
          'martensite': ['martensite'],
          'pearlite': ['pearlite'],
          'ferrite': ['ferrite'],
          'austenite': ['austenite'],
          'general': []
        }
        
        const keywords = purposeKeywords[purposeFilter as PurposeFilter] || []
        if (keywords.some(keyword => searchText.includes(keyword))) {
          score += 50
          reasons.push(`✓ Reveals ${purposeFilter.replace('-', ' ')}`)
        }
      }

      // Hardness-based recommendations
      if (selectedMaterial.hardness_category) {
        const hardness = selectedMaterial.hardness_category
        const etchantName = etchant.name.toLowerCase()
        
        // Higher concentration Nital for harder materials
        if (hardness === 'hard' || hardness === 'very-hard') {
          if (etchantName.includes('nital-5') || etchantName.includes('nital-8') || 
              etchantName.includes('5% nital') || etchantName.includes('8% nital')) {
            score += 30
            reasons.push('✓ For hard materials')
          }
        } else if (hardness === 'soft' || hardness === 'medium') {
          if (etchantName.includes('nital-2') || etchantName.includes('nital-3') ||
              etchantName.includes('2% nital') || etchantName.includes('3% nital')) {
            score += 20
            reasons.push('✓ For softer materials')
          }
        }
      }

      // Featured etchants get bonus
      if (etchant.featured) {
        score += 10
        reasons.push('Featured')
      }

      // PACE product available gets bonus
      if (etchant.pace_product_available) {
        score += 5
      }

      // Penalize incompatible materials
      if (incompatible.includes(materialCategory)) {
        score = 0
        reasons.push('Not recommended')
      }

      // Only include etchants with positive score
      if (score > 0) {
        matches.push({ etchant, score, matchReasons: reasons })
      }
    }

    // Sort by score (highest first)
    return matches.sort((a, b) => b.score - a.score)
  }, [selectedMaterial, etchants, purposeFilter])

  const purposeOptions: { value: PurposeFilter; label: string; description: string }[] = [
    { value: 'grain-boundaries', label: 'Grain Boundaries', description: 'Reveal grain structure and size' },
    { value: 'carbides', label: 'Carbides', description: 'Highlight carbide particles and distribution' },
    { value: 'phases', label: 'Phases', description: 'Distinguish different phases (alpha, beta, etc.)' },
    { value: 'precipitates', label: 'Precipitates', description: 'Show precipitation and intermetallics' },
    { value: 'inclusions', label: 'Inclusions', description: 'Reveal non-metallic inclusions' },
    { value: 'twin-boundaries', label: 'Twin Boundaries', description: 'Show twinning in crystals' },
    { value: 'martensite', label: 'Martensite', description: 'Highlight martensitic structure' },
    { value: 'pearlite', label: 'Pearlite', description: 'Reveal pearlitic structures' },
    { value: 'ferrite', label: 'Ferrite', description: 'Distinguish ferrite phase' },
    { value: 'austenite', label: 'Austenite', description: 'Distinguish austenite phase' },
    { value: 'general', label: 'General Purpose', description: 'General microstructure examination' }
  ]

  // Copy to clipboard
  const copyToClipboard = useCallback(async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(label)
      setTimeout(() => setCopiedText(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [])

  // Get match score percentage
  const getScorePercentage = (score: number): number => {
    const maxScore = 280 // 100 + 80 + 70 + 30 = theoretical max
    return Math.min(100, Math.round((score / maxScore) * 100))
  }

  // Get score color
  const getScoreColor = (score: number): string => {
    const percentage = getScorePercentage(score)
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-blue-500'
    if (percentage >= 40) return 'bg-yellow-500'
    return 'bg-gray-400'
  }

  if (loading) {
    return (
      <div className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Loading materials and etchants...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Smart Etchant Selector
            </h1>
            <p className="text-xl text-gray-600 mb-2 max-w-2xl mx-auto">
              Find the perfect etchant using our intelligent matching system
            </p>
            <p className="text-gray-500">
              Select your material and purpose for personalized recommendations
            </p>
          </div>

          {/* Quick Material Selection */}
          {!selectedMaterial && (
            <div className="card mb-8 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary-600" /> Quick Select Common Materials
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {commonMaterials.map((common) => {
                  const material = getMaterialsByCategory(common.category)
                  if (!material) return null
                  const IconComponent = common.icon
                  return (
                    <button
                      key={common.category}
                      onClick={() => {
                        setSelectedMaterial(material)
                        setMaterialSearchQuery('')
                        setShowSearchResults(false)
                        setSelectedEtchant(null)
                      }}
                      className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-all duration-200 hover:scale-105 group"
                    >
                      <IconComponent className="w-8 h-8 mb-2 text-gray-700 group-hover:text-primary-600 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-600">{common.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Material Selection */}
          <div className="card mb-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-sm">1</span>
                <span>Select Your Material</span>
              </h2>
              {selectedMaterial && (
                <button
                  onClick={() => {
                    setSelectedMaterial(null)
                    setSelectedEtchant(null)
                    setPurposeFilter('')
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
              )}
            </div>
            
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={materialSearchQuery}
                  onChange={(e) => {
                    setMaterialSearchQuery(e.target.value)
                    setShowSearchResults(true)
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  placeholder="Search by name, category, or alloy designation..."
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                />
                <svg 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {showSearchResults && materialSearchQuery && filteredMaterials.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto">
                  {filteredMaterials.map((material) => (
                    <button
                      key={material.id}
                      onClick={() => {
                        setSelectedMaterial(material)
                        setMaterialSearchQuery('')
                        setShowSearchResults(false)
                        setSelectedEtchant(null)
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-primary-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                        selectedMaterial?.id === material.id ? 'bg-primary-50 border-l-4 border-l-primary-600' : ''
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{material.name}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {material.category}
                        {material.composition && ` • ${material.composition}`}
                      </div>
                      {material.hardness && (
                        <div className="text-xs text-gray-500 mt-1">Hardness: {material.hardness}</div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedMaterial && (
              <div className="mt-6 p-5 bg-gradient-to-r from-primary-50 to-primary-100 border-2 border-primary-200 rounded-xl">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{selectedMaterial.name}</h3>
                      {selectedMaterial.featured && (
                        <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" /> Featured
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                      <div><strong>Category:</strong> {selectedMaterial.category}</div>
                      {selectedMaterial.composition && (
                        <div><strong>Composition:</strong> {selectedMaterial.composition}</div>
                      )}
                      {selectedMaterial.hardness && (
                        <div><strong>Hardness:</strong> {selectedMaterial.hardness}</div>
                      )}
                      {selectedMaterial.hardness_category && (
                        <div>
                          <span className="inline-block px-3 py-1 bg-primary-200 text-primary-900 text-xs font-semibold rounded-full">
                            {selectedMaterial.hardness_category}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedMaterial(null)
                      setSelectedEtchant(null)
                      setPurposeFilter('')
                    }}
                    className="ml-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition-colors"
                    aria-label="Clear selection"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Purpose Selection */}
          {selectedMaterial && (
            <div className="card mb-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-sm">2</span>
                <span>What Do You Want to Reveal?</span>
                <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Select a specific purpose for targeted recommendations, or leave blank for general options.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {purposeOptions.map((option) => {
                  const IconComponent = purposeIcons[option.value]
                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        setPurposeFilter(purposeFilter === option.value ? '' : option.value)
                        setSelectedEtchant(null)
                      }}
                      className={`relative text-left px-4 py-4 border-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                        purposeFilter === option.value
                          ? 'border-primary-500 bg-primary-50 shadow-md'
                          : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent className={`w-5 h-5 ${purposeFilter === option.value ? 'text-primary-600' : 'text-gray-600'}`} />
                        <div className="font-semibold text-gray-900 text-sm">{option.label}</div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{option.description}</div>
                      {purposeFilter === option.value && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-primary-600 rounded-full"></div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Etchant Recommendations */}
          {selectedMaterial && matchedEtchants.length > 0 && (
            <div className="card mb-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-sm">3</span>
                  <span>Recommended Etchants</span>
                  <span className="text-lg font-normal text-gray-500 ml-2">
                    ({matchedEtchants.length} found)
                  </span>
                </h2>
                {purposeFilter && (
                  <button
                    onClick={() => {
                      setPurposeFilter('')
                      setSelectedEtchant(null)
                    }}
                    className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    <span>Clear filter</span>
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                {matchedEtchants.map((match, index) => {
                  const etchant = match.etchant
                  const scorePercentage = getScorePercentage(match.score)
                  
                  return (
                    <div
                      key={etchant.id}
                      className={`group relative border-2 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        selectedEtchant?.id === etchant.id
                          ? 'border-primary-500 bg-primary-50 shadow-md'
                          : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedEtchant(etchant)}
                    >
                      {/* Score Bar */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 rounded-t-xl overflow-hidden">
                        <div 
                          className={`h-full ${getScoreColor(match.score)} transition-all duration-500`}
                          style={{ width: `${scorePercentage}%` }}
                        ></div>
                      </div>

                      <div className="flex items-start gap-4">
                        {/* Badges */}
                        <div className="flex flex-col gap-2 flex-shrink-0">
                          {index < 3 && (
                            <span className="px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full text-center">
                              #{index + 1}
                            </span>
                          )}
                          {etchant.featured && (
                            <span className="px-3 py-1 bg-yellow-500 text-yellow-900 text-xs font-bold rounded-full text-center">
                              ⭐ Featured
                            </span>
                          )}
                          {etchant.pace_product_available && (
                            <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full text-center">
                              🛒 Available
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                              {etchant.name}
                            </h3>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-xs font-semibold text-gray-600">
                                {scorePercentage}% match
                              </span>
                            </div>
                          </div>
                          
                          {match.matchReasons.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {match.matchReasons.map((reason, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md font-medium"
                                >
                                  {reason}
                                </span>
                              ))}
                            </div>
                          )}

                          {etchant.typical_results && (
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{etchant.typical_results}</p>
                          )}

                          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <span className="font-semibold">Composition:</span>
                              <span>{etchant.composition}</span>
                            </div>
                            {etchant.concentration && (
                              <div className="flex items-center gap-1">
                                <span className="font-semibold">Concentration:</span>
                                <span>{etchant.concentration}</span>
                              </div>
                            )}
                            {etchant.application_method && (
                              <div className="flex items-center gap-1">
                                <span className="font-semibold">Method:</span>
                                <span className="capitalize">{etchant.application_method}</span>
                              </div>
                            )}
                            {etchant.typical_time_seconds && (
                              <div className="flex items-center gap-1">
                                <span className="font-semibold">Time:</span>
                                <span>{etchant.typical_time_seconds}s</span>
                              </div>
                            )}
                          </div>

                          {etchant.reveals && (
                            <div className="mt-3 text-xs text-gray-600">
                              <span className="font-semibold">Reveals:</span> {etchant.reveals}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Detailed Etchant View */}
          {selectedEtchant && (
            <div className="card mb-8 shadow-lg">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedEtchant.name}</h2>
                  {selectedEtchant.alternative_names && selectedEtchant.alternative_names.length > 0 && (
                    <p className="text-sm text-gray-600">
                      Also known as: {selectedEtchant.alternative_names.join(', ')}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedEtchant(null)}
                  className="ml-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close details"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Composition</div>
                    <div className="text-gray-900 font-mono text-sm">{selectedEtchant.composition}</div>
                    {selectedEtchant.concentration && (
                      <div className="text-sm text-gray-600 mt-2">
                        <strong>Concentration:</strong> {selectedEtchant.concentration}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {selectedEtchant.application_method && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-xs font-semibold text-blue-700 mb-1">Method</div>
                        <div className="text-blue-900 font-semibold capitalize">{selectedEtchant.application_method}</div>
                      </div>
                    )}
                    {selectedEtchant.typical_time_seconds && (
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-xs font-semibold text-green-700 mb-1">Time</div>
                        <div className="text-green-900 font-semibold">{selectedEtchant.typical_time_seconds}s</div>
                      </div>
                    )}
                    {selectedEtchant.temperature_celsius && (
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="text-xs font-semibold text-orange-700 mb-1">Temperature</div>
                        <div className="text-orange-900 font-semibold">{selectedEtchant.temperature_celsius}°C</div>
                      </div>
                    )}
                    {selectedEtchant.voltage && (
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-xs font-semibold text-purple-700 mb-1">Voltage</div>
                        <div className="text-purple-900 font-semibold">{selectedEtchant.voltage}V</div>
                      </div>
                    )}
                  </div>

                  {selectedEtchant.reveals && (
                    <div className="p-4 bg-primary-50 rounded-lg">
                      <div className="text-sm font-semibold text-primary-700 mb-2">Reveals</div>
                      <div className="text-primary-900">{selectedEtchant.reveals}</div>
                    </div>
                  )}

                  {selectedEtchant.typical_results && (
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">Typical Results</div>
                      <div className="text-gray-900">{selectedEtchant.typical_results}</div>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {selectedEtchant.application_notes && (
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">Application Notes</div>
                      <div className="text-gray-900 whitespace-pre-line text-sm bg-gray-50 p-3 rounded-lg">
                        {selectedEtchant.application_notes}
                      </div>
                    </div>
                  )}

                  {selectedEtchant.preparation_notes && (
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">Preparation Notes</div>
                      <div className="text-gray-900 whitespace-pre-line text-sm bg-gray-50 p-3 rounded-lg">
                        {selectedEtchant.preparation_notes}
                      </div>
                    </div>
                  )}

                  {selectedEtchant.storage_notes && (
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">Storage Notes</div>
                      <div className="text-gray-900 whitespace-pre-line text-sm bg-gray-50 p-3 rounded-lg">
                        {selectedEtchant.storage_notes}
                      </div>
                    </div>
                  )}

                  {selectedEtchant.hazards && selectedEtchant.hazards.length > 0 && (
                    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                      <div className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">
                        <span>⚠️</span> Hazards
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-red-900 text-sm">
                        {selectedEtchant.hazards.map((hazard, index) => (
                          <li key={index}>{hazard}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedEtchant.safety_notes && (
                    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                      <div className="text-sm font-semibold text-red-700 mb-2">Safety Notes</div>
                      <div className="text-red-900 whitespace-pre-line text-sm">{selectedEtchant.safety_notes}</div>
                    </div>
                  )}

                  {selectedEtchant.ppe_required && selectedEtchant.ppe_required.length > 0 && (
                    <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                      <div className="text-sm font-semibold text-yellow-700 mb-2">Required PPE</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedEtchant.ppe_required.map((ppe, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-yellow-100 text-yellow-900 text-sm rounded-full font-medium"
                          >
                            {ppe}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedEtchant.compatible_materials && selectedEtchant.compatible_materials.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">Compatible Materials</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedEtchant.compatible_materials.map((material, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedEtchant.alternative_etchants && selectedEtchant.alternative_etchants.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">Alternative Etchants</div>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                        {selectedEtchant.alternative_etchants.map((alt, index) => (
                          <li key={index}>{alt}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedEtchant.astm_references && selectedEtchant.astm_references.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">ASTM References</div>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                        {selectedEtchant.astm_references.map((ref, index) => (
                          <li key={index}>{ref}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {getPaceProductUrl(selectedEtchant) && (
                <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl p-6 text-center shadow-lg">
                  <h3 className="text-xl font-bold mb-2">Available from PACE Technologies</h3>
                  <p className="text-primary-100 text-sm mb-4">
                    Purchase this pre-mixed etching solution for reliable, consistent results.
                  </p>
                  <a
                    href={getPaceProductUrl(selectedEtchant)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-primary-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    View Product →
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Empty States */}
          {selectedMaterial && matchedEtchants.length === 0 && (
            <div className="card mb-8 shadow-lg">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Etchants Found</h3>
                <p className="text-gray-600 mb-4">
                  No etchants found for this material with the current filters.
                </p>
                <div className="flex gap-3 justify-center">
                  {purposeFilter && (
                    <button
                      onClick={() => {
                        setPurposeFilter('')
                        setSelectedEtchant(null)
                      }}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Clear Purpose Filter
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedMaterial(null)
                      setSelectedEtchant(null)
                      setPurposeFilter('')
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Select Different Material
                  </button>
                </div>
              </div>
            </div>
          )}

          {!selectedMaterial && (
            <div className="card mb-8 shadow-lg">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👆</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Started</h3>
                <p className="text-gray-600">
                  Select a material above to see personalized etchant recommendations
                </p>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="card shadow-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span>💡</span> Key Tips for Etching
              </h3>
              <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                <li><strong>Material Compatibility:</strong> Select etchants tailored to your metal type</li>
                <li><strong>Surface Prep:</strong> Polish and clean specimens thoroughly</li>
                <li><strong>Etch Timing:</strong> Control exposure time to prevent over-etching</li>
                <li><strong>Safe Handling:</strong> Always use appropriate PPE</li>
              </ul>
            </div>

            <div className="card shadow-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span>🛡️</span> Safety Guidelines
              </h3>
              <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                <li>Work in a well-ventilated area or fume hood</li>
                <li>Wear appropriate PPE (gloves, goggles, lab coat)</li>
                <li>Handle acids and corrosive chemicals with extreme care</li>
                <li>Store etchants in properly labeled containers</li>
              </ul>
            </div>
          </div>

          {/* Help Links */}
          <div className="mt-8 bg-primary-50 border-l-4 border-primary-600 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-3">Need More Help?</h3>
            <p className="text-gray-700 text-sm mb-4">
              Check out our comprehensive guides on material-specific preparation and etching techniques.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/stainless-steel-preparation" className="text-primary-600 font-semibold hover:underline flex items-center gap-1">
                Stainless Steel Guide →
              </Link>
              <Link href="/guides" className="text-primary-600 font-semibold hover:underline flex items-center gap-1">
                Browse All Guides →
              </Link>
              {selectedMaterial && (
                <Link href={`/materials/${selectedMaterial.slug || selectedMaterial.id}`} className="text-primary-600 font-semibold hover:underline flex items-center gap-1">
                  Material Details →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
