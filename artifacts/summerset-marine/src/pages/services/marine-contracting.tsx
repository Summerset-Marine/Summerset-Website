import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import HeroSection from "@/components/ui/HeroSection";

export default function MarineContractingPage() {
  return (
    <Layout>
      <PageMeta
        title="Marine Contracting | Summerset Marine Construction"
        description="Marine Contracting — Summerset Marine Construction, Wisconsin's builder of permanent piers, boat lifts, and marine contracting systems."
      />
      <HeroSection
        variant="full-bleed"
        headline="Marine Contracting"
        imageSrc="/images/smc/wisconsin-marine-contracting-service-hero-001.jpg"
        imageAlt="Marine contracting barge and equipment on a Wisconsin waterway — Summerset Marine Construction"
      />
      <section className="mx-auto max-w-content px-6 py-22">
        <p className="mt-4 text-brand-gray">Page content coming soon.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <img
            src="/images/smc/wisconsin-marine-contracting-service-r1ver-002.jpg"
            alt="R1ver marine contracting project on the Milwaukee River — Summerset Marine Construction"
            className="aspect-[4/3] w-full rounded-lg object-cover"
          />
          <img
            src="/images/smc/wisconsin-marine-contracting-service-rock-island-003.jpg"
            alt="Rock Island marine contracting project, Wisconsin — Summerset Marine Construction"
            className="aspect-[4/3] w-full rounded-lg object-cover"
          />
        </div>
      </section>
    </Layout>
  );
}
