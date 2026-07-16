import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { productSchema } from "@/components/seo/JsonLd";
import CTABlock from "@/components/ui/CTABlock";
import {
  ProductBreadcrumb,
  ProductHero,
  ProductFeatures,
  ProductSpecs
} from "@/components/ui/ProductDetail";

const FEATURES = [
  {
    label: "Easy Install & Removal",
    copy: "Designed for simple seasonal adjustments, ideal for changing water levels."
  },
  {
    label: "Lightweight Aluminum",
    copy: "Strong yet light enough to handle during the spring and fall."
  },
  {
    label: "Flexible Layouts",
    copy: "Modular sections allow you to reconfigure your pier shape every year."
  }
];

const SPECS = [
  { label: "Type", value: "Removable Seasonal" },
  { label: "Material", value: "Aluminum Frame" }
];

export default function SeasonalSystemsPage() {
  return (
    <Layout>
      <PageMeta
        title="Seasonal Systems | Summerset Marine Construction"
        description="Seasonal Systems — Summerset Marine Construction, Wisconsin's builder of permanent piers, boat lifts, and marine contracting systems."
      />
      <JsonLd
        data={productSchema({
          name: "Seasonal Pier Systems",
          brand: "Lifetime",
          category: "Seasonal Pier",
          description: "Removable seasonal pier systems for easy install and removal.",
        })}
      />

      <ProductBreadcrumb 
        items={[
          { label: "Products", href: "/products" },
          { label: "Seasonal Systems" }
        ]} 
      />

      <ProductHero
        kicker="Seasonal Systems"
        title="Seasonal Piers"
        description="Versatile and lightweight seasonal pier systems designed for easy spring installation and fall removal, offering flexible layouts."
        videoSrc="/videos/seasonal.mp4"
      />

      <ProductFeatures
        kicker="Why Seasonal"
        title="Versatile and easy."
        features={FEATURES}
      />

      <ProductSpecs
        title={<>Seasonal Systems<br/><em>at a glance</em></>}
        specs={SPECS}
      />

      <CTABlock
        variant="dark"
        headline="Plan your seasonal waterfront."
        primaryCta={{ label: "Request a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
