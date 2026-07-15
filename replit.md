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
- Forms (planned): HubSpot Forms API (@hubspot/api-client; handler arrives in Prompt 4)
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
- `artifacts/api-server/src/routes/submit-form.ts` — POST /api/submit-form (validates, relays 3 form types to HubSpot; 503 "Form service temporarily unavailable" until HubSpot env vars set)
- `artifacts/api-server/src/lib/hubspot.ts` — HubSpot Forms API v3 submission + CRM Deal creation for consultations (TODO-flagged smc_* custom props + pipeline stage ID)
- `artifacts/summerset-marine/src/components/ui/ContactForm.tsx` — reusable form (consultation | contact | service-request), client validation, loading/success/error states
- `artifacts/summerset-marine/src/components/layout/Layout.tsx` — also injects HubSpot tracking script when VITE_HUBSPOT_PORTAL_ID is set
- `artifacts/api-server/src/routes/netsuite-webhook.ts` — POST /api/netsuite-webhook (HMAC-SHA256 of raw body in `x-netsuite-signature`) + GET /api/inventory (falls back to live SuiteQL fetch when cache empty and NetSuite configured)
- `artifacts/summerset-marine/src/lib/sanity.ts` — Sanity clients (`sanityFetch` CDN, `sanityLiveFetch` fresh) + all GROQ queries (blog, lake, market, FAQ, projects, testimonials, lift media, team)
- `artifacts/api-server/data/inventory-cache.json` — lift inventory cache written by the webhook

## Architecture decisions

- Routing uses wouter (workspace convention) instead of react-router-dom from the original spec; routes match the spec's URL structure exactly.
- Form/webhook endpoints live in the shared Express api-server (plain routes, not yet in the OpenAPI spec — form schemas arrive in later prompts).
- Integration code (Sanity, HubSpot, NetSuite) degrades gracefully: endpoints return 503/typed errors until env vars are configured. No secrets are set yet — `.env.example` documents placeholders only.
- Brand palette: navy #0A1628, blue #1B6A9C, red #C8102E (CTA), offwhite #F8F7F4. Fonts: Inter (sans), Playfair Display (serif headings).

## Product

Prompts 1–4 of a multi-prompt build complete: foundation + SEO infrastructure + CMS/ERP integration layer + HubSpot Forms integration (ContactForm component, form relay endpoint, tracking script). All ~50 pages are stubs ("Page content coming soon"). Page content, CMS wiring, and design arrive in later prompts.

## User preferences

- User is following a prepared multi-prompt sequence (full spec in `attached_assets/Pasted--PROMPT-1-...txt`); keep file/route naming aligned with that spec so later prompts map cleanly.

## Gotchas

- Webhook HMAC signs the **raw body bytes** — `express.json({ verify })` in `app.ts` stashes `req.rawBody`; don't remove that hook.
- NetSuite SuiteQL query uses placeholder `custitem_smc_*` field IDs (TODO-flagged) — must be replaced with real field IDs from the SMC account.

- `blog/[slug]` from the spec is implemented as `src/pages/blog/post.tsx` with wouter route `/blog/:slug`.
- The inventory cache path resolves via `process.cwd()` — the api-server workflow runs with cwd = `artifacts/api-server`.
- robots.txt in `public/` contains the exact AI-bot allowlist from the spec; don't regenerate it.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
