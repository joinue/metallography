import { Metadata } from 'next'
import { guides, type Guide, type GuideCategory } from '@/data/guides'

export function getGuideMetadata(guide: Guide): Metadata {
  const url = `https://metallography.org/guides/${guide.slug}`
  const imageUrl = guide.microstructureImage 
    ? `https://metallography.org${guide.microstructureImage}`
    : 'https://metallography.org/logo.png'

  return {
    title: `${guide.title} | Metallography.org`,
    description: guide.description,
    keywords: [
      guide.title.toLowerCase(),
      guide.category.toLowerCase(),
      'metallography',
      'sample preparation',
      'metallographic analysis',
      'microstructure analysis',
      ...(guide.category === 'Material-Specific' ? [guide.title.split(' ')[0].toLowerCase() + ' preparation'] : []),
      ...(guide.category === 'Process' ? ['grinding', 'polishing', 'etching', 'mounting', 'sectioning'] : []),
    ],
    openGraph: {
      title: `${guide.title} | Metallography.org`,
      description: guide.description,
      url,
      siteName: 'Metallography.org',
      images: [
        {
          url: imageUrl,
          width: guide.microstructureImage ? 600 : 1200,
          height: guide.microstructureImage ? 450 : 630,
          alt: `${guide.title} - Metallographic sample preparation guide`,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  }
}

export function getGuideStructuredData(guide: Guide) {
  const url = `https://metallography.org/guides/${guide.slug}`
  const imageUrl = guide.microstructureImage 
    ? `https://metallography.org${guide.microstructureImage}`
    : 'https://metallography.org/logo.png'

  // Use current date for freshness signal (update when content is actually modified)
  // Published date: Set to when guide was first created (or 1-2 months ago if new)
  const datePublished = '2024-10-01' // Original publication date
  const dateModified = new Date().toISOString().split('T')[0] // Today's date for freshness

  // Article structured data
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    image: imageUrl,
    author: [
      {
        '@type': 'Person',
        name: 'Marc Salerno',
        jobTitle: 'President, PACE Technologies',
        memberOf: {
          '@type': 'Organization',
          name: 'PACE Technologies',
        },
        knowsAbout: ['Metallography', 'Sample Preparation', 'Materials Science'],
        url: 'https://metallography.org/about',
      },
      {
        '@type': 'Organization',
        name: 'Metallography.org',
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'Metallography.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://metallography.org/logo.png',
      },
    },
    datePublished,
    dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: guide.category,
    about: {
      '@type': 'Thing',
      name: guide.title,
    },
  }

  // Course structured data
  const courseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: guide.title,
    description: guide.description,
    provider: {
      '@type': 'Organization',
      name: 'Metallography.org',
    },
    educationalLevel: guide.difficulty,
    timeRequired: `PT${guide.readTime.match(/\d+/)?.[0] || '15'}M`,
    courseCode: `MET-${guide.slug.toUpperCase().replace(/-/g, '-')}`,
  }

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://metallography.org',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: 'https://metallography.org/guides',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title,
        item: url,
      },
    ],
  }

  // HowTo structured data for Process category guides
  const howToStructuredData = guide.category === 'Process' ? getHowToSchema(guide, url, imageUrl) : null

  // FAQ structured data - generate common FAQs for guides
  const faqItems = getGuideFAQs(guide)
  const faqStructuredData = faqItems.length > 0 ? getFAQSchema(faqItems) : null

  return {
    articleStructuredData,
    courseStructuredData,
    breadcrumbStructuredData,
    howToStructuredData,
    faqStructuredData,
  }
}

