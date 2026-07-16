import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { organizationSchema } from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import { GoogleReviews, googleReviewsEnabled } from "@/components/ui/GoogleReviews";
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

const MARKETS = [
  { name: "Lake Geneva", count: "3 lakes", num: "01", href: "/markets/lake-geneva" },
  { name: "Oconomowoc", count: "4 lakes", num: "02", href: "/markets/oconomowoc" },
  { name: "Madison", count: "5 lakes", num: "03", href: "/markets/madison" },
  { name: "Whitewater", count: "2 lakes", num: "04", href: "/markets/whitewater" },
  { name: "Green Lake", count: "2 lakes", num: "05", href: "/markets/green-lake" },
  { name: "Fox Chain", count: "6 lakes", num: "06", href: "/markets/fox-chain" },
  { name: "Door County", count: "3 lakes", num: "07", href: "/markets/door-county" },
] as const;

const MARKET_SLUGS = ["lake-geneva", "oconomowoc", "door-county"] as const;

/** All 7 markets — the rotating home quote draws from every region. */
const TESTIMONIAL_MARKET_SLUGS = [
  "lake-geneva",
  "oconomowoc",
  "door-county",
  "madison",
  "whitewater",
  "green-lake",
  "fox-chain",
] as const;

const TESTIMONIAL_ROTATE_MS = 8000;

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!isSanityConfigured) return;
    Promise.all(
      MARKET_SLUGS.map((market) =>
        sanityFetch<Project[]>(MARKET_PROJECTS_QUERY, { market }).catch(
          () => [] as Project[],
        ),
      ),
    ).then((byMarket) => setProjects(byMarket.flat().slice(0, 5))); // Top 5 for the grid

    Promise.all(
      TESTIMONIAL_MARKET_SLUGS.map((market) =>
        sanityFetch<Testimonial[]>(MARKET_TESTIMONIALS_QUERY, { market }).catch(
          () => [] as Testimonial[],
        ),
      ),
    ).then((byMarket) => {
      setTestimonials(byMarket.flat().filter(Boolean));
    });
  }, []);

  // Rotate the featured quote through all testimonials
  useEffect(() => {
    if (testimonials.length < 2) return;
    const timer = setInterval(() => {
      setFading(true);
      window.setTimeout(() => {
        setActiveTestimonial((i) => (i + 1) % testimonials.length);
        setFading(false);
      }, 400);
    }, TESTIMONIAL_ROTATE_MS);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <Layout>
      <PageMeta
        title="Summerset Marine | Luxury Permanent Piers & Boat Lifts"
        description="Summerset Marine engineers luxury permanent piers, boat lifts, and marine contracting across Wisconsin — Geneva Lake, Oconomowoc, and Door County."
        canonical="https://summersetmarine.com/"
      />
      <JsonLd data={organizationSchema()} />

      {/* 1. Hero */}
      <section className="relative h-[88vh] min-h-[580px] overflow-hidden bg-brand-navy">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-center"
          src="/videos/home.mp4"
          poster="/images/smc/wisconsin-permanent-pier-aerial-hero-002.jpg"
          aria-label="Aerial view of a Lifetime All Seasons HD permanent pier with covered boat lift — Summerset Marine Construction"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#060f1c]/35 to-[#060f1c]/80" />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center md:px-20">
          <div className="mb-7 animate-fade-in-up font-serif text-xs uppercase tracking-[0.3em] text-brand-gold">
            Wisconsin Lake Country
          </div>
          <h1 className="mb-6 m-0 max-w-[820px] animate-fade-in-up font-serif text-5xl font-light italic leading-[1.0] text-brand-offwhite delay-150 md:text-[82px]">
            Built for<br />the Water's Edge
          </h1>
          <div className="mb-6 h-px w-12 animate-fade-in-up bg-brand-gold delay-300" />
          <p className="mb-11 m-0 max-w-[540px] animate-fade-in-up font-serif text-lg font-light leading-relaxed tracking-wider text-brand-offwhite/70 delay-500 md:text-[21px]">
            Permanent pier systems &amp; boat lifts crafted<br />for Wisconsin's finest lakes
          </p>
          <div className="pointer-events-auto animate-fade-in-up delay-700">
            <Button href="/consultation" variant="primary" size="large">
              Begin Your Project
            </Button>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="font-serif text-[10px] uppercase tracking-[0.22em] text-brand-offwhite/35">
            Scroll
          </span>
          <div className="h-9 w-px bg-gradient-to-b from-brand-offwhite/30 to-transparent" />
        </div>
      </section>

      {/* 2. Intro Band */}
      <section className="bg-brand-offwhite px-6 py-24 md:px-20 md:py-[88px]">
        <div className="mx-auto grid max-w-[1040px] items-start gap-12 md:grid-cols-[1fr_1px_1fr] md:gap-[72px]">
          <div>
            <h2 className="mb-5 m-0 font-serif text-4xl font-normal leading-[1.1] text-[#201f1d] md:text-[44px]">
              The permanent<br /><em className="italic">difference.</em>
            </h2>
            <div className="mb-6 h-px w-8 bg-brand-gold" />
            <p className="m-0 text-pretty font-serif text-base leading-[1.9] text-[#4a4540] text-justify md:text-[17px]">
              For over two decades, Summerset Marine has set the standard for permanent marine construction on Wisconsin's premier lakes. Our structures don't merely hold — they endure season after season, through ice and storm, outlasting every seasonal dock on the block.
            </p>
          </div>
          <div className="hidden self-stretch bg-brand-border md:block w-px" />
          <div>
            <div className="mb-7 font-serif text-xs uppercase tracking-[0.22em] text-brand-gold">
              Our Commitment
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-5">
                <div className="mt-3 h-px w-7 shrink-0 bg-brand-gold" />
                <div>
                  <div className="mb-1 font-serif text-[19px] font-semibold text-[#201f1d]">Engineered for Wisconsin</div>
                  <div className="font-serif text-sm leading-[1.75] text-[#6b6560]">Designed for freeze-thaw cycles, high winds, and decades of lake conditions.</div>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="mt-3 h-px w-7 shrink-0 bg-brand-gold" />
                <div>
                  <div className="mb-1 font-serif text-[19px] font-semibold text-[#201f1d]">Complete Project Management</div>
                  <div className="font-serif text-sm leading-[1.75] text-[#6b6560]">Consultation, permitting, installation, and ongoing service — one relationship.</div>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="mt-3 h-px w-7 shrink-0 bg-brand-gold" />
                <div>
                  <div className="mb-1 font-serif text-[19px] font-semibold text-[#201f1d]">Lifetime Structural Warranty</div>
                  <div className="font-serif text-sm leading-[1.75] text-[#6b6560]">Every pier system carries our full structural warranty — unconditionally.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Systems */}
      <div className="border-t border-brand-border bg-brand-offwhite px-6 pb-12 pt-16 text-center md:px-20 md:pb-[52px] md:pt-[64px]">
        <div className="mb-4 font-serif text-xs uppercase tracking-[0.28em] text-brand-gold">
          Our Systems
        </div>
        <h2 className="m-0 font-serif text-4xl font-light text-[#201f1d] md:text-[48px]">
          Permanence, Elevated
        </h2>
      </div>

      <div className="grid border-t border-brand-border md:grid-cols-2">
        <img
          src="/images/smc/wisconsin-lifetime-all-seasons-hd-pier-aerial-001.jpg"
          alt="Permanent Pier Systems"
          className="h-64 w-full object-cover md:h-[480px]"
          loading="lazy"
        />
        <div className="flex flex-col justify-center bg-brand-offwhite px-8 py-12 md:border-l md:border-brand-border md:px-[72px] md:py-[68px]">
          <div className="mb-5 font-serif text-xs uppercase tracking-[0.24em] text-brand-gold">
            01 — Pier Systems
          </div>
          <h3 className="mb-5 m-0 font-serif text-4xl font-light leading-[1.0] text-[#201f1d] md:text-[50px]">
            Permanent<br />Pier Systems
          </h3>
          <div className="mb-6 h-px w-8 bg-brand-gold" />
          <p className="mb-9 m-0 text-pretty font-serif text-base leading-[1.9] text-[#5a5550] text-justify md:text-[17px]">
            Four flagship systems — All Seasons HD, All Seasons, Classic, and Minimalist — each engineered for Wisconsin's freeze-thaw reality. Chosen by the owners of Wisconsin's finest lakefront properties for a reason: they outlast everything else.
          </p>
          <Link href="/products/permanent-piers" className="group inline-flex w-fit items-center gap-2 border-b border-[#0a1628] pb-1 font-serif text-xs uppercase tracking-[0.15em] text-[#0a1628] transition-colors hover:border-brand-gold hover:text-brand-gold">
            Explore Systems <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>

      <div className="grid border-t border-brand-border md:grid-cols-2">
        <div className="order-2 flex flex-col justify-center bg-brand-offwhite px-8 py-12 md:order-1 md:border-right md:border-brand-border md:px-[72px] md:py-[68px]">
          <div className="mb-5 font-serif text-xs uppercase tracking-[0.24em] text-brand-gold">
            02 — Boat Lifts
          </div>
          <h3 className="mb-5 m-0 font-serif text-4xl font-light leading-[1.0] text-[#201f1d] md:text-[50px]">
            Lift Systems<br />&amp; Hardware
          </h3>
          <div className="mb-6 h-px w-8 bg-brand-gold" />
          <p className="mb-9 m-0 text-pretty font-serif text-base leading-[1.9] text-[#5a5550] text-justify md:text-[17px]">
            Built-in, standalone, and PWC lifts — precisely matched to your dock and vessel. Protect your investment with equipment engineered to the same exacting standard as your permanent pier. Available from live inventory or custom-specified.
          </p>
          <Link href="/products/lifts" className="group inline-flex w-fit items-center gap-2 border-b border-[#0a1628] pb-1 font-serif text-xs uppercase tracking-[0.15em] text-[#0a1628] transition-colors hover:border-brand-gold hover:text-brand-gold">
            Explore Lifts <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
        <img
          src="/images/smc/wisconsin-lifetime-built-in-boat-lift-001.jpg"
          alt="Boat Lifts"
          className="order-1 h-64 w-full object-cover md:order-2 md:h-[480px]"
          loading="lazy"
        />
      </div>

      <div className="grid border-t border-brand-border md:grid-cols-2">
        <img
          src="/images/smc/wisconsin-marine-contracting-service-hero-001.jpg"
          alt="Marine Contracting"
          className="h-64 w-full object-cover md:h-[480px]"
          loading="lazy"
        />
        <div className="flex flex-col justify-center bg-brand-offwhite px-8 py-12 md:border-l md:border-brand-border md:px-[72px] md:py-[68px]">
          <div className="mb-5 font-serif text-xs uppercase tracking-[0.24em] text-brand-gold">
            03 — Services
          </div>
          <h3 className="mb-5 m-0 font-serif text-4xl font-light leading-[1.0] text-[#201f1d] md:text-[50px]">
            Marine<br />Contracting
          </h3>
          <div className="mb-6 h-px w-8 bg-brand-gold" />
          <p className="mb-9 m-0 text-pretty font-serif text-base leading-[1.9] text-[#5a5550] text-justify md:text-[17px]">
            Full-service marine construction, residential service, and repair. From the first site consultation to the final inspection — and every season after — we are your lakefront's long-term partner. One company, cradle to grave.
          </p>
          <Link href="/services/marine-contracting" className="group inline-flex w-fit items-center gap-2 border-b border-[#0a1628] pb-1 font-serif text-xs uppercase tracking-[0.15em] text-[#0a1628] transition-colors hover:border-brand-gold hover:text-brand-gold">
            Our Services <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>

      {/* 4. Markets */}
      <section className="border-t border-brand-gold/20 bg-brand-navy px-6 py-16 md:px-30 md:py-[80px]">
        <div className="mx-auto max-w-[1040px]">
          <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-[52px] md:flex-row md:items-end">
            <div>
              <div className="mb-4 font-serif text-xs uppercase tracking-[0.28em] text-brand-gold">
                Where We Build
              </div>
              <h2 className="m-0 font-serif text-4xl font-light italic leading-[1.05] text-brand-offwhite md:text-[46px]">
                Wisconsin's Premier Lakes
              </h2>
            </div>
            <Link href="/markets" className="border-b border-brand-gold/50 pb-0.5 font-serif text-[12px] uppercase tracking-[0.15em] text-brand-gold hover:text-brand-offwhite">
              View All Markets
            </Link>
          </div>
          
          <div className="grid grid-cols-2 border-t border-brand-offwhite/10 md:grid-cols-7">
            {MARKETS.map((market, i) => (
              <Link
                key={market.name}
                href={market.href}
                className={`group block cursor-pointer border-brand-offwhite/10 py-7 md:border-r ${i === MARKETS.length - 1 ? 'md:border-r-0' : ''} ${i === 0 ? 'md:pr-4' : 'md:px-4'}`}
              >
                <div className="mb-3 font-serif text-[10px] uppercase tracking-[0.2em] text-brand-gold tabular-nums">
                  {market.num}
                </div>
                <div className="mb-2 font-serif text-[17px] leading-[1.25] text-brand-offwhite transition-colors group-hover:text-brand-gold">
                  {market.name.split(' ').map((word, j) => (
                    <span key={j}>{word}<br /></span>
                  ))}
                </div>
                <div className="mb-4 font-serif text-[11px] text-brand-offwhite/35">
                  {market.count}
                </div>
                <div className="h-px w-4 bg-brand-gold transition-all group-hover:w-8" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Projects */}
      <section className="border-t border-brand-border bg-brand-offwhite px-6 py-16 md:px-30 md:py-[88px]">
        <div className="mx-auto max-w-[1040px]">
          <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-[52px] md:flex-row md:items-baseline">
            <div>
              <div className="mb-4 font-serif text-xs uppercase tracking-[0.28em] text-brand-gold">
                Portfolio
              </div>
              <h2 className="m-0 font-serif text-4xl font-light text-[#201f1d] md:text-[46px]">
                Featured Projects
              </h2>
            </div>
            <Link href="/markets/lake-geneva/projects" className="border-b border-[#0a1628] pb-0.5 font-serif text-[12px] uppercase tracking-[0.14em] text-[#0a1628] hover:border-brand-gold hover:text-brand-gold">
              View All Work
            </Link>
          </div>

          {projects.length >= 5 ? (
            <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr] md:grid-rows-[auto_auto]">
              {projects.map((p, i) => (
                <Link
                  key={p._id}
                  href="/markets/lake-geneva/projects"
                  className={`group relative block overflow-hidden border border-brand-border bg-[#e8e6e1] ${i === 0 ? 'md:row-span-2' : ''}`}
                >
                  {p.afterImageUrl ? (
                    <img
                      src={p.afterImageUrl}
                      alt={p.afterImageAlt || p.title}
                      className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90 ${i === 0 ? 'h-64 md:h-[528px]' : 'h-48 md:h-[256px]'}`}
                      loading="lazy"
                    />
                  ) : (
                    <div className={`w-full ${i === 0 ? 'h-64 md:h-[528px]' : 'h-48 md:h-[256px]'}`} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          ) : (
            <ContentPlaceholder label="Featured project photos (from Sanity projects)" className="mt-8" />
          )}
        </div>
      </section>

      {/* 6. Testimonial Pull Quote */}
      <section className="border-t border-brand-border bg-brand-offwhite px-6 py-16 md:px-30 md:py-[88px]">
        <div className="mx-auto max-w-[720px] text-center">
          <div className="mx-auto mb-9 h-12 w-px bg-brand-border" />
          {testimonials.length > 0 ? (
            <>
              <div
                className={`transition-opacity duration-400 ${fading ? "opacity-0" : "opacity-100"}`}
                aria-live="polite"
              >
                <blockquote className="mb-8 m-0 font-serif text-2xl font-light italic leading-[1.45] text-[#201f1d] md:text-[32px]">
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </blockquote>
                <div className="mx-auto mb-5 h-px w-8 bg-brand-gold" />
                <div className="font-serif text-[14px] uppercase tracking-[0.16em] text-[#6b6560]">
                  &mdash; {testimonials[activeTestimonial].customerName} &middot;{" "}
                  {testimonials[activeTestimonial].lakeLabel}
                </div>
              </div>
              {testimonials.length > 1 && (
                <div className="mt-8 flex justify-center gap-2.5">
                  {testimonials.map((t, i) => (
                    <button
                      key={t._id}
                      type="button"
                      aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
                      onClick={() => {
                        setActiveTestimonial(i);
                        setFading(false);
                      }}
                      className={`h-1.5 w-1.5 cursor-pointer rounded-full border-0 p-0 transition-colors ${
                        i === activeTestimonial ? "bg-brand-gold" : "bg-brand-border"
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <ContentPlaceholder label="Featured testimonial (from Sanity)" />
          )}
          <div className="mx-auto mt-8 h-12 w-px bg-brand-border" />
        </div>
      </section>

      {/* 6b. Google Reviews (Elfsight) — hidden entirely in production until the widget ID is set */}
      {googleReviewsEnabled && (
      <section className="border-t border-brand-border bg-brand-offwhite px-6 pb-16 md:px-30 md:pb-[88px]">
        <div className="mx-auto max-w-[1080px]">
          <div className="pt-14 pb-10 text-center">
            <div className="mb-4 font-serif text-xs uppercase tracking-[0.28em] text-brand-gold">
              From Our Clients
            </div>
            <h2 className="m-0 font-serif text-3xl font-light italic text-[#201f1d] md:text-[38px]">
              Google Reviews
            </h2>
          </div>
          <GoogleReviews />
        </div>
      </section>
      )}

      {/* 7. Final CTA */}
      <section className="bg-brand-navy px-6 py-20 text-center md:px-30 md:py-[108px]">
        <div className="mx-auto max-w-[620px]">
          <div className="mb-6 font-serif text-xs uppercase tracking-[0.28em] text-brand-gold">
            Start the Conversation
          </div>
          <h2 className="mb-6 m-0 font-serif text-5xl font-light italic leading-[1.02] text-brand-offwhite md:text-[60px]">
            Ready to build<br />on the water?
          </h2>
          <div className="mx-auto mb-8 h-px w-12 bg-brand-gold" />
          <p className="mb-12 m-0 text-pretty font-serif text-lg leading-[1.8] text-brand-offwhite/60 md:text-[18px]">
            Our consultants serve Wisconsin lake country — no obligation, no pressure. Every great project begins with a single conversation.
          </p>
          <Button href="/consultation" variant="primary" size="large">
            Schedule a Consultation
          </Button>
        </div>
      </section>
    </Layout>
  );
}

