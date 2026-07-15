import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import HeroSection from "@/components/ui/HeroSection";

export default function PermanentPiersPage() {
  return (
    <Layout>
      <PageMeta
        title="Permanent Piers | Summerset Marine Construction"
        description="Permanent Piers — Summerset Marine Construction, Wisconsin's builder of permanent piers, boat lifts, and marine contracting systems."
      />
      <HeroSection
        variant="full-bleed"
        headline="Permanent Piers"
        imageSrc="/images/smc/wisconsin-permanent-piers-hub-001.jpg"
        imageAlt="Aerial view of a Lifetime permanent pier installation on a Wisconsin lake — Summerset Marine Construction"
      />
      <section className="mx-auto max-w-content px-6 py-22">
        <p className="mt-4 text-brand-gray">Page content coming soon.</p>
      </section>
    </Layout>
  );
}
