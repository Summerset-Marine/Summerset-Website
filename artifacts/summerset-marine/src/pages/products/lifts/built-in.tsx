import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { productSchema } from "@/components/seo/JsonLd";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import Button from "@/components/ui/Button";
import CTABlock from "@/components/ui/CTABlock";

/* Features — ported verbatim from summersetmarine.com/lifetime-built-in-lift-product */
const FEATURES = [
  {
    label: "Seamless Dock Integration",
    copy: "Built directly into the dock frame for a clean, clutter-free appearance and a permanent, reliable lift solution.",
  },
  {
    label: "Durable, Low-Maintenance Materials",
    copy: "Crafted from marine-grade aluminum and stainless steel, the lift resists corrosion, wear, and weather\u2014delivering long-term performance with minimal upkeep.",
  },
  {
    label: "Automated Operation with Custom Fit",
    copy: "Designed to fit a wide range of boats and pontoons, with smooth motorized controls that lift at the press of a button.",
  },
];

/* SEO-valuable lake captions — ported exactly from the existing pages */
const INSTALLATIONS = [
  {
    caption: "Lifetime All Seasons HD9 With Built-In Lift And Bench",
    lake: "Lake Mendota, Wisconsin",
    stats: ["Average Depth: 42 Feet", "Square Acres: 9,781"],
  },
  {
    caption: "Lifetime All Seasons HD7 With Built-In Lift And Powered Stairs",
    lake: "Lauderdale Lake, Wisconsin",
    stats: ["Maximum Depth: 60 Feet", "Square Acres: 807"],
  },
  {
    caption: "Lifetime All Seasons HD9 With Built-In Lift And Custom Platform Lift.",
    lake: "Geneva Lake, Wisconsin",
    stats: ["Average Depth: 61 Feet", "Square Acres: 5,401"],
  },
  {
    caption: "Lifetime Built-In Lifts.",
    lake: "Beaver Lake, Wisconsin",
    stats: ["Average Depth: 15 Feet", "Square Acres: 313"],
  },
  {
    caption: "Lifetime All Seasons 7 With Built-In Lift, Awning, And Kayak Rack",
    lake: "Upper Nemahbin Lake, Wisconsin",
    stats: ["Average Depth: 30 Feet", "Square Acres: 277"],
  },
];

export default function BuiltInLiftsPage() {
  return (
    <Layout>
      <PageMeta
        title="Lifetime Built-In Lift | Summerset Marine Construction"
        description="The Lifetime Built-In Lift integrates into your pier — push-button boat access, built from marine-grade aluminum and stainless steel."
      />
      <JsonLd
        data={productSchema({
          name: "Lifetime Built-In Lift",
          brand: "Lifetime",
          category: "Boat Lift",
          description:
            "The ultimate boat storage and protection solution — integrates seamlessly into your pier for hassle-free access at the push of a button.",
        })}
      />

      {/* Hero — image PLACEHOLDER — SMC TO SUPPLY */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
            Lifetime Lifts
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">Lifetime Built-In Lift</h1>
          {/* Intro — ported verbatim */}
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/85">
            The Lifetime Built-In Lift is the ultimate boat storage and protection solution for
            waterfront homeowners. Unlike freestanding lifts, our built-in lifts integrate
            seamlessly into your pier. Designed for convenience, durability, and longevity, these
            lifts provide hassle-free access to your boat with the push of a button.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button href="/consultation?interest=lifts" variant="primary" size="large">
              Inquire About This Lift
            </Button>
          </div>
          <div className="mt-8">
            <video
              src="/videos/lift-built-in.mp4"
              poster="/images/smc/wisconsin-lifetime-built-in-boat-lift-001.jpg"
              className="aspect-[21/9] w-full rounded-lg object-cover"
              autoPlay muted loop playsInline
              aria-label="Lifetime built-in boat lift installed on a Wisconsin lake — Summerset Marine Construction"
              />
          </div>
        </div>
      </section>

      {/* Features — ported verbatim */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl uppercase text-brand-navy">
          Effortless Boat Access. Fully Built In.
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
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-semibold text-brand-navy">Designed for Seamless Waterfront Living</h3>
            <p className="mt-2 leading-relaxed text-brand-gray">
              The Lifetime Built-In Lift eliminates the seasonal hassle of installing and removing
              external lift systems. Permanently integrated into the dock, it offers a clean,
              elegant look with reliable, space-efficient functionality for any waterfront
              property.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-brand-navy">A Smarter Way to Protect Your Boat</h3>
            <p className="mt-2 leading-relaxed text-brand-gray">
              Skip the cranks, cables, and seasonal stress. With smooth automation and virtually no
              maintenance, the Lifetime Built-In Lift is ideal for both homeowners and marinas
              looking to protect their investment. It&rsquo;s the ultimate upgrade in convenience
              and peace of mind.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-brand-navy">Built to Last. Made to Fit.</h3>
            <p className="mt-2 leading-relaxed text-brand-gray">
              Made from high-grade, corrosion-resistant materials, the Lifetime Built-In Lift
              stands up to tough winters and heavy use. Its compact, engineered design fits a broad
              range of watercraft and pairs with powered stairs or other accessories for a fully
              custom setup.
            </p>
          </div>
        </div>
      </section>

      {/* Lake captions — SEO-valuable, ported exactly */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl uppercase text-brand-navy">
            Your Lift. Built In. Always Ready.
          </h2>
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

      {/* Spec table — PLACEHOLDER — SMC TO SUPPLY */}
      <section className="mx-auto max-w-content px-6 py-14">
        <ContentPlaceholder label="Built-In Lift specification table" />
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
        headline="Interested in a Lifetime Built-In Lift?"
        subheadline="Display and inquiry only — no online purchase. Our team will walk you through options for your waterfront."
        primaryCta={{ label: "Inquire About This Lift", href: "/consultation?interest=lifts" }}
      />
    </Layout>
  );
}
