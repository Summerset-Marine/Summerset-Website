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
    label: "Stays Put All Winter",
    copy: "Engineered to remain in the water year-round. No seasonal installation or removal — ever. The HD frame is rated for Wisconsin's full freeze-thaw cycle.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
    )
  },
  {
    label: "Lifetime Structural Warranty",
    copy: "Every All Seasons HD carries our unconditional lifetime structural warranty. We stand behind every weld, every post, every component — indefinitely.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    )
  },
  {
    label: "Custom to Your Lake",
    copy: "Every install is site-surveyed and designed for your specific waterfront — depth, bottom type, setback rules, and usage. No two All Seasons HD piers are identical.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
    )
  },
  {
    label: "Permit-Ready Process",
    copy: "We handle every DNR and municipal permit required for your lake. Our in-house team manages the paperwork from first submission to final approval.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    )
  },
  {
    label: "Dedicated Project Team",
    copy: "One point of contact from consultation through installation. Our crew works with the same clients for years — most return for second homes and referrals.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    )
  },
  {
    label: "Property Value Return",
    copy: "A permanent pier is appraised as a property improvement — not a seasonal accessory. Buyers on Wisconsin's premium lakes consistently pay a premium for proven infrastructure.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
    )
  }
];

const INSTALLATIONS = [
  {
    lake: "Geneva Lake",
    items: [
      { value: "5,262", label: "Acres" },
      { value: "135'", label: "Max depth" },
      { value: "21+", label: "Installations" }
    ]
  },
  {
    lake: "Lake Nagawicka",
    items: [
      { value: "1,105", label: "Acres" },
      { value: "42'", label: "Max depth" },
      { value: "14+", label: "Installations" }
    ]
  },
  {
    lake: "Lake Mendota",
    items: [
      { value: "9,842", label: "Acres" },
      { value: "83'", label: "Max depth" },
      { value: "9+", label: "Installations" }
    ]
  },
  {
    lake: "Green Lake",
    items: [
      { value: "7,346", label: "Acres" },
      { value: "236'", label: "Max depth" },
      { value: "11+", label: "Installations" }
    ]
  },
  {
    lake: "Lake Pewaukee",
    items: [
      { value: "2,493", label: "Acres" },
      { value: "30'", label: "Max depth" },
      { value: "17+", label: "Installations" }
    ]
  },
  {
    lake: "Fox Lake Chain",
    items: [
      { value: "6", label: "Connected lakes" },
      { value: "28'", label: "Max depth" },
      { value: "26+", label: "Installations" }
    ]
  }
];

const SPECS = [
  { label: "Frame material", value: "Hot-dip galvanized steel" },
  { label: "Decking", value: "Ipe, composite, or cedar" },
  { label: "Post diameter", value: "4″ – 6″ depending on depth" },
  { label: "Max water depth", value: "Up to 14 feet" },
  { label: "Standard width", value: "6′, 8′, or custom" },
  { label: "Standard length", value: "Up to 200 feet" },
  { label: "Ice resistance", value: "Full freeze-thaw rated" },
  { label: "Warranty", value: "Lifetime structural" }
];

export default function AllSeasonsHDPage() {
  return (
    <Layout>
      <PageMeta
        title="Lifetime All Seasons HD Pier | Summerset Marine Construction"
        description="Summerset's premier permanent pier system — HDPE decking, engineered for year-round Wisconsin conditions, no seasonal removal required."
      />
      <JsonLd
        data={productSchema({
          name: "Lifetime All Seasons HD Pier",
          brand: "Lifetime",
          category: "Permanent Pier",
          description:
            "Summerset's premier permanent pier system — HDPE decking, engineered for year-round Wisconsin conditions, no seasonal removal required.",
        })}
      />

      <ProductBreadcrumb 
        items={[
          { label: "Products", href: "/products" },
          { label: "Permanent Piers", href: "/products/permanent-piers" },
          { label: "All Seasons HD" }
        ]} 
      />

      <ProductHero
        kicker="Pier Systems"
        title="All Seasons HD"
        description="Our most robust permanent pier system — engineered for Wisconsin's harshest conditions and built to stand without seasonal removal."
        videoSrc="/videos/pier-all-seasons-hd.mp4"
      />

      <ProductNavStrip 
        links={[
          { label: "All Seasons HD", href: "/products/permanent-piers/all-seasons-hd", active: true },
          { label: "All Seasons", href: "/products/permanent-piers/all-seasons" },
          { label: "Classic", href: "/products/permanent-piers/classic" },
          { label: "Minimalist", href: "/products/permanent-piers/minimalist" },
          { label: "Commercial", href: "/products/permanent-piers/commercial" }
        ]} 
      />

      <ProductFeatures
        kicker="Why All Seasons HD"
        title="Built without compromise."
        features={FEATURES}
      />

      <ProductLakeStats
        title={<>Where All Seasons HD<br/>has been installed</>}
        stats={INSTALLATIONS}
      />

      <ProductSpecs
        title={<>All Seasons HD<br/><em>at a glance</em></>}
        specs={SPECS}
        gallery={
          <div className="flex flex-col gap-6 mt-9 lg:mt-0">
            <div className="p-7 border border-brand-hairline bg-white">
              <img 
                src="/images/smc/wisconsin-permanent-pier-aerial-hero-002.jpg" 
                alt="All Seasons HD" 
                className="w-full aspect-[4/3] object-cover mb-4" 
              />
              <p className="font-serif text-[14px] text-brand-gray italic m-0">All Seasons HD with custom platform layout, Geneva Lake.</p>
            </div>
            <div className="p-7 border border-brand-hairline bg-white">
              <img 
                src="/images/smc/oconomowoc-okauchee-lake-lifetime-all-seasons-hd-pier-001.jpg" 
                alt="All Seasons HD detail" 
                className="w-full aspect-[4/3] object-cover mb-4" 
              />
              <p className="font-serif text-[14px] text-brand-gray italic m-0">Welded steel construction and flush decking.</p>
            </div>
          </div>
        }
      />

      <CTABlock
        variant="dark"
        headline="Engineered for every season. Built for your shoreline."
        primaryCta={{ label: "Request a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
