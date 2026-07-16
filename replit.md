# Summerset Marine Construction

Image assets: `public/images/smc/` holds 45 scraped Squarespace photos with SEO filenames (`scripts/scrape-images.ts`, run via `pnpm run scrape:images`; `_manifest.json` maps filename→alt→source URL). Heroes on home/about/product/market pages use these; market pages keep the Sanity `heroImageUrl` override with static fallback. Header/Footer use the real white PNG logo (navy chip behind it in the white header). `STATIC_SITEMAP_IMAGES` in `src/lib/sitemap.ts` feeds sitemap-images.xml by default.

Marketing website for Summerset Marine Construction (summersetmarine.com) — a luxury marine construction company in Wisconsin building permanent piers, boat lifts, and marine contracting systems.

Hero videos: `public/videos/` holds 14 Squarespace hero videos (1080p, pulled via ffmpeg from HLS `playlist.m3u8` — must parse the master playlist for the highest-BANDWIDTH variant; default ffmpeg picks the lowest). Wired as inline `<video autoPlay muted loop playsInline>` (poster = prior hero image) on home/about/product/service pages and via `HeroSection variant="video-bg"` on lifts index, seasonal, accessories, and green-lake market.

Markets: 7 market sections — lake-geneva, oconomowoc, door-county (with lake subpages) plus madison, whitewater, green-lake, fox-chain (index/projects/testimonials/contact only, cloned from the lake-geneva template; verbatim live copy on index pages). Sanity holds 123 `project` docs (88 migrated from 14 legacy portfolio pages, deduped via a `sourceUrl` field; markets: mendota→madison, beulah/delavan/brown→whitewater, pewaukee/pine/moose/upper-okauchee→oconomowoc, minnetonka→other). `marketPage` docs exist for all 7 markets; `featuredProjects` entries are **inline objects** (title/lake/productType/image), not references — `MARKET_PAGE_QUERY` does not dereference, so keep that shape when adding entries.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- Web app runs via the `artifacts/summerset-marine: web` workflow
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind v4 + wouter (`artifacts/summerset-marine`)
- API: Express 5 (`artifacts/api-server`)
- CMS: Sanity (`@sanity/client`, project mx8e8b7p) — 35 `project` docs + 3 blogPost featured images migrated from the legacy site; testimonials intentionally empty (no legacy source copy — never fabricate). Browser CORS origins must be whitelisted by Noah at manage.sanity.io (localhost dev preview is blocked; verify the published domain is whitelisted too)
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
- `artifacts/summerset-marine/scripts/generate-sitemaps.ts` — build-time script (Node native TS) writing sitemaps to `public/`; runs via `generate:sitemaps` and chained into `build`; fetches blog posts from Sanity when configured. Also runs `generateBlogHTML()`: writes crawler-readable static HTML per published post to `public/blog/[slug]/index.html` (meta/OG/canonical/Article JSON-LD + serialized Portable Text body inside `#root`; inline bootstrap script injects the SPA's hashed assets for human visitors). Skips with a warn when Sanity is unset. `SANITY_API_HOST` env is a test-only hook to point the client at a mock server. GROQ queries are duplicated in the script because `src/lib/sanity.ts` reads `import.meta.env` at top level and can't be imported under plain Node — keep them in sync.
- `artifacts/summerset-marine/.env.example` + `artifacts/api-server/.env.example` — document every env var with purpose and source (contract deliverable)
- `HANDOFF.md` (root) — deployment/migration guide; `LICENSES.md` (root) — generated dependency license inventory; `handoff/` — third-party account inventory + access revocation checklist. All are Exhibit A §A.5 handoff deliverables for the Horstman Networks MSA (contract PDF in `attached_assets/`; Build Completion Aug 4, 2026; remaining: GA4 measurement ID, GitHub transfer, Sanity walkthrough)
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
- Design system: client-supplied "Classical" editorial DS (references in `design/redesign-reference/`, readme at `_ds/classical-*/readme.md`) applied site-wide. Palette: off-white #f8f7f4 ground, gold #b68235 accent, navy #0a1628 dark bands/header chip, hairlines #d4c9b8, text #201f1d (`brand-black`). Fonts: Cormorant Garamond (serif headings), Lora (body). Buttons are outlined, not filled (Button variants remain primary/secondary/ghost — there is no "outline" variant; ghost is dark-backgrounds only). Cards are flat with hairline borders — no rounded corners/shadows; chips are outlined serif smallcaps. Legacy blue/red tokens still exist in index.css but should not be used in new UI.

## Product

Prompts 1–9 of a multi-prompt build complete: foundation + SEO infrastructure + CMS/ERP integration layer + HubSpot Forms integration + global layout/design system (Header with Products/Markets mega-menus, Footer, Button, HeroSection, CTABlock) + content migration. Prompt 6 ported verbatim copy from the live Squarespace site into: about, locations (4 real WI locations, Maps embeds, LocalBusiness @graph JSON-LD), services/residential, 4 pier product pages (commercial is all placeholders — no live source page), 3 lift pages, and the live inventory page. Remaining pages are stubs; further content/CMS wiring arrives in later prompts. Prompt 7 built the 5-page Lake Geneva market microsite (`src/pages/markets/lake-geneva/`: index, geneva-lake, projects with filterable gallery + accessible lightbox, testimonials, contact) — Sanity-driven with ContentPlaceholder fallbacks, LocalBusiness + Service + ImageObject JSON-LD (`serviceSchema` added to JsonLd.tsx). Prompt 8 built the Oconomowoc / Lake Country microsite (8 pages: index, okauchee-lake, lac-la-belle, nagawicka-lake, beaver-lake with the verified "Average Depth: 15 Feet" stat, projects, testimonials, contact) and the Door County microsite (7 pages: index, green-bay, sturgeon-bay, lake-michigan, projects, testimonials, contact — contact shows the real Brussels, WI address) as exact clones of the Lake Geneva template; only Beaver Lake has a verified stat, other lake stats are ContentPlaceholders. Prompt 9 built the home page (spec hero, product highlights, Why Permanent, market cards, Sanity featured projects/testimonials, Lifetime Difference callouts, organizationSchema), FAQ (live FAQ_QUERY, category tabs, accordion, faqSchema only with real entries), permanent-vs-seasonal + 3 buyer-concern resource pages, blog index (live fetch, market/product filters — productType added to ALL_BLOG_POSTS_QUERY, pagination >12) and blog post (client-side fetch by slug, @portabletext/react body, articleSchema, related posts; SSG not applicable in the SPA — build-time slug fetch lives in the sitemap script), consultation/contact/service-request conversion pages, and careers (Rippling ATS URL pending). Prompt 10 (final QA) passed: build clean (562kB chunk warning only), robots.txt AI-bot allowlist verified, all 6 sitemaps valid, JSON-LD + meta verified per page type, forms/webhook/inventory endpoints tested via curl (webhook HMAC is hex-encoded), internal-linking gaps fixed (parent-market links on all 8 lake pages, "Where We Install It" lake links on all 8 product detail pages, FAQ links on 4 resource pages), and ghost Buttons (white-on-white) swapped to secondary on light backgrounds — ghost variant is only for dark backgrounds.

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
