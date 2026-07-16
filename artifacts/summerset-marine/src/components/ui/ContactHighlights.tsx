import { useEffect, useState } from "react";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import {
  isSanityConfigured,
  sanityFetch,
  MARKET_PROJECTS_QUERY,
  MARKET_TESTIMONIALS_QUERY,
} from "@/lib/sanity";

interface FeaturedProject {
  _id: string;
  title?: string;
  productType?: string;
  installYear?: number;
  afterImageUrl?: string;
  afterImageAlt?: string;
}

interface Testimonial {
  _id: string;
  quote?: string;
  customerName?: string;
  lakeLabel?: string;
}

interface ContactHighlightsProps {
  /** Sanity market slug, e.g. "lake-geneva" */
  market: string;
  /** Human-readable market label, e.g. "Lake Geneva" */
  marketLabel: string;
}

/**
 * Sidebar highlights for market contact pages: one featured project photo and
 * one customer testimonial pulled from Sanity, with placeholder fallbacks.
 */
export default function ContactHighlights({
  market,
  marketLabel,
}: ContactHighlightsProps) {
  const [project, setProject] = useState<FeaturedProject | null>(null);
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isSanityConfigured) {
      setLoaded(true);
      return;
    }
    let cancelled = false;
    Promise.all([
      sanityFetch<FeaturedProject[]>(MARKET_PROJECTS_QUERY, { market }).catch(
        () => [] as FeaturedProject[],
      ),
      sanityFetch<Testimonial[]>(MARKET_TESTIMONIALS_QUERY, { market }).catch(
        () => [] as Testimonial[],
      ),
    ]).then(([projects, testimonials]) => {
      if (cancelled) return;
      setProject(projects.find((p) => p.afterImageUrl) ?? null);
      setTestimonial(testimonials.find((t) => t.quote) ?? null);
      setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [market]);

  if (!loaded) return null;

  return (
    <>
      {project?.afterImageUrl ? (
        <figure className="overflow-hidden rounded-lg border border-brand-border bg-white shadow-sm">
          <img
            src={project.afterImageUrl}
            alt={project.afterImageAlt ?? project.title ?? `${marketLabel} project`}
            className="h-64 w-full object-cover"
            loading="lazy"
          />
          <figcaption className="p-4 text-sm text-brand-gray">
            {[project.title, project.productType, project.installYear]
              .filter(Boolean)
              .join(" · ")}
          </figcaption>
        </figure>
      ) : (
        <ContentPlaceholder label={`featured ${marketLabel} project photo`} />
      )}
      {testimonial?.quote ? (
        <blockquote className="rounded-lg border border-brand-border bg-white p-8 shadow-sm">
          <p className="font-serif text-xl leading-relaxed text-brand-navy">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <footer className="mt-4 text-sm text-brand-gray">
            {[testimonial.customerName, testimonial.lakeLabel]
              .filter(Boolean)
              .join(" — ")}
          </footer>
        </blockquote>
      ) : (
        <ContentPlaceholder
          label={`a single ${marketLabel} customer testimonial`}
        />
      )}
    </>
  );
}
