import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { organizationSchema } from "@/components/seo/JsonLd";
import CTABlock from "@/components/ui/CTABlock";
import Button from "@/components/ui/Button";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import {
  isSanityConfigured,
  sanityFetch,
  MARKET_PROJECTS_QUERY,
  MARKET_TESTIMONIALS_QUERY,
} from "@/lib/sanity";

interface Project {
  _id: string;
  title: string;
  lake?: string;
  productType?: string;
  caption?: string;
  afterImageUrl?: string;
  afterImageAlt?: string;
}

interface Testimonial {
  _id: string;
  quote: string;
  customerName?: string;
  lakeLabel?: string;
}

const PRODUCT_HIGHLIGHTS = [
  {
    name: "Permanent Piers",
    href: "/products/permanent-piers",
    description:
      "Engineered pier systems that stay in the water year-round — no seasonal install, no removal, built to last a lifetime.",
    imageSrc: "/images/smc/wisconsin-lifetime-all-seasons-hd-pier-aerial-001.jpg",
    imageAlt:
      "Lifetime All Seasons HD permanent pier aerial view — Summerset Marine Construction Wisconsin",
  },
  {
    name: "Boat & PWC Lifts",
    href: "/products/lifts",
    description:
      "Built-in, standalone, and PWC lifts that protect your investment and keep your waterfront looking clean.",
    imageSrc: "/images/smc/wisconsin-lifetime-built-in-boat-lift-001.jpg",
    imageAlt:
      "Lifetime built-in boat lift installed on a Wisconsin lake — Summerset Marine Construction",
  },
  {
    name: "Marine Contracting",
    href: "/services/marine-contracting",
    description:
      "Dredging, stone work, barge work, steel sheeting, and professional engineering for demanding shorelines.",
    imageSrc: "/images/smc/wisconsin-marine-contracting-service-hero-001.jpg",
    imageAlt:
      "Marine contracting barge and equipment on a Wisconsin waterway — Summerset Marine Construction",
  },
] as const;

const MARKETS = [
  {
    name: "Lake Geneva",
    href: "/markets/lake-geneva",
    descriptor: "Wisconsin's most iconic lakefront — permanent piers built for Geneva Lake estates.",
  },
  {
    name: "Oconomowoc / Lake Country",
    href: "/markets/oconomowoc",
    descriptor: "Okauchee, Nagawicka, Lac La Belle, and Beaver Lake — Lake Country's pier builder.",
  },
  {
    name: "Door County",
    href: "/markets/door-county",
    descriptor: "Green Bay, Sturgeon Bay, and Lake Michigan — marine contracting for the peninsula.",
  },
] as const;

