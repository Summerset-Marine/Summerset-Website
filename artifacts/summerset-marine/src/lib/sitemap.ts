/**
 * Programmatic sitemap generator.
 *
 * Produces five sitemap XML files plus a sitemap index:
 *   sitemap-core.xml     — core company pages (priority 1.0, weekly)
 *   sitemap-markets.xml  — market + body-of-water pages (0.9/0.8)
 *   sitemap-products.xml — product, service, resource pages (0.8/0.7)
 *   sitemap-images.xml   — Google image sitemap (placeholder until photography loads)
 *   sitemap-blog.xml     — blog posts from Sanity (0.5, weekly)
 *   sitemap-index.xml    — index referencing all five
 *
 * Run via `scripts/generate-sitemaps.ts`, which writes them to public/ so
 * Vite serves them in dev and copies them to dist/ at build time.
 */

export const SITE_URL = "https://summersetmarine.com";

export type Changefreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: Changefreq;
  priority: number;
}

interface RouteGroup {
  paths: string[];
  changefreq: Changefreq;
  priority: number;
}

/* ------------------------------------------------------------------ */
/* Route groups                                                        */
/* ------------------------------------------------------------------ */

const coreGroups: RouteGroup[] = [
  {
    paths: [
      "/",
      "/about",
      "/locations",
      "/careers",
      "/privacy",
      "/consultation",
      "/contact",
      "/service-request",
    ],
    changefreq: "weekly",
    priority: 1.0,
  },
];

const marketGroups: RouteGroup[] = [
  {
    paths: [
      "/markets/lake-geneva",
      "/markets/lake-geneva/geneva-lake",
      "/markets/oconomowoc",
      "/markets/oconomowoc/okauchee-lake",
      "/markets/oconomowoc/lac-la-belle",
      "/markets/oconomowoc/nagawicka-lake",
      "/markets/oconomowoc/beaver-lake",
      "/markets/door-county",
      "/markets/door-county/green-bay",
      "/markets/door-county/sturgeon-bay",
      "/markets/door-county/lake-michigan",
    ],
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    paths: [
      "/markets/lake-geneva/projects",
      "/markets/lake-geneva/testimonials",
      "/markets/lake-geneva/contact",
      "/markets/oconomowoc/projects",
      "/markets/oconomowoc/testimonials",
      "/markets/oconomowoc/contact",
      "/markets/door-county/projects",
      "/markets/door-county/testimonials",
      "/markets/door-county/contact",
    ],
    changefreq: "monthly",
    priority: 0.8,
  },
];

const productGroups: RouteGroup[] = [
  {
    paths: ["/products/permanent-piers", "/products/lifts"],
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    paths: [
      "/products/permanent-piers/all-seasons-hd",
      "/products/permanent-piers/all-seasons",
      "/products/permanent-piers/classic",
      "/products/permanent-piers/minimalist",
      "/products/permanent-piers/commercial",
      "/products/lifts/built-in",
      "/products/lifts/standalone",
      "/products/lifts/pwc",
      "/products/lifts/inventory",
      "/products/seasonal",
      "/products/accessories",
    ],
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    paths: [
      "/services/marine-contracting",
      "/services/residential",
      "/services/repairs",
      "/resources/permanent-vs-seasonal",
      "/resources/what-does-a-pier-cost",
      "/resources/installation-process",
      "/resources/what-to-expect",
      "/resources/faq",
    ],
    changefreq: "monthly",
    priority: 0.7,
  },
];

/** Flat list of every static route (used by the app router and tests). */
export const staticRoutes: string[] = [
  ...coreGroups,
  ...marketGroups,
  ...productGroups,
].flatMap((group) => group.paths);

/* ------------------------------------------------------------------ */
/* XML builders                                                        */
/* ------------------------------------------------------------------ */

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function entriesFromGroups(groups: RouteGroup[], lastmod: string): SitemapEntry[] {
  return groups.flatMap((group) =>
    group.paths.map((path) => ({
      loc: `${SITE_URL}${path === "/" ? "/" : path}`,
      lastmod,
      changefreq: group.changefreq,
      priority: group.priority,
    })),
  );
}

