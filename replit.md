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
- `artifacts/summerset-marine/src/components/layout/` — Header (mega-menus + mobile drawer), Footer (4-col navy), Layout (accepts className)
- `artifacts/summerset-marine/src/components/ui/Button/index.tsx` — brand Button (primary/secondary/ghost, default/large, href renders link) — named `Button/` dir because shadcn `button.tsx` collides by casing
- `artifacts/summerset-marine/src/components/ui/HeroSection.tsx` — full-bleed / split / video-bg hero variants
- `artifacts/summerset-marine/src/components/ui/CTABlock.tsx` — light/dark full-width CTA section
- `artifacts/summerset-marine/public/images/summerset-marine-logo.svg` — placeholder logo (replace with real SMC logo when supplied)
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
- `artifacts/summerset-marine/src/components/ui/ContentPlaceholder.tsx` — yellow "PLACEHOLDER — SMC TO SUPPLY: {label}" block marking content the client must provide
- `artifacts/summerset-marine/src/pages/products/lifts/inventory.tsx` — client-side inventory page: fetches `${BASE_URL}api/inventory`, optionally joins Sanity lift media on netsuiteItemId, type/condition/price filters, loading/empty/error states

## Architecture decisions

- Routing uses wouter (workspace convention) instead of react-router-dom from the original spec; routes match the spec's URL structure exactly.
- Form/webhook endpoints live in the shared Express api-server (plain routes, not yet in the OpenAPI spec — form schemas arrive in later prompts).
- Integration code (Sanity, HubSpot, NetSuite) degrades gracefully: endpoints return 503/typed errors until env vars are configured. No secrets are set yet — `.env.example` documents placeholders only.
- Brand palette: navy #0A1628, blue #1B6A9C, red #C8102E (CTA), offwhite #F8F7F4. Fonts: Inter (sans), Playfair Display (serif headings).

## Product

Prompts 1–8 of a multi-prompt build complete: foundation + SEO infrastructure + CMS/ERP integration layer + HubSpot Forms integration + global layout/design system (Header with Products/Markets mega-menus, Footer, Button, HeroSection, CTABlock) + content migration. Prompt 6 ported verbatim copy from the live Squarespace site into: about, locations (4 real WI locations, Maps embeds, LocalBusiness @graph JSON-LD), services/residential, 4 pier product pages (commercial is all placeholders — no live source page), 3 lift pages, and the live inventory page. Remaining pages are stubs; further content/CMS wiring arrives in later prompts. Prompt 7 built the 5-page Lake Geneva market microsite (`src/pages/markets/lake-geneva/`: index, geneva-lake, projects with filterable gallery + accessible lightbox, testimonials, contact) — Sanity-driven with ContentPlaceholder fallbacks, LocalBusiness + Service + ImageObject JSON-LD (`serviceSchema` added to JsonLd.tsx). Prompt 8 built the Oconomowoc / Lake Country microsite (8 pages: index, okauchee-lake, lac-la-belle, nagawicka-lake, beaver-lake with the verified "Average Depth: 15 Feet" stat, projects, testimonials, contact) and the Door County microsite (7 pages: index, green-bay, sturgeon-bay, lake-michigan, projects, testimonials, contact — contact shows the real Brussels, WI address) as exact clones of the Lake Geneva template; only Beaver Lake has a verified stat, other lake stats are ContentPlaceholders.

## User preferences

- User is following a prepared multi-prompt sequence (full spec in `attached_assets/Pasted--PROMPT-1-...txt`); keep file/route naming aligned with that spec so later prompts map cleanly.

## Gotchas

- Webhook HMAC signs the **raw body bytes** — `express.json({ verify })` in `app.ts` stashes `req.rawBody`; don't remove that hook.
- NetSuite SuiteQL query uses placeholder `custitem_smc_*` field IDs (TODO-flagged) — must be replaced with real field IDs from the SMC account.

- `blog/[slug]` from the spec is implemented as `src/pages/blog/post.tsx` with wouter route `/blog/:slug`.
- The inventory cache path resolves via `process.cwd()` — the api-server workflow runs with cwd = `artifacts/api-server`.
- robots.txt in `public/` contains the exact AI-bot allowlist from the spec; don't regenerate it.
- Lake-stat captions on product pages are verbatim from the live site (source captures in `/tmp/smc/*.md`); the Prompt 6 spec's example stats (Geneva 61 / Beaver 15 / Oconomowoc 32) span multiple pages — don't "correct" a page to match the spec list.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
