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
    label: "No Seasonal Removal",
    copy: "Leave your pier in year-round—even through winter. Skip the takedown, save thousands of dollars every year, and enjoy stress-free lake living."
  },
  {
    label: "Engineered for Every Season",
    copy: "Factory-welded steel frames and pilings driven up to 60 feet deep provide rock-solid performance during ice, wind, and fluctuating water levels."
  },
  {
    label: "Low-Maintenance Decking",
    copy: "HDPE planks stay cool underfoot, resist fading and splinters, and never need sealing or staining. Just rinse and enjoy."
  }
];

const INSTALLATIONS = [
  {
    lake: "Oconomowoc Lake",
    items: [
      { value: "818", label: "Acres" },
      { value: "32'", label: "Max depth" },
      { value: "12+", label: "Installations" }
    ]
  },
  {
    lake: "Pewaukee Lake",
    items: [
      { value: "2,437", label: "Acres" },
      { value: "15'", label: "Max depth" },
      { value: "15+", label: "Installations" }
    ]
  }
];

const SPECS = [
  { label: "Frame material", value: "Galvanized steel" },
  { label: "Decking", value: "HDPE" },
  { label: "Max water depth", value: "Up to 10 feet" },
  { label: "Ice resistance", value: "Freeze-thaw rated" }
];

export default function AllSeasonsPage() {
  return (
    <Layout>
      <PageMeta
        title="Lifetime All Seasons Pier | Summerset Marine Construction"
        description="The Lifetime All Seasons Pier is engineered to withstand harsh winters and stay in the water all year long — premium HDPE decking on a robust steel frame."
      />
      <JsonLd
        data={productSchema({
          name: "Lifetime All Seasons Pier",
          brand: "Lifetime",
          category: "Permanent Pier",
          description:
            "Engineered to withstand harsh winters and stay in the water all year long. Premium HDPE plastic decking on a robust steel frame for exceptional durability.",
        })}
      />

      <ProductBreadcrumb 
        items={[
          { label: "Products", href: "/products" },
          { label: "Permanent Piers", href: "/products/permanent-piers" },
          { label: "All Seasons" }
        ]} 
      />

      <ProductHero
        kicker="Pier Systems"
        title="All Seasons"
        description="Engineered to withstand harsh winters and stay in the water all year long. Premium HDPE plastic decking on a robust steel frame."
        videoSrc="/videos/pier-all-seasons.mp4"
      />

      <ProductNavStrip 
        links={[
          { label: "All Seasons HD", href: "/products/permanent-piers/all-seasons-hd" },
          { label: "All Seasons", href: "/products/permanent-piers/all-seasons", active: true },
          { label: "Classic", href: "/products/permanent-piers/classic" },
          { label: "Minimalist", href: "/products/permanent-piers/minimalist" },
          { label: "Commercial", href: "/products/permanent-piers/commercial" }
        ]} 
      />

      <ProductFeatures
        kicker="Why All Seasons"
        title="Built to Save You Time and Money."
        features={FEATURES}
      />

      <ProductLakeStats
        title={<>Where All Seasons<br/>has been installed</>}
        stats={INSTALLATIONS}
      />

      <ProductSpecs
        title={<>All Seasons<br/><em>at a glance</em></>}
        specs={SPECS}
      />

      <CTABlock
        variant="dark"
        headline="Skip the takedown. Keep the waterfront."
        primaryCta={{ label: "Request a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
