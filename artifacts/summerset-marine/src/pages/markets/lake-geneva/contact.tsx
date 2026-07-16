import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { localBusinessSchema, serviceSchema } from "@/components/seo/JsonLd";
import ContactForm from "@/components/ui/ContactForm";
import ContactHighlights from "@/components/ui/ContactHighlights";

export default function LakeGenevaContactPage() {
  return (
    <Layout>
      <PageMeta
        title="Request a Lake Geneva Pier Consultation | Summerset Marine"
        description="Request a consultation with Summerset Marine Construction for your Geneva Lake pier or boat lift project. Serving the Lake Geneva area since 1990."
        canonical="https://summersetmarine.com/markets/lake-geneva/contact"
      />
      <JsonLd
        data={localBusinessSchema({
          market: "Lake Geneva",
          marketSlug: "lake-geneva",
          lake: "Geneva Lake",
          coordinates: { latitude: "42.5920", longitude: "-88.4343" },
          telephone: "(800) 816-9698",
        })}
      />
      <JsonLd
        data={serviceSchema({
          name: "Pier & Boat Lift Consultation",
          market: "Lake Geneva",
          marketSlug: "lake-geneva",
          lake: "Geneva Lake",
        })}
      />

      {/* 1–2. Header */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h1 className="font-serif text-4xl md:text-5xl">
            Request a Lake Geneva Consultation
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Serving Geneva Lake and the Lake Geneva area since 1990.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* 3. Form */}
          <div>
            <ContactForm formType="consultation" market="Lake Geneva" />
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
            <ContactHighlights market="lake-geneva" marketLabel="Lake Geneva" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
