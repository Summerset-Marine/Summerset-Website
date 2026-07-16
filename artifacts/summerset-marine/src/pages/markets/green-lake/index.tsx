import { useEffect, useState } from "react";
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

export default function GreenLakePage() {
  const [content, setContent] = useState<MarketPageContent | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (!isSanityConfigured) return;
    sanityFetch<MarketPageContent | null>(MARKET_PAGE_QUERY, { marketSlug: "green-lake" })
      .then((data) => setContent(data))
      .catch(() => setContent(null));
    sanityFetch<Testimonial[]>(MARKET_TESTIMONIALS_QUERY, { market: "green-lake" })
      .then((data) => setTestimonials(data ?? []))
      .catch(() => setTestimonials([]));
  }, []);

  const projects = content?.featuredProjects ?? [];

  return (
    <Layout>
      <PageMeta
        title="Pier & Boat Lift Installation — Green Lake, WI | Summerset Marine"
        description="Summerset Marine Construction's Green Lake location — piers, boat lifts, and seasonal pier installation and removal services on Green Lake, Wisconsin."
        canonical="https://summersetmarine.com/markets/green-lake"
      />
      <JsonLd
        data={localBusinessSchema({
          market: "Green Lake",
          marketSlug: "green-lake",
          lake: "Green Lake",
          coordinates: { latitude: "43.8480", longitude: "-88.9601" },
        })}
      />
      <JsonLd
        data={serviceSchema({
          name: "Permanent Pier & Boat Lift Installation",
          market: "Green Lake",
          marketSlug: "green-lake",
          lake: "Green Lake",
        })}
      />

      {/* 1. Hero */}
      <HeroSection
        variant="video-bg"
        videoSrc="/videos/market-green-lake.mp4"
        headline="Piers, Lifts & Seasonal Service on Green Lake"
        subheadline={content?.introText ?? undefined}
        primaryCta={{
          label: "Request a Green Lake Consultation",
          href: "/markets/green-lake/contact",
        }}
        imageSrc={content?.heroImageUrl ?? "/images/smc/wisconsin-permanent-pier-aerial-hero-002.jpg"}
        imageAlt={content?.heroImageAlt ?? "Lifetime permanent pier on Green Lake, Wisconsin — Summerset Marine Construction"}
      />

      {/* 2. SMC presence — copy ported verbatim from the live Green Lake page */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">
          Summerset Marine in the Green Lake Market
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-brand-gray">
          From installation to maintenance, Summerset Marine Construction delivers dependable solutions tailored to your lifestyle. Summerset Marine Construction is excited to bring our tradition of superior craftsmanship and innovative engineering to more homes.
        </p>
      </section>

      {/* 3. Market copy sections — ported verbatim */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-brand-border bg-white p-8 shadow-sm">
              <h3 className="font-serif text-2xl text-brand-navy">Lifts</h3>
              <p className="mt-3 leading-relaxed text-brand-gray">Our boat lifts are designed to protect your investment and enhance your waterfront experience. With durable construction, easy operation, and customizable options, our lifts accommodate a wide range of watercraft and ensure your boat stays secure and ready for the next adventure.</p>
            </div>
            <div className="rounded-lg border border-brand-border bg-white p-8 shadow-sm">
              <h3 className="font-serif text-2xl text-brand-navy">Piers</h3>
              <p className="mt-3 leading-relaxed text-brand-gray">Our Lifetime Classic Series offers both timelessness and durability, while the Lifetime Minimalist Series provides sleek, contemporary lines with minimal environmental impact. Our Lifetime All Seasons Piers stay in the water all year, eliminating the seasonal installation and removal costs.</p>
            </div>
            <div className="rounded-lg border border-brand-border bg-white p-8 shadow-sm">
              <h3 className="font-serif text-2xl text-brand-navy">Seasonal Work</h3>
              <p className="mt-3 leading-relaxed text-brand-gray">Tired of the seasonal hassle with your old wood pier? At Summerset Marine Construction, we understand the struggle and are here to help. Our new Green Lake location offers professional pier installation and removal services designed to save you time and effort. Let us handle your current pier’s seasonal needs, while you explore the benefits of upgrading to our custom-built, zero-maintenance Lifetime Classic, Lifetime Minimalist, or Lifetime All Seasons piers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bodies of water */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">Bodies of Water We Serve</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-brand-border bg-white p-8 shadow-sm">
            <h3 className="font-serif text-2xl text-brand-navy">Green Lake</h3>
            <p className="mt-3 text-brand-gray">Permanent and seasonal pier systems, boat lifts, and full seasonal service on Green Lake, Wisconsin.</p>
          </div>
        </div>
      </section>

      {/* 5. Featured projects */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl text-brand-navy">Featured Green Lake Projects</h2>
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
              label="Featured Green Lake project photos and captions (from Sanity projects)"
              className="mt-8"
            />
          )}
          <div className="mt-8">
            <Button href="/markets/green-lake/projects" variant="secondary">
              View All Green Lake Projects
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Testimonials strip */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">
          What Green Lake Customers Say
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
            label="Green Lake customer testimonials (from Sanity testimonials)"
            className="mt-8"
          />
        )}
        <div className="mt-8">
          <Button href="/markets/green-lake/testimonials" variant="secondary">
            Read All Testimonials
          </Button>
        </div>
      </section>

      {/* 7. Visit us — addresses/hours ported verbatim */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl">Visit Us</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-1">
            <div>
              <h3 className="font-serif text-xl">Green Lake Location</h3>
              <p className="mt-2 text-white/85">555 Commercial Ave, Green Lake, WI 54941</p>
              <p className="mt-1 text-sm text-white/70">Monday–Friday: 9am–5pm</p>
            </div>
          </div>
          <p className="mt-8 text-white/85">
            Phone:{" "}
            <a href="tel:+18008169698" className="font-medium text-white underline">
              (800) 816-9698
            </a>
          </p>
        </div>
      </section>

      {/* 8. CTA */}
      <CTABlock
        variant="dark"
        headline="Ready to build in the Green Lake market?"
        subheadline="Request a consultation and our Green Lake team will walk your shoreline with you."
        primaryCta={{
          label: "Request a Green Lake Consultation",
          href: "/markets/green-lake/contact",
        }}
      />
    </Layout>
  );
}
