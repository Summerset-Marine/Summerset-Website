import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { localBusinessSchema, serviceSchema } from "@/components/seo/JsonLd";
import CTABlock from "@/components/ui/CTABlock";
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
  const marketSlug = "lake-geneva";

  useEffect(() => {
    if (!isSanityConfigured) return;
    sanityFetch<MarketPageContent | null>(MARKET_PAGE_QUERY, { marketSlug })
      .then((data) => setContent(data))
      .catch(() => setContent(null));
    sanityFetch<Testimonial[]>(MARKET_TESTIMONIALS_QUERY, { market: marketSlug })
      .then((data) => setTestimonials(data ?? []))
      .catch(() => setTestimonials([]));
  }, []);

  const projects = content?.featuredProjects ?? [];
  const heroImage = content?.heroImageUrl ?? "/images/smc/lake-geneva-permanent-pier-sunrise-001.jpg";

  return (
    <Layout>
      <PageMeta
        title="Piers & Boat Lifts — Lake Geneva, WI | Summerset Marine"
        description="Summerset Marine builds luxury permanent piers and boat lifts on Geneva Lake. Wisconsin's premier waterfront contractor since 1990."
        canonical={`https://summersetmarine.com/markets/${marketSlug}`}
      />
      <JsonLd
        data={localBusinessSchema({
          market: "Lake Geneva",
          marketSlug,
          lake: "Geneva Lake",
          coordinates: { latitude: "42.5920", longitude: "-88.4343" },
        })}
      />
      <JsonLd
        data={serviceSchema({
          name: "Permanent Pier & Boat Lift Installation",
          market: "Lake Geneva",
          marketSlug,
          lake: "Geneva Lake",
        })}
      />

      {/* BREADCRUMB */}
      <div className="bg-brand-offwhite px-6 md:px-30 py-3 border-b border-brand-border">
        <div className="mx-auto max-w-content flex items-center gap-2">
          <Link href="/markets" className="font-serif text-xs text-brand-black/45 hover:text-brand-gold transition-colors">Markets</Link>
          <span className="text-[11px] text-brand-black/30">›</span>
          <span className="font-serif text-xs text-brand-black">{content?.marketName || "Lake Geneva"}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative h-[75vh] min-h-[540px] overflow-hidden bg-brand-navy">
        <img 
          src={heroImage} 
          alt={content?.heroImageAlt ?? "Lake Geneva"} 
          className="absolute inset-0 w-full h-full object-cover object-center" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/88 via-brand-navy/30 to-brand-navy/15 pointer-events-none"></div>
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-30 pb-18 pointer-events-none">
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 font-serif text-[12px] tracking-[.28em] text-brand-gold uppercase mb-[18px]">Wisconsin Lake Country</div>
          <h1 className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-150 font-serif text-5xl md:text-[80px] font-light leading-none text-brand-offwhite italic mb-[18px] max-w-[700px]">
            {content?.marketName || "Lake Geneva"}
          </h1>
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300 w-10 h-px bg-brand-gold mb-5"></div>
          <p className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500 font-serif text-lg leading-relaxed text-brand-offwhite/65 max-w-[540px] mb-9">
            {content?.introText || "Wisconsin's premier lakefront destination — where we've built some of our most enduring work since 2003."}
          </p>
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-700 flex flex-wrap gap-8 items-center pointer-events-auto">
            <Link href={`/markets/${marketSlug}/contact`} className="inline-block px-10 py-3 border border-brand-gold font-serif text-[13px] tracking-[.16em] text-brand-gold uppercase hover:bg-brand-gold hover:text-white transition-colors">Start a Project Here</Link>
            <Link href={`/markets/${marketSlug}/projects`} className="font-serif text-[13px] tracking-[.12em] uppercase text-brand-offwhite/50 border-b border-brand-offwhite/25 pb-0.5 hover:text-brand-offwhite transition-colors">View Projects →</Link>
          </div>
        </div>
      </section>

      {/* MARKET INTRO */}
      <section className="bg-brand-offwhite px-6 md:px-30 py-22">
        <div className="mx-auto max-w-content grid md:grid-cols-[1fr_1px_1fr] gap-18 items-start">
          <div>
            <div className="font-serif text-[12px] tracking-[.24em] uppercase text-brand-gold mb-5">Our Presence Here</div>
            <h2 className="font-serif text-[42px] font-normal leading-[1.1] text-brand-black mb-5">Building on<br/><em className="italic">{content?.marketName || "Lake Geneva"}.</em></h2>
            <div className="w-8 h-px bg-brand-gold mb-6"></div>
            {content?.introText ? (
              <p className="font-serif text-[17px] leading-[1.9] text-brand-black/80 mb-5 text-justify">
                {content.introText}
              </p>
            ) : (
              <ContentPlaceholder label="Market intro — SMC presence, history, and installed base in the market" />
            )}
          </div>
          <div className="hidden md:block w-px bg-brand-border self-stretch"></div>
          <div>
            <div className="font-serif text-[12px] tracking-[.24em] uppercase text-brand-gold mb-7">By the Numbers</div>
            <div className="flex flex-col">
              <div className="flex justify-between items-baseline py-5 border-b border-brand-border">
                <span className="font-serif text-[14px] text-brand-black/60">Years serving market</span>
                <span className="font-serif text-[32px] font-light text-brand-navy tabular-nums">20+</span>
              </div>
              <div className="flex justify-between items-baseline py-5 border-b border-brand-border">
                <span className="font-serif text-[14px] text-brand-black/60">Quality systems</span>
                <span className="font-serif text-[32px] font-light text-brand-navy tabular-nums">100%</span>
              </div>
              <div className="flex justify-between items-baseline py-5">
                <span className="font-serif text-[14px] text-brand-black/60">Consultations</span>
                <span className="font-serif text-[32px] font-light text-brand-navy tabular-nums">Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BODIES OF WATER */}
      <section className="bg-brand-offwhite px-6 md:px-30 pb-22 border-t border-brand-border">
        <div className="mx-auto max-w-content">
          <div className="py-16 text-center">
            <div className="font-serif text-[12px] tracking-[.28em] uppercase text-brand-gold mb-4">The Lakes</div>
            <h2 className="font-serif text-[46px] font-light text-brand-black m-0">Bodies of Water We Serve</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-border border border-brand-border">
            
            <Link href={`/markets/${marketSlug}/geneva-lake`} className="group block bg-white hover:border-brand-gold transition-colors cursor-pointer relative">
              <img src="/images/smc/lake-geneva-geneva-lake-permanent-pier-aerial-001.jpg" alt="Geneva Lake" className="block w-full h-[200px] object-cover" />
              <div className="p-7">
                <div className="font-serif text-[11px] tracking-[.2em] uppercase text-brand-gold mb-2.5">Primary Lake</div>
                <div className="font-serif text-[28px] font-normal text-brand-black mb-4 group-hover:text-brand-gold transition-colors">Geneva Lake</div>
                <div className="grid grid-cols-2 gap-3.5 mb-6">
                  <div><div className="font-serif text-[22px] font-light text-brand-navy tabular-nums">5,401</div><div className="font-serif text-[11px] text-brand-black/40 mt-1">Acres</div></div>
                  <div><div className="font-serif text-[22px] font-light text-brand-navy tabular-nums">135′</div><div className="font-serif text-[11px] text-brand-black/40 mt-1">Max depth</div></div>
                </div>
                <span className="font-serif text-[12px] tracking-[.14em] uppercase text-brand-navy border-b border-brand-navy pb-0.5 inline-flex items-center gap-2">Lake Profile <span>→</span></span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="bg-brand-navy px-6 md:px-30 py-22">
        <div className="mx-auto max-w-content">
          <div className="flex justify-between items-end mb-13">
            <div>
              <div className="font-serif text-[12px] tracking-[.28em] uppercase text-brand-gold mb-4">Portfolio</div>
              <h2 className="font-serif text-[46px] font-light text-brand-offwhite italic m-0 leading-[1.05]">Featured Projects</h2>
            </div>
            <Link href={`/markets/${marketSlug}/projects`} className="font-serif text-[12px] tracking-[.14em] uppercase text-brand-gold border-b border-brand-gold/50 pb-0.5 hover:text-white hover:border-white transition-colors">All Projects →</Link>
          </div>
          
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.title} className="group cursor-pointer">
                  <div className="overflow-hidden border border-brand-offwhite/10 mb-4">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.imageAlt || project.title} className="block w-full h-[240px] object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="flex h-[240px] items-center justify-center bg-brand-navy border border-brand-offwhite/20 text-brand-offwhite/50 text-sm">No Image</div>
                    )}
                  </div>
                  <div className="px-1">
                    <div className="font-serif text-[11px] tracking-[.2em] uppercase text-brand-gold mb-2">{[project.productType, project.lake].filter(Boolean).join(" · ")}</div>
                    <div className="font-serif text-[22px] text-brand-offwhite mb-1.5 group-hover:text-brand-gold transition-colors">{project.title}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ContentPlaceholder label="Featured project photos and captions" className="mt-8" />
          )}
        </div>
      </section>

      {/* TESTIMONIAL */}
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
            <ContentPlaceholder label="Customer testimonials (from Sanity)" className="mx-auto" />
          )}
          <div className="w-px h-12 bg-brand-border mx-auto mt-8 mb-8"></div>
          <div className="text-center">
            <Link href={`/markets/${marketSlug}/testimonials`} className="font-serif text-[12px] tracking-[.14em] uppercase text-brand-navy border-b border-brand-navy pb-0.5 hover:text-brand-gold transition-colors">Read All Testimonials →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABlock
        variant="dark"
        headline={`Ready to build in ${content?.marketName || "this market"}?`}
        subheadline="Request a consultation and our team will walk your shoreline with you."
        primaryCta={{
          label: "Request a Consultation",
          href: `/markets/${marketSlug}/contact`,
        }}
      />
    </Layout>
  );
}
