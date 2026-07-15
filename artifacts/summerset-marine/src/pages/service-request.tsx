import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import ContactForm from "@/components/ui/ContactForm";

export default function ServiceRequestPage() {
  return (
    <Layout>
      <PageMeta
        title="Request Service | Summerset Marine Construction"
        description="Request seasonal installation, removal, repairs, or inspections from Summerset Marine Construction in Wisconsin."
        canonical="https://summersetmarine.com/service-request"
      />

      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h1 className="font-serif text-4xl md:text-5xl">Request Service</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            For seasonal installation, removal, repairs, and inspections.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="max-w-2xl">
            <ContactForm formType="service-request" />
          </div>
          <img
            src="/images/smc/wisconsin-pier-consultation-contact-001.jpg"
            alt="Lifetime Classic pier on Lac La Belle, Wisconsin — Summerset Marine Construction"
            className="w-full self-start rounded-lg object-cover"
          />
        </div>
      </section>
    </Layout>
  );
}
