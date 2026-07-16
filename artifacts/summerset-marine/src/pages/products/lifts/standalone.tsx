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
    label: "Flexible, Freestanding Design",
    copy: "Ideal for docks, piers, or open water installs—no structural tie-in required."
  },
  {
    label: "Heavy-Duty Materials",
    copy: "Built from marine-grade aluminum and stainless steel for corrosion resistance and long-term durability in harsh environments."
  },
  {
    label: "Effortless, Automated Operation",
    copy: "Remote- or switch-controlled lifting makes boat access smooth and simple, without the physical strain or seasonal wear."
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
    lake: "Lake Wisconsin, Wisconsin",
    items: [
      { value: "7,197", label: "Acres" },
      { value: "24'", label: "Max depth" },
      { value: "8+", label: "Installations" }
    ]
  }
];

const SPECS = [
  { label: "Material", value: "Aluminum and stainless steel" },
  { label: "Design", value: "Freestanding" },
  { label: "Installation", value: "Dock, pier, or open water" }
];

export default function StandaloneLiftsPage() {
  return (
    <Layout>
      <PageMeta
        title="Lifetime Standalone Lift | Summerset Marine Construction"
        description="The Lifetime Standalone Lift — a rugged, independent, easy-to-use boat lift. Freestanding strength, no dock integration required."
      />
      <JsonLd
        data={productSchema({
          name: "Lifetime Standalone Lift",
          brand: "Lifetime",
          category: "Boat Lift",
          description:
            "A rugged, independent, easy-to-use boat lift without permanent dock integration — a secure, efficient way to store and protect your boat.",
        })}
      />

      <ProductBreadcrumb 
        items={[
          { label: "Products", href: "/products" },
          { label: "Lifts", href: "/products/lifts" },
          { label: "Standalone Lifts" }
        ]} 
      />

      <ProductHero
        kicker="Lift Systems"
        title="Standalone Lifts"
        description="Designed for boat owners who need a rugged, independent, easy-to-use boat lift without permanent dock integration."
        videoSrc="/videos/lift-standalone.mp4"
      />

      <ProductNavStrip 
        links={[
          { label: "Built-In Lifts", href: "/products/lifts/built-in" },
          { label: "Standalone Lifts", href: "/products/lifts/standalone", active: true },
          { label: "PWC Lifts", href: "/products/lifts/pwc" }
        ]} 
      />

      <ProductFeatures
        kicker="Why Standalone Lifts"
        title="Freestanding Strength. Seamless Performance."
        features={FEATURES}
      />

      <ProductLakeStats
        title={<>Where Standalone Lifts<br/>have been installed</>}
        stats={INSTALLATIONS}
      />

      <ProductSpecs
        title={<>Standalone Lifts<br/><em>at a glance</em></>}
        specs={SPECS}
      />

      <CTABlock
        variant="dark"
        headline="Interested in a Lifetime Standalone Lift?"
        primaryCta={{ label: "Request a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
