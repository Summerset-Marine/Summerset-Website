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

export default function MadisonPage() {
  const [content, setContent] = useState<MarketPageContent | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (!isSanityConfigured) return;
    sanityFetch<MarketPageContent | null>(MARKET_PAGE_QUERY, { marketSlug: "madison" })
      .then((data) => setContent(data))
      .catch(() => setContent(null));
    sanityFetch<Testimonial[]>(MARKET_TESTIMONIALS_QUERY, { market: "madison" })
      .then((data) => setTestimonials(data ?? []))
      .catch(() => setTestimonials([]));
  }, []);

  const projects = content?.featuredProjects ?? [];

  return (
    <Layout>
      <PageMeta
        title="Pier & Boat Lift Installation — Madison, WI | Summerset Marine"
        description="Summerset Marine Construction's Madison location — one of the largest selections of new and used boat lifts and piers in Wisconsin, serving Lake Mendota and the Madison chain."
        canonical="https://summersetmarine.com/markets/madison"
      />
      <JsonLd
        data={localBusinessSchema({
          market: "Madison",
          marketSlug: "madison",
          lake: "Lake Mendota",
          coordinates: { latitude: "43.1399", longitude: "-89.3372" },
        })}
      />
      <JsonLd
        data={serviceSchema({
          name: "Permanent Pier & Boat Lift Installation",
          market: "Madison",
          marketSlug: "madison",
          lake: "Lake Mendota",
        })}
      />

      {/* 1. Hero */}
      <HeroSection
        variant="full-bleed"
        headline="New & Used Piers and Boat Lifts in Madison"
        subheadline={content?.introText ?? undefined}
        primaryCta={{
          label: "Request a Madison Consultation",
          href: "/markets/madison/contact",
        }}
        imageSrc={content?.heroImageUrl ?? "/images/smc/wisconsin-permanent-pier-aerial-hero-002.jpg"}
        imageAlt={content?.heroImageAlt ?? "Lifetime permanent pier with boat lift — Summerset Marine Construction Madison, Wisconsin"}
      />

      {/* 2. SMC presence — copy ported verbatim from the live Madison page */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">
          Summerset Marine in the Madison Market
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-brand-gray">
          Visit our facility to browse one of the largest selections of new and used boat lifts, pontoon and PWC lifts and canopies. In addition to our variety of pre-owned options, we offer new premium Lifetime Lifts.
        </p>
      </section>

      {/* 3. Market copy sections — ported verbatim */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-brand-border bg-white p-8 shadow-sm">
              <h3 className="font-serif text-2xl text-brand-navy">New & Used Piers</h3>
              <p className="mt-3 leading-relaxed text-brand-gray">Stop by our facility to see one of the largest selections of new and used docks and piers available. Along with a variety of pre-owned options, we offer our premium Lifetime All Seasons, Minimalist, and Classic piers to perfectly match your waterfront style and needs.</p>
            </div>
            <div className="rounded-lg border border-brand-border bg-white p-8 shadow-sm">
              <h3 className="font-serif text-2xl text-brand-navy">Functional Accessories</h3>
              <p className="mt-3 leading-relaxed text-brand-gray">During the fabrication of your custom Lifetime Pier, you can select from a range of accessories that are built to perfectly match your pier, using the same high-quality aluminum and HDPE decking. Accessories include options like stairs, rail-less stairs, kayak and paddle board racks, bumper posts, and more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bodies of water */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">Bodies of Water We Serve</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-brand-border bg-white p-8 shadow-sm">
            <h3 className="font-serif text-2xl text-brand-navy">Lake Mendota</h3>
            <p className="mt-3 text-brand-gray">Average Depth: 74 Feet · Square Acres: 14,286</p>
            <p className="mt-3 text-brand-gray">Big water, long fetch, and serious ice — Lake Mendota calls for heavy-duty permanent systems like the Lifetime All Seasons HD.</p>
          </div>
        </div>
      </section>

      {/* 5. Featured projects */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl text-brand-navy">Featured Madison Projects</h2>
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
              label="Featured Madison project photos and captions (from Sanity projects)"
              className="mt-8"
            />
          )}
          <div className="mt-8">
            <Button href="/markets/madison/projects" variant="secondary">
              View All Madison Projects
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Testimonials strip */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">
          What Madison Customers Say
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
            label="Madison customer testimonials (from Sanity testimonials)"
            className="mt-8"
          />
        )}
        <div className="mt-8">
          <Button href="/markets/madison/testimonials" variant="secondary">
            Read All Testimonials
          </Button>
        </div>
      </section>

      {/* 7. Visit us — addresses/hours ported verbatim */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl">Visit Us</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-serif text-xl">Sales/Showroom</h3>
              <p className="mt-2 text-white/85">5371 Farmco Drive, Madison, WI 53704</p>
              <p className="mt-1 text-sm text-white/70">Monday–Friday: 9am–5pm · Saturday: By appointment only</p>
            </div>
            <div>
              <h3 className="font-serif text-xl">Service</h3>
              <p className="mt-2 text-white/85">5440 Blue Bill Park Drive, Madison, WI 53704</p>
              <p className="mt-1 text-sm text-white/70">Monday–Friday: 8am–5pm</p>
            </div>
          </div>
          <p className="mt-8 text-white/85">
            Phone:{" "}
            <a href="tel:+16082493100" className="font-medium text-white underline">
              (608) 249-3100
            </a>
          </p>
        </div>
      </section>

      {/* 8. CTA */}
      <CTABlock
        variant="dark"
        headline="Ready to build in the Madison market?"
        subheadline="Request a consultation and our Madison team will walk your shoreline with you."
        primaryCta={{
          label: "Request a Madison Consultation",
          href: "/markets/madison/contact",
        }}
      />
    </Layout>
  );
}
