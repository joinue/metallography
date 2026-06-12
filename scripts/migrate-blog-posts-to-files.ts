/**
 * One-time migration: Supabase `blog_posts` table → content/blog/*.md files.
 *
 * The blog is now file-based (see lib/blog.ts and content/blog/README.md).
 * This script exists for when the Supabase project comes back up: it pulls
 * every row from `blog_posts` (any status), converts the stored HTML content
 * to markdown with turndown, and writes one content/blog/<slug>.md per post
 * with full frontmatter:
 *   - title, excerpt, category, tags, image, author
 *   - date: published_at || created_at (YYYY-MM-DD)
 *   - featured (only when true)
 *   - draft: true for any post whose status is not 'published'
 *
 * Files that already exist in content/blog/ are skipped with a warning so
 * hand-authored posts are never overwritten.
 *
 * Usage:
 *   npx tsx scripts/migrate-blog-posts-to-files.ts            (dry run — shows what would be written)
 *   npx tsx scripts/migrate-blog-posts-to-files.ts --apply    (writes the files)
 */

import { createClient } from '@supabase/supabase-js'
import TurndownService from 'turndown'
import matter from 'gray-matter'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

// tsx does not auto-load .env.local
function loadEnvLocal() {
  try {
    const raw = readFileSync(resolve(__dirname, '..', '.env.local'), 'utf-8')
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=("?)(.*)\2$/)
      if (m && !process.env[m[1]]) process.env[m[1]] = m[3]
    }
  } catch {
    /* fall through to process.env */
  }
}
loadEnvLocal()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and a key) in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)
const APPLY = process.argv.includes('--apply')
const BLOG_DIR = resolve(__dirname, '..', 'content', 'blog')

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
})

function toDateOnly(value: string | null | undefined): string {
  if (value) {
    const date = new Date(value)
    if (!isNaN(date.getTime())) return date.toISOString().slice(0, 10)
  }
  return new Date().toISOString().slice(0, 10)
}

async function run() {
  console.log(`${APPLY ? 'APPLYING' : 'DRY RUN (pass --apply to write)'} — migrating blog_posts to content/blog/\n`)

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false })

  if (error) {
    console.error(`Failed to fetch blog_posts: ${error.message}`)
    process.exit(1)
  }
  if (!posts || posts.length === 0) {
    console.log('No blog posts found in the database. Nothing to do.')
    return
  }

  if (APPLY) mkdirSync(BLOG_DIR, { recursive: true })

  let written = 0
  let skipped = 0

  for (const post of posts) {
    const slug: string | null = typeof post.slug === 'string' && post.slug.trim() ? post.slug.trim() : null
    if (!slug) {
      console.warn(`! "${post.title ?? post.id}": missing slug — skipped`)
      skipped++
      continue
    }

    const filePath = resolve(BLOG_DIR, `${slug}.md`)
    if (existsSync(filePath)) {
      console.warn(`! ${slug}.md already exists — skipped (delete the file first to re-migrate)`)
      skipped++
      continue
    }

    const markdown = turndown.turndown(post.content || '')

    const frontmatter: Record<string, unknown> = {
      title: post.title || slug,
      excerpt: post.excerpt || '',
      category: post.category || 'General',
      tags: Array.isArray(post.tags) ? post.tags : [],
      author: post.author || 'Metallography.org Team',
      date: toDateOnly(post.published_at || post.created_at),
    }
    if (post.image) frontmatter.image = post.image
    if (post.featured) frontmatter.featured = true
    if (post.status !== 'published') frontmatter.draft = true

    const fileContent = matter.stringify(`\n${markdown.trim()}\n`, frontmatter)

    if (APPLY) {
      writeFileSync(filePath, fileContent, 'utf-8')
      console.log(`✓ wrote ${slug}.md (${post.status}${post.status !== 'published' ? ' → draft: true' : ''})`)
    } else {
      console.log(`→ would write ${slug}.md (status: ${post.status}, ${markdown.split(/\s+/).length} words)`)
    }
    written++
  }

  console.log(`\n${APPLY ? 'Wrote' : 'Would write'} ${written} file(s); ${skipped} skipped.`)
  if (APPLY && written > 0) {
    console.log('Review the generated files (formatting, images, drafts), then commit them to publish.')
  }
}

run().catch(console.error)
