import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { localBusinessSchema, serviceSchema } from "@/components/seo/JsonLd";
import ContactForm from "@/components/ui/ContactForm";
import ContactHighlights from "@/components/ui/ContactHighlights";

export default function GreenLakeContactPage() {
  return (
    <Layout>
      <PageMeta
        title="Request a Green Lake Pier Consultation | Summerset Marine"
        description="Request a consultation with Summerset Marine for your Green Lake pier or boat lift project."
        canonical="https://summersetmarine.com/markets/green-lake/contact"
      />
      <JsonLd
        data={localBusinessSchema({
          market: "Green Lake",
          marketSlug: "green-lake",
          lake: "Green Lake",
          coordinates: { latitude: "43.8480", longitude: "-88.9601" },
          telephone: "(800) 816-9698",
        })}
      />
      <JsonLd
        data={serviceSchema({
          name: "Pier & Boat Lift Consultation",
          market: "Green Lake",
          marketSlug: "green-lake",
          lake: "Green Lake",
        })}
      />

      {/* 1–2. Header */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h1 className="font-serif text-4xl md:text-5xl">
            Request a Green Lake Consultation
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Serving Green Lake and the surrounding Green Lake area.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* 3. Form */}
          <div>
            <ContactForm formType="consultation" market="Green Lake" />
          </div>

          {/* 4–5. Contact info, featured photo, testimonial */}
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
            </div>
            <ContactHighlights market="green-lake" marketLabel="Green Lake" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
