import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { productSchema } from "@/components/seo/JsonLd";
import CTABlock from "@/components/ui/CTABlock";
import {
  ProductBreadcrumb,
  ProductHero,
  ProductNavStrip,
  ProductFeatures,
  ProductSpecs
} from "@/components/ui/ProductDetail";

const FEATURES = [
  {
    label: "Marina-Grade Engineering",
    copy: "Designed for commercial applications, handling high traffic and multi-slip configurations."
  },
  {
    label: "Customizable Layouts",
    copy: "Configured to maximize slip counts and optimize flow for your specific waterfront footprint."
  },
  {
    label: "Enduring Durability",
    copy: "Heavy-duty steel construction meant to last decades under commercial use."
  }
];

const SPECS = [
  { label: "Frame material", value: "Commercial-grade steel" },
  { label: "Configurations", value: "Custom" }
];

export default function CommercialPierPage() {
  return (
    <Layout>
      <PageMeta
        title="Commercial Piers | Summerset Marine Construction"
        description="Commercial-grade permanent pier systems by Summerset Marine Construction — engineered for marinas, resorts, and municipal waterfronts across Wisconsin."
      />
      <JsonLd
        data={productSchema({
          name: "Commercial Pier Systems",
          brand: "Lifetime",
          category: "Permanent Pier",
          description:
            "Commercial-grade permanent pier systems engineered for marinas, resorts, and municipal waterfronts across Wisconsin.",
        })}
      />

      <ProductBreadcrumb 
        items={[
          { label: "Products", href: "/products" },
          { label: "Permanent Piers", href: "/products/permanent-piers" },
          { label: "Commercial" }
        ]} 
      />

      <ProductHero
        kicker="Commercial Systems"
        title="Commercial Piers"
        description="Commercial-grade permanent pier systems engineered for marinas, resorts, and municipal waterfronts across Wisconsin."
        videoSrc="/videos/pier-commercial.mp4"
      />

      <ProductNavStrip 
        links={[
          { label: "All Seasons HD", href: "/products/permanent-piers/all-seasons-hd" },
          { label: "All Seasons", href: "/products/permanent-piers/all-seasons" },
          { label: "Classic", href: "/products/permanent-piers/classic" },
          { label: "Minimalist", href: "/products/permanent-piers/minimalist" },
          { label: "Commercial", href: "/products/permanent-piers/commercial", active: true }
        ]} 
      />

      <ProductFeatures
        kicker="Why Commercial"
        title="Built for the Long Haul."
        features={FEATURES}
      />

      <ProductSpecs
        title={<>Commercial<br/><em>at a glance</em></>}
        specs={SPECS}
      />

      <CTABlock
        variant="dark"
        headline="Planning a commercial waterfront project?"
        primaryCta={{ label: "Request a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
