import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { productSchema } from "@/components/seo/JsonLd";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import Button from "@/components/ui/Button";
import CTABlock from "@/components/ui/CTABlock";

/* Features — ported verbatim from summersetmarine.com/boat-pwc-lifts (PWC section) */
const FEATURES = [
  {
    label: "Quick Launch & Retrieval",
    copy: "Designed for fast, easy use without complicated operation.",
  },
  {
    label: "Built for Smaller Watercraft",
    copy: "Optimized for jet skis and personal watercraft.",
  },
  {
    label: "Compact Design",
    copy: "Takes up less space while maintaining functionality.",
  },
];

/* SEO-valuable lake captions — ported exactly */
const INSTALLATIONS = [
  {
    caption: "Lifetime PWC Platform Lift.",
    lake: "Pewaukee Lake, Wisconsin",
    stats: ["Average Depth: 15 Feet", "Square Acres: 2,450"],
  },
  {
    caption: "Lifetime PWC Platform Lift.",
    lake: "Lake Mendota, Wisconsin",
    stats: ["Average Depth: 42 Feet", "Square Acres: 9,781"],
  },
  {
    caption: "Lifetime PWC Platform Lift.",
    lake: "Lac La Belle, Wisconsin",
    stats: ["Average Depth: 10 Feet", "Square Acres: 1,154"],
  },
];

export default function PwcLiftsPage() {
  return (
    <Layout>
      <PageMeta
        title="Lifetime PWC Platform Lift | Summerset Marine Construction"
        description="Lifetime PWC Platform Lifts are designed specifically for jet skis and smaller watercraft — quick, efficient access with lightweight, easy-to-use systems."
      />
      <JsonLd
        data={productSchema({
          name: "Lifetime PWC Platform Lift",
          brand: "Lifetime",
          category: "Boat Lift",
          description:
            "Designed specifically for jet skis and smaller watercraft — quick, efficient access with lightweight, easy-to-use systems.",
        })}
      />

      {/* Hero — image PLACEHOLDER — SMC TO SUPPLY */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
            Lifetime Lifts
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">Lifetime PWC Platform Lift</h1>
          {/* Intro — ported verbatim */}
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/85">
            The Lifetime PWC Platform Lifts are designed specifically for jet skis and smaller
            watercraft, offering quick access and easy operation. Lightweight and efficient, they
            make getting on and off the water fast and convenient.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button href="/consultation?interest=lifts" variant="primary" size="large">
              Inquire About This Lift
            </Button>
          </div>
          <div className="mt-8">
            <ContentPlaceholder label="PWC Platform Lift hero image" />
          </div>
        </div>
      </section>

      {/* Features — ported verbatim */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl uppercase text-brand-navy">
          Fast, Simple Access.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.label} className="rounded-lg border border-brand-border bg-white p-7 shadow-sm">
              <h3 className="font-semibold text-brand-navy">{f.label}</h3>
              <p className="mt-2 leading-relaxed text-brand-gray">{f.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lake captions — SEO-valuable, ported exactly */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl text-brand-navy">On Wisconsin Waters</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
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
        <ContentPlaceholder label="PWC Platform Lift specification table" />
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
        headline="Interested in a Lifetime PWC Platform Lift?"
        subheadline="Display and inquiry only — no online purchase. Our team will walk you through options for your waterfront."
        primaryCta={{ label: "Inquire About This Lift", href: "/consultation?interest=lifts" }}
      />
    </Layout>
  );
}
