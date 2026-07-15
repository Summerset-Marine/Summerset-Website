import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { productSchema } from "@/components/seo/JsonLd";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import CTABlock from "@/components/ui/CTABlock";

/* Features — ported verbatim from summersetmarine.com/lifetime-all-seasons */
const FEATURES = [
  {
    label: "No Seasonal Removal",
    copy: "Leave your pier in year-round\u2014even through winter. Skip the takedown, save thousands of dollars every year, and enjoy stress-free lake living.",
  },
  {
    label: "Engineered for Every Season",
    copy: "Factory-welded steel frames and pilings driven up to 60 feet deep provide rock-solid performance during ice, wind, and fluctuating water levels.",
  },
  {
    label: "Low-Maintenance, Wood-Look Decking",
    copy: "HDPE planks stay cool underfoot, resist fading and splinters, and never need sealing or staining. Just rinse and enjoy.",
  },
];

/* Lake installation captions — ported exactly */
const INSTALLATIONS = [
  {
    caption: "Lifetime All Seasons 7 with Stairs, Dock Box, and PaddleBoard Rack",
    lake: "Oconomowoc Lake",
    stats: ["Average Depth: 32 Feet", "Square Acres: 818"],
  },
  {
    caption: "Lifetime All Seasons 7 with Lifetime Built-In Lift, Stairs, and Kayak Rack.",
    lake: "Oconomowoc Lake",
    stats: ["Average Depth: 32 Feet", "Square Acres: 818"],
  },
  {
    caption: "Lifetime All Seasons Pier.",
    lake: "Pewaukee Lake",
    stats: ["Average Depth: 15 Feet", "Square Acres: 2,437"],
  },
];

export default function AllSeasonsPage() {
  return (
    <Layout>
      <PageMeta
        title="Lifetime All Seasons Pier | Summerset Marine Construction"
        description="The Lifetime All Seasons Pier is engineered to withstand harsh winters and stay in the water all year long — premium HDPE decking on a robust steel frame."
      />
      <JsonLd
        data={productSchema({
          name: "Lifetime All Seasons Pier",
          brand: "Lifetime",
          category: "Permanent Pier",
          description:
            "Engineered to withstand harsh winters and stay in the water all year long. Premium HDPE plastic decking on a robust steel frame for exceptional durability.",
        })}
      />

      {/* Hero — image PLACEHOLDER — SMC TO SUPPLY */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
            Lifetime by Summerset Marine Construction
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">Lifetime All Seasons Pier</h1>
          {/* Intro — ported verbatim */}
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/85">
            The Lifetime All Seasons Pier is engineered to withstand harsh winters and stay in the
            water all year long. Featuring premium HDPE plastic decking on a robust steel frame,
            these piers offer exceptional durability and resistance to wear and tear.
          </p>
          <div className="mt-8">
            <ContentPlaceholder label="All Seasons hero image" />
          </div>
        </div>
      </section>

      {/* Features — ported verbatim */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl uppercase text-brand-navy">
          Built to Save You Time and Money.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.label} className="rounded-lg border border-brand-border bg-white p-7 shadow-sm">
              <h3 className="font-semibold text-brand-navy">{f.label}</h3>
              <p className="mt-2 leading-relaxed text-brand-gray">{f.copy}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl italic text-brand-gray">
          Spend more time on the water and less time worrying about your pier. The Lifetime All
          Seasons Pier stays in place all year. No removal, no rot, no rival.
        </p>
        <h3 className="mt-4 font-serif text-2xl uppercase text-brand-navy">
          Built to Stay In and Keep Life Simple
        </h3>
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

      <CTABlock
        variant="dark"
        headline="Skip the takedown. Keep the waterfront."
        primaryCta={{ label: "Get a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
