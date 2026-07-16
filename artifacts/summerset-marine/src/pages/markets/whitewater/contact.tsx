import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { localBusinessSchema, serviceSchema } from "@/components/seo/JsonLd";
import ContactForm from "@/components/ui/ContactForm";
import ContactHighlights from "@/components/ui/ContactHighlights";

export default function WhitewaterContactPage() {
  return (
    <Layout>
      <PageMeta
        title="Request a Whitewater Pier Consultation | Summerset Marine"
        description="Request a consultation with Summerset Marine for your Whitewater area pier or boat lift project."
        canonical="https://summersetmarine.com/markets/whitewater/contact"
      />
      <JsonLd
        data={localBusinessSchema({
          market: "Whitewater",
          marketSlug: "whitewater",
          lake: "Whitewater area lakes",
          coordinates: { latitude: "42.8336", longitude: "-88.7323" },
          telephone: "(800) 816-9698",
        })}
      />
      <JsonLd
        data={serviceSchema({
          name: "Pier & Boat Lift Consultation",
          market: "Whitewater",
          marketSlug: "whitewater",
          lake: "Whitewater area lakes",
        })}
      />

      {/* 1–2. Header */}
      <section className="bg-brand-offwhite text-brand-black border-b border-brand-hairline">
        <div className="mx-auto max-w-content px-6 py-16">
          <h1 className="font-serif text-4xl md:text-5xl">
            Request a Whitewater Consultation
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-brand-black/70">
            Serving Whitewater area lakes and the surrounding Whitewater area.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* 3. Form */}
          <div>
            <ContactForm formType="consultation" market="Whitewater" />
          </div>

          {/* 4–5. Contact info, featured photo, testimonial */}
          <div className="space-y-8">
            <div className="border border-brand-hairline bg-brand-offwhite p-8">
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
            </div>
            <ContactHighlights market="whitewater" marketLabel="Whitewater" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