// Generate common FAQs for each guide based on category and topic
function getGuideFAQs(guide: Guide): Array<{ question: string; answer: string }> {
  const commonFAQs: Record<string, Array<{ question: string; answer: string }>> = {
    'stainless-steel-preparation': [
      {
        question: 'What is the best etchant for stainless steel?',
        answer: 'Common etchants for stainless steel include Vilella\'s Reagent, Aqua Regia, and electrolytic etchants. The choice depends on the specific stainless steel grade and the microstructural features you want to reveal.',
      },
      {
        question: 'How do I prevent deformation when preparing stainless steel samples?',
        answer: 'Use slow cutting speeds (100-200 RPM), proper cooling, and progressive grinding with light pressure. Avoid excessive heat generation during sectioning and grinding.',
      },
      {
        question: 'What grinding sequence should I use for stainless steel?',
        answer: 'Start with 120 grit to remove sectioning damage, then progress through 240, 400, and 600 grit. Rotate the sample 90° between each grit to ensure complete removal of previous scratches.',
      },
    ],
    'aluminum-sample-preparation': [
      {
        question: 'How do I prevent smearing when preparing aluminum samples?',
        answer: 'Use sharp abrasives, light pressure, and proper lubrication. Avoid excessive polishing time and use appropriate polishing cloths. Keep samples cool during preparation.',
      },
      {
        question: 'What etchant works best for aluminum?',
        answer: 'Keller\'s Reagent is commonly used for aluminum alloys. It reveals grain boundaries and second-phase particles. Etching time is typically 10-30 seconds.',
      },
      {
        question: 'Why is aluminum preparation challenging?',
        answer: 'Aluminum is soft and prone to smearing, deformation, and relief. It requires careful handling, appropriate abrasives, and proper technique to reveal accurate microstructures.',
      },
    ],
    'grinding-techniques': [
      {
        question: 'What grit size should I start with?',
        answer: 'Start with the coarsest grit needed to remove sectioning damage, typically 120-240 grit. The starting grit depends on the material hardness and the amount of damage from sectioning.',
      },
      {
        question: 'How do I know when to move to the next grit?',
        answer: 'Move to the next grit when all scratches from the previous grit are uniform and oriented in one direction. The surface should show no evidence of previous damage.',
      },
      {
        question: 'What pressure should I use during grinding?',
        answer: 'Use light to moderate pressure. Excessive pressure can cause deformation, while too little pressure may not effectively remove damage. Let the abrasive do the work.',
      },
    ],
    'polishing-methods': [
      {
        question: 'What is the difference between diamond and oxide polishing?',
        answer: 'Diamond polishing uses diamond abrasives (typically 6μm to 0.25μm) for material removal and scratch elimination. Oxide polishing uses colloidal silica or alumina for final surface refinement.',
      },
      {
        question: 'How long should I polish at each step?',
        answer: 'Polish until all scratches from the previous step are removed, typically 2-5 minutes per step. Over-polishing can cause relief, while under-polishing leaves scratches.',
      },
      {
        question: 'What polishing cloth should I use?',
        answer: 'Cloth selection depends on the material and polishing step. Use napped cloths for rough polishing and low-nap or napless cloths for fine polishing. Each material may have specific recommendations.',
      },
    ],
    'etching-procedures': [
      {
        question: 'How do I choose the right etchant?',
        answer: 'Choose an etchant based on the material composition and the microstructural features you want to reveal. Material-specific guides provide etchant recommendations for each material type.',
      },
      {
        question: 'What is the proper etching time?',
        answer: 'Etching time varies by material and etchant concentration, typically 5-30 seconds for most materials. Start with shorter times and increase if needed. Over-etching can obscure features.',
      },
      {
        question: 'How do I apply etchant safely?',
        answer: 'Use proper PPE (gloves, safety glasses, fume hood). Apply etchant using swabbing, immersion, or electrolytic methods as appropriate. Always work in a well-ventilated area.',
      },
    ],
  }

  // Return FAQs specific to this guide, or generic FAQs based on category
  if (commonFAQs[guide.slug]) {
    return commonFAQs[guide.slug]
  }

  // Generic FAQs based on category
  const categoryFAQs: Record<GuideCategory, Array<{ question: string; answer: string }>> = {
    'Basics': [
      {
        question: `What will I learn from ${guide.title}?`,
        answer: `This guide covers ${guide.description.toLowerCase()}. It provides comprehensive information for ${guide.difficulty.toLowerCase()} level metallographers.`,
      },
    ],
    'Process': [
      {
        question: `How long does ${guide.title.toLowerCase()} take?`,
        answer: `The time required depends on the material and sample complexity. This guide provides step-by-step procedures and time estimates for each step.`,
      },
    ],
    'Material-Specific': [
      {
        question: `What makes ${guide.title.split(' ')[0]} preparation unique?`,
        answer: `This material requires specific preparation techniques, etchant selection, and handling procedures. This guide covers material-specific protocols for optimal results.`,
      },
    ],
    'Application-Specific': [
      {
        question: `Why is ${guide.title.toLowerCase()} important?`,
        answer: `This application requires specialized preparation techniques to reveal relevant microstructural features. This guide covers application-specific protocols and best practices.`,
      },
    ],
    'Troubleshooting': [
      {
        question: 'How do I identify preparation problems?',
        answer: 'This guide covers common issues, their causes, and solutions. Look for symptoms like scratches, contamination, relief, or poor contrast in your samples.',
      },
    ],
  }

  return categoryFAQs[guide.category] || []
}

