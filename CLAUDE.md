# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) and other coding agents working in this repository. `AGENTS.md` is a symlink to it, so edit this file only.

## Project Overview

hishaam.dev is the personal site of Md Hishaam Akhtar: backend engineer at Groww (Customer Engagement Platform) and co-founder of Harf Studios with Vaniya Adeeb. It is one static page, built with Astro and deployed to GitHub Pages.

## Commands

```bash
npm run dev              # Dev server at http://localhost:4321
npm run build            # Static build into dist/
npm run preview          # Serve dist/
npm run quality          # astro check + eslint + prettier --check + vitest (the pre-commit hook)
npm test                 # Vitest only
npm run lint:fix         # ESLint auto-fix
npm run format           # Prettier write
npm run favicon          # Regenerate public/favicon.svg
npm run preview:readme   # Rebuild and copy the social card to .github/assets for the README
```

Run `npm run quality` before declaring any change done. CI runs the same steps.

## Architecture

```
src/
  consts.ts              Site metadata: name, title, description, links, OG image alt
  data/profile.ts        Every word on the page (intro, about, work, projects, ...)
  layouts/Base.astro     <head>: SEO, OG/Twitter, icons, fonts, JSON-LD; the page column
  pages/index.astro      The page: intro, then <Section>s, then the colophon
  pages/404.astro        Not found (noindex)
  pages/og.png.ts        1200x630 social card (satori + resvg + sharp), built at build time
  pages/portrait.jpg.ts  Stable portrait URL for structured data
  pages/favicon.ico.ts, apple-touch-icon.png.ts, icon-512.png.ts   Rasterised from public/favicon.svg
  pages/robots.txt.ts, llms.txt.ts, manifest.webmanifest.ts
  components/Section.astro, Colophon.astro
  lib/schema.ts          JSON-LD graph: WebSite, ProfilePage, Person, Organizations, ScholarlyArticle
  lib/social-image.ts    The OG card layout
  lib/icons.ts           Icon rasteriser and a tiny ICO encoder
  styles/global.css      Tailwind import, palette tokens, base type
scripts/build-favicon.mjs   Writes public/favicon.svg (glyph as path, via satori)
tests/                      Vitest: page SEO/a11y contract, content invariants, every endpoint
```

Components only arrange content. To change copy, edit `src/data/profile.ts` or `src/consts.ts`, not the templates.

## Design Rules (from the owner; do not drift)

- **Simple and elegant.** One calm column (max 66rem), headings stacked above content, generous but not wasteful spacing. No decorative systems: no grids, title blocks, drafting marks, cards, mono labels.
- **Palette:** mint `#e3fcec` background, brown `#7f5539` for the name and headings, green `#386641` for links, near-black `#2d2d2d` for text, warm grey `#66594e` for dates and quiet text. **Light only. No dark mode.**
- **Type:** Cormorant Garamond only (500 and 600, with italics). Noto Nastaliq Urdu only for the word حرف next to Harf Studios. Body text is about 18px on phones and 21px on laptops (fluid `clamp`).
- **Identity:** engineer first. **No Islamic or Mughal visual motifs** (arches, gold flecks, manuscript ornament). Urdu appears only in the Harf context. Keep the bi-flag triple rule and "Bi, and proud of it." under the name.
- **Harf** is one entry under Work, with a description. No book cover or product images. Vaniya's name links to her Instagram and does not appear in the intro line.
- **No animation.** No entrance effects, no transitions, no smooth scrolling. The owner removed them deliberately; scrolling must stay at full frame rate.
- **Bullets:** the thin brown dash defined in `index.astro` (`.points`), not discs.

## Copy Rules

- First person, plain and specific. It must not read as AI-written: no em dashes in the data (a test enforces this), no "passionate", no stacked adjectives.
- Keep these two lines word for word: "ideas that question norms and tools that quietly empower." and "Above all, I believe engineering should be inclusive by design: thoughtful, humane, and built to serve those most often left out." (tested)
- The About section is about him (mental health, fairer learning, Urdu), not a list of tech.
- Ground project copy in each repo's README (sibling folders in `~/Downloads/Projects`). Do not invent numbers or claims.
- Harf's Instagram is a page of carousels (Urdu words, poetry, films). Never say "videos".
- Groww copy focuses on the strongest engineering: the multi-tenant architecture, the Journeys micro-batch cut from an hour to five minutes, the cost and performance work, the real-time migrations. The insurance product was never released; say so, and name no insurers. No intern bullets.
- Don't overwrite or shorten existing copy unless asked. Shorter is not automatically better here.

## Gotchas

- `compressHTML: true` in `astro.config.mjs` is deliberate. Astro 7's default (`"jsx"`) strips whitespace at line breaks around expressions and glues words together ("© 2026Md Hishaam").
- Fonts use the Fontsource provider (downloaded at build time). The npm provider only resolves each package's default weight.
- Satori matches faces by weight, not style: the OG card registers its italic under a separate family name (`Cormorant Italic`). Satori adds borders outside the box (see the favicon script). Satori reads WOFF, not WOFF2, so the OG card and favicon read static files from `@fontsource/cormorant-garamond`.
- Prettier reflows code. When editing with scripted string replacement, re-read the file first.
- Astro's dev toolbar is disabled because it cost frames while scrolling.

## Deploy

`.github/workflows/deploy.yml` runs on pushes to `master` (and checks on PRs): `npm ci`, check, lint, format check, test, build, then uploads `dist/` to GitHub Pages. The custom domain `hishaam.dev` is set in the repo's Pages settings and in `public/CNAME`.
