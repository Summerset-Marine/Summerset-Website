import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import HeroSection from "@/components/ui/HeroSection";

export default function SeasonalSystemsPage() {
  return (
    <Layout>
      <PageMeta
        title="Seasonal Systems | Summerset Marine Construction"
        description="Seasonal Systems — Summerset Marine Construction, Wisconsin's builder of permanent piers, boat lifts, and marine contracting systems."
      />
      <HeroSection
        variant="video-bg"
        videoSrc="/videos/seasonal.mp4"
        headline="Seasonal Systems"
        imageSrc="/images/smc/wisconsin-seasonal-pier-brown-lake-001.jpg"
        imageAlt="Lifetime Minimalist pier with sun shade and boat lift at sunrise on Brown Lake, Wisconsin"
      />
      <section className="mx-auto max-w-content px-6 py-22">
        <p className="mt-4 text-brand-gray">Page content coming soon.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <img
            src="/images/smc/wisconsin-seasonal-pier-lake-mendota-001.jpg"
            alt="Seasonal removable pier on Lake Mendota, Wisconsin — Summerset Marine Construction"
            className="aspect-[4/3] w-full rounded-lg object-cover"
          />
          <img
            src="/images/smc/wisconsin-seasonal-pier-moose-lake-001.jpg"
            alt="Lifetime Minimalist seasonal pier on Moose Lake, Wisconsin — Summerset Marine Construction"
            className="aspect-[4/3] w-full rounded-lg object-cover"
          />
        </div>
      </section>
    </Layout>
  );
}
