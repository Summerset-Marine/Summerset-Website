import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { localBusinessSchema, serviceSchema } from "@/components/seo/JsonLd";
import ContactForm from "@/components/ui/ContactForm";
import ContactHighlights from "@/components/ui/ContactHighlights";

export default function DoorCountyContactPage() {
  return (
    <Layout>
      <PageMeta
        title="Request a Door County Pier Consultation | Summerset Marine"
        description="Request a consultation with Summerset Marine Construction for your Door County pier or marine contracting project. Located at 9580 Rica Ln, Brussels, WI."
        canonical="https://summersetmarine.com/markets/door-county/contact"
      />
      <JsonLd
        data={localBusinessSchema({
          market: "Door County",
          marketSlug: "door-county",
          lake: "Green Bay, Sturgeon Bay & Lake Michigan",
          coordinates: { latitude: "44.8503", longitude: "-87.3627" },
          telephone: "(800) 816-9698",
        })}
      />
      <JsonLd
        data={serviceSchema({
          name: "Pier & Boat Lift Consultation",
          market: "Door County",
          marketSlug: "door-county",
          lake: "Green Bay, Sturgeon Bay & Lake Michigan",
        })}
      />

      {/* 1–2. Header */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h1 className="font-serif text-4xl md:text-5xl">
            Request a Door County Consultation
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Serving Green Bay, Sturgeon Bay, and Lake Michigan shorelines from our Brussels, WI location.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* 3. Form */}
          <div>
            <ContactForm formType="consultation" market="Door County" />
          </div>

          {/* 4–5. Contact info, featured photo, testimonial */}
          <div className="space-y-8">
            <div className="rounded-lg border border-brand-border bg-brand-offwhite p-8">
              <h2 className="font-serif text-2xl text-brand-navy">Talk to Our Team</h2>
              <p className="mt-4 text-brand-gray">9580 Rica Ln, Brussels, WI 54204</p>
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
            </div>
            <ContactHighlights market="door-county" marketLabel="Door County" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
