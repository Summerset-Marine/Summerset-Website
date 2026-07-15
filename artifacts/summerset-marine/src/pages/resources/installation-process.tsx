import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import CTABlock from "@/components/ui/CTABlock";
import Button from "@/components/ui/Button";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";

const SECTIONS = [
  "From Consultation to Design",
  "Permitting and Engineering",
  "Construction and Final Walkthrough",
] as const;

export default function InstallationProcessPage() {
  return (
    <Layout>
      <PageMeta
        title="The Pier Installation Process, Step by Step | Summerset Marine Construction"
        description="See how Summerset Marine Construction installs a permanent pier — from consultation and engineering to permitting and construction on your Wisconsin shoreline."
        canonical="https://summersetmarine.com/resources/installation-process"
      />

      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-5xl">What Is the Pier Installation Process?</h1>
          <img
            src="/images/smc/wisconsin-pier-installation-process-001.jpg"
            alt="Summerset Marine crew member welding a steel pier structure on a Wisconsin lake, sparks flying"
            className="mt-10 aspect-[21/9] w-full rounded-lg object-cover"
          />
        </div>
      </section>

      {SECTIONS.map((heading, i) => (
        <section key={heading} className={i % 2 === 1 ? "bg-brand-offwhite" : ""}>
          <div className="mx-auto max-w-content px-6 py-14">
            <h2 className="font-serif text-3xl text-brand-navy">{heading}</h2>
            <ContentPlaceholder label={`${heading} — body copy`} className="mt-6 max-w-3xl" />
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-content px-6 py-14">
        <h2 className="font-serif text-3xl text-brand-navy">Learn More</h2>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button href="/products/permanent-piers" variant="secondary">
            Permanent Piers
          </Button>
          <Button href="/products/lifts" variant="secondary">
            Boat &amp; PWC Lifts
          </Button>
          <Button href="/markets/lake-geneva" variant="secondary">
            Lake Geneva
          </Button>
          <Button href="/markets/oconomowoc" variant="secondary">
            Oconomowoc / Lake Country
          </Button>
          <Button href="/markets/door-county" variant="secondary">
            Door County
          </Button>
          <Button href="/resources/faq" variant="secondary">
            Read the FAQ
          </Button>
        </div>
      </section>

      <CTABlock
        variant="dark"
        headline="Ready to talk specifics?"
        subheadline="Request a consultation and get answers for your exact shoreline."
        primaryCta={{ label: "Get a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
