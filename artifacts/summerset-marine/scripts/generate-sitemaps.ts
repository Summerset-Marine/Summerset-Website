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
import { createClient } from "@sanity/client";
import {
  generateAllSitemaps,
  type BlogPostForSitemap,
} from "../src/lib/sitemap.ts";

const outDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
);

async function fetchBlogPosts(): Promise<BlogPostForSitemap[]> {
  const projectId =
    process.env["VITE_SANITY_PROJECT_ID"] ?? process.env["SANITY_PROJECT_ID"];
  if (!projectId) {
    console.log("sitemaps: Sanity not configured — blog sitemap will contain only /blog");
    return [];
  }
  try {
    const client = createClient({
      projectId,
      dataset:
        process.env["VITE_SANITY_DATASET"] ??
        process.env["SANITY_DATASET"] ??
        "production",
      apiVersion: process.env["VITE_SANITY_API_VERSION"] ?? "2024-01-01",
      useCdn: true,
    });
    const posts = await client.fetch<BlogPostForSitemap[]>(
      `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{
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

async function main() {
  const blogPosts = await fetchBlogPosts();
  const files = generateAllSitemaps({ buildDate: new Date(), blogPosts });

  mkdirSync(outDir, { recursive: true });
  for (const [filename, xml] of Object.entries(files)) {
    writeFileSync(path.join(outDir, filename), xml, "utf8");
    console.log(`sitemaps: wrote public/${filename}`);
  }
}

main().catch((err) => {
  console.error("sitemaps: generation failed", err);
  process.exit(1);
});
