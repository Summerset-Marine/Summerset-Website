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

export default function FoxChainPage() {
  const [content, setContent] = useState<MarketPageContent | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (!isSanityConfigured) return;
    sanityFetch<MarketPageContent | null>(MARKET_PAGE_QUERY, { marketSlug: "fox-chain" })
      .then((data) => setContent(data))
      .catch(() => setContent(null));
    sanityFetch<Testimonial[]>(MARKET_TESTIMONIALS_QUERY, { market: "fox-chain" })
      .then((data) => setTestimonials(data ?? []))
      .catch(() => setTestimonials([]));
  }, []);

  const projects = content?.featuredProjects ?? [];

  return (
    <Layout>
      <PageMeta
        title="Piers & Boat Lifts — Fox Chain, WI | Summerset Marine"
        description="Durable permanent piers and lifts designed for the Fox Chain's unique conditions, expertly installed by Summerset Marine."
        canonical="https://summersetmarine.com/markets/fox-chain"
      />
      <JsonLd
        data={localBusinessSchema({
          market: "Fox Chain",
          marketSlug: "fox-chain",
          lake: "Fox Chain O’ Lakes",
          coordinates: { latitude: "42.4419", longitude: "-88.1734" },
        })}
      />
      <JsonLd
        data={serviceSchema({
          name: "Permanent Pier & Boat Lift Installation",
          market: "Fox Chain",
          marketSlug: "fox-chain",
          lake: "Fox Chain O’ Lakes",
        })}
      />

      {/* 1. Hero */}
      <HeroSection
        variant="full-bleed"
        headline="Permanent Piers & Lifts Built for the Fox Chain"
        subheadline={content?.introText ?? undefined}
        primaryCta={{
          label: "Request a Fox Chain Consultation",
          href: "/markets/fox-chain/contact",
        }}
        imageSrc={content?.heroImageUrl ?? "/images/smc/wisconsin-permanent-pier-aerial-hero-002.jpg"}
        imageAlt={content?.heroImageAlt ?? "Lifetime All Seasons HD permanent pier with boat lift — Fox Chain O' Lakes, Summerset Marine Construction"}
      />

      {/* 2. SMC presence — copy ported verbatim from the live Fox Chain page */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">
          Summerset Marine in the Fox Chain Market
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-brand-gray">
          High activity. Constant motion. The Fox Chain isn’t a quiet lake: continuous wake boat traffic, reflected wave energy, frequent slip use, and seasonal water fluctuation. Lighter systems flex. Connections loosen. Lift stability suffers. Performance here starts with structure.
        </p>
      </section>

      {/* 3. Market copy sections — ported verbatim */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-brand-border bg-white p-8 shadow-sm">
              <h3 className="font-serif text-2xl text-brand-navy">Designed Around Your Boat</h3>
              <p className="mt-3 leading-relaxed text-brand-gray">Every system is engineered for boat weight, beam width, shoreline depth, and wake exposure. Pier and lift are designed together — not separately. Load transfer is intentional. Stability is engineered.</p>
            </div>
            <div className="rounded-lg border border-brand-border bg-white p-8 shadow-sm">
              <h3 className="font-serif text-2xl text-brand-navy">Lift Options</h3>
              <p className="mt-3 leading-relaxed text-brand-gray">Built-In Systems: clean integration, matched capacity. Standalone Lifts: flexible placement, performance-ready. Sized correctly from day one.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bodies of water */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">Bodies of Water We Serve</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-brand-border bg-white p-8 shadow-sm">
            <h3 className="font-serif text-2xl text-brand-navy">Fox Chain O’ Lakes</h3>
            <p className="mt-3 text-brand-gray">Projects across Fox Lake, Pistakee Lake, Channel Lake, Antioch, McHenry, and more. Each property is evaluated individually.</p>
          </div>
        </div>
      </section>

      {/* 5. Featured projects */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl text-brand-navy">Featured Fox Chain Projects</h2>
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
              label="Featured Fox Chain project photos and captions (from Sanity projects)"
              className="mt-8"
            />
          )}
          <div className="mt-8">
            <Button href="/markets/fox-chain/projects" variant="secondary">
              View All Fox Chain Projects
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Testimonials strip */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">
          What Fox Chain Customers Say
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
            label="Fox Chain customer testimonials (from Sanity testimonials)"
            className="mt-8"
          />
        )}
        <div className="mt-8">
          <Button href="/markets/fox-chain/testimonials" variant="secondary">
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
              <h3 className="font-serif text-xl">Serving the Fox Chain</h3>
              <p className="mt-2 text-white/85">Fox Lake, Pistakee Lake, Channel Lake, Antioch, McHenry, and more</p>
              <p className="mt-1 text-sm text-white/70">Call us at (262) 594-3244</p>
            </div>
          </div>
          <p className="mt-8 text-white/85">
            Phone:{" "}
            <a href="tel:+12625943244" className="font-medium text-white underline">
              (262) 594-3244
            </a>
          </p>
        </div>
      </section>

      {/* 8. CTA */}
      <CTABlock
        variant="dark"
        headline="Ready to build in the Fox Chain market?"
        subheadline="Request a consultation and our Fox Chain team will walk your shoreline with you."
        primaryCta={{
          label: "Request a Fox Chain Consultation",
          href: "/markets/fox-chain/contact",
        }}
      />
    </Layout>
  );
}
