import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { productSchema } from "@/components/seo/JsonLd";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import CTABlock from "@/components/ui/CTABlock";

/* Features — ported verbatim from summersetmarine.com/lifetime-classic */
const FEATURES = [
  {
    label: "Effortless Maintenance",
    copy: "Clean it with soap and water\u2014no sanding, sealing, or staining required, ever.",
  },
  {
    label: "Premium HDPE Decking",
    copy: "Mimics the warm look of wood without warping, rotting, or splintering. Available in four rich color options to complement your home and shoreline.",
  },
  {
    label: "Midwest-Welded Aluminum Frame",
    copy: "Built strong and lightweight for easy seasonal installation and removal, year after year.",
  },
];

/* Lake installation captions — ported exactly */
const INSTALLATIONS = [
  {
    caption: "Lifetime Classic With Lifetime Built-In Lifts",
    lake: "Pewaukee Lake, Wisconsin",
    stats: ["Average Depth: 15 Feet", "Square Acres: 2,437"],
  },
  {
    caption: "Lifetime Classic With Lifetime Built-In Lift With Stairs",
    lake: "Lake Mendota, Wisconsin",
    stats: ["Average Depth: 42 Feet", "Square Acres: 9,781"],
  },
];

export default function ClassicPierPage() {
  return (
    <Layout>
      <PageMeta
        title="Lifetime Classic Pier | Summerset Marine Construction"
        description="The Lifetime Classic Pier combines the charm of traditional wood piers with low-maintenance aluminum and HDPE decking — classic look, seasonal simplicity."
      />
      <JsonLd
        data={productSchema({
          name: "Lifetime Classic Pier",
          brand: "Lifetime",
          category: "Permanent Pier",
          description:
            "Combines the classic charm of traditional wood piers with the low-maintenance durability of aluminum and HDPE plastic decking.",
        })}
      />

      {/* Hero — image PLACEHOLDER — SMC TO SUPPLY */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
            Lifetime by Summerset Marine Construction
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">Lifetime Classic Pier</h1>
          {/* Intro — ported verbatim */}
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/85">
            The Lifetime Classic Pier design combines the classic charm of traditional wood piers
            with the low-maintenance durability of aluminum and HDPE (High-Density Polyethylene)
            plastic decking. This innovative design captures the authentic wood pier aesthetic
            while offering a long-lasting, hassle-free experience that perfectly complements your
            home and enhances your shoreline.
          </p>
          <div className="mt-8">
            <img
              src="/images/smc/wisconsin-lifetime-classic-pier-aerial-001.jpg"
              alt="Lifetime Classic permanent pier aerial view — Summerset Marine Construction Wisconsin"
              className="aspect-[21/9] w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features — ported verbatim */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl uppercase text-brand-navy">
          Seasonal Beauty. Lasting Craftsmanship.
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
          Classic Look. Seasonal Simplicity.
        </h3>
        <p className="mt-3 max-w-3xl italic text-brand-gray">
          Made to install easily, look incredible, and hold up summer after summer.
        </p>
      </section>

      {/* Lake installation stats — ported exactly */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl text-brand-navy">On Wisconsin Waters</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {INSTALLATIONS.map((inst) => (
              <div key={inst.caption} className="rounded-lg bg-white p-6 shadow-sm">
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
        headline="The warmth of wood, without the work."
        primaryCta={{ label: "Get a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
