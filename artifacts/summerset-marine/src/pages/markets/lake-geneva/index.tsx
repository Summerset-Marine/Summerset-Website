import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { localBusinessSchema, serviceSchema } from "@/components/seo/JsonLd";
import HeroSection from "@/components/ui/HeroSection";
import CTABlock from "@/components/ui/CTABlock";
import Button from "@/components/ui/Button";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import {
  isSanityConfigured,
  sanityFetch,
  MARKET_PAGE_QUERY,
  MARKET_TESTIMONIALS_QUERY,
} from "@/lib/sanity";

interface FeaturedProject {
  title: string;
  lake?: string;
  productType?: string;
  imageUrl?: string;
  imageAlt?: string;
}

interface MarketPageContent {
  marketName: string;
  introText?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  featuredProjects?: FeaturedProject[] | null;
}

interface Testimonial {
  _id: string;
  quote: string;
  customerName?: string;
  lakeLabel?: string;
}

export default function LakeGenevaPage() {
  const [content, setContent] = useState<MarketPageContent | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (!isSanityConfigured) return;
    sanityFetch<MarketPageContent | null>(MARKET_PAGE_QUERY, { marketSlug: "lake-geneva" })
      .then((data) => setContent(data))
      .catch(() => setContent(null));
    sanityFetch<Testimonial[]>(MARKET_TESTIMONIALS_QUERY, { market: "lake-geneva" })
      .then((data) => setTestimonials(data ?? []))
      .catch(() => setTestimonials([]));
  }, []);

  const projects = content?.featuredProjects ?? [];

  return (
    <Layout>
      <PageMeta
        title="Pier & Boat Lift Installation — Lake Geneva, WI | Summerset Marine"
        description="Summerset Marine Construction builds luxury permanent piers and boat lifts on Geneva Lake. Wisconsin's premier waterfront contractor serving the Lake Geneva market since 1990."
        canonical="https://summersetmarine.com/markets/lake-geneva"
      />
      <JsonLd
        data={localBusinessSchema({
          market: "Lake Geneva",
          marketSlug: "lake-geneva",
          lake: "Geneva Lake",
          coordinates: { latitude: "42.5920", longitude: "-88.4343" },
        })}
      />
      <JsonLd
        data={serviceSchema({
          name: "Permanent Pier & Boat Lift Installation",
          market: "Lake Geneva",
          marketSlug: "lake-geneva",
          lake: "Geneva Lake",
        })}
      />

      {/* 1. Hero */}
      {content?.heroImageUrl ? (
        <HeroSection
          variant="full-bleed"
          headline="Wisconsin's Premier Pier Builder on Geneva Lake"
          subheadline={content.introText ?? undefined}
          primaryCta={{
            label: "Request a Lake Geneva Consultation",
            href: "/markets/lake-geneva/contact",
          }}
          imageSrc={content.heroImageUrl}
          imageAlt={content.heroImageAlt ?? "Permanent pier on Geneva Lake"}
        />
      ) : (
        <section className="bg-brand-navy text-white">
          <div className="mx-auto max-w-content px-6 py-20">
            <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
              Wisconsin&rsquo;s Premier Pier Builder on Geneva Lake
            </h1>
            <ContentPlaceholder
              label="Lake Geneva market hero subheadline"
              className="mt-6 max-w-2xl"
            />
            <div className="mt-8">
              <Button href="/markets/lake-geneva/contact" variant="primary" size="large">
                Request a Lake Geneva Consultation
              </Button>
            </div>
            <ContentPlaceholder label="Lake Geneva market hero image" className="mt-10" />
          </div>
        </section>
      )}

      {/* 2. SMC presence */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">
          Summerset Marine in the Lake Geneva Market
        </h2>
        {content?.introText ? (
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-brand-gray">
            {content.introText}
          </p>
        ) : (
          <ContentPlaceholder
            label="Lake Geneva market intro — SMC presence, history, and installed base in the market"
            className="mt-6"
          />
        )}
      </section>

      {/* 3. Body of water cards */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl text-brand-navy">Bodies of Water We Serve</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Link
              href="/markets/lake-geneva/geneva-lake"
              className="group block rounded-lg border border-brand-border bg-white p-8 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-serif text-2xl text-brand-navy group-hover:text-brand-blue">
                Geneva Lake
              </h3>
              <p className="mt-3 text-brand-gray">
                Average Depth: 61 Feet &middot; Square Acres: 5,401
              </p>
              <p className="mt-3 text-brand-gray">
                Deep water, heavy ice, and premium shoreline &mdash; Geneva Lake demands permanent
                pier systems engineered to last. See how Summerset Marine builds here.
              </p>
              <span className="mt-5 inline-block font-medium text-brand-red">
                Explore Geneva Lake &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Featured projects */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">Featured Lake Geneva Projects</h2>
        {projects.length > 0 ? (
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.title}
                className="overflow-hidden rounded-lg border border-brand-border bg-white shadow-sm"
              >
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt ?? project.title}
                    className="h-56 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center bg-brand-offwhite text-sm text-brand-gray">
                    Photo Coming Soon
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-serif text-xl text-brand-navy">{project.title}</h3>
                  <p className="mt-1 text-sm text-brand-gray">
                    {[project.lake, project.productType].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ContentPlaceholder
            label="Featured Lake Geneva project photos and captions (from Sanity projects)"
            className="mt-8"
          />
        )}
        <div className="mt-8">
          <Button href="/markets/lake-geneva/projects" variant="secondary">
            View All Lake Geneva Projects
          </Button>
        </div>
      </section>

      {/* 5. Testimonials strip */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl text-brand-navy">
            What Lake Geneva Homeowners Say
          </h2>
          {testimonials.length > 0 ? (
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {testimonials.slice(0, 2).map((t) => (
                <blockquote
                  key={t._id}
                  className="rounded-lg border border-brand-border bg-white p-8 shadow-sm"
                >
                  <p className="font-serif text-xl leading-relaxed text-brand-navy">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-4 text-sm text-brand-gray">
                    {[t.customerName, t.lakeLabel].filter(Boolean).join(" — ")}
                  </footer>
                </blockquote>
              ))}
            </div>
          ) : (
            <ContentPlaceholder
              label="Lake Geneva customer testimonials (from Sanity testimonials)"
              className="mt-8"
            />
          )}
          <div className="mt-8">
            <Button href="/markets/lake-geneva/testimonials" variant="secondary">
              Read All Testimonials
            </Button>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <CTABlock
        variant="dark"
        headline="Ready to build on Geneva Lake?"
        subheadline="Request a consultation and our Lake Geneva team will walk your shoreline with you."
        primaryCta={{
          label: "Request a Lake Geneva Consultation",
          href: "/markets/lake-geneva/contact",
        }}
      />
    </Layout>
  );
}
