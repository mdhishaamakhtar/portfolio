<!-- markdownlint-disable MD033 -->

<p align="center">
  <img src="./.github/assets/hishaam-dev-preview.png" alt="hishaam.dev: Md Hishaam Akhtar, backend engineer at Groww and co-founder of Harf Studios">
</p>

## hishaam.dev

The personal site of Md Hishaam Akhtar: backend engineer at Groww and co-founder of [Harf Studios](https://harfstudios.fun).

One page, on mint, set in Cormorant Garamond: who he is, the work at Groww and Harf, projects, research, writing, and how to reach him. Live at **[hishaam.dev](https://hishaam.dev)**.

## What It Does

- Renders a single static page from typed data in `src/data/profile.ts`
- Self-hosts its fonts through the Astro Fonts API, with metric-matched fallbacks
- Generates the social card, favicon set and portrait at build time
- Ships canonical, Open Graph and Twitter tags, a connected JSON-LD graph, a sitemap, `robots.txt`, `llms.txt` and a web manifest
- Deploys to GitHub Pages only after type checks, lint, formatting and tests pass

## Tech Stack

[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-5-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io/)
[![Satori](https://img.shields.io/badge/Satori-OG_images-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://github.com/vercel/satori)
[![sharp](https://img.shields.io/badge/sharp-images-99CC00?style=for-the-badge)](https://sharp.pixelplumbing.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-deploy-222222?style=for-the-badge&logo=githubpages&logoColor=white)](https://pages.github.com/)

## Quick Start

Requires Node 22.12 or later.

```bash
npm install
npm run dev
```

Then open [http://localhost:4321](http://localhost:4321).

## Scripts

| Command                  | What it does                                                     |
| ------------------------ | ---------------------------------------------------------------- |
| `npm run dev`            | Dev server with hot reload                                       |
| `npm run build`          | Static build into `dist/`                                        |
| `npm run preview`        | Serve the built site                                             |
| `npm run quality`        | `astro check`, ESLint, Prettier check and the tests              |
| `npm test`               | Vitest, rendering pages and endpoints through Astro's container  |
| `npm run favicon`        | Regenerate `public/favicon.svg` from `scripts/build-favicon.mjs` |
| `npm run preview:readme` | Rebuild and refresh the README image from the social card        |

A pre-commit hook runs `npm run quality`.

## Editing Content

All of the copy lives in two files:

- `src/data/profile.ts`: intro, about, work, projects, research, writing, recognition, education
- `src/consts.ts`: name, title, description, links and the social-card alt text

Components only arrange it. The tests check the data too: every link is https, project names are unique, and the two lines in the About section stay word for word.

## Deploy

Every push to `master` runs [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml): install, type check, lint, format check, test, build, then publish `dist/` to GitHub Pages. Pull requests run the same checks without deploying. The custom domain is set in the repository's Pages settings and in `public/CNAME`.

## Project Docs

- Product: [PRODUCT.md](./PRODUCT.md)
- Design: [DESIGN.md](./DESIGN.md)
- Agent guide: [CLAUDE.md](./CLAUDE.md) (also `AGENTS.md`)

## Contributor

- Md Hishaam Akhtar

<p align="center">
  Built on mint, in Cormorant, with the bi flag under the name.
</p>
