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

export default function GreenLakeTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (!isSanityConfigured) return;
    sanityFetch<Testimonial[]>(MARKET_TESTIMONIALS_QUERY, { market: "green-lake" })
      .then((data) => setTestimonials(data ?? []))
      .catch(() => setTestimonials([]));
  }, []);

  return (
    <Layout>
      <PageMeta
        title="Customer Reviews — Green Lake, WI | Summerset Marine Construction"
        description="Read testimonials from Green Lake customers who chose Summerset Marine Construction for their permanent pier and boat lift installations."
        canonical="https://summersetmarine.com/markets/green-lake/testimonials"
      />
      <JsonLd
        data={serviceSchema({
          name: "Permanent Pier & Boat Lift Installation",
          market: "Green Lake",
          marketSlug: "green-lake",
          lake: "Green Lake",
        })}
      />

      {/* 1. Header */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h1 className="font-serif text-4xl md:text-5xl">
            What Green Lake Homeowners Say
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Hear from waterfront property owners across the Green Lake market who trusted
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
                className="flex flex-col rounded-lg border border-brand-border bg-white p-8 shadow-sm"
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
                  className="flex h-52 items-center justify-center rounded-lg border border-brand-border bg-brand-gray-light"
                >
                  <span className="text-sm font-medium uppercase tracking-wide text-brand-gray">
                    Testimonials Coming Soon
                  </span>
                </div>
              ))}
            </div>
            <ContentPlaceholder
              label="Green Lake customer testimonials — quotes, names, lake labels, star ratings (from Sanity)"
              className="mt-8"
            />
          </div>
        )}
      </section>

      {/* 5. CTA */}
      <CTABlock
        variant="dark"
        headline="Ready to join them?"
        subheadline="Request a consultation and see why Green Lake customers choose Summerset Marine."
        primaryCta={{
          label: "Request a Green Lake Consultation",
          href: "/markets/green-lake/contact",
        }}
      />
    </Layout>
  );
}
