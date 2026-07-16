import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { productSchema } from "@/components/seo/JsonLd";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import CTABlock from "@/components/ui/CTABlock";

/**
 * No dedicated commercial pier page exists on the current summersetmarine.com
 * site, so all product copy for this page is PLACEHOLDER — SMC TO SUPPLY.
 */
export default function CommercialPierPage() {
  return (
    <Layout>
      <PageMeta
        title="Commercial Piers | Summerset Marine Construction"
        description="Commercial-grade permanent pier systems by Summerset Marine Construction — engineered for marinas, resorts, and municipal waterfronts across Wisconsin."
      />
      <JsonLd
        data={productSchema({
          name: "Commercial Pier Systems",
          brand: "Lifetime",
          category: "Permanent Pier",
          description:
            "Commercial-grade permanent pier systems engineered for marinas, resorts, and municipal waterfronts across Wisconsin.",
        })}
      />

      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
            Lifetime by Summerset Marine Construction
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">Commercial Piers</h1>
          <video
            src="/videos/pier-commercial.mp4"
            poster="/images/smc/wisconsin-commercial-pier-baileys-harbor-aerial-001.png"
            className="mt-8 aspect-[21/9] w-full rounded-lg object-cover"
            autoPlay muted loop playsInline
            aria-label="Aerial view of the Baileys Harbor marina commercial marine construction project, Door County, Wisconsin"
            />
        </div>
      </section>

      {/* All content PLACEHOLDER — SMC TO SUPPLY (no source page on current site) */}
      <section className="mx-auto max-w-content space-y-6 px-6 py-16">
        <ContentPlaceholder label="Commercial pier product overview copy" />
        <ContentPlaceholder label="Commercial capabilities and engineering details" />
        <ContentPlaceholder label="Specification table (dimensions, load capacity, material specs)" />
        <div>
          <h2 className="font-serif text-3xl text-brand-navy">Commercial Project Gallery</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <img
              src="/images/smc/wisconsin-commercial-pier-baileys-harbor-marina-002.jpg"
              alt="Baileys Harbor marina commercial pier project, Door County, Wisconsin — Summerset Marine Construction"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
            <img
              src="/images/smc/wisconsin-commercial-pier-rock-island-003.jpg"
              alt="Rock Island commercial marine contracting project, Wisconsin — Summerset Marine Construction"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
            <img
              src="/images/smc/wisconsin-commercial-pier-rock-island-004.jpg"
              alt="Rock Island commercial pier construction, Wisconsin — Summerset Marine Construction"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
            <img
              src="/images/smc/wisconsin-commercial-pier-r1ver-milwaukee-005.jpg"
              alt="R1ver commercial dock project on the Milwaukee River — Summerset Marine Construction"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
          </div>
        </div>
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
        headline="Planning a commercial waterfront project?"
        primaryCta={{ label: "Get a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
