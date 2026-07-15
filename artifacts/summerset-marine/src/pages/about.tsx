import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";

export default function AboutPage() {
  return (
    <Layout>
      <PageMeta
        title="About | Summerset Marine Construction"
        description="About — Summerset Marine Construction, Wisconsin's builder of permanent piers, boat lifts, and marine contracting systems."
      />
      <section className="mx-auto max-w-content px-6 py-22">
        <h1 className="font-serif text-4xl text-brand-navy">About</h1>
        <p className="mt-4 text-brand-gray">Page content coming soon.</p>
      </section>
    </Layout>
  );
}
