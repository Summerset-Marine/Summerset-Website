import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { productSchema } from "@/components/seo/JsonLd";
import CTABlock from "@/components/ui/CTABlock";
import {
  ProductBreadcrumb,
  ProductHero,
  ProductFeatures
} from "@/components/ui/ProductDetail";

const FEATURES = [
  {
    label: "Dock Boxes",
    copy: "Keep your gear secure and out of the way with our durable, weather-resistant dock boxes."
  },
  {
    label: "Kayak Racks",
    copy: "Easily store kayaks and paddleboards right on your pier, freeing up deck space."
  },
  {
    label: "Dock Ladders",
    copy: "Safe, sturdy aluminum ladders designed for easy water access."
  }
];

export default function AccessoriesPage() {
  return (
    <Layout>
      <PageMeta
        title="Accessories | Summerset Marine Construction"
        description="Accessories — Summerset Marine Construction, Wisconsin's builder of permanent piers, boat lifts, and marine contracting systems."
      />
      <JsonLd
        data={productSchema({
          name: "Pier Accessories",
          brand: "Lifetime",
          category: "Accessories",
          description: "Enhance your waterfront with our premium pier accessories.",
        })}
      />

      <ProductBreadcrumb 
        items={[
          { label: "Products", href: "/products" },
          { label: "Accessories" }
        ]} 
      />

      <ProductHero
        kicker="Enhance Your Pier"
        title="Accessories"
        description="Complete your waterfront experience with our range of premium dock accessories, designed to integrate seamlessly with your Lifetime pier."
        videoSrc="/videos/accessories.mp4"
      />

      <ProductFeatures
        kicker="Available Accessories"
        title="Everything you need."
        features={FEATURES}
      />

      <section className="bg-brand-offwhite px-6 md:px-[120px] py-[88px] border-t border-brand-hairline">
        <div className="max-w-[1040px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 border border-brand-hairline">
              <img src="/images/smc/wisconsin-pier-accessory-dock-box-001.png" className="w-full aspect-[4/3] object-cover mb-4" alt="Dock Box" />
              <h3 className="font-serif text-xl text-brand-navy mb-2">Dock Boxes</h3>
            </div>
            <div className="bg-white p-6 border border-brand-hairline">
              <img src="/images/smc/wisconsin-pier-accessory-kayak-rack-001.jpg" className="w-full aspect-[4/3] object-cover mb-4" alt="Kayak Rack" />
              <h3 className="font-serif text-xl text-brand-navy mb-2">Kayak Racks</h3>
            </div>
            <div className="bg-white p-6 border border-brand-hairline">
              <img src="/images/smc/wisconsin-pier-accessory-dock-ladder-001.jpg" className="w-full aspect-[4/3] object-cover mb-4" alt="Dock Ladder" />
              <h3 className="font-serif text-xl text-brand-navy mb-2">Dock Ladders</h3>
            </div>
          </div>
        </div>
      </section>

      <CTABlock
        variant="dark"
        headline="Complete your waterfront."
        primaryCta={{ label: "Request a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
