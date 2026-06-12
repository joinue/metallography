import { MetadataRoute } from 'next'
import { guides } from '@/data/guides'
import { getAllMaterials, getAllStandards } from '@/lib/supabase'
import { getAllPosts } from '@/lib/blog'

// Force dynamic rendering to ensure database queries work
export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://metallography.org'
  const now = new Date()
  
  // Generate guide URLs
  const guideUrls = guides.map(guide => ({
    url: guide.slug === 'troubleshooting-common-issues' 
      ? `${baseUrl}/resources/troubleshooting-guide`
      : `${baseUrl}/guides/${guide.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: guide.category === 'Material-Specific' || guide.category === 'Application-Specific' ? 0.8 : 0.7,
  }))

  // Blog posts come from markdown files in content/blog/ at build time
  const blogPosts = getAllPosts()

  // Fetch dynamic content
  let materials: Awaited<ReturnType<typeof getAllMaterials>> = []
  let standards: Awaited<ReturnType<typeof getAllStandards>> = []

  try {
    materials = await getAllMaterials()
  } catch (error) {
    console.error('Error fetching materials for sitemap:', error)
  }

  try {
    standards = await getAllStandards()
  } catch (error) {
    console.error('Error fetching standards for sitemap:', error)
  }

  // Helper function to safely parse dates
  const safeDate = (dateString: string | null | undefined): Date => {
    if (!dateString) return now
    try {
      const date = new Date(dateString)
      return isNaN(date.getTime()) ? now : date
    } catch {
      return now
    }
  }

  // Generate blog post URLs
  const blogPostUrls = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${encodeURIComponent(post.slug)}`,
    lastModified: safeDate(post.published_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Generate material URLs
  const materialUrls = materials
    .filter(material => material.slug && typeof material.slug === 'string' && material.slug.trim().length > 0)
    .map(material => ({
      url: `${baseUrl}/materials/${encodeURIComponent(material.slug!)}`,
      lastModified: safeDate(material.updated_at || material.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  // Generate standard URLs
  const standardUrls = standards
    .filter(standard => standard.status === 'published' && standard.slug && typeof standard.slug === 'string' && standard.slug.trim().length > 0)
    .map(standard => ({
      url: `${baseUrl}/standards/${encodeURIComponent(standard.slug!)}`,
      lastModified: safeDate(standard.updated_at || standard.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
  }))
  
  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...guideUrls,
    {
      url: `${baseUrl}/resources`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Individual resource pages
    {
      url: `${baseUrl}/resources/checklist`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/grit-size-chart`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/common-etchants-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/hardness-scale-conversion`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/astm-standards-reference`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/safety-data-sheet-reference`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/microscope-magnification-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/material-preparation-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/polishing-cloth-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/pace-youtube-channel`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/troubleshooting-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/builder`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/materials`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...materialUrls,
    {
      url: `${baseUrl}/etchants`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/standards`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...standardUrls,
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...blogPostUrls,
  ]
}

