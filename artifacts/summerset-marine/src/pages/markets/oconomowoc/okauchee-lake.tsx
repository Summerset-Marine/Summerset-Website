import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, {
  localBusinessSchema,
  imageObjectSchema,
  serviceSchema,
} from "@/components/seo/JsonLd";
import HeroSection from "@/components/ui/HeroSection";
import CTABlock from "@/components/ui/CTABlock";
import Button from "@/components/ui/Button";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import {
  isSanityConfigured,
  sanityFetch,
  LAKE_PAGE_QUERY,
  MARKET_PROJECTS_QUERY,
  MARKET_TESTIMONIALS_QUERY,
} from "@/lib/sanity";

interface LakePageContent {
  lakeName: string;
  historyText?: string;
  lakeCharacteristics?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
}

interface Project {
  _id: string;
  title: string;
  lake?: string;
  productType?: string;
  installYear?: number;
  caption?: string;
  afterImageUrl?: string;
  afterImageAlt?: string;
}

interface Testimonial {
  _id: string;
  quote: string;
  customerName?: string;
  lakeSlug?: string;
  lakeLabel?: string;
  starRating?: number;
}

const PRODUCT_RECOMMENDATIONS = [
  {
    name: "Lifetime All Seasons HD Pier",
    href: "/products/permanent-piers/all-seasons-hd",
    reason:
      "Heavy-duty permanent pier engineered for demanding water and ice conditions — built to stand year-round on Okauchee Lake.",
  },
  {
    name: "Lifetime Built-In Lift",
    href: "/products/lifts/built-in",
    reason:
      "Integrated directly into your permanent pier for a clean, seamless look and high-end performance on premium shoreline.",
  },
  {
    name: "Lifetime Standalone Lift",
    href: "/products/lifts/standalone",
    reason:
      "Flexible placement and compatibility with existing waterfront setups — a strong fit for varied shorelines.",
  },
];