const MARKET_SLUGS = ["lake-geneva", "oconomowoc", "door-county"] as const;

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (!isSanityConfigured) return;
    Promise.all(
      MARKET_SLUGS.map((market) =>
        sanityFetch<Project[]>(MARKET_PROJECTS_QUERY, { market }).catch(
          () => [] as Project[],
        ),
      ),
    ).then((byMarket) => setProjects(byMarket.flat().slice(0, 6)));
    Promise.all(
      MARKET_SLUGS.map((market) =>
        sanityFetch<Testimonial[]>(MARKET_TESTIMONIALS_QUERY, { market }).catch(
          () => [] as Testimonial[],
        ),
      ),
    ).then((byMarket) => {
      // One testimonial per market where possible, then fill to three.
      const primary = byMarket
        .map((list) => list[0])
        .filter((t): t is Testimonial => Boolean(t));
      const extras = byMarket.flat().filter((t) => !primary.includes(t));
      setTestimonials([...primary, ...extras].slice(0, 3));
    });
  }, []);

  return (
    <Layout>
      <PageMeta
        title="Summerset Marine | Luxury Permanent Piers & Boat Lifts"
        description="Summerset Marine engineers luxury permanent piers, boat lifts, and marine contracting across Wisconsin — Geneva Lake, Oconomowoc, and Door County."
        canonical="https://summersetmarine.com/"
      />
      <JsonLd data={organizationSchema()} />

      {/* 1. Hero */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-24">
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            Wisconsin&rsquo;s Premier Permanent Waterfront Systems
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85 md:text-xl">
            Custom piers, boat lifts, and marine contracting &mdash; engineered to last a
            lifetime.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/consultation" variant="primary" size="large">
              Get a Consultation
            </Button>
            <Button href="/markets/lake-geneva/projects" variant="ghost" size="large">
              View Our Work
            </Button>
          </div>
          <video
            src="/videos/home.mp4"
            poster="/images/smc/wisconsin-permanent-pier-aerial-hero-002.jpg"
            className="mt-12 aspect-[21/9] w-full rounded-lg object-cover"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Aerial view of a Lifetime All Seasons HD permanent pier with covered boat lift — Summerset Marine Construction"
          />
        </div>
      </section>

      {/* 2. Product highlights */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">What We Build</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {PRODUCT_HIGHLIGHTS.map((product) => (
            <div
              key={product.name}
              className="flex flex-col rounded-lg border border-brand-border bg-white p-8 shadow-sm"
            >
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="aspect-[4/3] w-full rounded-md object-cover"
                loading="lazy"
              />
              <h3 className="mt-5 font-serif text-2xl text-brand-navy">{product.name}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-brand-gray">
                {product.description}
              </p>
              <div className="mt-6">
                <Button href={product.href} variant="secondary">
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Why Permanent? */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl text-brand-navy">Why Permanent?</h2>
          <ContentPlaceholder
            label="brief copy on permanent vs seasonal pier systems"
            className="mt-6 max-w-3xl"
          />
          <div className="mt-8">
            <Button href="/resources/permanent-vs-seasonal" variant="secondary">
              Permanent vs. Seasonal: Which Is Right for You?
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Market presence */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">Where We Build</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {MARKETS.map((market) => (
            <Link
              key={market.name}
              href={market.href}
              className="group block rounded-lg border border-brand-border bg-white p-8 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-serif text-2xl text-brand-navy group-hover:text-brand-blue">
                {market.name}
              </h3>
              <p className="mt-3 leading-relaxed text-brand-gray">{market.descriptor}</p>
              <span className="mt-5 inline-block font-medium text-brand-red">
                Explore {market.name} &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Featured projects */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl text-brand-navy">Featured Projects</h2>
          {projects.length > 0 ? (
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="overflow-hidden rounded-lg border border-brand-border bg-white shadow-sm"
                >
                  {project.afterImageUrl ? (
                    <img
                      src={project.afterImageUrl}
                      alt={project.afterImageAlt ?? project.title}
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
                      {[project.productType, project.lake].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className="flex h-64 items-center justify-center rounded-lg border border-brand-border bg-brand-gray-light"
                  >
                    <span className="text-sm font-medium uppercase tracking-wide text-brand-gray">
                      Projects Coming Soon
                    </span>
                  </div>
                ))}
              </div>
              <ContentPlaceholder
                label="featured project photos and captions (from Sanity projects)"
                className="mt-8"
              />
            </div>
          )}
          <div className="mt-8">
            <Button href="/markets/lake-geneva/projects" variant="secondary">
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Testimonials strip */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">What Our Customers Say</h2>
        {testimonials.length > 0 ? (
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
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
            label="three customer testimonials — one per market (from Sanity testimonials)"
            className="mt-8"
          />
        )}
      </section>

      {/* 7. The Lifetime Difference */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl">The Lifetime Difference</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {["Lifetime Piers", "Lifetime Lifts", "Lifetime Barge"].map((brand) => (
              <div key={brand} className="rounded-lg border border-white/15 bg-white/5 p-8">
                <h3 className="font-serif text-2xl">{brand}</h3>
                <ContentPlaceholder
                  label={`${brand} sub-brand callout copy`}
                  className="mt-4"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <CTABlock
        variant="dark"
        headline="Ready to transform your waterfront?"
        subheadline="Request a consultation and our team will walk your shoreline with you."
        primaryCta={{ label: "Get a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