function getHowToSchema(guide: Guide, url: string, imageUrl: string) {
  // Define process-specific steps based on guide slug
  const processSteps: Record<string, Array<{ name: string; text: string }>> = {
    'sectioning': [
      {
        name: 'Select appropriate sectioning method',
        text: 'Choose between abrasive sectioning for most materials or precision wafering for delicate samples.',
      },
      {
        name: 'Select blade type',
        text: 'Choose abrasive blade or diamond blade based on material hardness and cutting requirements.',
      },
      {
        name: 'Configure cutting parameters',
        text: 'Set appropriate cutting speed, pressure, and cooling to minimize damage and heat generation.',
      },
      {
        name: 'Perform the cut',
        text: 'Execute the cut using proper technique, maintaining consistent pressure and adequate cooling.',
      },
      {
        name: 'Inspect and clean sample',
        text: 'Examine the cut surface for damage and clean the sample before proceeding to mounting or grinding.',
      },
    ],
    'mounting': [
      {
        name: 'Prepare the sample',
        text: 'Clean and dry the sample, ensuring it is free of contaminants before mounting.',
      },
      {
        name: 'Select mounting method',
        text: 'Choose compression mounting for most applications or castable mounting for delicate or porous samples.',
      },
      {
        name: 'Select mounting material',
        text: 'Choose appropriate resin based on material properties, edge retention needs, and application requirements.',
      },
      {
        name: 'Perform mounting',
        text: 'Mount the sample following proper procedures for your chosen method, ensuring good edge retention.',
      },
      {
        name: 'Cure and finish',
        text: 'Allow proper curing time and finish the mount surface if needed before proceeding to grinding.',
      },
    ],
    'grinding-techniques': [
      {
        name: 'Select starting grit',
        text: 'Choose the appropriate starting grit size based on sectioning damage and material hardness.',
      },
      {
        name: 'Set up grinding equipment',
        text: 'Prepare grinding surface, ensure proper lubrication, and set appropriate pressure.',
      },
      {
        name: 'Begin progressive grinding',
        text: 'Start with coarsest grit needed, grinding until previous damage is removed and uniform scratch pattern is achieved.',
      },
      {
        name: 'Progress through grit sequence',
        text: 'Move to progressively finer grits, ensuring each step removes scratches from previous step.',
      },
      {
        name: 'Complete final grinding step',
        text: 'Finish with fine grit (typically 600-800) to prepare surface for polishing.',
      },
    ],
    'polishing-methods': [
      {
        name: 'Select polishing method',
        text: 'Choose diamond polishing, oxide polishing, or combination approach based on material and requirements.',
      },
      {
        name: 'Prepare polishing surface',
        text: 'Set up appropriate polishing cloth and apply polishing compound or suspension.',
      },
      {
        name: 'Perform rough polishing',
        text: 'Use coarse diamond paste or suspension to remove grinding scratches and create smooth surface.',
      },
      {
        name: 'Perform fine polishing',
        text: 'Progress to finer polishing steps using finer abrasives to achieve mirror-like finish.',
      },
      {
        name: 'Inspect and clean',
        text: 'Examine surface under microscope for remaining scratches or defects, clean thoroughly before etching.',
      },
    ],
    'etching-procedures': [
      {
        name: 'Select appropriate etchant',
        text: 'Choose etchant based on material type and microstructural features you want to reveal.',
      },
      {
        name: 'Prepare etchant solution',
        text: 'Mix etchant according to specifications, ensuring proper concentration and freshness.',
      },
      {
        name: 'Clean sample surface',
        text: 'Ensure sample is thoroughly cleaned and free of contaminants before etching.',
      },
      {
        name: 'Apply etchant',
        text: 'Apply etchant using appropriate method (swabbing, immersion, or electrolytic) for specified time.',
      },
      {
        name: 'Stop and clean',
        text: 'Stop etching process, immediately rinse and clean sample to prevent over-etching.',
      },
      {
        name: 'Examine results',
        text: 'Inspect microstructure under microscope to verify proper etching and adjust if needed.',
      },
    ],
    'microstructural-analysis': [
      {
        name: 'Prepare sample for microscopy',
        text: 'Ensure sample is properly prepared through sectioning, mounting, grinding, polishing, and etching steps.',
      },
      {
        name: 'Select appropriate microscope',
        text: 'Choose optical microscope for routine analysis or SEM/TEM for advanced characterization needs.',
      },
      {
        name: 'Set up microscope',
        text: 'Configure illumination, magnification, and imaging settings for optimal observation.',
      },
      {
        name: 'Examine microstructure',
        text: 'Systematically examine the sample, identifying grains, phases, and microstructural features.',
      },
      {
        name: 'Document observations',
        text: 'Capture photomicrographs and record observations for analysis and reporting.',
      },
      {
        name: 'Interpret results',
        text: 'Analyze microstructure to understand material properties, processing history, and quality.',
      },
    ],
  }

  const steps = processSteps[guide.slug] || [
    {
      name: 'Review guide content',
      text: `Follow the comprehensive guide on ${guide.title.toLowerCase()} for detailed procedures and best practices.`,
    },
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    description: guide.description,
    image: imageUrl,
    totalTime: `PT${guide.readTime.match(/\d+/)?.[0] || '15'}M`,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${url}#step-${index + 1}`,
    })),
  }
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find(g => g.slug === slug)
}

