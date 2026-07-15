/**
 * JSON-LD structured data component and schema builders.
 *
 * `<JsonLd data={...} />` injects a schema object as a
 * <script type="application/ld+json"> tag. Each page passes a page-specific
 * schema built by one of the exported builder functions below.
 */

const SITE_URL = "https://summersetmarine.com";

export type Schema = Record<string, unknown>;

interface JsonLdProps {
  data: Schema;
}

/**
 * Serialize schema JSON safely for embedding inside a <script> tag.
 * Escapes characters that could close the script tag or start HTML
 * comments/CDATA, preventing XSS from CMS-derived text.
 */
function safeJsonLdStringify(data: Schema): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(data) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Schema builders                                                     */
/* ------------------------------------------------------------------ */

/** Used on Home. */
export function organizationSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "Summerset Marine Construction",
    url: SITE_URL,
    logo: `${SITE_URL}/images/summerset-marine-logo.svg`,
    telephone: "[SMC main phone]",
    email: "[SMC main email]",
    description:
      "Luxury permanent waterfront systems — custom piers, boat lifts, and marine contracting across Wisconsin and the Midwest.",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "W3128 WI-HWY 59",
        addressLocality: "Whitewater",
        addressRegion: "WI",
        postalCode: "53190",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Madison",
        addressRegion: "WI",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Green Lake",
        addressRegion: "WI",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Sturgeon Bay",
        addressRegion: "WI",
        addressCountry: "US",
      },
    ],
    areaServed: ["Lake Geneva, WI", "Oconomowoc, WI", "Door County, WI", "Wisconsin"],
    sameAs: [],
  };
}

export interface LocalBusinessSchemaInput {
  /** Market display name, e.g. "Lake Geneva" */
  market: string;
  /** Market URL slug, e.g. "lake-geneva" */
  marketSlug: string;
  /** Lake / body of water display name, e.g. "Geneva Lake" */
  lake: string;
  coordinates?: { latitude: string; longitude: string };
  telephone?: string;
}

/** Used on market landing and body-of-water pages. */
export function localBusinessSchema(input: LocalBusinessSchemaInput): Schema {
  const schema: Schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Summerset Marine Construction — ${input.market}`,
    url: `${SITE_URL}/markets/${input.marketSlug}`,
    telephone: input.telephone ?? "[SMC phone]",
    description: `Permanent pier and boat lift installation on ${input.lake}, ${input.market}, Wisconsin.`,
    areaServed: `${input.lake}, ${input.market}, Wisconsin`,
  };
  if (input.coordinates) {
    schema["geo"] = {
      "@type": "GeoCoordinates",
      latitude: input.coordinates.latitude,
      longitude: input.coordinates.longitude,
    };
  }
  return schema;
}

export interface ServiceSchemaInput {
  /** Service display name, e.g. "Permanent Pier Installation" */
  name: string;
  /** Market display name, e.g. "Lake Geneva" */
  market: string;
  /** Market URL slug, e.g. "lake-geneva" */
  marketSlug: string;
  /** Lake / body of water display name, e.g. "Geneva Lake" */
  lake: string;
}

/** Used alongside localBusinessSchema on market microsite pages. */
export function serviceSchema(input: ServiceSchemaInput): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.name,
    provider: {
      "@type": "LocalBusiness",
      name: `Summerset Marine Construction — ${input.market}`,
      url: `${SITE_URL}/markets/${input.marketSlug}`,
    },
    areaServed: `${input.lake}, ${input.market}, Wisconsin`,
    url: `${SITE_URL}/markets/${input.marketSlug}`,
  };
}

export interface ProductSchemaInput {
  name: string;
  description: string;
  brand?: string;
  category: "Permanent Pier" | "Boat Lift" | "Seasonal System" | string;
}

/** Used on all product pages. */
export function productSchema(input: ProductSchemaInput): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    brand: { "@type": "Brand", name: input.brand ?? "Lifetime" },
    category: input.category,
    manufacturer: {
      "@type": "Organization",
      name: "Summerset Marine Construction",
    },
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** Used on the FAQ page. */
export function faqSchema(input: { faqs: FaqItem[] }): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: input.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  url: string;
  imageUrl?: string;
}

/** Used on all blog posts. */
export function articleSchema(input: ArticleSchemaInput): Schema {
  const schema: Schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: { "@type": "Person", name: input.authorName },
    publisher: {
      "@type": "Organization",
      name: "Summerset Marine Construction",
      url: SITE_URL,
    },
    url: input.url,
  };
  if (input.imageUrl) schema["image"] = input.imageUrl;
  return schema;
}

export interface ImageObjectSchemaInput {
  url: string;
  caption: string;
  lake: string;
  productType: string;
  location: string;
}

/** Used on project gallery pages. */
export function imageObjectSchema(input: ImageObjectSchemaInput): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    url: input.url,
    caption: input.caption,
    description: `${input.productType} installed at ${input.lake}, ${input.location}, Wisconsin`,
    contentLocation: { "@type": "Place", name: `${input.lake}, Wisconsin` },
  };
}
