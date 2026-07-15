# Summerset Marine Construction

Marketing website for Summerset Marine Construction (summersetmarine.com) — a luxury marine construction company in Wisconsin building permanent piers, boat lifts, and marine contracting systems.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- Web app runs via the `artifacts/summerset-marine: web` workflow
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind v4 + wouter (`artifacts/summerset-marine`)
- API: Express 5 (`artifacts/api-server`)
- CMS (planned): Sanity (`@sanity/client`, null client until VITE_SANITY_PROJECT_ID is set)
- Email (planned): Gmail OAuth2 via nodemailer + googleapis
- ERP (planned): NetSuite REST API (OAuth 1.0a TBA, HMAC-SHA256)

## Where things live

- `artifacts/summerset-marine/src/pages/` — one file per route (~48 pages: products, services, resources, blog, markets)
- `artifacts/summerset-marine/src/App.tsx` — full wouter route map
- `artifacts/summerset-marine/src/components/layout/` — Header, Footer, Layout
- `artifacts/summerset-marine/src/components/seo/` — PageMeta (title/description/canonical), JsonLd
- `artifacts/summerset-marine/src/index.css` — brand token system (`--color-brand-*` in @theme)
- `artifacts/summerset-marine/src/lib/sitemap.ts` — canonical static route list + all sitemap XML builders (5 sitemaps + index)
- `artifacts/summerset-marine/scripts/generate-sitemaps.ts` — build-time script (Node native TS) writing sitemaps to `public/`; runs via `generate:sitemaps` and chained into `build`; fetches blog posts from Sanity when configured
- `artifacts/summerset-marine/.env.example` — documents all expected env vars
- `artifacts/api-server/src/routes/submit-form.ts` — POST /api/submit-form (Gmail relay)
- `artifacts/api-server/src/routes/netsuite-webhook.ts` — POST /api/netsuite-webhook + GET /api/inventory
- `artifacts/api-server/data/inventory-cache.json` — lift inventory cache written by the webhook

## Architecture decisions

- Routing uses wouter (workspace convention) instead of react-router-dom from the original spec; routes match the spec's URL structure exactly.
- Form/webhook endpoints live in the shared Express api-server (plain routes, not yet in the OpenAPI spec — form schemas arrive in later prompts).
- Integration code (Sanity, Gmail, NetSuite) degrades gracefully: endpoints return 503/typed errors until env vars are configured. No secrets are set yet — `.env.example` documents placeholders only.
- Brand palette: navy #0A1628, blue #1B6A9C, red #C8102E (CTA), offwhite #F8F7F4. Fonts: Inter (sans), Playfair Display (serif headings).

## Product

Prompts 1–2 of a multi-prompt build complete: foundation + SEO infrastructure (sitemaps, PageMeta with OG/Twitter tags, JsonLd schema builders). All ~50 pages are stubs ("Page content coming soon"). Page content, forms, CMS wiring, and design arrive in later prompts.

## User preferences

- User is following a prepared multi-prompt sequence (full spec in `attached_assets/Pasted--PROMPT-1-...txt`); keep file/route naming aligned with that spec so later prompts map cleanly.

## Gotchas

- `blog/[slug]` from the spec is implemented as `src/pages/blog/post.tsx` with wouter route `/blog/:slug`.
- The inventory cache path resolves via `process.cwd()` — the api-server workflow runs with cwd = `artifacts/api-server`.
- robots.txt in `public/` contains the exact AI-bot allowlist from the spec; don't regenerate it.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
