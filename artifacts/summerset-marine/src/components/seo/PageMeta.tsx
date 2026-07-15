import { useEffect } from "react";

const SITE_URL: string =
  (import.meta.env.VITE_SITE_URL as string | undefined) ??
  "https://summersetmarine.com";

const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`;

interface PageMetaProps {
  /** Page-specific title, keep under 60 characters. */
  title: string;
  /** Page-specific description, 120–155 characters. */
  description?: string;
  /** Absolute canonical URL. Defaults to SITE_URL + current pathname. */
  canonical?: string;
  /** Page-specific hero image URL for og:image. */
  ogImage?: string;
  /** "website" for most pages, "article" for blog posts. */
  ogType?: "website" | "article";
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function PageMeta({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
}: PageMetaProps) {
  useEffect(() => {
    const canonicalUrl =
      canonical ?? `${SITE_URL}${window.location.pathname}`;
    const imageUrl = ogImage
      ? ogImage.startsWith("http")
        ? ogImage
        : `${SITE_URL}${ogImage}`
      : DEFAULT_OG_IMAGE;

    document.title = title;

    if (description !== undefined) {
      upsertMeta("name", "description", description);
      upsertMeta("property", "og:description", description);
      upsertMeta("name", "twitter:description", description);
    }

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:type", ogType);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);
  }, [title, description, canonical, ogImage, ogType]);

  return null;
}
