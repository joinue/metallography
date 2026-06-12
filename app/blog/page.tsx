import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { getAllPosts } from '@/lib/blog'
import BlogClient from '@/components/BlogClient'
import NewsletterSubscription from '@/components/NewsletterSubscription'

export const metadata: Metadata = {
  title: 'Metallography Blog | Tips, Techniques & Industry News | Metallography.org',
  description: 'Stay updated with the latest metallography tips, techniques, case studies, and industry news. Learn from experts and discover best practices for sample preparation and analysis.',
  keywords: [
    'metallography blog',
    'metallography tips',
    'sample preparation techniques',
    'metallography news',
    'metallography case studies',
    'microstructure analysis',
    'metallography best practices',
  ],
  openGraph: {
    title: 'Metallography Blog | Tips, Techniques & Industry News',
    description: 'Stay updated with the latest metallography tips, techniques, case studies, and industry news.',
    url: 'https://metallography.org/blog',
    siteName: 'Metallography.org',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Metallography.org Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metallography Blog | Tips, Techniques & Industry News',
    description: 'Stay updated with the latest metallography tips, techniques, case studies, and industry news.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://metallography.org/blog',
  },
}

export default function BlogPage() {
  // Posts come from markdown files in content/blog/ at build time
  const blogPosts = getAllPosts()

  // CollectionPage structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Metallography Blog',
    description: 'Metallography tips, techniques, case studies, and industry news',
    url: 'https://metallography.org/blog',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: blogPosts.length,
      itemListElement: blogPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          url: `https://metallography.org/blog/${post.slug}`,
          datePublished: post.published_at,
        },
      })),
    },
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
        name: 'Blog',
        item: 'https://metallography.org/blog',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <div className="py-4 sm:py-6 md:py-12">
        <div className="container-custom">
          {/* Header Section */}
          <div className="mb-3 sm:mb-4 md:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1.5 sm:mb-2 text-gray-900">
              Metallography Blog
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2">
              Expert tips, techniques, case studies, and industry news.
            </p>
          </div>

          {/* Blog Client Component with Search, Filtering, and Pagination */}
          <Suspense fallback={<div className="py-8">Loading blog posts...</div>}>
            <BlogClient initialPosts={blogPosts} />
          </Suspense>

          {/* Newsletter Subscription */}
          <NewsletterSubscription />

          {/* CTA Section */}
          <div className="mt-8 sm:mt-12 md:mt-20">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">Want to Contribute?</h2>
              <p className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4 text-gray-600 leading-relaxed px-2 sm:px-0">
                Have a metallography tip, case study, or technique to share? We'd love to feature your expertise.
              </p>
              <p className="text-sm sm:text-base mb-6 sm:mb-8 text-gray-500 px-2 sm:px-0">
                Share your knowledge with the metallography community
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                <Link href="/contact" className="btn-primary w-full sm:w-auto">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

