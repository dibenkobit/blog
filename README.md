# dibenko.com

Personal blog of Nikita Snetkov.

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Biome (linting/formatting)
- Vercel (hosting)

## Development

```bash
bun install
bun dev
```

## Scripts

```bash
bun run dev          # Start dev server
bun run build        # Production build
bun run check:fix    # Lint and format (run before commits)
```

## Content

Posts live in `content/posts/` as markdown files. Filename becomes the URL slug:

`hello-world.md` → `dibenko.com/blog/hello-world`

Filename rules: lowercase, hyphens for spaces, no special characters. Filename is used as-is in the URL.

### Frontmatter

```md
---
title: "Post Title"
date: "2026-01-30"
description: "Brief description"
seoTitle: "Optional SEO title"         # optional
seoDescription: "Optional SEO desc"    # optional
---
```

**Required fields:** `title`, `date`, `description`

**Optional fields:** `seoTitle`, `seoDescription` — override SEO meta tags when the main title/description contains markdown that doesn't work well in search results.

**Inline markdown** works in `title` and `description`:

```md
title: "Why `useState` is *actually* good"
description: "A defense of React's **most misunderstood** hook"
```

Markdown is automatically stripped from SEO meta tags. Use `seoTitle`/`seoDescription` when you need a completely different SEO version:

```md
title: "~~Redis~~ ~~Memcached~~ Valkey: the saga continues"
seoTitle: "Valkey: the open-source Redis fork explained"
```

**Date** uses ISO format (YYYY-MM-DD). Displayed as "Jan 30, 2026" on the site.

### Drafts

Drafts live in `content/drafts/` and render only in development mode.

```
content/
├── posts/    # Published (always included)
└── drafts/   # Dev-only (git-ignored)
```

**Behavior:**
- `bun dev` — shows posts + drafts
- `bun build` — shows posts only
- Same filename in both folders — post wins (no duplicates)
- Sorted by date alongside regular posts

**Workflow:** create in `drafts/`, preview locally, move to `posts/` when ready.
