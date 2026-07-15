import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import Button from "@/components/ui/Button";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";

export default function CareersPage() {
  return (
    <Layout>
      <PageMeta
        title="Careers | Summerset Marine Construction"
        description="Join the Summerset Marine Construction team — Wisconsin's builder of permanent piers, boat lifts, and marine contracting systems."
        canonical="https://summersetmarine.com/careers"
      />

      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h1 className="font-serif text-4xl md:text-5xl">Careers at Summerset Marine</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Build things that last a lifetime &mdash; on the water, with a crew that takes
            pride in the work.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          <img
            src="/images/smc/summerset-marine-whitewater-facility-001.jpg"
            alt="Demo pond outside Summerset Marine's Whitewater showroom with docks and a covered boat lift"
            className="aspect-[4/3] w-full rounded-lg object-cover"
          />
          <img
            src="/images/smc/summerset-marine-whitewater-facility-002.jpg"
            alt="Carpentry and manufacturing shop inside Summerset Marine's Whitewater facility"
            className="aspect-[4/3] w-full rounded-lg object-cover"
          />
        </div>
        <h2 className="mt-14 font-serif text-3xl text-brand-navy">Why Work Here</h2>
        <ContentPlaceholder
          label="culture copy — what it's like to work at Summerset Marine"
          className="mt-6 max-w-3xl"
        />
      </section>

      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl text-brand-navy">Open Roles</h2>
          <ContentPlaceholder
            label="open roles list — Insert Rippling ATS embed or link URL here"
            className="mt-6 max-w-3xl"
          />
          <div className="mt-8">
            <Button href="#" variant="primary" size="large">
              View Open Positions
            </Button>
            <p className="mt-3 text-sm text-brand-gray">
              (Button links to the Rippling ATS &mdash; URL pending from SMC.)
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
