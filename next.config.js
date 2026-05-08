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
    ]
  },
}

module.exports = nextConfig