export default function OkaucheeLakePage() {
  const [content, setContent] = useState<LakePageContent | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (!isSanityConfigured) return;
    sanityFetch<LakePageContent | null>(LAKE_PAGE_QUERY, { lakeSlug: "okauchee-lake" })
      .then((data) => setContent(data))
      .catch(() => setContent(null));
    sanityFetch<Project[]>(MARKET_PROJECTS_QUERY, { market: "oconomowoc" })
      .then((data) => setProjects((data ?? []).filter((p) => p.lake === "okauchee-lake")))
      .catch(() => setProjects([]));
    sanityFetch<Testimonial[]>(MARKET_TESTIMONIALS_QUERY, { market: "oconomowoc" })
      .then((data) =>
        setTestimonials(
          (data ?? []).filter(
            (t) =>
              // Prefer the structured lake slug; keep testimonials with no
              // lake data at all rather than hiding valid market content.
              t.lakeSlug === "okauchee-lake" ||
              (!t.lakeSlug &&
                (!t.lakeLabel || t.lakeLabel.toLowerCase().includes("okauchee"))),
          ),
        ),
      )
      .catch(() => setTestimonials([]));
  }, []);

  return (
    <Layout>
      <PageMeta
        title="Permanent Pier Installation on Okauchee Lake, WI | Summerset Marine"
        description="Summerset Marine Construction installs luxury permanent piers and boat lifts on Okauchee Lake. Expert waterfront contractors serving Lake Country property owners."
        canonical="https://summersetmarine.com/markets/oconomowoc/okauchee-lake"
      />
      <JsonLd
        data={localBusinessSchema({
          market: "Oconomowoc / Lake Country",
          marketSlug: "oconomowoc",
          lake: "Okauchee Lake",
          coordinates: { latitude: "43.1053", longitude: "-88.4990" },
        })}
      />
      <JsonLd
        data={serviceSchema({
          name: "Permanent Pier Installation on Okauchee Lake",
          market: "Oconomowoc / Lake Country",
          marketSlug: "oconomowoc",
          lake: "Okauchee Lake",
        })}
      />
      {projects
        .filter((p) => p.afterImageUrl)
        .map((p) => (
          <JsonLd
            key={p._id}
            data={imageObjectSchema({
              url: p.afterImageUrl as string,
              caption: p.caption ?? p.title,
              lake: "Okauchee Lake",
              productType: p.productType ?? "Permanent Pier",
              location: "Oconomowoc / Lake Country",
            })}
          />
        ))}

      {/* 1. Hero */}
      <HeroSection
          variant="full-bleed"
          headline="Permanent Piers & Lifts on Okauchee Lake"
          subheadline={content?.historyText ?? undefined}
          primaryCta={{
            label: "Request a Consultation on Okauchee Lake",
            href: "/markets/oconomowoc/contact",
          }}
          imageSrc={content?.heroImageUrl ?? "/images/smc/oconomowoc-okauchee-lake-permanent-pier-hero-001.jpg"}
          imageAlt={content?.heroImageAlt ?? "Permanent pier on Okauchee Lake, Oconomowoc, Wisconsin — Summerset Marine Construction"}
        />

      {/* 2. SMC on this water */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">
          Summerset Marine on Okauchee Lake
        </h2>
        <ContentPlaceholder
          label="Okauchee Lake lake stats (average depth, square acres)"
          className="mt-4"
        />
        {content?.historyText ? (
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-brand-gray">
            {content.historyText}
          </p>
        ) : (
          <ContentPlaceholder
            label="years of experience, notable projects, installed base on Okauchee Lake"
            className="mt-6"
          />
        )}
      </section>

      {/* 3. Water characteristics */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl text-brand-navy">
            Building on Okauchee Lake: What Property Owners Should Know
          </h2>
          {content?.lakeCharacteristics ? (
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-brand-gray">
              {content.lakeCharacteristics}
            </p>
          ) : (
            <ContentPlaceholder
              label="depth, wave exposure, ice behavior, shoreline types, relevant installation considerations for a property owner"
              className="mt-6"
            />
          )}
        </div>
      </section>

      {/* 4. Products for this water */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">
          Recommended Systems for Okauchee Lake
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {PRODUCT_RECOMMENDATIONS.map((product) => (
            <div
              key={product.name}
              className="flex flex-col rounded-lg border border-brand-border bg-white p-8 shadow-sm"
            >
              <h3 className="font-serif text-2xl text-brand-navy">{product.name}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-brand-gray">{product.reason}</p>
              <div className="mt-6">
                <Button href={product.href} variant="secondary">
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Project gallery */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl text-brand-navy">Okauchee Lake Projects</h2>
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
                      {[project.productType, project.installYear].filter(Boolean).join(" · ")}
                    </p>
                    {project.caption ? (
                      <p className="mt-2 text-sm text-brand-gray">{project.caption}</p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ContentPlaceholder
              label="Okauchee Lake project gallery photos (from Sanity projects, lake = okauchee-lake)"
              className="mt-8"
            />
          )}
          <div className="mt-8">
            <Button href="/markets/oconomowoc/projects" variant="secondary">
              View All Oconomowoc / Lake Country Projects
            </Button>
            <Button href="/markets/oconomowoc" variant="secondary" className="ml-3">
              Explore the Oconomowoc / Lake Country Market
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">
          What Okauchee Lake Homeowners Say
        </h2>
        {testimonials.length > 0 ? (
          <div className="mt-8 grid gap-8 md:grid-cols-2">
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
            label="Okauchee Lake customer testimonials (from Sanity testimonials, lake = okauchee-lake)"
            className="mt-8"
          />
        )}
      </section>

      {/* 7. CTA */}
      <CTABlock
        variant="dark"
        headline="Ready to build on Okauchee Lake?"
        subheadline="Request a consultation and our Oconomowoc / Lake Country team will walk your shoreline with you."
        primaryCta={{
          label: "Request a Consultation on Okauchee Lake",
          href: "/markets/oconomowoc/contact",
        }}
      />
    </Layout>
  );
}
