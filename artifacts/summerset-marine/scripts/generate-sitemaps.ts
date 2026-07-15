/**
 * Build-time sitemap generation.
 *
 * Writes all six sitemap XML files to public/ so Vite serves them in dev and
 * copies them into dist/ during `vite build`. Blog entries are fetched from
 * Sanity when configured; otherwise the blog sitemap contains only /blog.
 *
 * Run: node scripts/generate-sitemaps.ts   (wired into the build script)
 */

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient, type SanityClient } from "@sanity/client";
import {
  generateAllSitemaps,
  type BlogPostForSitemap,
} from "../src/lib/sitemap.ts";

const outDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
);

const SITE_URL = "https://summersetmarine.com";

function getSanityClient(): SanityClient | null {
  const projectId =
    process.env["VITE_SANITY_PROJECT_ID"] ?? process.env["SANITY_PROJECT_ID"];
  if (!projectId) return null;
  return createClient({
    projectId,
    dataset:
      process.env["VITE_SANITY_DATASET"] ??
      process.env["SANITY_DATASET"] ??
      "production",
    apiVersion: process.env["VITE_SANITY_API_VERSION"] ?? "2024-01-01",
    useCdn: !process.env["SANITY_API_HOST"],
    // Test hook: point at a local mock server (never set in real builds).
    ...(process.env["SANITY_API_HOST"]
      ? { apiHost: process.env["SANITY_API_HOST"], useProjectHostname: false }
      : {}),
  });
}

async function fetchBlogPosts(): Promise<BlogPostForSitemap[]> {
  const client = getSanityClient();
  if (!client) {
    console.log("sitemaps: Sanity not configured — blog sitemap will contain only /blog");
    return [];
  }
  try {
    const posts = await client.fetch<BlogPostForSitemap[]>(
      `*[_type == "blogPost" && published == true && defined(slug.current) && !(_id in path("drafts.**"))]{
        "slug": slug.current,
        "updatedAt": coalesce(_updatedAt, _createdAt)
      }`,
    );
    console.log(`sitemaps: fetched ${posts.length} blog posts from Sanity`);
    return posts;
  } catch (err) {
    console.error("sitemaps: failed to fetch blog posts from Sanity", err);
    return [];
  }
}

/* ------------------------------------------------------------------ */
/* Static blog HTML generation (crawler-readable SSG-lite)             */
/* ------------------------------------------------------------------ */

// Queries duplicated from src/lib/sanity.ts — that module reads
// import.meta.env at top level and cannot be imported under plain Node.
const ALL_BLOG_SLUGS_QUERY = `
  *[_type == "blogPost" && published == true] { "slug": slug.current }
`;
const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && published == true && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    _updatedAt,
    body,
    market,
    lake,
    "featuredImageUrl": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    metaTitle,
    metaDescription,
    author
  }
`;

interface PortableTextSpan {
  _type: string;
  text?: string;
  marks?: string[];
}

interface PortableTextBlock {
  _type: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: PortableTextSpan[];
  markDefs?: { _key: string; _type: string; href?: string }[];
  asset?: { _ref?: string; url?: string };
  alt?: string;
}

interface BlogPostFull {
  title: string;
  slug: { current: string };
  publishedAt?: string;
  _updatedAt?: string;
  body?: PortableTextBlock[];
  featuredImageUrl?: string;
  featuredImageAlt?: string;
  metaTitle?: string;
  metaDescription?: string;
  author?: string;
  excerpt?: string;
}

/** Mirrors safeJsonLdStringify in src/components/seo/JsonLd.tsx. */
function safeJsonLdStringify(data: Record<string, unknown>): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

const SAFE_LINK_PROTOCOLS = ["http:", "https:", "mailto:", "tel:"];

/** Allow only http(s)/mailto/tel absolute URLs or site-relative paths. */
function safeHref(href: string): string | null {
  if (href.startsWith("/") || href.startsWith("#")) return href;
  try {
    const url = new URL(href);
    return SAFE_LINK_PROTOCOLS.includes(url.protocol) ? href : null;
  } catch {
    return null;
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderSpans(block: PortableTextBlock): string {
  const markDefs = block.markDefs ?? [];
  return (block.children ?? [])
    .map((child) => {
      if (child._type !== "span" || typeof child.text !== "string") return "";
      let html = escapeHtml(child.text);
      for (const mark of child.marks ?? []) {
        if (mark === "strong") html = `<strong>${html}</strong>`;
        else if (mark === "em") html = `<em>${html}</em>`;
        else if (mark === "underline") html = `<u>${html}</u>`;
        else if (mark === "code") html = `<code>${html}</code>`;
        else {
          const def = markDefs.find((d) => d._key === mark);
          if (def?._type === "link" && def.href) {
            const href = safeHref(def.href);
            if (href) html = `<a href="${escapeHtml(href)}">${html}</a>`;
          }
        }
      }
      return html;
    })
    .join("");
}

/** Minimal Portable Text → HTML serializer for crawler-facing static pages. */
function portableTextToHtml(blocks: PortableTextBlock[] | undefined): string {
  if (!Array.isArray(blocks)) return "";
  const out: string[] = [];
  let openList: "ul" | "ol" | null = null;

  const closeList = () => {
    if (openList) {
      out.push(`</${openList}>`);
      openList = null;
    }
  };

  for (const block of blocks) {
    if (block._type === "image") {
      closeList();
      const url =
        block.asset?.url ??
        (block.asset?._ref ? sanityImageUrlFromRef(block.asset._ref) : null);
      if (url) {
        out.push(
          `<img src="${escapeHtml(url)}" alt="${escapeHtml(block.alt ?? "")}" />`,
        );
      }
      continue;
    }
    if (block._type !== "block") continue;

    if (block.listItem) {
      const tag = block.listItem === "number" ? "ol" : "ul";
      if (openList !== tag) {
        closeList();
        out.push(`<${tag}>`);
        openList = tag;
      }
      out.push(`<li>${renderSpans(block)}</li>`);
      continue;
    }
    closeList();

    const inner = renderSpans(block);
    switch (block.style) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        out.push(`<${block.style}>${inner}</${block.style}>`);
        break;
      case "blockquote":
        out.push(`<blockquote>${inner}</blockquote>`);
        break;
      default:
        out.push(`<p>${inner}</p>`);
    }
  }
  closeList();
  return out.join("\n");
}

/** Builds a Sanity CDN image URL from an asset _ref like image-abc123-800x600-jpg. */
function sanityImageUrlFromRef(ref: string): string | null {
  const projectId =
    process.env["VITE_SANITY_PROJECT_ID"] ?? process.env["SANITY_PROJECT_ID"];
  const dataset =
    process.env["VITE_SANITY_DATASET"] ??
    process.env["SANITY_DATASET"] ??
    "production";
  const match = /^image-([a-zA-Z0-9]+)-(\d+x\d+)-(\w+)$/.exec(ref);
  if (!match || !projectId) return null;
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${match[1]}-${match[2]}.${match[3]}`;
}