export function buildUrlsetXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (entry) =>
        `  <url>\n` +
        `    <loc>${escapeXml(entry.loc)}</loc>\n` +
        `    <lastmod>${entry.lastmod}</lastmod>\n` +
        `    <changefreq>${entry.changefreq}</changefreq>\n` +
        `    <priority>${entry.priority.toFixed(1)}</priority>\n` +
        `  </url>`,
    )
    .join("\n");
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>\n`
  );
}

/* ------------------------------------------------------------------ */
/* Image sitemap                                                       */
/* ------------------------------------------------------------------ */

export interface SitemapImage {
  /** Page URL path the image appears on, e.g. "/markets/lake-geneva/geneva-lake" */
  pagePath: string;
  /** ISO 8601 date the page/image was last modified. Defaults to build time. */
  lastmod?: string;
  /** Absolute or site-relative image URL, e.g. "/images/pier-01.jpg" */
  imageUrl: string;
  title: string;
  caption: string;
  geoLocation: string;
}

export function buildImageSitemapXml(
  images: SitemapImage[] = [],
  buildDateIso: string = new Date().toISOString(),
): string {
  const byPage = new Map<string, SitemapImage[]>();
  for (const image of images) {
    const list = byPage.get(image.pagePath) ?? [];
    list.push(image);
    byPage.set(image.pagePath, list);
  }

  const urls = [...byPage.entries()]
    .map(([pagePath, pageImages]) => {
      const imageTags = pageImages
        .map((img) => {
          const loc = img.imageUrl.startsWith("http")
            ? img.imageUrl
            : `${SITE_URL}${img.imageUrl}`;
          return (
            `    <image:image>\n` +
            `      <image:loc>${escapeXml(loc)}</image:loc>\n` +
            `      <image:title>${escapeXml(img.title)}</image:title>\n` +
            `      <image:caption>${escapeXml(img.caption)}</image:caption>\n` +
            `      <image:geo_location>${escapeXml(img.geoLocation)}</image:geo_location>\n` +
            `    </image:image>`
          );
        })
        .join("\n");
      const lastmod = pageImages[0]?.lastmod ?? buildDateIso;
      return (
        `  <url>\n` +
        `    <loc>${escapeXml(`${SITE_URL}${pagePath}`)}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <changefreq>monthly</changefreq>\n` +
        `    <priority>0.7</priority>\n` +
        `${imageTags}\n` +
        `  </url>`
      );
    })
    .join("\n");

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<!-- Image entries are added as project photography is loaded. -->\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    `${urls}\n` +
    `</urlset>\n`
  );
}

/* ------------------------------------------------------------------ */
/* Blog sitemap                                                        */
/* ------------------------------------------------------------------ */

export interface BlogPostForSitemap {
  slug: string;
  /** ISO 8601 date from Sanity `_updatedAt` */
  updatedAt: string;
}

export function buildBlogSitemapXml(posts: BlogPostForSitemap[], buildDateIso: string): string {
  const entries: SitemapEntry[] = [
    {
      loc: `${SITE_URL}/blog`,
      lastmod: buildDateIso,
      changefreq: "weekly",
      priority: 0.5,
    },
    ...posts.map((post) => ({
      loc: `${SITE_URL}/blog/${post.slug}`,
      lastmod: post.updatedAt,
      changefreq: "weekly" as Changefreq,
      priority: 0.5,
    })),
  ];
  return buildUrlsetXml(entries);
}

/* ------------------------------------------------------------------ */
/* Sitemap index + top-level generator                                 */
/* ------------------------------------------------------------------ */

const SITEMAP_FILES = [
  "sitemap-core.xml",
  "sitemap-markets.xml",
  "sitemap-products.xml",
  "sitemap-images.xml",
  "sitemap-blog.xml",
] as const;

export function buildSitemapIndexXml(buildDateIso: string): string {
  const entries = SITEMAP_FILES.map(
    (file) =>
      `  <sitemap>\n    <loc>${SITE_URL}/${file}</loc>\n    <lastmod>${buildDateIso}</lastmod>\n  </sitemap>`,
  ).join("\n");
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${entries}\n` +
    `</sitemapindex>\n`
  );
}

export interface GenerateSitemapsOptions {
  buildDate?: Date;
  blogPosts?: BlogPostForSitemap[];
  images?: SitemapImage[];
}

/** Returns a map of filename → XML content for all six sitemap files. */
export function generateAllSitemaps(options: GenerateSitemapsOptions = {}): Record<string, string> {
  const buildDateIso = (options.buildDate ?? new Date()).toISOString();
  return {
    "sitemap-core.xml": buildUrlsetXml(entriesFromGroups(coreGroups, buildDateIso)),
    "sitemap-markets.xml": buildUrlsetXml(entriesFromGroups(marketGroups, buildDateIso)),
    "sitemap-products.xml": buildUrlsetXml(entriesFromGroups(productGroups, buildDateIso)),
    "sitemap-images.xml": buildImageSitemapXml(options.images ?? [], buildDateIso),
    "sitemap-blog.xml": buildBlogSitemapXml(options.blogPosts ?? [], buildDateIso),
    "sitemap-index.xml": buildSitemapIndexXml(buildDateIso),
  };
}
