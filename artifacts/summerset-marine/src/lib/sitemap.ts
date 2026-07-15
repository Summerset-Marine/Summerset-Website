/**
 * Programmatic sitemap generation.
 *
 * `staticRoutes` is the canonical list of all static site routes. Dynamic
 * routes (e.g. blog posts from Sanity) are appended at build time.
 */

export const staticRoutes: string[] = [
  "/",
  "/about",
  "/locations",
  "/careers",
  "/consultation",
  "/contact",
  "/service-request",
  "/products/permanent-piers",
  "/products/permanent-piers/all-seasons-hd",
  "/products/permanent-piers/all-seasons",
  "/products/permanent-piers/classic",
  "/products/permanent-piers/minimalist",
  "/products/permanent-piers/commercial",
  "/products/lifts",
  "/products/lifts/built-in",
  "/products/lifts/standalone",
  "/products/lifts/pwc",
  "/products/lifts/inventory",
  "/services/marine-contracting",
  "/services/residential",
  "/services/repairs",
  "/resources/permanent-vs-seasonal",
  "/resources/what-does-a-pier-cost",
  "/resources/installation-process",
  "/resources/what-to-expect",
  "/resources/faq",
  "/blog",
  "/markets/lake-geneva",
  "/markets/lake-geneva/geneva-lake",
  "/markets/lake-geneva/projects",
  "/markets/lake-geneva/testimonials",
  "/markets/lake-geneva/contact",
  "/markets/oconomowoc",
  "/markets/oconomowoc/okauchee-lake",
  "/markets/oconomowoc/lac-la-belle",
  "/markets/oconomowoc/nagawicka-lake",
  "/markets/oconomowoc/beaver-lake",
  "/markets/oconomowoc/projects",
  "/markets/oconomowoc/testimonials",
  "/markets/oconomowoc/contact",
  "/markets/door-county",
  "/markets/door-county/green-bay",
  "/markets/door-county/sturgeon-bay",
  "/markets/door-county/lake-michigan",
  "/markets/door-county/projects",
  "/markets/door-county/testimonials",
  "/markets/door-county/contact",
];

export function generateSitemapXml(baseUrl: string, routes: string[] = staticRoutes): string {
  const urls = routes
    .map(
      (route) =>
        `  <url>\n    <loc>${baseUrl}${route}</loc>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function generateSitemapIndexXml(baseUrl: string, sitemaps: string[]): string {
  const entries = sitemaps
    .map(
      (path) =>
        `  <sitemap>\n    <loc>${baseUrl}${path}</loc>\n  </sitemap>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>\n`;
}
