import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, {
  localBusinessSchema,
  imageObjectSchema,
  serviceSchema,
} from "@/components/seo/JsonLd";
import CTABlock from "@/components/ui/CTABlock";
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
  /** Inline "Projects on This Lake" entries edited directly on the Lake Page doc in Sanity. */
  projects?: {
    title: string;
    productType?: string;
    installYear?: number;
    caption?: string;
    afterImageUrl?: string;
    afterImageAlt?: string;
  }[];
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
      "Heavy-duty permanent pier engineered for demanding water and ice conditions — built to stand year-round on Pine Lake.",
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

export default function PineLakePage() {
  const [content, setContent] = useState<LakePageContent | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (!isSanityConfigured) return;
    sanityFetch<LakePageContent | null>(LAKE_PAGE_QUERY, { lakeSlug: "pine-lake" })
      .then((data) => setContent(data))
      .catch(() => setContent(null));
    sanityFetch<Project[]>(MARKET_PROJECTS_QUERY, { market: "oconomowoc" })
      .then((data) => setProjects((data ?? []).filter((p) => p.lake === "pine-lake")))
      .catch(() => setProjects([]));
    sanityFetch<Testimonial[]>(MARKET_TESTIMONIALS_QUERY, { market: "oconomowoc" })
      .then((data) =>
        setTestimonials(
          (data ?? []).filter(
            (t) =>
              t.lakeSlug === "pine-lake" ||
              (!t.lakeSlug &&
                (!t.lakeLabel || t.lakeLabel.toLowerCase().includes("pine"))),
          ),
        ),
      )
      .catch(() => setTestimonials([]));
  }, []);

  const inlineProjects: Project[] = (content?.projects ?? []).map((p, i) => ({ _id: `inline-${i}`, ...p }));
  const allProjects = [...inlineProjects, ...projects];

  const heroImage = content?.heroImageUrl ?? "/images/smc/wisconsin-permanent-pier-aerial-hero-002.jpg";

  return (
    <Layout>
      <PageMeta
        title="Permanent Piers on Pine Lake, WI | Summerset Marine"
        description="Summerset Marine installs luxury permanent piers and boat lifts on Pine Lake. Expert waterfront contractors serving Lake Country property owners."
        canonical="https://summersetmarine.com/markets/oconomowoc/pine-lake"
      />
      <JsonLd
        data={localBusinessSchema({
          market: "Oconomowoc / Lake Country",
          marketSlug: "oconomowoc",
          lake: "Pine Lake",
          coordinates: { latitude: "43.1069", longitude: "-88.3565" },
        })}
      />
      <JsonLd
        data={serviceSchema({
          name: "Permanent Pier Installation on Pine Lake",
          market: "Oconomowoc / Lake Country",
          marketSlug: "oconomowoc",
          lake: "Pine Lake",
        })}
      />
      {allProjects
        .filter((p) => p.afterImageUrl)
        .map((p) => (
          <JsonLd
            key={p._id}
            data={imageObjectSchema({
              url: p.afterImageUrl as string,
              caption: p.caption ?? p.title,
              lake: "Pine Lake",
              productType: p.productType ?? "Permanent Pier",
              location: "Oconomowoc / Lake Country",
            })}
          />
        ))}

      {/* BREADCRUMB */}
      <div className="bg-brand-offwhite px-6 md:px-30 py-3 border-b border-brand-border">
        <div className="mx-auto max-w-content flex items-center gap-2">
          <Link href="/markets" className="font-serif text-xs text-brand-black/45 hover:text-brand-gold transition-colors">Markets</Link>
          <span className="text-[11px] text-brand-black/30">›</span>
          <Link href="/markets/oconomowoc" className="font-serif text-xs text-brand-black/45 hover:text-brand-gold transition-colors">Oconomowoc</Link>
          <span className="text-[11px] text-brand-black/30">›</span>
          <span className="font-serif text-xs text-brand-black">{content?.lakeName || "Pine Lake"}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative h-[75vh] min-h-[540px] overflow-hidden bg-brand-navy">
        <img 
          src={heroImage} 
          alt={content?.heroImageAlt ?? "Permanent pier on Pine Lake"} 
          className="absolute inset-0 w-full h-full object-cover object-center" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/88 via-brand-navy/30 to-brand-navy/15 pointer-events-none"></div>
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-30 pb-18 pointer-events-none">
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 font-serif text-[12px] tracking-[.28em] text-brand-gold uppercase mb-[18px]">Primary Lake</div>
          <h1 className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-150 font-serif text-5xl md:text-[80px] font-light leading-none text-brand-offwhite italic mb-[18px] max-w-[700px]">
            {content?.lakeName || "Pine Lake"}
          </h1>
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300 w-10 h-px bg-brand-gold mb-5"></div>
          <p className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500 font-serif text-lg leading-relaxed text-brand-offwhite/65 max-w-[540px] mb-9">
            Permanent Piers & Lifts on Pine Lake
          </p>
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-700 flex flex-wrap gap-8 items-center pointer-events-auto">
            <Link href="/markets/oconomowoc/contact" className="inline-block px-10 py-3 border border-brand-gold font-serif text-[13px] tracking-[.16em] text-brand-gold uppercase hover:bg-brand-gold hover:text-white transition-colors">Request Consultation</Link>
          </div>
        </div>
      </section>

      {/* SMC ON THIS WATER */}
      <section className="bg-brand-offwhite px-6 md:px-30 py-22">
        <div className="mx-auto max-w-content grid md:grid-cols-[1fr_1px_1fr] gap-18 items-start">
          <div>
            <div className="font-serif text-[12px] tracking-[.24em] uppercase text-brand-gold mb-5">Our Experience</div>
            <h2 className="font-serif text-[42px] font-normal leading-[1.1] text-brand-black mb-5">Summerset Marine on<br/><em className="italic">{content?.lakeName || "Pine Lake"}.</em></h2>
            <div className="w-8 h-px bg-brand-gold mb-6"></div>
            {content?.historyText ? (
              <p className="font-serif text-[17px] leading-[1.9] text-brand-black/80 mb-5 text-justify">
                {content.historyText}
              </p>
            ) : (
              <ContentPlaceholder label="years of experience, notable projects, installed base on Pine Lake" />
            )}
          </div>
          <div className="hidden md:block w-px bg-brand-border self-stretch"></div>
          <div>
            <div className="font-serif text-[12px] tracking-[.24em] uppercase text-brand-gold mb-7">Lake Stats</div>
            {!content?.lakeCharacteristics && (
              <ContentPlaceholder label="Pine Lake lake stats (average depth, square acres)" className="mt-4" />
            )}
          </div>
        </div>
      </section>

      {/* LAKE CHARACTERISTICS */}
      <section className="bg-brand-offwhite px-6 md:px-30 pb-22">
        <div className="mx-auto max-w-[800px] text-center mb-16">
          <div className="font-serif text-[12px] tracking-[.24em] uppercase text-brand-gold mb-5">Considerations</div>
          <h2 className="font-serif text-[36px] font-light text-brand-black mb-6">Building on {content?.lakeName || "Pine Lake"}</h2>
          <div className="w-8 h-px bg-brand-gold mx-auto mb-8"></div>
          {content?.lakeCharacteristics ? (
            <p className="font-serif text-[17px] leading-[1.9] text-brand-black/80 text-justify">
              {content.lakeCharacteristics}
            </p>
          ) : (
            <ContentPlaceholder label="depth, wave exposure, ice behavior, shoreline types, relevant installation considerations for a property owner" />
          )}
        </div>
      </section>

      {/* RECOMMENDED SYSTEMS */}
      <section className="bg-brand-navy px-6 md:px-30 py-22">
        <div className="mx-auto max-w-content">
          <div className="text-center mb-16">
            <div className="font-serif text-[12px] tracking-[.28em] uppercase text-brand-gold mb-4">Equipment</div>
            <h2 className="font-serif text-[46px] font-light text-brand-offwhite italic m-0">Recommended Systems</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PRODUCT_RECOMMENDATIONS.map((product) => (
              <div key={product.name} className="border border-brand-offwhite/10 p-8 hover:border-brand-gold transition-colors group">
                <h3 className="font-serif text-[24px] text-brand-offwhite mb-4 group-hover:text-brand-gold transition-colors">{product.name}</h3>
                <div className="w-8 h-px bg-brand-offwhite/20 mb-6 group-hover:bg-brand-gold transition-colors"></div>
                <p className="font-serif text-[16px] leading-[1.7] text-brand-offwhite/60 mb-8">{product.reason}</p>
                <Link href={product.href} className="font-serif text-[12px] tracking-[.14em] uppercase text-brand-gold border-b border-brand-gold/50 pb-0.5 hover:text-white hover:border-white transition-colors">Learn More →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT GALLERY */}
      <section className="bg-brand-offwhite px-6 md:px-30 py-22">
        <div className="mx-auto max-w-content">
          <div className="flex justify-between items-end mb-13">
            <div>
              <div className="font-serif text-[12px] tracking-[.28em] uppercase text-brand-gold mb-4">Portfolio</div>
              <h2 className="font-serif text-[46px] font-light text-brand-black italic m-0 leading-[1.05]">{content?.lakeName || "Pine Lake"} Projects</h2>
            </div>
            <Link href="/markets/oconomowoc/projects" className="font-serif text-[12px] tracking-[.14em] uppercase text-brand-navy border-b border-brand-navy/50 pb-0.5 hover:text-brand-gold hover:border-brand-gold transition-colors">All Oconomowoc Projects →</Link>
          </div>
          
          {allProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProjects.map((project) => (
                <div key={project._id} className="group cursor-pointer">
                  <div className="overflow-hidden border border-brand-border mb-4">
                    {project.afterImageUrl ? (
                      <img src={project.afterImageUrl} alt={project.afterImageAlt ?? project.title} className="block w-full h-[240px] object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="flex h-[240px] items-center justify-center bg-brand-offwhite text-brand-black/40 text-sm font-serif">Photo Coming Soon</div>
                    )}
                  </div>
                  <div className="px-1">
                    <div className="font-serif text-[11px] tracking-[.2em] uppercase text-brand-gold mb-2">{[project.productType, project.installYear].filter(Boolean).join(" · ")}</div>
                    <div className="font-serif text-[22px] text-brand-black mb-1.5 group-hover:text-brand-gold transition-colors">{project.title}</div>
                    {project.caption && <p className="font-serif text-[14px] text-brand-black/60 line-clamp-2">{project.caption}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ContentPlaceholder label="Pine Lake project gallery photos (from Sanity projects, lake = pine-lake)" className="mt-8" />
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-brand-offwhite px-6 md:px-30 py-24 border-t border-brand-border">
        <div className="mx-auto max-w-[720px] text-center">
          <div className="w-px h-12 bg-brand-border mx-auto mb-9"></div>
          {testimonials.length > 0 ? (
            <>
              <blockquote className="font-serif text-[32px] font-light italic leading-[1.45] text-brand-black m-0 mb-8">
                "{testimonials[0].quote}"
              </blockquote>
              <div className="w-8 h-px bg-brand-gold mx-auto mb-5"></div>
              <div className="font-serif text-[14px] tracking-[.16em] uppercase text-brand-black/60">
                — {[testimonials[0].customerName, testimonials[0].lakeLabel].filter(Boolean).join(" · ")}
              </div>
            </>
          ) : (
            <ContentPlaceholder label="Pine Lake customer testimonials (from Sanity testimonials, lake = pine-lake)" className="mx-auto" />
          )}
        </div>
      </section>

      {/* CTA */}
      <CTABlock
        variant="dark"
        headline="Ready to build on Pine Lake?"
        subheadline="Request a consultation and our Oconomowoc / Lake Country team will walk your shoreline with you."
        primaryCta={{
          label: "Request a Consultation on Pine Lake",
          href: "/markets/oconomowoc/contact",
        }}
      />
    </Layout>
  );
}
