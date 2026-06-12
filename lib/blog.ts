/**
 * File-based blog data layer.
 *
 * Posts live as markdown files in content/blog/*.md (README.md is ignored).
 * Frontmatter is parsed with gray-matter and the body is rendered to HTML at
 * build time with unified (remark-parse → remark-gfm → remark-rehype →
 * rehype-slug → rehype-stringify). Content is repo-authored and trusted, so
 * no HTML sanitizer is applied.
 *
 * Server-only: uses synchronous fs reads. Do not import from client
 * components (importing the types with `import type` is fine).
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'

// Field names mirror the legacy Supabase BlogPost shape so the existing UI
// components (BlogClient, RelatedPosts, blog pages) need minimal changes.
export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  /** Rendered HTML */
  content: string
  category: string
  tags: string[]
  image?: string | null
  author: string
  read_time: string
  /** ISO timestamp derived from the frontmatter date */
  published_at: string
  featured: boolean
  draft: boolean
}

/** Lightweight shape for the global search index (safe to pass to client components). */
export interface BlogSearchItem {
  slug: string
  title: string
  excerpt: string
  category: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeStringify)

function computeReadTime(markdown: string): string {
  const words = markdown.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

function normalizeDate(value: unknown): string {
  // gray-matter parses unquoted YAML dates into Date objects; quoted ones stay strings.
  if (value instanceof Date) {
    return value.toISOString()
  }
  if (typeof value === 'string' && value.trim()) {
    // Anchor date-only strings at noon UTC so toLocaleDateString() shows the
    // intended calendar day in every US timezone.
    const iso = /^\d{4}-\d{2}-\d{2}$/.test(value.trim()) ? `${value.trim()}T12:00:00.000Z` : value.trim()
    const date = new Date(iso)
    if (!isNaN(date.getTime())) return date.toISOString()
  }
  return new Date().toISOString()
}

function parsePost(filePath: string): BlogPost {
  const slug = path.basename(filePath, '.md')
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content: markdown } = matter(raw)

  const html = processor.processSync(markdown).toString()

  return {
    slug,
    title: typeof data.title === 'string' ? data.title : slug,
    excerpt: typeof data.excerpt === 'string' ? data.excerpt : '',
    content: html,
    category: typeof data.category === 'string' ? data.category : 'General',
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    image: typeof data.image === 'string' && data.image.trim() ? data.image : null,
    author: typeof data.author === 'string' ? data.author : 'Metallography.org Team',
    read_time: computeReadTime(markdown),
    published_at: normalizeDate(data.date),
    featured: data.featured === true,
    draft: data.draft === true,
  }
}

let cache: BlogPost[] | null = null

function loadAllPosts(): BlogPost[] {
  // Cache for production builds; skip in dev so authors see file edits without a restart.
  if (cache && process.env.NODE_ENV === 'production') {
    return cache
  }

  let files: string[] = []
  try {
    files = fs.readdirSync(BLOG_DIR)
  } catch {
    return []
  }

  const posts = files
    .filter(file => file.endsWith('.md') && file.toLowerCase() !== 'readme.md')
    .map(file => parsePost(path.join(BLOG_DIR, file)))
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())

  cache = posts
  return posts
}

/**
 * All visible posts, newest first. Drafts are excluded in production but
 * included in development so authors can preview them.
 */
export function getAllPosts(): BlogPost[] {
  const posts = loadAllPosts()
  if (process.env.NODE_ENV === 'production') {
    return posts.filter(post => !post.draft)
  }
  return posts
}

export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find(post => post.slug === slug) || null
}

export function getAllCategories(): string[] {
  const categories = new Set(getAllPosts().map(post => post.category))
  return Array.from(categories).sort()
}

/**
 * Related posts for a given post: same category first, then posts sharing a
 * tag, then the most recent remaining posts.
 */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const others = getAllPosts().filter(p => p.slug !== post.slug)
  const related: BlogPost[] = []

  const sameCategory = others.filter(p => p.category === post.category)
  related.push(...sameCategory.slice(0, limit))

  if (related.length < limit && post.tags.length > 0) {
    const withSharedTags = others.filter(
      p => !related.some(r => r.slug === p.slug) && p.tags.some(tag => post.tags.includes(tag))
    )
    related.push(...withSharedTags.slice(0, limit - related.length))
  }

  if (related.length < limit) {
    const recent = others.filter(p => !related.some(r => r.slug === p.slug))
    related.push(...recent.slice(0, limit - related.length))
  }

  return related.slice(0, limit)
}

/** Build-time search entries for GlobalSearch (serializable, no HTML content). */
export function getBlogSearchItems(): BlogSearchItem[] {
  return getAllPosts().map(post => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
  }))
}
