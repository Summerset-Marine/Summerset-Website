import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import HeroSection from "@/components/ui/HeroSection";

export default function AccessoriesPage() {
  return (
    <Layout>
      <PageMeta
        title="Accessories | Summerset Marine Construction"
        description="Accessories — Summerset Marine Construction, Wisconsin's builder of permanent piers, boat lifts, and marine contracting systems."
      />
      <HeroSection
        variant="video-bg"
        videoSrc="/videos/accessories.mp4"
        headline="Accessories"
        imageSrc="/images/smc/wisconsin-pier-accessory-dock-box-001.png"
        imageAlt="Lifetime pier accessories — Summerset Marine Construction"
      />
      <section className="mx-auto max-w-content px-6 py-22">
        <p className="mt-4 text-brand-gray">Page content coming soon.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <figure>
            <img
              src="/images/smc/wisconsin-pier-accessory-dock-box-001.png"
              alt="Lifetime dock box pier accessory — Summerset Marine Construction"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
            <figcaption className="mt-3 text-sm text-brand-gray">Dock Boxes</figcaption>
          </figure>
          <figure>
            <img
              src="/images/smc/wisconsin-pier-accessory-kayak-rack-001.jpg"
              alt="Kayak rack pier accessory on a Lifetime pier — Summerset Marine Construction"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
            <figcaption className="mt-3 text-sm text-brand-gray">Kayak Racks</figcaption>
          </figure>
          <figure>
            <img
              src="/images/smc/wisconsin-pier-accessory-dock-ladder-001.jpg"
              alt="White dock ladder descending into clear blue Wisconsin lake water"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
            <figcaption className="mt-3 text-sm text-brand-gray">Dock Ladders</figcaption>
          </figure>
        </div>
      </section>
    </Layout>
  );
}
