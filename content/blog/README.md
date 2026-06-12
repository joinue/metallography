# Blog Authoring Guide

Blog posts on metallography.org are plain markdown files in this folder. There is no
database and no CMS — a post goes live when its file is merged to `master`. Vercel
rebuilds and deploys the site automatically (~2 minutes).

**The filename is the URL.** `why-scratches-wont-clear.md` publishes at
`metallography.org/blog/why-scratches-wont-clear`. Use lowercase words separated by
hyphens, no spaces, `.md` extension. `README.md` (this file) is ignored by the site.

## Frontmatter schema

Every post starts with a YAML frontmatter block between `---` lines:

```yaml
---
title: "Matching the Cut-Off Blade to Your Material"
excerpt: "One or two sentences shown on the blog listing, in search, and in link previews. Keep it under ~160 characters for SEO."
category: "Techniques"
tags:
  - sectioning
  - blades
image: "/images/blog/cutoff-blade.jpg"   # optional — omit if no image
author: "Metallography.org Team"
date: "2026-06-12"
featured: false                          # optional — true pins it to the Featured row
draft: false                             # optional — true hides it from production
---
```

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Shown as the H1 and in the browser tab. Don't repeat it as a `#` heading in the body. |
| `excerpt` | yes | Listing/search/social summary. One or two plain sentences, no markdown. |
| `category` | yes | One category per post. Reuse existing ones where possible: `Techniques`, `Troubleshooting`, `Equipment`, `Case Studies`, `News`. |
| `tags` | yes | Short lowercase keywords (3-5 is plenty). Tags power the filter chips on the blog page. |
| `image` | no | Path under `/public`, e.g. `/images/blog/my-image.jpg`. Omit the field entirely if there's no image — the site falls back gracefully. |
| `author` | yes | Usually `Metallography.org Team`. A personal byline is fine for guest posts. |
| `date` | yes | `YYYY-MM-DD`. Controls sort order (newest first) and the date shown on the post. |
| `featured` | no | `true` highlights the post. Defaults to false. |
| `draft` | no | `true` keeps the post out of the production site. Drafts still render on local dev servers so you can preview them. Defaults to false. |

Below the frontmatter, write standard markdown: `##`/`###` headings, short paragraphs,
bulleted/numbered lists, and tables (GitHub-style pipes) all work. Read time is computed
automatically from word count.

## Adding a post from the GitHub web UI

1. Go to the repository on github.com and open the `content/blog` folder.
2. Click **Add file → Create new file** and name it `your-post-slug.md`.
3. Paste the frontmatter block (copy one from an existing post), then write the body in markdown.
4. Commit. Either commit directly to `master` (publishes immediately) or open a pull request if you want review first.
5. Vercel auto-deploys on merge — the post is live at `/blog/your-post-slug` in about 2 minutes.

To edit or unpublish a post, edit or delete its file the same way. To stage a post
without publishing, set `draft: true` and flip it to `false` (or delete the line) when ready.

## Images

- Put image files in `public/images/blog/` (same repo, GitHub web UI works: open the folder, **Add file → Upload files**).
- Reference them as `/images/blog/filename.jpg` — both in the `image` frontmatter field and inline in the body: `![Alt text](/images/blog/filename.jpg)`.
- Prefer JPEG/WebP around 1200px wide; keep files under ~300 KB. Always write meaningful alt text.

## Editorial rules

- **Educational, neutral tone.** This is a free educational resource, not a catalog.
- **No product or brand names** in technique content — no manufacturer product lines of any kind. Etchant proper names (Keller's, Nital, Kroll's, Kalling's) are fine.
- **US/ANSI grit convention.** Write grit sizes in ANSI numbers; if you must reference FEPA P-grades, label them explicitly (e.g. "P1200, roughly ANSI 600").
- **Technical accuracy:** the source of truth for technique content is the internal handbook (`app/docs/handbook.md`, sections 1-11). When in doubt, match the handbook.
- Practitioner voice: direct, specific, short paragraphs. Say what to do and why; skip the marketing fluff.
