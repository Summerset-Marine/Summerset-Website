import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { productSchema } from "@/components/seo/JsonLd";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import CTABlock from "@/components/ui/CTABlock";

/* Features — ported verbatim from summersetmarine.com/lifetime-all-seasons-hd-piers */
const FEATURES = [
  {
    label: "Heavy-Duty Frame for High-Load Capacity",
    copy: "Extra-thick steel structure and welded connections provide superior strength for use in deep water, with larger boats, and on wave-prone shorelines.",
  },
  {
    label: "Year-Round Stability",
    copy: "Designed to remain in place all year, even through freezing conditions, eliminating the hassle of seasonal removal.",
  },
  {
    label: "Reinforced Support Legs",
    copy: "Oversized piling foundation secured into varying lake bottoms, delivering unwavering stability season after season.",
  },
  {
    label: "Less Waiting, More Waterfront",
    copy: "With zero annual teardown and minimal maintenance, the Lifetime All Seasons HD Pier saves you hours every season\u2014so you can spend less time waiting and more time living.",
  },
];

/* Lake-specific installation statistics — ported exactly as they appear on the current site */
const INSTALLATIONS = [
  {
    caption: "Lifetime All Seasons HD9 With Built-In Lift.",
    lake: "Lake Mendota, Wisconsin",
    stats: ["Average Depth: 74 Feet", "Square Acres: 14,286", "Longest Fetch: 5.1 Miles"],
  },
  {
    caption: "Lifetime All Seasons HD9 with Built-In Lifts and Powered Stairs.",
    lake: "Lake Minnetonka, Minnesota",
    stats: ["Max Depth: 31 Feet", "Square Acres: 14,528"],
  },
  {
    caption: "Lifetime All Seasons HD9 with Built-In Lift and Platform Lift with Ladder.",
    lake: "Geneva Lake, Wisconsin",
    stats: ["Average Depth: 61 Feet", "Square Acres: 5,401"],
  },
];

export default function AllSeasonsHDPage() {
  return (
    <Layout>
      <PageMeta
        title="Lifetime All Seasons HD Pier | Summerset Marine Construction"
        description="The Lifetime All Seasons HD is Summerset's premier permanent pier system — HDPE decking, engineered for year-round Wisconsin conditions, no seasonal removal required."
      />
      <JsonLd
        data={productSchema({
          name: "Lifetime All Seasons HD Pier",
          brand: "Lifetime",
          category: "Permanent Pier",
          description:
            "Summerset's premier permanent pier system — HDPE decking, engineered for year-round Wisconsin conditions, no seasonal removal required.",
        })}
      />

      {/* Hero — image PLACEHOLDER — SMC TO SUPPLY */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
            Lifetime by Summerset Marine Construction
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">Lifetime All Seasons HD Pier</h1>
          {/* Intro — ported verbatim */}
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/85">
            Specifically designed for vast and volatile summer waters and unpredictable, relentless
            winter ice, our Lifetime All Seasons HD Piers represent the pinnacle of pier
            engineering, providing the safety and reliability our clients demand.
          </p>
          <p className="mt-4 font-serif text-xl italic text-white/90">
            You&rsquo;re either in or you&rsquo;re out.
          </p>
          <div className="mt-8">
            <ContentPlaceholder label="All Seasons HD hero image" />
          </div>
        </div>
      </section>

      {/* HD vs All Seasons comparison + features — ported verbatim */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl uppercase text-brand-navy">
          The Muscle Behind Your Waterfront
        </h2>
        <p className="mt-4 max-w-3xl text-brand-gray">
          Where the Lifetime All Seasons Pier is engineered to stay in the water all year long, the
          All Seasons HD steps up with an extra-thick steel structure for deep water, larger boats,
          and wave-prone shorelines.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.label} className="rounded-lg border border-brand-border bg-white p-7 shadow-sm">
              <h3 className="font-semibold text-brand-navy">{f.label}</h3>
              <p className="mt-2 leading-relaxed text-brand-gray">{f.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering copy — ported verbatim */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl uppercase text-brand-navy">
            Designed to Stay. Engineered to Impress.
          </h2>
          <p className="mt-4 max-w-3xl italic text-brand-gray">
            From deep lakebeds to ice-packed winters, the Lifetime All Seasons HD Pier stands firm
            where others fail&mdash;delivering seamless function and undeniable curb appeal.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-brand-navy">Precision-Built for Performance</h3>
              <p className="mt-2 leading-relaxed text-brand-gray">
                Crafted with 9&quot; steel pipe pilings and anchored by pilings driven up to 60
                feet deep in the lakebed, this pier shrugs off wave action, ice movement, and wind
                shear&mdash;ensuring maximum stability year-round.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-navy">DNR-Endorsed Strength</h3>
              <p className="mt-2 leading-relaxed text-brand-gray">
                Trusted by the Department of Natural Resources, our system meets the highest
                standards for safety, sustainability, and impact resistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lake installation stats — ported exactly */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">Proven on Big Water</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {INSTALLATIONS.map((inst) => (
            <div key={inst.lake + inst.caption} className="rounded-lg border border-brand-border bg-white p-6 shadow-sm">
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
      </section>

      {/* PLACEHOLDER sections — SMC TO SUPPLY */}
      <section className="mx-auto max-w-content space-y-6 px-6 pb-16">
        <ContentPlaceholder label="Specification table (dimensions, load capacity, material specs)" />
        <ContentPlaceholder label="Project gallery photos (4\u20136 images)" />
        <ContentPlaceholder label="Customer testimonials" />
      </section>

      <CTABlock
        variant="dark"
        headline="Engineered for every season. Built for your shoreline."
        primaryCta={{ label: "Get a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
