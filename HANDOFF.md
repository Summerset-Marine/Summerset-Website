# HANDOFF.md — Summerset Marine Construction Website

Deployment and operations guide delivered per Exhibit A §A.5 of the Master Services Agreement (LaBonte Development, LLC / Horstman Networks Inc).

Site: custom React website for Summerset Marine Construction (summersetmarine.com), built in a Replit Workspace owned by the Client.

---

## 1. What's in this repository

pnpm monorepo (Node.js 24, TypeScript 5.9):

| Path | What it is |
|---|---|
| `artifacts/summerset-marine/` | The website — React + Vite + Tailwind v4 + wouter (client-side routing) |
| `artifacts/api-server/` | Express 5 API — form relay to HubSpot, NetSuite inventory webhook + cache |
| `lib/`, `scripts/` | Shared workspace libraries and utility scripts |
| `LICENSES.md` | Open-source dependency license inventory |
| `handoff/` | Third-party account inventory + access revocation checklist |

Key website directories (inside `artifacts/summerset-marine/`):

- `src/pages/` — one file per route (~64 pages: products, services, resources, blog, 7 market sections)
- `src/App.tsx` — the full route map
- `src/components/` — layout (Header/Footer), UI, SEO components
- `src/lib/sanity.ts` — all Sanity CMS queries
- `src/lib/sitemap.ts` — canonical route list + sitemap builders
- `public/` — images (`images/smc/`), hero videos (`videos/`), robots.txt, generated sitemaps
- `scripts/generate-sitemaps.ts` — build-time sitemap + static blog HTML generation

## 2. Operating the site on Replit

- Each app runs as a Replit **workflow**: "artifacts/summerset-marine: web" (the website) and "artifacts/api-server: API Server" (port 5000). A reverse proxy routes `/api/*` to the API server and everything else to the website.
- Environment variables are managed as **Replit Secrets** (padlock icon in the workspace), not `.env` files. See `.env.example` in each artifact for the full variable reference.
- **Publishing**: use Replit's Publish button. The build runs `generate:sitemaps` automatically before `vite build`, so sitemaps and static blog HTML stay current on every deploy.
- **Content edits** are made in Sanity Studio (project `mx8e8b7p`) — no code changes or developer involvement required. Republish to refresh build-time artifacts (sitemaps, static blog HTML); live page content (projects, testimonials, FAQ, blog, market pages) is fetched from Sanity at page load and needs no redeploy.

## 3. Build & verify commands

```bash
pnpm install                                        # install all dependencies
pnpm run typecheck                                  # full TypeScript check
pnpm --filter @workspace/summerset-marine run generate:sitemaps
pnpm --filter @workspace/summerset-marine run build # production build (needs PORT/BASE_PATH in dev; plain `vite build` in CI)
pnpm --filter @workspace/api-server run build       # API server build
```

## 4. Migrating off Replit (AWS / DigitalOcean / Render / Railway)

The site is a standard Vite static build + a standard Node/Express server. Nothing is Replit-specific except workflow configuration.

### 4.1 Architecture after migration

- **Website**: static files from `artifacts/summerset-marine/dist/` — serve from any static host or CDN (S3+CloudFront, DO App Platform static site, Render static site, Railway + nginx).
- **API server**: Node 24 process running `artifacts/api-server` (`pnpm --filter @workspace/api-server run build && node dist/index.js`). Needs persistent disk (or object storage) for `data/inventory-cache.json` if you want the inventory cache to survive restarts — otherwise it falls back to live NetSuite fetches.
- **Routing**: the site calls the API at relative `…/api/*` paths. Put both behind one domain: route `/api/*` to the Node service and everything else to the static site (CloudFront behaviors, DO/Render/Railway path routing, or nginx).

### 4.2 Steps (any provider)

1. Clone the GitHub repository (transferred to your organization at Handoff).
2. Set environment variables from `.env.example` (both artifacts) in your provider's dashboard.
3. Build the website: `pnpm install && pnpm --filter @workspace/summerset-marine run generate:sitemaps && pnpm --filter @workspace/summerset-marine exec vite build` (set `VITE_*` variables at build time — Vite bakes them into the bundle).
4. Deploy `artifacts/summerset-marine/dist/` to the static host.
5. Deploy the API server as a Node service with its env vars; health check: `GET /api/healthz`.
6. Configure path routing (`/api/*` → API, `/*` → static, SPA fallback to `index.html` — but serve real files first so `/blog/[slug]/index.html`, sitemaps, and robots.txt are returned as-is).
7. Point DNS at the new host (DNS cutover is Client/End Client responsibility per §2.4 of the Agreement).

### 4.3 Provider notes

- **AWS**: S3 + CloudFront for the site; API on App Runner, ECS, or a small EC2/Lightsail box. Use CloudFront behaviors for `/api/*`.
- **DigitalOcean**: App Platform — one static-site component + one service component in the same app; path routing is built in.
- **Render**: Static Site + Web Service; add a rewrite rule for `/api/*` to the service, SPA fallback for the rest.
- **Railway**: two services; front with a proxy (Caddy/nginx) or Railway's domains + a small edge config.

## 5. External integrations

| Integration | Where | Notes |
|---|---|---|
| **Sanity CMS** (project `mx8e8b7p`, dataset `production`) | Browser fetches directly; sitemap script fetches at build time | New domains must be whitelisted for CORS at manage.sanity.io. Content: projects, testimonials, blog posts, market pages, FAQs, lift media, team |
| **HubSpot** | API server (`/api/submit-form`) + optional tracking script | 3 forms: consultation (also creates a CRM Deal), contact, service request. Returns 503 until env vars are set |
| **NetSuite** | API server (`/api/netsuite-webhook`, `/api/inventory`) | Webhook is HMAC-SHA256 signed (raw body, hex, `x-netsuite-signature` header). SuiteQL `custitem_smc_*` field IDs are TODO-flagged and must be set to real field IDs from the SMC account |
| **Google Analytics 4** | Website | Wire the GA4 measurement ID before go-live |

## 6. SEO architecture (do not break these)

- `public/robots.txt` — hand-maintained AI-crawler allowlist. **Never regenerate it.**
- 5 sitemaps + index generated by `generate:sitemaps`; submitted base URL comes from `VITE_SITE_URL`/`SITE_URL`.
- Static blog HTML (`public/blog/[slug]/index.html`) is generated per published Sanity post for crawlers; human visitors get the SPA via an inline bootstrap script.
- JSON-LD schemas are hardcoded per page type (`src/components/seo/JsonLd.tsx`).
- SEO limits enforced in Sanity Studio: titles ≤ 60 chars, descriptions ≤ 155 chars.

## 7. Gotchas

- The NetSuite webhook signature covers the **raw request body bytes** — `express.json({ verify })` in `app.ts` stashes `req.rawBody`. Don't remove that hook.
- The inventory cache path resolves from the API server's working directory (`artifacts/api-server`).
- `VITE_*` variables are build-time: changing them requires a rebuild, not just a restart.
- Sanity GROQ queries are intentionally duplicated in `scripts/generate-sitemaps.ts` (plain Node can't import `src/lib/sanity.ts`) — keep them in sync.
