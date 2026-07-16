import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import HeroSection from "@/components/ui/HeroSection";

export default function LiftsPage() {
  return (
    <Layout>
      <PageMeta
        title="Boat Lifts | Summerset Marine Construction"
        description="Boat Lifts — Summerset Marine Construction, Wisconsin's builder of permanent piers, boat lifts, and marine contracting systems."
      />
      <HeroSection
        variant="video-bg"
        videoSrc="/videos/lifts-hub.mp4"
        headline="Boat Lifts"
        imageSrc="/images/smc/wisconsin-lifetime-boat-lifts-hub-001.jpg"
        imageAlt="Lifetime All Seasons HD steel pier with integrated boat lift and canopy on Geneva Lake, Wisconsin"
      />
      <section className="mx-auto max-w-content px-6 py-22">
        <p className="mt-4 text-brand-gray">Page content coming soon.</p>
      </section>
    </Layout>
  );
}
