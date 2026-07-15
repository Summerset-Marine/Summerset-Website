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

export default function DoorCountyPage() {
  const [content, setContent] = useState<MarketPageContent | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (!isSanityConfigured) return;
    sanityFetch<MarketPageContent | null>(MARKET_PAGE_QUERY, { marketSlug: "door-county" })
      .then((data) => setContent(data))
      .catch(() => setContent(null));
    sanityFetch<Testimonial[]>(MARKET_TESTIMONIALS_QUERY, { market: "door-county" })
      .then((data) => setTestimonials(data ?? []))
      .catch(() => setTestimonials([]));
  }, []);

  const projects = content?.featuredProjects ?? [];

  return (
    <Layout>
      <PageMeta
        title="Pier & Boat Lift Installation — Door County, WI | Summerset Marine"
        description="Summerset Marine Construction builds permanent piers, boat lifts, and marine contracting systems across Door County — Green Bay, Sturgeon Bay, and Lake Michigan shorelines."
        canonical="https://summersetmarine.com/markets/door-county"
      />
      <JsonLd
        data={localBusinessSchema({
          market: "Door County",
          marketSlug: "door-county",
          lake: "Green Bay, Sturgeon Bay & Lake Michigan",
          coordinates: { latitude: "44.8503", longitude: "-87.3627" },
        })}
      />
      <JsonLd
        data={serviceSchema({
          name: "Permanent Pier & Boat Lift Installation",
          market: "Door County",
          marketSlug: "door-county",
          lake: "Green Bay, Sturgeon Bay & Lake Michigan",
        })}
      />

      {/* 1. Hero */}
      <HeroSection
          variant="full-bleed"
          headline="Waterfront Systems on Green Bay, Sturgeon Bay & Lake Michigan"
          subheadline={content?.introText ?? undefined}
          primaryCta={{
            label: "Request a Door County Consultation",
            href: "/markets/door-county/contact",
          }}
          imageSrc={content?.heroImageUrl ?? "/images/smc/door-county-location-hero-001.jpg"}
          imageAlt={content?.heroImageAlt ?? "Summerset Marine Construction Door County location, Brussels, Wisconsin"}
        />

      {/* 2. SMC presence */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">
          Summerset Marine in the Door County Market
        </h2>
        {content?.introText ? (
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-brand-gray">
            {content.introText}
          </p>
        ) : (
          <ContentPlaceholder
            label="Door County market intro — SMC presence, history, and installed base in the market"
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
              href="/markets/door-county/green-bay"
              className="group block rounded-lg border border-brand-border bg-white p-8 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-serif text-2xl text-brand-navy group-hover:text-brand-blue">
                Green Bay
              </h3>
              <p className="mt-3 text-brand-gray">Permanent piers, lifts, and waterfront systems built for Green Bay.</p>
              <span className="mt-5 inline-block font-medium text-brand-red">
                Explore Green Bay &rarr;
              </span>
            </Link>
            <Link
              href="/markets/door-county/sturgeon-bay"
              className="group block rounded-lg border border-brand-border bg-white p-8 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-serif text-2xl text-brand-navy group-hover:text-brand-blue">
                Sturgeon Bay
              </h3>
              <p className="mt-3 text-brand-gray">Permanent piers, lifts, and waterfront systems built for Sturgeon Bay.</p>
              <span className="mt-5 inline-block font-medium text-brand-red">
                Explore Sturgeon Bay &rarr;
              </span>
            </Link>
            <Link
              href="/markets/door-county/lake-michigan"
              className="group block rounded-lg border border-brand-border bg-white p-8 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-serif text-2xl text-brand-navy group-hover:text-brand-blue">
                Lake Michigan — Door County
              </h3>
              <p className="mt-3 text-brand-gray">Permanent piers, lifts, and waterfront systems built for Lake Michigan — Door County.</p>
              <span className="mt-5 inline-block font-medium text-brand-red">
                Explore Lake Michigan — Door County &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Featured projects */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">Featured Door County Projects</h2>
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
            label="Featured Door County project photos and captions (from Sanity projects)"
            className="mt-8"
          />
        )}
        <div className="mt-8">
          <Button href="/markets/door-county/projects" variant="secondary">
            View All Door County Projects
          </Button>
        </div>
      </section>

      {/* 5. Testimonials strip */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl text-brand-navy">
            What Door County Property Owners Say
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
              label="Door County customer testimonials (from Sanity testimonials)"
              className="mt-8"
            />
          )}
          <div className="mt-8">
            <Button href="/markets/door-county/testimonials" variant="secondary">
              Read All Testimonials
            </Button>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <CTABlock
        variant="dark"
        headline="Ready to build in Door County?"
        subheadline="Request a consultation and our Door County team will walk your shoreline with you."
        primaryCta={{
          label: "Request a Door County Consultation",
          href: "/markets/door-county/contact",
        }}
      />
    </Layout>
  );
}
