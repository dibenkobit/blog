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
---
```

All three fields are required.

**Inline markdown** works in `title` and `description`:

```md
title: "Why `useState` is *actually* good"
description: "A defense of React's **most misunderstood** hook"
```

**Date** uses ISO format (YYYY-MM-DD). Displayed as "Jan 30, 2026" on the site.
