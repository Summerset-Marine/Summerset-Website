import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import ContactForm from "@/components/ui/ContactForm";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";

export default function ConsultationPage() {
  return (
    <Layout>
      <PageMeta
        title="Request a Consultation | Summerset Marine Construction"
        description="Request a consultation with Summerset Marine Construction. Tell us about your Wisconsin waterfront project — we'll be in touch within one business day."
        canonical="https://summersetmarine.com/consultation"
      />

      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h1 className="font-serif text-4xl md:text-5xl">Request a Consultation</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Tell us about your project &mdash; we&rsquo;ll be in touch within one business day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <ContactForm formType="consultation" />
          </div>
          <div className="space-y-8">
            <div className="rounded-lg border border-brand-border bg-brand-offwhite p-8">
              <h2 className="font-serif text-2xl text-brand-navy">Talk to Our Team</h2>
              <p className="mt-4 text-brand-gray">
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
              <p className="mt-4 leading-relaxed text-brand-gray">
                Since 1990, Summerset Marine has engineered and built permanent waterfront
                systems across Wisconsin &mdash; fully bonded and insured, with in-house
                professional engineering.
              </p>
            </div>
            <img
              src="/images/smc/wisconsin-pier-consultation-contact-001.jpg"
              alt="Lifetime Classic pier on Lac La Belle, Wisconsin — Summerset Marine Construction"
              className="w-full rounded-lg object-cover"
            />
            <ContentPlaceholder label="one customer testimonial for the consultation page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
