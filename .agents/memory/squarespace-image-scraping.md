---
name: Squarespace CDN image scraping
description: How to reliably download original JPEG/PNG assets from Squarespace CDN for the SMC site
---
- Squarespace CDN (images.squarespace-cdn.com) returns WebP by default; pass `-H "Accept: image/jpeg"` to get the original JPEG/PNG bytes.
- **Why:** WebP downloads broke the "real JPEG with SEO filename" convention in `public/images/smc/` during the v2 image prompt (July 2026).
- The legacy site reuses the *same source asset* under many different Squarespace asset URLs/filenames — dedupe by asset ID in the URL, not by filename.
- Sanctioned image reuse on the site: home "What We Build" cards may reuse the hero of the page they link to; consultation/contact/service-request sidebars share one photo.
- Sanity migration scripts using @sanity/client must run from inside the artifact package dir (workspace deps aren't resolvable from /tmp). Testimonials stay empty — no legacy source copy exists; never fabricate.
- Sanity CORS blocks browser fetches from dev `localhost` (and possibly the published domain) — data verified via server-side API instead; adding origins requires admin at manage.sanity.io (API tokens lack the cors grant).
