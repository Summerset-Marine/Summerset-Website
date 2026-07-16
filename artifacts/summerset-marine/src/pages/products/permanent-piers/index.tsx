import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import { Link } from "wouter";
import CTABlock from "@/components/ui/CTABlock";
import { ProductBreadcrumb, ProductHero, ProductNavStrip } from "@/components/ui/ProductDetail";

export default function PermanentPiersPage() {
  return (
    <Layout>
      <PageMeta
        title="Permanent Piers | Summerset Marine Construction"
        description="Permanent Piers — Summerset Marine Construction, Wisconsin's builder of permanent piers, boat lifts, and marine contracting systems."
      />

      <ProductBreadcrumb 
        items={[
          { label: "Products", href: "/products" },
          { label: "Permanent Piers" }
        ]} 
      />

      <ProductHero
        kicker="Pier Systems"
        title="Permanent Piers"
        description="Explore our complete line of permanent pier systems, engineered to stay in the water year-round and built to last."
        posterSrc="/images/smc/wisconsin-permanent-piers-hub-001.jpg"
        ctaLabel=""
      />

      <ProductNavStrip 
        links={[
          { label: "All Seasons HD", href: "/products/permanent-piers/all-seasons-hd" },
          { label: "All Seasons", href: "/products/permanent-piers/all-seasons" },
          { label: "Classic", href: "/products/permanent-piers/classic" },
          { label: "Minimalist", href: "/products/permanent-piers/minimalist" },
          { label: "Commercial", href: "/products/permanent-piers/commercial" }
        ]} 
      />

      <section className="bg-brand-offwhite px-6 md:px-[120px] py-[88px]">
        <div className="max-w-[1040px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]">
          <Link href="/products/permanent-piers/all-seasons-hd" className="group block border border-brand-hairline bg-white p-[32px] transition-colors hover:border-brand-gold">
            <h3 className="font-serif text-[24px] text-brand-navy mb-[12px] group-hover:text-brand-gold transition-colors">All Seasons HD</h3>
            <p className="font-serif text-[15px] text-brand-gray">Our most robust permanent pier system, engineered for Wisconsin's harshest conditions.</p>
          </Link>
          <Link href="/products/permanent-piers/all-seasons" className="group block border border-brand-hairline bg-white p-[32px] transition-colors hover:border-brand-gold -ml-[1px]">
            <h3 className="font-serif text-[24px] text-brand-navy mb-[12px] group-hover:text-brand-gold transition-colors">All Seasons</h3>
            <p className="font-serif text-[15px] text-brand-gray">Engineered to withstand harsh winters and stay in the water all year long.</p>
          </Link>
          <Link href="/products/permanent-piers/classic" className="group block border border-brand-hairline bg-white p-[32px] transition-colors hover:border-brand-gold -ml-[1px]">
            <h3 className="font-serif text-[24px] text-brand-navy mb-[12px] group-hover:text-brand-gold transition-colors">Classic</h3>
            <p className="font-serif text-[15px] text-brand-gray">The charm of traditional wood piers with the low-maintenance durability of aluminum.</p>
          </Link>
          <Link href="/products/permanent-piers/minimalist" className="group block border border-brand-hairline bg-white p-[32px] transition-colors hover:border-brand-gold -mt-[1px]">
            <h3 className="font-serif text-[24px] text-brand-navy mb-[12px] group-hover:text-brand-gold transition-colors">Minimalist</h3>
            <p className="font-serif text-[15px] text-brand-gray">Clean design with uncompromising strength. Sleek lines and open-frame construction.</p>
          </Link>
          <Link href="/products/permanent-piers/commercial" className="group block border border-brand-hairline bg-white p-[32px] transition-colors hover:border-brand-gold -ml-[1px] -mt-[1px]">
            <h3 className="font-serif text-[24px] text-brand-navy mb-[12px] group-hover:text-brand-gold transition-colors">Commercial</h3>
            <p className="font-serif text-[15px] text-brand-gray">Commercial-grade permanent pier systems engineered for marinas and resorts.</p>
          </Link>
        </div>
      </section>
      
      <CTABlock
        variant="dark"
        headline="Find the perfect pier."
        primaryCta={{ label: "Request a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
