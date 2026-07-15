import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import ContactForm from "@/components/ui/ContactForm";

export default function ContactPage() {
  return (
    <Layout>
      <PageMeta
        title="Contact Us | Summerset Marine Construction"
        description="Contact Summerset Marine Construction — Wisconsin's builder of permanent piers, boat lifts, and marine contracting systems."
        canonical="https://summersetmarine.com/contact"
      />

      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h1 className="font-serif text-4xl md:text-5xl">Contact Us</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Questions about piers, lifts, service, or anything else &mdash; we&rsquo;re here to
            help.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <ContactForm formType="contact" />
          </div>
          <div className="space-y-8 self-start">
          <div className="rounded-lg border border-brand-border bg-brand-offwhite p-8">
            <h2 className="font-serif text-2xl text-brand-navy">Summerset Marine Construction</h2>
            <p className="mt-4 text-brand-gray">W3128 WI-HWY 59, Whitewater, WI 53190</p>
            <p className="mt-2 text-brand-gray">
              Phone:{" "}
              <a href="tel:+18008169698" className="font-medium text-brand-blue">
                (800) 816-9698
              </a>
            </p>
            <p className="mt-2 text-brand-gray">
              Email:{" "}
              <a
                href="mailto:info@summersetmarine.com"
                className="font-medium text-brand-blue"
              >
                info@summersetmarine.com
              </a>
            </p>
            <p className="mt-4 text-brand-gray">
              Additional locations in Madison, Green Lake, and Door County &mdash; see{" "}
              <a href="/locations" className="font-medium text-brand-blue">
                Locations
              </a>
              .
            </p>
          </div>
          <img
            src="/images/smc/wisconsin-pier-consultation-contact-001.jpg"
            alt="Lifetime Classic pier on Lac La Belle, Wisconsin — Summerset Marine Construction"
            className="w-full rounded-lg object-cover"
          />
          </div>
        </div>
      </section>
    </Layout>
  );
}
