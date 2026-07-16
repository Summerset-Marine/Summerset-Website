import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { serviceSchema } from "@/components/seo/JsonLd";
import CTABlock from "@/components/ui/CTABlock";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import {
  isSanityConfigured,
  sanityFetch,
  MARKET_TESTIMONIALS_QUERY,
} from "@/lib/sanity";

interface Testimonial {
  _id: string;
  quote: string;
  customerName?: string;
  lakeLabel?: string;
  starRating?: number;
}

function Stars({ rating }: { rating: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div aria-label={`${filled} out of 5 stars`} className="text-brand-red">
      {"★".repeat(filled)}
      <span className="text-brand-border">{"★".repeat(5 - filled)}</span>
    </div>
  );
}

export default function LakeGenevaTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (!isSanityConfigured) return;
    sanityFetch<Testimonial[]>(MARKET_TESTIMONIALS_QUERY, { market: "lake-geneva" })
      .then((data) => setTestimonials(data ?? []))
      .catch(() => setTestimonials([]));
  }, []);

  return (
    <Layout>
      <PageMeta
        title="Customer Reviews — Lake Geneva, WI | Summerset Marine"
        description="Read testimonials from Geneva Lake homeowners who chose Summerset Marine Construction for their permanent pier and boat lift installations."
        canonical="https://summersetmarine.com/markets/lake-geneva/testimonials"
      />
      <JsonLd
        data={serviceSchema({
          name: "Permanent Pier & Boat Lift Installation",
          market: "Lake Geneva",
          marketSlug: "lake-geneva",
          lake: "Geneva Lake",
        })}
      />

      {/* 1. Header */}
      <section className="bg-brand-offwhite text-brand-black border-b border-brand-hairline">
        <div className="mx-auto max-w-content px-6 py-16">
          <h1 className="font-serif text-4xl md:text-5xl">
            What Geneva Lake Homeowners Say
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-brand-black/70">
            Hear from waterfront property owners across the Lake Geneva market who trusted
            Summerset Marine with their piers and lifts.
          </p>
        </div>
      </section>

      {/* 2–4. Testimonial grid */}
      <section className="mx-auto max-w-content px-6 py-16">
        {testimonials.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote
                key={t._id}
                className="flex flex-col border border-brand-hairline bg-white p-8"
              >
                {typeof t.starRating === "number" ? <Stars rating={t.starRating} /> : null}
                <p className="mt-3 font-serif text-2xl leading-relaxed text-brand-navy">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-5 text-sm text-brand-gray">
                  {t.customerName ? (
                    <span className="font-medium text-brand-navy">{t.customerName}</span>
                  ) : null}
                  {t.customerName && t.lakeLabel ? " — " : null}
                  {t.lakeLabel ?? null}
                </footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <div>
            <div className="grid gap-8 md:grid-cols-2">
              {[0, 1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="flex h-52 items-center justify-center border border-brand-hairline bg-brand-offwhite"
                >
                  <span className="text-sm font-medium uppercase tracking-wide text-brand-gray">
                    Testimonials Coming Soon
                  </span>
                </div>
              ))}
            </div>
            <ContentPlaceholder
              label="Geneva Lake customer testimonials — quotes, names, lake labels, star ratings (from Sanity)"
              className="mt-8"
            />
          </div>
        )}
      </section>

      {/* 5. CTA */}
      <CTABlock
        variant="dark"
        headline="Ready to join them?"
        subheadline="Request a consultation and see why Geneva Lake homeowners choose Summerset Marine."
        primaryCta={{
          label: "Request a Lake Geneva Consultation",
          href: "/markets/lake-geneva/contact",
        }}
      />
    </Layout>
  );
}
