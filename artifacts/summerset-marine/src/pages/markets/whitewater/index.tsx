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

export default function WhitewaterPage() {
  const [content, setContent] = useState<MarketPageContent | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (!isSanityConfigured) return;
    sanityFetch<MarketPageContent | null>(MARKET_PAGE_QUERY, { marketSlug: "whitewater" })
      .then((data) => setContent(data))
      .catch(() => setContent(null));
    sanityFetch<Testimonial[]>(MARKET_TESTIMONIALS_QUERY, { market: "whitewater" })
      .then((data) => setTestimonials(data ?? []))
      .catch(() => setTestimonials([]));
  }, []);

  const projects = content?.featuredProjects ?? [];

  return (
    <Layout>
      <PageMeta
        title="Piers & Boat Lifts — Whitewater, WI | Summerset Marine"
        description="Summerset Marine's 75,000+ sq ft manufacturing facility and headquarters in Whitewater, WI — custom pier and lift manufacturing, design, and distribution."
        canonical="https://summersetmarine.com/markets/whitewater"
      />
      <JsonLd
        data={localBusinessSchema({
          market: "Whitewater",
          marketSlug: "whitewater",
          lake: "Whitewater area lakes",
          coordinates: { latitude: "42.8336", longitude: "-88.7323" },
        })}
      />
      <JsonLd
        data={serviceSchema({
          name: "Permanent Pier & Boat Lift Installation",
          market: "Whitewater",
          marketSlug: "whitewater",
          lake: "Whitewater area lakes",
        })}
      />

      {/* 1. Hero */}
      <HeroSection
        variant="full-bleed"
        headline="Our Whitewater Headquarters & Manufacturing Facility"
        subheadline={content?.introText ?? undefined}
        primaryCta={{
          label: "Request a Whitewater Consultation",
          href: "/markets/whitewater/contact",
        }}
        imageSrc={content?.heroImageUrl ?? "/images/smc/summerset-marine-construction-whitewater-wi-headquarters-001.jpg"}
        imageAlt={content?.heroImageAlt ?? "Summerset Marine Construction headquarters in Whitewater, Wisconsin"}
      />

      {/* 2. SMC presence — copy ported verbatim from the live Whitewater page */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">
          Summerset Marine in the Whitewater Market
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-brand-gray">
          Summerset Marine Construction is proud to call our 75,000+ square foot manufacturing facility and corporate headquarters home. Located in picturesque southeastern Wisconsin, surrounded by rolling hills and sparkling lakes, we are dedicated to delivering the luxurious lakeside lifestyle you love.
        </p>
      </section>

      {/* 3. Market copy sections — ported verbatim */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-brand-border bg-white p-8 shadow-sm">
              <h3 className="font-serif text-2xl text-brand-navy">Built Here, Enjoyed Nearby</h3>
              <p className="mt-3 leading-relaxed text-brand-gray">Our manufacturing facility produces piers, lifts, and accessories that many homeowners enjoy on nearby lakes. That’s how we know what it takes for a pier to outlast the Midwest seasons, and we’re proud of the many properties we’ve been able to enhance with our beautiful and sustainable piers.</p>
            </div>
            <div className="rounded-lg border border-brand-border bg-white p-8 shadow-sm">
              <h3 className="font-serif text-2xl text-brand-navy">Services Offered</h3>
              <p className="mt-3 leading-relaxed text-brand-gray">Custom Pier & Lift Manufacturing — engineered for durability and designed to fit your waterfront. Product Design & Innovation — home of our patented pier systems and custom marine solutions. Supply & Distribution — providing high-quality marine products to installers and waterfront owners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bodies of water */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">Bodies of Water We Serve</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-brand-border bg-white p-8 shadow-sm">
            <h3 className="font-serif text-2xl text-brand-navy">Delavan Lake</h3>
            <p className="mt-3 text-brand-gray">Completed Lifetime Classic pier installations on Delavan Lake, minutes from our Whitewater headquarters.</p>
          </div>
          <div className="rounded-lg border border-brand-border bg-white p-8 shadow-sm">
            <h3 className="font-serif text-2xl text-brand-navy">Lake Beulah</h3>
            <p className="mt-3 text-brand-gray">Lifetime All Seasons, Classic, and Minimalist piers installed across Lake Beulah’s wooded shoreline.</p>
          </div>
          <div className="rounded-lg border border-brand-border bg-white p-8 shadow-sm">
            <h3 className="font-serif text-2xl text-brand-navy">Brown Lake</h3>
            <p className="mt-3 text-brand-gray">Low-profile Lifetime Minimalist piers built for Brown Lake’s quiet waterfront.</p>
          </div>
        </div>
      </section>

      {/* 5. Featured projects */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl text-brand-navy">Featured Whitewater Projects</h2>
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
              label="Featured Whitewater project photos and captions (from Sanity projects)"
              className="mt-8"
            />
          )}
          <div className="mt-8">
            <Button href="/markets/whitewater/projects" variant="secondary">
              View All Whitewater Projects
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Testimonials strip */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">
          What Whitewater Customers Say
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
            label="Whitewater customer testimonials (from Sanity testimonials)"
            className="mt-8"
          />
        )}
        <div className="mt-8">
          <Button href="/markets/whitewater/testimonials" variant="secondary">
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
              <h3 className="font-serif text-xl">Headquarters</h3>
              <p className="mt-2 text-white/85">W3128 Highway 59, Whitewater, WI 53190</p>
              <p className="mt-1 text-sm text-white/70">Monday–Friday: 8am–4pm</p>
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
        headline="Ready to build in the Whitewater market?"
        subheadline="Request a consultation and our Whitewater team will walk your shoreline with you."
        primaryCta={{
          label: "Request a Whitewater Consultation",
          href: "/markets/whitewater/contact",
        }}
      />
    </Layout>
  );
}
