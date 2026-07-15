import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { productSchema } from "@/components/seo/JsonLd";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import Button from "@/components/ui/Button";
import CTABlock from "@/components/ui/CTABlock";

/* Features — ported verbatim from summersetmarine.com/lifetime-stand-alone-lift */
const FEATURES = [
  {
    label: "Flexible, Freestanding Design",
    copy: "Ideal for docks, piers, or open water installs\u2014no structural tie-in required.",
  },
  {
    label: "Heavy-Duty Materials",
    copy: "Built from marine-grade aluminum and stainless steel for corrosion resistance and long-term durability in harsh environments.",
  },
  {
    label: "Effortless, Automated Operation",
    copy: "Remote- or switch-controlled lifting makes boat access smooth and simple, without the physical strain or seasonal wear.",
  },
];

/* SEO-valuable lake captions — ported exactly from summersetmarine.com/boat-pwc-lifts */
const INSTALLATIONS = [
  {
    caption: "Lifetime Standalone Lift.",
    lake: "Pewaukee Lake, Wisconsin",
    stats: ["Average Depth: 15 Feet", "Square Acres: 2,450"],
  },
  {
    caption: "Lifetime Standalone Lift.",
    lake: "Lake Wisconsin, Wisconsin",
    stats: ["Average Depth: 24 Feet", "Square Acres: 7,197"],
  },
];

export default function StandaloneLiftsPage() {
  return (
    <Layout>
      <PageMeta
        title="Lifetime Standalone Lift | Summerset Marine Construction"
        description="The Lifetime Standalone Lift — a rugged, independent, easy-to-use boat lift with no permanent dock integration required. Freestanding strength, seamless performance."
      />
      <JsonLd
        data={productSchema({
          name: "Lifetime Standalone Lift",
          brand: "Lifetime",
          category: "Boat Lift",
          description:
            "A rugged, independent, easy-to-use boat lift without permanent dock integration — a secure, efficient way to store and protect your boat.",
        })}
      />

      {/* Hero — image PLACEHOLDER — SMC TO SUPPLY */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
            Lifetime Lifts
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">Lifetime Standalone Lift</h1>
          {/* Intro — ported verbatim */}
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/85">
            The Lifetime Standalone Lift is designed for boat owners who need a rugged,
            independent, easy-to-use boat lift without permanent dock integration. Engineered for
            durability, convenience, and longevity, it provides a secure, efficient way to store
            and protect your boat across waterfront settings.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button href="/consultation?interest=lifts" variant="primary" size="large">
              Inquire About This Lift
            </Button>
          </div>
          <div className="mt-8">
            <img
              src="/images/smc/wisconsin-lifetime-standalone-boat-lift-001.jpg"
              alt="Lifetime standalone boat lift installed on a Wisconsin lake — Summerset Marine Construction"
              className="aspect-[21/9] w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features — ported verbatim */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl uppercase text-brand-navy">
          Freestanding Strength. Seamless Performance.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.label} className="rounded-lg border border-brand-border bg-white p-7 shadow-sm">
              <h3 className="font-semibold text-brand-navy">{f.label}</h3>
              <p className="mt-2 leading-relaxed text-brand-gray">{f.copy}</p>
            </div>
          ))}
        </div>

        {/* Supporting copy — ported verbatim */}
        <h3 className="mt-14 font-serif text-2xl uppercase text-brand-navy">
          The Lift That Goes Where Others Can&rsquo;t.
        </h3>
        <p className="mt-3 max-w-3xl italic text-brand-gray">
          Durable, freestanding, and built to protect your boat in virtually any waterfront
          setup&mdash;from open water to piers and beyond.
        </p>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-semibold text-brand-navy">Strength You Can Place Anywhere</h3>
            <p className="mt-2 leading-relaxed text-brand-gray">
              The Lifetime Standalone Lift gives you full boat lift performance without needing
              dock integration. It&rsquo;s engineered for flexibility&mdash;perfect for piers,
              shorelines, or deeper open-water installs&mdash;while delivering exceptional
              protection and stability season after season.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-brand-navy">Reliable Performance, Seamless Style</h3>
            <p className="mt-2 leading-relaxed text-brand-gray">
              Flush-fit decking and access panels give the lift a unified look with your dock. Made
              from Midwest-crafted aluminum and HDPE, the Lifetime Standalone Lift blends strength
              and style without the need for constant maintenance.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-brand-navy">Hidden Hardware. Clean Finish.</h3>
            <p className="mt-2 leading-relaxed text-brand-gray">
              All cables, pulleys, and mechanicals are discreetly housed beneath the
              frame&mdash;protecting them from the elements while keeping your lift surface smooth,
              safe, and visually clean.
            </p>
          </div>
        </div>
      </section>

      {/* Lake captions — SEO-valuable, ported exactly */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl uppercase text-brand-navy">
            Flexible and Versatile.
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {INSTALLATIONS.map((inst) => (
              <div key={inst.caption + inst.lake} className="rounded-lg bg-white p-6 shadow-sm">
                <p className="font-serif italic text-brand-navy">{inst.caption}</p>
                <p className="mt-2 font-semibold text-brand-blue">{inst.lake}</p>
                <ul className="mt-1 text-sm text-brand-gray">
                  {inst.stats.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spec table — PLACEHOLDER — SMC TO SUPPLY */}
      <section className="mx-auto max-w-content px-6 py-14">
        <ContentPlaceholder label="Standalone Lift specification table" />
      </section>

      {/* Where it's installed — internal links to lake pages */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-14">
          <h2 className="font-serif text-3xl text-brand-navy">Where We Install It</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/markets/lake-geneva/geneva-lake" variant="secondary">
              Geneva Lake
            </Button>
            <Button href="/markets/oconomowoc/okauchee-lake" variant="secondary">
              Okauchee Lake
            </Button>
            <Button href="/markets/door-county/green-bay" variant="secondary">
              Green Bay
            </Button>
          </div>
        </div>
      </section>

      <CTABlock
        variant="dark"
        headline="Interested in a Lifetime Standalone Lift?"
        subheadline="Display and inquiry only — no online purchase. Our team will walk you through options for your waterfront."
        primaryCta={{ label: "Inquire About This Lift", href: "/consultation?interest=lifts" }}
      />
    </Layout>
  );
}
