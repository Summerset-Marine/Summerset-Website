import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { productSchema } from "@/components/seo/JsonLd";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import CTABlock from "@/components/ui/CTABlock";

/* Features — ported verbatim from summersetmarine.com/lifetime-minimalist */
const FEATURES = [
  {
    label: "Clean, Open Aesthetic",
    copy: "A post-free layout keeps views wide and unobstructed, offering modern style and lakefront sophistication.",
  },
  {
    label: "Quick Seasonal Setup",
    copy: "Lightweight aluminum framing and modular accessories make installation and removal easy\u2014ideal for changing water levels and compact spaces.",
  },
  {
    label: "Low-Maintenance Materials",
    copy: "HDPE decking resists stains, fading, and splinters\u2014no sanding or sealing required. Just rinse and relax.",
  },
];

/* Lake installation captions — ported exactly */
const INSTALLATIONS = [
  {
    caption: "Lifetime Minimalist with Benches and Stairs",
    lake: "Moose Lake, Wisconsin",
    stats: ["Average Depth: 40 Feet", "Square Acres: 83"],
  },
  {
    caption: "Lifetime Minimalist with Benches and Stairs",
    lake: "Lake Beulah, Wisconsin",
    stats: ["Average Depth: 17 Feet", "Square Acres: 812"],
  },
  {
    caption: "Lifetime Minimalist with Ladder and Awning.",
    lake: "Brown Lake, Wisconsin",
    stats: ["Average Depth: 8 Feet", "Square Acres: 397"],
  },
];

export default function MinimalistPierPage() {
  return (
    <Layout>
      <PageMeta
        title="Lifetime Minimalist Pier | Summerset Marine Construction"
        description="The Lifetime Minimalist Pier delivers clean design with uncompromising strength — sleek lines, open-frame construction, and lasting performance."
      />
      <JsonLd
        data={productSchema({
          name: "Lifetime Minimalist Pier",
          brand: "Lifetime",
          category: "Permanent Pier",
          description:
            "Clean design with uncompromising strength. Sleek lines and open-frame construction offer a modern, understated look for your waterfront.",
        })}
      />

      {/* Hero — image PLACEHOLDER — SMC TO SUPPLY */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
            Lifetime by Summerset Marine Construction
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">Lifetime Minimalist Pier</h1>
          {/* Intro — ported verbatim */}
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/85">
            The Lifetime Minimalist Pier delivers clean design with uncompromising strength. With
            its sleek lines and open-frame construction, it offers a modern, understated look that
            complements your waterfront without overpowering it. Built for those who value
            simplicity, this pier blends subtle elegance with lasting performance.
          </p>
          <div className="mt-8">
            <video
              src="/videos/pier-minimalist.mp4"
              poster="/images/smc/wisconsin-lifetime-minimalist-pier-sunrise-001.jpg"
              className="aspect-[21/9] w-full rounded-lg object-cover"
              autoPlay muted loop playsInline
              aria-label="Lifetime Minimalist permanent pier at sunrise — Summerset Marine Construction Wisconsin"
              />
          </div>
        </div>
      </section>

      {/* Features — ported verbatim */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl uppercase text-brand-navy">
          Streamlined Design. Seasonal Flexibility.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.label} className="rounded-lg border border-brand-border bg-white p-7 shadow-sm">
              <h3 className="font-semibold text-brand-navy">{f.label}</h3>
              <p className="mt-2 leading-relaxed text-brand-gray">{f.copy}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-12 font-serif text-2xl uppercase text-brand-navy">
          Minimal Profile. Maximum Simplicity.
        </h3>
        <p className="mt-3 max-w-3xl italic text-brand-gray">
          Clean lines, quick setup, and zero visual clutter&mdash;this seasonal pier delivers high
          design with low effort.
        </p>
      </section>

      {/* Lake installation stats — ported exactly */}
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

      {/* PLACEHOLDER sections — SMC TO SUPPLY */}
      <section className="mx-auto max-w-content space-y-6 px-6 py-16">
        <ContentPlaceholder label="Specification table (dimensions, load capacity, material specs)" />
        <ContentPlaceholder label="Project gallery photos (4\u20136 images)" />
        <ContentPlaceholder label="Customer testimonials" />
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
        headline="High design, low effort."
        primaryCta={{ label: "Get a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
