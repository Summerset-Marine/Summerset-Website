# Summerset Marine Construction — Wireframes & Component Structure

Design handoff document. The site is a React + Vite + Tailwind v4 SPA (~64 pages) built from **9 page templates** and a shared component library. Backend/data wiring is complete — this document describes the current structure so every template can be visually redesigned without breaking data flow, routing, or SEO.

**Brand context:** luxury marine construction (permanent piers, boat lifts) in Wisconsin lake country. High-ticket, consultation-driven sales. The design should feel premium, established, and trustworthy — closer to a luxury home builder than a contractor.

---

## 1. Design tokens (current)

| Token | Value | Use |
|---|---|---|
| `--color-brand-navy` | `#0A1628` | Header, footer, dark sections, headings |
| `--color-brand-blue` | `#1B6A9C` | Links, secondary actions |
| `--color-brand-red` | `#C8102E` | Primary CTA only |
| `--color-brand-offwhite` | `#F8F7F4` | Alternating section backgrounds |
| `--color-brand-gray` | `#6B7280` | Body text |
| `--font-sans` | Inter | Body, UI |
| `--font-serif` | Playfair Display | Headings, pull quotes |
| `--container-content` | 1280px | Content max-width |

Tokens live in `src/index.css` (Tailwind v4 `@theme`). A redesign may change values but should keep the token names so all pages update together.

---

## 2. Global layout

### 2.1 Header (`components/layout/Header.tsx`)

```
┌──────────────────────────────────────────────────────────────────┐
│ [LOGO on navy chip]   Products ▾  Services ▾  Markets ▾          │
│                       Resources ▾  About  Contact                │
│                                        [Get a Consultation] CTA  │
└──────────────────────────────────────────────────────────────────┘
```

- **Products mega-menu**: 2 columns — Permanent Pier Systems (All Seasons HD, All Seasons, Classic, Minimalist, Commercial) | Boat & PWC Lifts (Built-In, Standalone, PWC, Live Inventory) + buyer-guide links.
- **Services**: Marine Contracting, Residential Service, Repairs.
- **Markets mega-menu**: 7 columns, one per market (Lake Geneva, Oconomowoc, Madison, Whitewater, Green Lake, Fox Chain, Door County), each with its lake subpages + projects link. *Design note: 7 columns is cramped — a redesigned mega-menu could group by region or use a 2-row layout.*
- **Resources**: FAQ, Blog, 4 buyer guides.
- **Mobile**: hamburger → slide-out drawer with accordion nav.

### 2.2 Footer (`components/layout/Footer.tsx`) — navy, 4 columns

```
┌──────────────────────────────────────────────────────────────────┐
│ [White logo]      PRODUCTS        MARKETS         CONTACT        │
│ Tagline           Piers           Lake Geneva     Phone          │
│ [social icons]    Lifts           Oconomowoc      Email          │
│                   Contracting     Door County     Address        │
│                   Resources                       [Consult CTA]  │
├──────────────────────────────────────────────────────────────────┤
│ © Summerset Marine Construction        Privacy Policy            │
└──────────────────────────────────────────────────────────────────┘
```

---

## 3. Shared components (the redesign surface)

These are used across all templates — restyling them restyles most of the site:

| Component | File | Variants / notes |
|---|---|---|
| `Button` | `ui/Button/index.tsx` | primary (red), secondary (navy outline), ghost (dark bg only); default/large; renders `<a>` when `href` given |
| `HeroSection` | `ui/HeroSection.tsx` | `full-bleed` (image bg + overlay), `split` (text/image 50-50), `video-bg` (autoplay loop) |
| `CTABlock` | `ui/CTABlock.tsx` | light / dark full-width conversion band: heading + subtext + button |
| `ContactForm` | `ui/ContactForm.tsx` | 3 form types (consultation / contact / service-request), client validation, loading/success/error states — **keep field names & states; restyle freely** |
| `ContentPlaceholder` | `ui/ContentPlaceholder.tsx` | yellow "SMC TO SUPPLY" box — intentional; keep visually loud in staging |
| shadcn/Radix primitives | `ui/*` | accordion (FAQ), dialog, tabs, select, toaster |

---

## 4. Page templates

### T1 — Home (`pages/index.tsx`) — 1 page

```
┌────────────────────────────────────────────┐
│ HERO — full-bleed looping video            │
│   H1 (serif) + subhead + [primary CTA]     │
├────────────────────────────────────────────┤
│ PRODUCT HIGHLIGHTS — 3 cards               │
│  [img] Piers   [img] Lifts   [img] Marine  │
│  title/blurb/[Learn more]     Contracting  │
├────────────────────────────────────────────┤
│ WHY PERMANENT? — comparison copy + button  │
│ (currently ContentPlaceholder)             │
├────────────────────────────────────────────┤
│ MARKET PRESENCE — grid of 7 market cards   │
├────────────────────────────────────────────┤
│ FEATURED PROJECTS — Sanity grid (photo,    │
│ title, product type)                       │
├────────────────────────────────────────────┤
│ TESTIMONIALS — blockquote strip (Sanity)   │
├────────────────────────────────────────────┤
│ LIFETIME DIFFERENCE — 3 brand callouts     │
├────────────────────────────────────────────┤
│ CTA BLOCK (dark) — consultation            │
└────────────────────────────────────────────┘
```

