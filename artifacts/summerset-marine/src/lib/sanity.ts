import { createClient, type SanityClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset =
  (import.meta.env.VITE_SANITY_DATASET as string | undefined) ?? "production";
const apiVersion =
  (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) ??
  "2024-01-01";

export const isSanityConfigured = Boolean(projectId);

/**
 * CDN-backed client — fast global delivery. Used for build-time / infrequently
 * changing content.
 */
export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

function requireClient(client: SanityClient | null): SanityClient {
  if (!client) {
    throw new Error(
      "Sanity is not configured. Set VITE_SANITY_PROJECT_ID to enable CMS content.",
    );
  }
  return client;
}

/** Build-time / static fetch — goes through the Sanity CDN. */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return requireClient(sanityClient).fetch<T>(query, params);
}

/**
 * Live fetch (client-side) — bypasses the CDN for always-fresh data. Used for
 * the blog index, gallery pages, and other frequently updated content.
 */
export async function sanityLiveFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  if (!projectId) {
    throw new Error(
      "Sanity is not configured. Set VITE_SANITY_PROJECT_ID to enable CMS content.",
    );
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
  }).fetch<T>(query, params);
}

/* ------------------------------------------------------------------ */
/* GROQ queries                                                        */
/* ------------------------------------------------------------------ */

/** Blog posts — all published, ordered newest first. */
export const ALL_BLOG_POSTS_QUERY = `
  *[_type == "blogPost" && published == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    _updatedAt,
    excerpt,
    market,
    lake,
    productType,
    "featuredImageUrl": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    metaTitle,
    metaDescription
  }
`;

/** Single blog post by slug. Params: { slug } */
export const BLOG_POST_BY_SLUG_QUERY = `
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

/** All blog post slugs (for SSG route generation). */
export const ALL_BLOG_SLUGS_QUERY = `
  *[_type == "blogPost" && published == true] { "slug": slug.current }
`;

/** Body of water page by lake slug. Params: { lakeSlug } */
export const LAKE_PAGE_QUERY = `
  *[_type == "lakePageContent" && lakeSlug == $lakeSlug][0] {
    lakeName,
    lakeSlug,
    market,
    historyText,
    lakeCharacteristics,
    metaTitle,
    metaDescription,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    "projects": projects[] {
      title,
      productType,
      installYear,
      caption,
      "beforeImageUrl": beforeImage.asset->url,
      "afterImageUrl": afterImage.asset->url,
      "afterImageAlt": afterImage.alt
    },
    "testimonials": testimonials[] {
      quote,
      customerName,
      lakeLabel
    }
  }
`;

/** Market landing page content by market slug. Params: { marketSlug } */
export const MARKET_PAGE_QUERY = `
  *[_type == "marketPage" && marketSlug == $marketSlug][0] {
    marketName,
    marketSlug,
    introText,
    metaTitle,
    metaDescription,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    "featuredProjects": featuredProjects[] {
      title,
      lake,
      productType,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }
  }
`;

/** FAQ entries — all, ordered by category. */
export const FAQ_QUERY = `
  *[_type == "faqEntry"] | order(category asc) {
    _id,
    question,
    answer,
    category
  }
`;

/** All projects for a given market (gallery pages). Params: { market } */
export const MARKET_PROJECTS_QUERY = `
  *[_type == "project" && market == $market] | order(installYear desc) {
    _id,
    title,
    lake,
    productType,
    installYear,
    caption,
    "afterImageUrl": afterImage.asset->url,
    "afterImageAlt": afterImage.alt
  }
`;

/** All testimonials for a given market. Params: { market } */
export const MARKET_TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && market == $market] {
    _id,
    quote,
    customerName,
    "lakeSlug": lake,
    lakeLabel,
    productType,
    starRating
  }
`;

/** Lift Media documents by NetSuite item ID (joined with NetSuite inventory). */
export const LIFT_MEDIA_QUERY = `
  *[_type == "liftMedia"] {
    netsuiteItemId,
    "photos": photos[] {
      "url": asset->url,
      "alt": alt
    },
    notes,
    "marketplaceLinks": marketplaceLinks[] {
      platform,
      url
    }
  }
`;

/** Team members for About page. */
export const TEAM_QUERY = `
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    title,
    bio,
    "photoUrl": photo.asset->url,
    "photoAlt": photo.alt
  }
`;
