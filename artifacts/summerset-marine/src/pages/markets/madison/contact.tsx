import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { localBusinessSchema, serviceSchema } from "@/components/seo/JsonLd";
import ContactForm from "@/components/ui/ContactForm";
import ContactHighlights from "@/components/ui/ContactHighlights";

export default function MadisonContactPage() {
  return (
    <Layout>
      <PageMeta
        title="Request a Madison Pier Consultation | Summerset Marine"
        description="Request a consultation with Summerset Marine for your Lake Mendota pier or boat lift project. Serving the Madison area."
        canonical="https://summersetmarine.com/markets/madison/contact"
      />
      <JsonLd
        data={localBusinessSchema({
          market: "Madison",
          marketSlug: "madison",
          lake: "Lake Mendota",
          coordinates: { latitude: "43.1399", longitude: "-89.3372" },
          telephone: "(608) 249-3100",
        })}
      />
      <JsonLd
        data={serviceSchema({
          name: "Pier & Boat Lift Consultation",
          market: "Madison",
          marketSlug: "madison",
          lake: "Lake Mendota",
        })}
      />

      {/* 1–2. Header */}
      <section className="bg-brand-offwhite text-brand-black border-b border-brand-hairline">
        <div className="mx-auto max-w-content px-6 py-16">
          <h1 className="font-serif text-4xl md:text-5xl">
            Request a Madison Consultation
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-brand-black/70">
            Serving Lake Mendota and the surrounding Madison area.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* 3. Form */}
          <div>
            <ContactForm formType="consultation" market="Madison" />
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
            <ContactHighlights market="madison" marketLabel="Madison" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