// Generate FAQ schema from FAQ items
export function getFAQSchema(faqItems: Array<{ question: string; answer: string }>) {
  if (!faqItems || faqItems.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

// Get related guides based on category and topic
export function getRelatedGuides(currentGuide: Guide, limit: number = 3): Guide[] {
  const related: Guide[] = []
  
  // Same category guides (excluding current)
  const sameCategory = guides.filter(
    g => g.category === currentGuide.category && g.slug !== currentGuide.slug
  )
  related.push(...sameCategory.slice(0, limit))
  
  // If not enough, add from related categories
  if (related.length < limit) {
    const relatedCategories: Record<GuideCategory, GuideCategory[]> = {
      'Basics': ['Process'],
      'Process': ['Basics', 'Material-Specific'],
      'Material-Specific': ['Process', 'Application-Specific'],
      'Application-Specific': ['Material-Specific', 'Process'],
      'Troubleshooting': ['Process', 'Material-Specific'],
    }
    
    const categories = relatedCategories[currentGuide.category] || []
    for (const category of categories) {
      if (related.length >= limit) break
      const categoryGuides = guides.filter(
        g => g.category === category && g.slug !== currentGuide.slug && !related.includes(g)
      )
      related.push(...categoryGuides.slice(0, limit - related.length))
    }
  }
  
  return related.slice(0, limit)
}

// Generate VideoObject schema for YouTube videos
export function getVideoSchema(videoId: string, title: string, description: string, thumbnailUrl?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description: description,
    thumbnailUrl: thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    uploadDate: new Date().toISOString(),
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    publisher: {
      '@type': 'Organization',
      name: 'PACE Technologies',
      logo: {
        '@type': 'ImageObject',
        url: 'https://metallography.org/logo.png',
      },
    },
  }
}

