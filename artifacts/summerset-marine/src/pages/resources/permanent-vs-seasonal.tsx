import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import CTABlock from "@/components/ui/CTABlock";
import Button from "@/components/ui/Button";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";

const SECTIONS = [
  {
    heading: "Cost Comparison: Upfront vs. Lifetime",
    label: "cost comparison — permanent vs seasonal pier systems (upfront, annual, lifetime)",
  },
  {
    heading: "Maintenance: What Each System Asks of You",
    label: "maintenance comparison — seasonal install/removal labor vs permanent system upkeep",
  },
  {
    heading: "Longevity & Durability",
    label: "longevity comparison — expected service life, ice and storm performance",
  },
  {
    heading: "When a Seasonal System Makes Sense",
    label: "recommended scenarios for seasonal pier systems",
  },
  {
    heading: "When a Permanent System Makes Sense",
    label: "recommended scenarios for permanent pier systems",
  },
] as const;

export default function PermanentVsSeasonalPage() {
  return (
    <Layout>
      <PageMeta
        title="Permanent vs. Seasonal Piers | Summerset Marine"
        description="Compare permanent and seasonal pier systems from Summerset Marine Construction. Learn which option is right for your Wisconsin waterfront property."
        canonical="https://summersetmarine.com/resources/permanent-vs-seasonal"
      />

      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
            Permanent vs. Seasonal Pier Systems: Which Is Right for You?
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            An honest comparison of cost, maintenance, and longevity &mdash; so you can choose
            the right system for your shoreline.
          </p>
        </div>
      </section>

      {SECTIONS.map((section, i) => (
        <section key={section.heading} className={i % 2 === 1 ? "bg-brand-offwhite" : ""}>
          <div className="mx-auto max-w-content px-6 py-14">
            <h2 className="font-serif text-3xl text-brand-navy">{section.heading}</h2>
            <ContentPlaceholder label={section.label} className="mt-6 max-w-3xl" />
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-content px-6 py-14">
        <h2 className="font-serif text-3xl text-brand-navy">Explore Our Permanent Systems</h2>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button href="/products/permanent-piers" variant="secondary">
            Permanent Piers
          </Button>
          <Button href="/products/lifts" variant="secondary">
            Boat &amp; PWC Lifts
          </Button>
          <Button href="/resources/what-does-a-pier-cost" variant="secondary">
            What Does a Pier Cost?
          </Button>
          <Button href="/resources/faq" variant="secondary">
            Read the FAQ
          </Button>
        </div>
      </section>

      <CTABlock
        variant="dark"
        headline="Not sure which system fits your shoreline?"
        subheadline="Request a consultation — we'll assess your waterfront and recommend the right approach."
        primaryCta={{ label: "Get a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
