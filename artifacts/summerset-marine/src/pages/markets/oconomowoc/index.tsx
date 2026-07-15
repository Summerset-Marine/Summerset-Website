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

export default function OconomowocPage() {
  const [content, setContent] = useState<MarketPageContent | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (!isSanityConfigured) return;
    sanityFetch<MarketPageContent | null>(MARKET_PAGE_QUERY, { marketSlug: "oconomowoc" })
      .then((data) => setContent(data))
      .catch(() => setContent(null));
    sanityFetch<Testimonial[]>(MARKET_TESTIMONIALS_QUERY, { market: "oconomowoc" })
      .then((data) => setTestimonials(data ?? []))
      .catch(() => setTestimonials([]));
  }, []);

  const projects = content?.featuredProjects ?? [];

  return (
    <Layout>
      <PageMeta
        title="Pier & Boat Lift Installation — Oconomowoc / Lake Country, WI | Summerset Marine"
        description="Summerset Marine Construction builds luxury permanent piers and boat lifts across Lake Country — Okauchee Lake, Lac La Belle, Nagawicka Lake, and Beaver Lake. Wisconsin's premier waterfront contractor."
        canonical="https://summersetmarine.com/markets/oconomowoc"
      />
      <JsonLd
        data={localBusinessSchema({
          market: "Oconomowoc / Lake Country",
          marketSlug: "oconomowoc",
          lake: "Okauchee, Nagawicka, Lac La Belle & Beaver Lake",
          coordinates: { latitude: "43.1053", longitude: "-88.4990" },
        })}
      />
      <JsonLd
        data={serviceSchema({
          name: "Permanent Pier & Boat Lift Installation",
          market: "Oconomowoc / Lake Country",
          marketSlug: "oconomowoc",
          lake: "Okauchee, Nagawicka, Lac La Belle & Beaver Lake",
        })}
      />

      {/* 1. Hero */}
      {content?.heroImageUrl ? (
        <HeroSection
          variant="full-bleed"
          headline="Wisconsin's Premier Pier Builder on Okauchee, Nagawicka & Lac La Belle"
          subheadline={content.introText ?? undefined}
          primaryCta={{
            label: "Request an Oconomowoc / Lake Country Consultation",
            href: "/markets/oconomowoc/contact",
          }}
          imageSrc={content.heroImageUrl}
          imageAlt={content.heroImageAlt ?? "Permanent pier — Oconomowoc / Lake Country"}
        />
      ) : (
        <section className="bg-brand-navy text-white">
          <div className="mx-auto max-w-content px-6 py-20">
            <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
              Wisconsin&rsquo;s Premier Pier Builder on Okauchee, Nagawicka &amp; Lac La Belle
            </h1>
            <ContentPlaceholder
              label="Oconomowoc / Lake Country market hero subheadline"
              className="mt-6 max-w-2xl"
            />
            <div className="mt-8">
              <Button href="/markets/oconomowoc/contact" variant="primary" size="large">
                Request an Oconomowoc / Lake Country Consultation
              </Button>
            </div>
            <ContentPlaceholder label="Oconomowoc / Lake Country market hero image" className="mt-10" />
          </div>
        </section>
      )}

      {/* 2. SMC presence */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">
          Summerset Marine in the Oconomowoc / Lake Country Market
        </h2>
        {content?.introText ? (
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-brand-gray">
            {content.introText}
          </p>
        ) : (
          <ContentPlaceholder
            label="Oconomowoc / Lake Country market intro — SMC presence, history, and installed base in the market"
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
              href="/markets/oconomowoc/okauchee-lake"
              className="group block rounded-lg border border-brand-border bg-white p-8 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-serif text-2xl text-brand-navy group-hover:text-brand-blue">
                Okauchee Lake
              </h3>
              <p className="mt-3 text-brand-gray">Permanent piers, lifts, and waterfront systems built for Okauchee Lake.</p>
              <span className="mt-5 inline-block font-medium text-brand-red">
                Explore Okauchee Lake &rarr;
              </span>
            </Link>
            <Link
              href="/markets/oconomowoc/lac-la-belle"
              className="group block rounded-lg border border-brand-border bg-white p-8 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-serif text-2xl text-brand-navy group-hover:text-brand-blue">
                Lac La Belle
              </h3>
              <p className="mt-3 text-brand-gray">Permanent piers, lifts, and waterfront systems built for Lac La Belle.</p>
              <span className="mt-5 inline-block font-medium text-brand-red">
                Explore Lac La Belle &rarr;
              </span>
            </Link>
            <Link
              href="/markets/oconomowoc/nagawicka-lake"
              className="group block rounded-lg border border-brand-border bg-white p-8 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-serif text-2xl text-brand-navy group-hover:text-brand-blue">
                Nagawicka Lake
              </h3>
              <p className="mt-3 text-brand-gray">Permanent piers, lifts, and waterfront systems built for Nagawicka Lake.</p>
              <span className="mt-5 inline-block font-medium text-brand-red">
                Explore Nagawicka Lake &rarr;
              </span>
            </Link>
            <Link
              href="/markets/oconomowoc/beaver-lake"
              className="group block rounded-lg border border-brand-border bg-white p-8 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-serif text-2xl text-brand-navy group-hover:text-brand-blue">
                Beaver Lake
              </h3>
              <p className="mt-3 text-brand-gray">Average Depth: 15 Feet</p>
              <span className="mt-5 inline-block font-medium text-brand-red">
                Explore Beaver Lake &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Featured projects */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">Featured Oconomowoc / Lake Country Projects</h2>
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
            label="Featured Oconomowoc / Lake Country project photos and captions (from Sanity projects)"
            className="mt-8"
          />
        )}
        <div className="mt-8">
          <Button href="/markets/oconomowoc/projects" variant="secondary">
            View All Oconomowoc / Lake Country Projects
          </Button>
        </div>
      </section>

      {/* 5. Testimonials strip */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl text-brand-navy">
            What Lake Country Homeowners Say
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
              label="Oconomowoc / Lake Country customer testimonials (from Sanity testimonials)"
              className="mt-8"
            />
          )}
          <div className="mt-8">
            <Button href="/markets/oconomowoc/testimonials" variant="ghost">
              Read All Testimonials
            </Button>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <CTABlock
        variant="dark"
        headline="Ready to build in Oconomowoc / Lake Country?"
        subheadline="Request a consultation and our Oconomowoc / Lake Country team will walk your shoreline with you."
        primaryCta={{
          label: "Request an Oconomowoc / Lake Country Consultation",
          href: "/markets/oconomowoc/contact",
        }}
      />
    </Layout>
  );
}
