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
    label: "Seamless Dock Integration",
    copy: "Built directly into the dock frame for a clean, clutter-free appearance and a permanent, reliable lift solution."
  },
  {
    label: "Durable, Low-Maintenance Materials",
    copy: "Crafted from marine-grade aluminum and stainless steel, the lift resists corrosion, wear, and weather—delivering long-term performance with minimal upkeep."
  },
  {
    label: "Automated Operation with Custom Fit",
    copy: "Designed to fit a wide range of boats and pontoons, with smooth motorized controls that lift at the press of a button."
  }
];

const INSTALLATIONS = [
  {
    lake: "Lake Mendota, Wisconsin",
    items: [
      { value: "9,781", label: "Acres" },
      { value: "42'", label: "Max depth" },
      { value: "21+", label: "Installations" }
    ]
  },
  {
    lake: "Geneva Lake, Wisconsin",
    items: [
      { value: "5,401", label: "Acres" },
      { value: "61'", label: "Max depth" },
      { value: "14+", label: "Installations" }
    ]
  }
];

const SPECS = [
  { label: "Material", value: "Marine-grade aluminum and stainless steel" },
  { label: "Operation", value: "Motorized" },
  { label: "Integration", value: "Built directly into dock frame" }
];

export default function BuiltInLiftsPage() {
  return (
    <Layout>
      <PageMeta
        title="Lifetime Built-In Lift | Summerset Marine Construction"
        description="The Lifetime Built-In Lift integrates into your pier — push-button boat access, built from marine-grade aluminum and stainless steel."
      />
      <JsonLd
        data={productSchema({
          name: "Lifetime Built-In Lift",
          brand: "Lifetime",
          category: "Boat Lift",
          description:
            "The ultimate boat storage and protection solution — integrates seamlessly into your pier for hassle-free access at the push of a button.",
        })}
      />

      <ProductBreadcrumb 
        items={[
          { label: "Products", href: "/products" },
          { label: "Lifts", href: "/products/lifts" },
          { label: "Built-In" }
        ]} 
      />

      <ProductHero
        kicker="Lift Systems"
        title="Built-In Lift"
        description="The ultimate boat storage and protection solution for waterfront homeowners. Unlike freestanding lifts, our built-in lifts integrate seamlessly into your pier."
        videoSrc="/videos/lift-built-in.mp4"
      />

      <ProductNavStrip 
        links={[
          { label: "Built-In Lifts", href: "/products/lifts/built-in", active: true },
          { label: "Standalone Lifts", href: "/products/lifts/standalone" },
          { label: "PWC Lifts", href: "/products/lifts/pwc" }
        ]} 
      />

      <ProductFeatures
        kicker="Why Built-In"
        title="Effortless Boat Access. Fully Built In."
        features={FEATURES}
      />

      <ProductLakeStats
        title={<>Where Built-In Lifts<br/>have been installed</>}
        stats={INSTALLATIONS}
      />

      <ProductSpecs
        title={<>Built-In Lift<br/><em>at a glance</em></>}
        specs={SPECS}
      />

      <CTABlock
        variant="dark"
        headline="Interested in a Lifetime Built-In Lift?"
        primaryCta={{ label: "Request a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