### T2 — Product detail (`pages/products/**`) — ~10 pages
(4 pier models + commercial + 3 lift types, plus category indexes)

```
┌────────────────────────────────────────────┐
│ HERO — navy, product video + H1 + intro    │
├────────────────────────────────────────────┤
│ FEATURES — 3-column benefit grid           │
├────────────────────────────────────────────┤
│ ON WISCONSIN WATERS — 2-col install stats  │
│ (lake name, depth, acres — verbatim copy)  │
├────────────────────────────────────────────┤
│ SPECS & GALLERY (ContentPlaceholder)       │
├────────────────────────────────────────────┤
│ WHERE WE INSTALL IT — lake link buttons    │
├────────────────────────────────────────────┤
│ CTA BLOCK                                  │
└────────────────────────────────────────────┘
```

### T3 — Live inventory (`products/lifts/inventory.tsx`) — 1 page
Filter bar (type / condition / price) → card grid from `/api/inventory` (photo, model, price, condition badge) with loading / empty / error states. **Keep the fetch + filter logic; restyle the cards.**

### T4 — Market index (`pages/markets/<market>/index.tsx`) — 7 pages

```
HERO (full-bleed or video-bg, market imagery)
MARKET INTRO — narrative copy
BODIES OF WATER — large lake cards w/ depth+acreage stats
FEATURED PROJECTS — market-filtered Sanity grid
TESTIMONIALS — market-filtered
CTA BLOCK — market-specific
```

### T5 — Lake subpage (`markets/<market>/<lake>.tsx`) — ~10 pages
Hero → lake profile (stats + history) → lake characteristics (placeholder) → recommended products cards → lake-filtered gallery + testimonials → CTA. Includes a "part of <Market>" parent link.

### T6 — Projects gallery (`markets/<market>/projects.tsx`) — 7 pages
Navy title banner → filter dropdowns (product type, lake) → masonry/grid of project photos → accessible lightbox (keyboard nav, captions). **Lightbox behavior must be preserved.**

### T7 — Blog (`blog/index.tsx` + `blog/post.tsx`)
- Index: header → market/product filter pills → card grid (featured image, tag, title, excerpt, date) → pagination (>12).
- Post: full-width featured image → article header (title, date, market tag) → Portable Text body → related-posts grid → CTA. *Post HTML is also statically generated for crawlers — body structure must stay semantic (h2/h3/p/img).*

### T8 — Conversion pages (`consultation.tsx`, `contact.tsx`, `service-request.tsx`) — 3 pages + 7 market contact pages

```
┌──────────────────────────┬─────────────────┐
│ FORM (ContactForm)       │ SIDEBAR         │
│ name/email/phone/lake/   │ phone, email,   │
│ product interest/message │ address, hours, │
│ [submit → success state] │ trust signals   │
└──────────────────────────┴─────────────────┘
```

### T9 — Content/utility pages
- **About**: hero video → story copy → values/team → CTA.
- **Locations**: 4 location cards with Google Maps embeds.
- **FAQ**: category tabs → accordion (Sanity-driven).
- **Resource guides** (4): long-form article layout with section navigation + FAQ cross-links.
- **Careers**: intro + ATS link-out.

---

## 5. Redesign constraints (do not break)

1. **Routes and page files stay** — restyle inside each page; the wouter route map (`App.tsx`) and URL structure are contractual/SEO-locked.
2. **SEO components untouched**: `PageMeta`, `JsonLd`, robots.txt, sitemaps, static blog HTML.
3. **Data wiring untouched**: Sanity queries (`src/lib/sanity.ts`), `/api/inventory`, `ContactForm` submission logic + its three form types and states.
4. **`ContentPlaceholder` blocks stay visible** — they mark client-supplied content per contract.
5. **Never fabricate testimonials** — testimonial sections render only real Sanity data (currently empty in some markets → sections hide or show placeholders).
6. **Ghost buttons only on dark backgrounds** (known past bug: white-on-white).
7. Media assets already exist: 45 SEO-named photos (`public/images/smc/`), 14 hero videos (`public/videos/`) — reuse them; heroes are wired for video where available.

## 6. Suggested redesign priorities

1. **Home** — first impression; hero, product cards, project grid.
2. **Header/Footer + Button/HeroSection/CTABlock** — global lift for all 64 pages.
3. **Product detail template** — the money pages.
4. **Market index + lake templates** — 17 pages from two templates.
5. Blog, gallery, forms, utility pages.
