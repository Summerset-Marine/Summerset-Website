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
    label: "Clean, Open Aesthetic",
    copy: "A post-free layout keeps views wide and unobstructed, offering modern style and lakefront sophistication."
  },
  {
    label: "Quick Seasonal Setup",
    copy: "Lightweight aluminum framing and modular accessories make installation and removal easy—ideal for changing water levels and compact spaces."
  },
  {
    label: "Low-Maintenance Materials",
    copy: "HDPE decking resists stains, fading, and splinters—no sanding or sealing required. Just rinse and relax."
  }
];

const INSTALLATIONS = [
  {
    lake: "Moose Lake, Wisconsin",
    items: [
      { value: "83", label: "Acres" },
      { value: "40'", label: "Max depth" },
      { value: "5+", label: "Installations" }
    ]
  },
  {
    lake: "Lake Beulah, Wisconsin",
    items: [
      { value: "812", label: "Acres" },
      { value: "17'", label: "Max depth" },
      { value: "4+", label: "Installations" }
    ]
  },
  {
    lake: "Brown Lake, Wisconsin",
    items: [
      { value: "397", label: "Acres" },
      { value: "8'", label: "Max depth" },
      { value: "6+", label: "Installations" }
    ]
  }
];

const SPECS = [
  { label: "Frame material", value: "Aluminum" },
  { label: "Decking", value: "HDPE" }
];

export default function MinimalistPierPage() {
  return (
    <Layout>
      <PageMeta
        title="Lifetime Minimalist Pier | Summerset Marine Construction"
        description="The Lifetime Minimalist Pier delivers clean design with uncompromising strength — sleek lines, open-frame construction, and lasting performance."
      />
      <JsonLd
        data={productSchema({
          name: "Lifetime Minimalist Pier",
          brand: "Lifetime",
          category: "Permanent Pier",
          description:
            "Clean design with uncompromising strength. Sleek lines and open-frame construction offer a modern, understated look for your waterfront.",
        })}
      />

      <ProductBreadcrumb 
        items={[
          { label: "Products", href: "/products" },
          { label: "Permanent Piers", href: "/products/permanent-piers" },
          { label: "Minimalist" }
        ]} 
      />

      <ProductHero
        kicker="Pier Systems"
        title="Minimalist"
        description="Clean design with uncompromising strength. With sleek lines and open-frame construction, it offers a modern, understated look."
        videoSrc="/videos/pier-minimalist.mp4"
      />

      <ProductNavStrip 
        links={[
          { label: "All Seasons HD", href: "/products/permanent-piers/all-seasons-hd" },
          { label: "All Seasons", href: "/products/permanent-piers/all-seasons" },
          { label: "Classic", href: "/products/permanent-piers/classic" },
          { label: "Minimalist", href: "/products/permanent-piers/minimalist", active: true },
          { label: "Commercial", href: "/products/permanent-piers/commercial" }
        ]} 
      />

      <ProductFeatures
        kicker="Why Minimalist"
        title="Streamlined Design. Seasonal Flexibility."
        features={FEATURES}
      />

      <ProductLakeStats
        title={<>Where Minimalist<br/>has been installed</>}
        stats={INSTALLATIONS}
      />

      <ProductSpecs
        title={<>Minimalist<br/><em>at a glance</em></>}
        specs={SPECS}
      />

      <CTABlock
        variant="dark"
        headline="High design, low effort."
        primaryCta={{ label: "Request a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
