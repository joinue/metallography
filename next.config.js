/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel automatically optimizes images, so we can remove unoptimized: true
  // This allows Vercel to use its image optimization service
  images: {
    // Remove unoptimized for production builds on Vercel
    // Vercel will handle image optimization automatically
    // Configure allowed quality values to match what's used in Image components
    // Without this, Next.js defaults to [75] and rounds other values
    qualities: [50, 60, 70, 75],
    formats: ['image/webp', 'image/avif'],
    // Quality values used in components:
    // - Hero image: quality={50} (app/page.tsx:353)
    // - Background: quality={60} (app/page.tsx:847)  
    // - About page: quality={70} (app/about/page.tsx:273)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Target modern browsers to reduce legacy JavaScript polyfills
  compiler: {
    // Remove console logs in production (optional, but good for performance)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Experimental features for better performance
  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: ['lucide-react'],
  },
  // The blog is file-based (content/blog/*.md, read via lib/blog.ts). Static
  // pages read the files at build time, but dynamic routes (e.g. the
  // force-dynamic sitemap, which lists blog URLs) read them at request time,
  // so the markdown must be traced into the serverless bundles on Vercel.
  outputFileTracingIncludes: {
    '/**': ['./content/blog/**/*'],
  },
  // Permanent redirects — used to consolidate duplicate slugs into a single
  // canonical URL. Search engines see a 301; existing external links keep working.
  async redirects() {
    return [
      {
        // The old `metallographic-mounting` guide was a near-duplicate of
        // `mounting` (same metadata slug, overlapping content). Canonical is `mounting`.
        source: '/guides/metallographic-mounting',
        destination: '/guides/mounting',
        permanent: true,
      },
      {
        // The per-etchant database pages were retired in favor of the /etchants
        // quick reference + referral to the Materials Prep etchant database.
        source: '/etchants/:slug',
        destination: '/etchants',
        permanent: true,
      },
      {
        // The database-backed etchant selector tool was retired; /etchants
        // carries the quick reference and the Materials Prep referral.
        source: '/tools/etchant-selector',
        destination: '/etchants',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

