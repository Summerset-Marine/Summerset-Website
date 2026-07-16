import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import { Link } from "wouter";
import CTABlock from "@/components/ui/CTABlock";
import { ProductBreadcrumb, ProductHero, ProductNavStrip } from "@/components/ui/ProductDetail";

export default function LiftsPage() {
  return (
    <Layout>
      <PageMeta
        title="Boat Lifts | Summerset Marine Construction"
        description="Boat Lifts — Summerset Marine Construction, Wisconsin's builder of permanent piers, boat lifts, and marine contracting systems."
      />

      <ProductBreadcrumb 
        items={[
          { label: "Products", href: "/products" },
          { label: "Lifts" }
        ]} 
      />

      <ProductHero
        kicker="Lift Systems"
        title="Boat Lifts"
        description="Protect your investment with our range of boat lifts, from built-in systems to standalone solutions."
        videoSrc="/videos/lifts-hub.mp4"
        ctaLabel=""
      />

      <ProductNavStrip 
        links={[
          { label: "Built-In Lifts", href: "/products/lifts/built-in" },
          { label: "Standalone Lifts", href: "/products/lifts/standalone" },
          { label: "PWC Lifts", href: "/products/lifts/pwc" }
        ]} 
      />

      <section className="bg-brand-offwhite px-6 md:px-[120px] py-[88px]">
        <div className="max-w-[1040px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[2px]">
          <Link href="/products/lifts/built-in" className="group block border border-brand-hairline bg-white p-[32px] transition-colors hover:border-brand-gold">
            <h3 className="font-serif text-[24px] text-brand-navy mb-[12px] group-hover:text-brand-gold transition-colors">Built-In Lifts</h3>
            <p className="font-serif text-[15px] text-brand-gray">The ultimate boat storage solution, integrated seamlessly into your pier.</p>
          </Link>
          <Link href="/products/lifts/standalone" className="group block border border-brand-hairline bg-white p-[32px] transition-colors hover:border-brand-gold -ml-[1px]">
            <h3 className="font-serif text-[24px] text-brand-navy mb-[12px] group-hover:text-brand-gold transition-colors">Standalone Lifts</h3>
            <p className="font-serif text-[15px] text-brand-gray">Rugged, independent boat lifts without permanent dock integration.</p>
          </Link>
          <Link href="/products/lifts/pwc" className="group block border border-brand-hairline bg-white p-[32px] transition-colors hover:border-brand-gold -ml-[1px]">
            <h3 className="font-serif text-[24px] text-brand-navy mb-[12px] group-hover:text-brand-gold transition-colors">PWC Lifts</h3>
            <p className="font-serif text-[15px] text-brand-gray">Quick, efficient access specifically designed for jet skis and smaller watercraft.</p>
          </Link>
        </div>
      </section>

      <CTABlock
        variant="dark"
        headline="Keep your boat secure."
        primaryCta={{ label: "Request a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
