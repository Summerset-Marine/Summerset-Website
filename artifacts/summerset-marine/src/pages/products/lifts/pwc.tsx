import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { productSchema } from "@/components/seo/JsonLd";
import CTABlock from "@/components/ui/CTABlock";
import {
  ProductBreadcrumb,
  ProductHero,
  ProductNavStrip,
  ProductFeatures,
  ProductLakeStats,
  ProductSpecs
} from "@/components/ui/ProductDetail";

const FEATURES = [
  {
    label: "Quick Launch & Retrieval",
    copy: "Designed for fast, easy use without complicated operation."
  },
  {
    label: "Built for Smaller Watercraft",
    copy: "Optimized for jet skis and personal watercraft."
  },
  {
    label: "Compact Design",
    copy: "Takes up less space while maintaining functionality."
  }
];

const INSTALLATIONS = [
  {
    lake: "Pewaukee Lake, Wisconsin",
    items: [
      { value: "2,450", label: "Acres" },
      { value: "15'", label: "Max depth" },
      { value: "12+", label: "Installations" }
    ]
  },
  {
    lake: "Lac La Belle, Wisconsin",
    items: [
      { value: "1,154", label: "Acres" },
      { value: "10'", label: "Max depth" },
      { value: "8+", label: "Installations" }
    ]
  }
];

const SPECS = [
  { label: "Material", value: "Aluminum" },
  { label: "Operation", value: "Manual or automated" },
  { label: "Target", value: "Jet skis, PWCs" }
];

export default function PwcLiftsPage() {
  return (
    <Layout>
      <PageMeta
        title="Lifetime PWC Platform Lift | Summerset Marine Construction"
        description="Lifetime PWC Platform Lifts are designed specifically for jet skis and smaller watercraft — quick, efficient access with lightweight, easy-to-use systems."
      />
      <JsonLd
        data={productSchema({
          name: "Lifetime PWC Platform Lift",
          brand: "Lifetime",
          category: "Boat Lift",
          description:
            "Designed specifically for jet skis and smaller watercraft — quick, efficient access with lightweight, easy-to-use systems.",
        })}
      />

      <ProductBreadcrumb 
        items={[
          { label: "Products", href: "/products" },
          { label: "Lifts", href: "/products/lifts" },
          { label: "PWC Platform Lifts" }
        ]} 
      />

      <ProductHero
        kicker="Lift Systems"
        title="PWC Platform Lifts"
        description="Designed specifically for jet skis and smaller watercraft, offering quick access and easy operation."
        posterSrc="/images/smc/wisconsin-lifetime-pwc-jet-ski-lift-001.jpg"
      />

      <ProductNavStrip 
        links={[
          { label: "Built-In Lifts", href: "/products/lifts/built-in" },
          { label: "Standalone Lifts", href: "/products/lifts/standalone" },
          { label: "PWC Lifts", href: "/products/lifts/pwc", active: true }
        ]} 
      />

      <ProductFeatures
        kicker="Why PWC Lifts"
        title="Fast, Simple Access."
        features={FEATURES}
      />

      <ProductLakeStats
        title={<>Where PWC Lifts<br/>have been installed</>}
        stats={INSTALLATIONS}
      />

      <ProductSpecs
        title={<>PWC Platform Lifts<br/><em>at a glance</em></>}
        specs={SPECS}
      />

      <CTABlock
        variant="dark"
        headline="Interested in a Lifetime PWC Platform Lift?"
        primaryCta={{ label: "Request a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
