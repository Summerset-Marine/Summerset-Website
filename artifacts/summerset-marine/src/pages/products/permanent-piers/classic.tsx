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
    label: "Effortless Maintenance",
    copy: "Clean it with soap and water—no sanding, sealing, or staining required, ever."
  },
  {
    label: "Premium HDPE Decking",
    copy: "Mimics the warm look of wood without warping, rotting, or splintering. Available in four rich color options to complement your home and shoreline."
  },
  {
    label: "Midwest-Welded Aluminum Frame",
    copy: "Built strong and lightweight for easy seasonal installation and removal, year after year."
  }
];

const INSTALLATIONS = [
  {
    lake: "Pewaukee Lake, Wisconsin",
    items: [
      { value: "2,437", label: "Acres" },
      { value: "15'", label: "Max depth" },
      { value: "12+", label: "Installations" }
    ]
  },
  {
    lake: "Lake Mendota, Wisconsin",
    items: [
      { value: "9,781", label: "Acres" },
      { value: "42'", label: "Max depth" },
      { value: "8+", label: "Installations" }
    ]
  }
];

const SPECS = [
  { label: "Frame material", value: "Aluminum" },
  { label: "Decking", value: "HDPE or Wood" }
];

export default function ClassicPierPage() {
  return (
    <Layout>
      <PageMeta
        title="Lifetime Classic Pier | Summerset Marine Construction"
        description="The Lifetime Classic Pier combines the charm of traditional wood piers with low-maintenance aluminum and HDPE decking — classic look, seasonal simplicity."
      />
      <JsonLd
        data={productSchema({
          name: "Lifetime Classic Pier",
          brand: "Lifetime",
          category: "Permanent Pier",
          description:
            "Combines the classic charm of traditional wood piers with the low-maintenance durability of aluminum and HDPE plastic decking.",
        })}
      />

      <ProductBreadcrumb 
        items={[
          { label: "Products", href: "/products" },
          { label: "Permanent Piers", href: "/products/permanent-piers" },
          { label: "Classic" }
        ]} 
      />

      <ProductHero
        kicker="Pier Systems"
        title="Classic Pier"
        description="The Lifetime Classic Pier design combines the classic charm of traditional wood piers with the low-maintenance durability of aluminum."
        videoSrc="/videos/pier-classic.mp4"
      />

      <ProductNavStrip 
        links={[
          { label: "All Seasons HD", href: "/products/permanent-piers/all-seasons-hd" },
          { label: "All Seasons", href: "/products/permanent-piers/all-seasons" },
          { label: "Classic", href: "/products/permanent-piers/classic", active: true },
          { label: "Minimalist", href: "/products/permanent-piers/minimalist" },
          { label: "Commercial", href: "/products/permanent-piers/commercial" }
        ]} 
      />

      <ProductFeatures
        kicker="Why Classic"
        title="Seasonal Beauty. Lasting Craftsmanship."
        features={FEATURES}
      />

      <ProductLakeStats
        title={<>Where Classic<br/>has been installed</>}
        stats={INSTALLATIONS}
      />

      <ProductSpecs
        title={<>Classic<br/><em>at a glance</em></>}
        specs={SPECS}
      />

      <CTABlock
        variant="dark"
        headline="The warmth of wood, without the work."
        primaryCta={{ label: "Request a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
