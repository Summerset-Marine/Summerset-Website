import { useEffect } from "react";

const SITE_URL: string =
  (import.meta.env.VITE_SITE_URL as string | undefined) ??
  "https://summersetmarine.com";

interface PageMetaProps {
  title: string;
  description?: string;
  canonicalPath?: string;
}

function upsertMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function PageMeta({ title, description, canonicalPath }: PageMetaProps) {
  useEffect(() => {
    document.title = title;
    if (description !== undefined) {
      upsertMeta("description", description);
    }
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    const path = canonicalPath ?? window.location.pathname;
    link.setAttribute("href", `${SITE_URL}${path}`);
  }, [title, description, canonicalPath]);

  return null;
}