function buildBlogPostHtml(post: BlogPostFull, slug: string): string {
  const canonical = `${SITE_URL}/blog/${slug}`;
  const title =
    post.metaTitle ?? `${post.title} | Summerset Marine Construction`;
  const description =
    post.metaDescription ??
    post.excerpt ??
    "Insights on permanent piers, boat lifts, and Wisconsin waterfront living from Summerset Marine Construction.";

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author ?? "Summerset Marine Construction",
    },
    publisher: {
      "@type": "Organization",
      name: "Summerset Marine Construction",
      url: SITE_URL,
    },
    url: canonical,
  };
  if (post.featuredImageUrl) articleSchema["image"] = post.featuredImageUrl;

  const bodyHtml = portableTextToHtml(post.body);
  const featuredImg = post.featuredImageUrl
    ? `<img src="${escapeHtml(post.featuredImageUrl)}" alt="${escapeHtml(post.featuredImageAlt ?? post.title)}" />\n      `
    : "";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:site_name" content="Summerset Marine Construction" />${
      post.featuredImageUrl
        ? `\n    <meta property="og:image" content="${escapeHtml(post.featuredImageUrl)}" />`
        : ""
    }
    <script type="application/ld+json">${safeJsonLdStringify(articleSchema)}</script>
  </head>
  <body>
    <div id="root">
      <article>
        <h1>${escapeHtml(post.title)}</h1>
        ${featuredImg}${bodyHtml}
      </article>
    </div>
    <script>
      // Bootstrap the React SPA for human visitors: fetch the app shell and
      // inject its (hash-versioned) module scripts and stylesheets. Crawlers
      // that don't run JS still get the full static article above.
      (async () => {
        try {
          // Derive the app-shell URL from this page's own path so the
          // bootstrap also works when the site is served under a base path.
          const base = window.location.pathname.replace(/blog\\/.*$/, "");
          const res = await fetch(base || "/", {
            headers: { Accept: "text/html" },
          });
          if (!res.ok) return;
          const doc = new DOMParser().parseFromString(
            await res.text(),
            "text/html",
          );
          doc
            .querySelectorAll(
              'link[rel="stylesheet"], link[rel="modulepreload"]',
            )
            .forEach((el) => document.head.appendChild(document.importNode(el, true)));
          doc.querySelectorAll('script[type="module"]').forEach((el) => {
            const s = document.createElement("script");
            s.type = "module";
            if (el.getAttribute("src")) s.src = el.getAttribute("src");
            else s.textContent = el.textContent;
            document.body.appendChild(s);
          });
        } catch {
          /* static content remains readable */
        }
      })();
    </script>
  </body>
</html>
`;
}

async function generateBlogHTML(): Promise<void> {
  const client = getSanityClient();
  if (!client) {
    console.warn(
      "blog-html: VITE_SANITY_PROJECT_ID not set — skipping static blog HTML generation",
    );
    return;
  }
  try {
    const slugs = await client.fetch<{ slug: string }[]>(ALL_BLOG_SLUGS_QUERY);
    console.log(`blog-html: generating static HTML for ${slugs.length} posts`);
    for (const { slug } of slugs) {
      if (!slug) continue;
      const post = await client.fetch<BlogPostFull | null>(
        BLOG_POST_BY_SLUG_QUERY,
        { slug },
      );
      if (!post) continue;
      const dir = path.join(outDir, "blog", slug);
      mkdirSync(dir, { recursive: true });
      writeFileSync(
        path.join(dir, "index.html"),
        buildBlogPostHtml(post, slug),
        "utf8",
      );
      console.log(`blog-html: wrote public/blog/${slug}/index.html`);
    }
  } catch (err) {
    console.error("blog-html: generation failed (build continues)", err);
  }
}

async function main() {
  const blogPosts = await fetchBlogPosts();
  const files = generateAllSitemaps({ buildDate: new Date(), blogPosts });

  mkdirSync(outDir, { recursive: true });
  for (const [filename, xml] of Object.entries(files)) {
    writeFileSync(path.join(outDir, filename), xml, "utf8");
    console.log(`sitemaps: wrote public/${filename}`);
  }

  await generateBlogHTML();
}

main().catch((err) => {
  console.error("sitemaps: generation failed", err);
  process.exit(1);
});
