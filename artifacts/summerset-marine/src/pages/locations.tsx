import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { type Schema } from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";

const SITE_URL = "https://summersetmarine.com";

interface Location {
  name: string;
  headquarters?: boolean;
  streetAddress: string;
  city: string;
  zip: string;
  phone: string;
  hours: string[];
  mapQuery: string;
  blurb?: string;
}

/**
 * All four locations ported from the existing site (contact page +
 * per-location pages). Addresses, phones, and hours are live data from
 * summersetmarine.com/contact-us.
 */
const LOCATIONS: Location[] = [
  {
    name: "Whitewater (Headquarters)",
    headquarters: true,
    streetAddress: "W3128 WI-HWY 59",
    city: "Whitewater",
    zip: "53190",
    phone: "(800) 816-9698",
    hours: [
      "Monday \u2013 Friday 8:00 am to 4:00 pm",
      "Saturday by appointment only",
      "Additional Hours Available by Appointment",
    ],
    mapQuery: "Summerset Marine Construction, W3128 WI-59, Whitewater, WI 53190",
    blurb:
      "Whitewater is the heart of Summerset Marine, where everything is designed, built, and perfected before it reaches the water. As our headquarters, this location houses our expert engineers, welders, and fabricators who bring innovative pier and lift designs to life. From custom manufacturing to logistics and support, Whitewater is where quality and craftsmanship begin.",
  },
  {
    name: "Madison",
    streetAddress: "5371 Farmco Dr",
    city: "Madison",
    zip: "53704",
    phone: "(608) 249-3100",
    hours: [
      "Monday \u2013 Friday 9:00 am to 5:00 pm",
      "Saturday by appointment only",
      "Additional Hours Available by Appointment",
    ],
    mapQuery: "Summerset Marine, 5371 Farmco Dr, Madison, WI 53704",
  },
  {
    name: "Green Lake",
    streetAddress: "555 Commercial Ave",
    city: "Green Lake",
    zip: "54941",
    phone: "(800) 816-9698",
    hours: [
      "Monday \u2013 Friday 8:00 am to 5:00 pm",
      "Saturday by appointment only",
      "Additional Hours Available by Appointment",
    ],
    mapQuery: "Summerset Marine, 555 Commercial Ave, Green Lake, WI 54941",
  },
  {
    name: "Door County",
    streetAddress: "9580 Rica Ln",
    city: "Brussels",
    zip: "54204",
    phone: "(920) 741-0022",
    hours: [
      "Monday \u2013 Friday 8:00 am to 5:00 pm",
      "Saturday by appointment only",
      "Additional Hours Available by Appointment",
    ],
    mapQuery: "Summerset Marine, 9580 Rica Ln, Brussels, WI 54204",
  },
];

/** Four LocalBusiness blocks in a single @graph array, per spec. */
function locationsGraphSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@graph": LOCATIONS.map((loc) => ({
      "@type": "LocalBusiness",
      name: `Summerset Marine Construction \u2014 ${loc.name.replace(" (Headquarters)", "")}`,
      url: `${SITE_URL}/locations`,
      telephone: loc.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.streetAddress,
        addressLocality: loc.city,
        addressRegion: "WI",
        postalCode: loc.zip,
        addressCountry: "US",
      },
    })),
  };
}

export default function LocationsPage() {
  return (
    <Layout>
      <PageMeta
        title="Locations | Summerset Marine Construction"
        description="Visit Summerset Marine in Whitewater (HQ), Madison, Green Lake, or Door County, WI. Permanent piers, boat lifts, and marine contracting."
      />
      <JsonLd data={locationsGraphSchema()} />

      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-20">
          <h1 className="font-serif text-4xl md:text-5xl">Visit Us</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Four locations across Wisconsin &mdash; from our 70,000 sq. ft. manufacturing
            headquarters in Whitewater to showrooms in Madison, Green Lake, and Door County.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          {LOCATIONS.map((loc) => (
            <div key={loc.name} className="overflow-hidden rounded-lg border border-brand-border bg-white shadow-sm">
              <iframe
                title={`Map of Summerset Marine \u2014 ${loc.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(loc.mapQuery)}&output=embed`}
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-7">
                <h2 className="font-serif text-2xl text-brand-navy">
                  {loc.name}
                  {loc.headquarters ? (
                    <span className="ml-3 rounded bg-brand-red px-2 py-0.5 align-middle text-xs font-sans font-semibold uppercase tracking-wide text-white">
                      HQ
                    </span>
                  ) : null}
                </h2>
                <p className="mt-3 text-brand-black/80">
                  {loc.streetAddress}, {loc.city}, WI {loc.zip}
                </p>
                <p className="mt-2 font-medium text-brand-navy">
                  <a href={`tel:${loc.phone.replace(/[^0-9]/g, "")}`} className="hover:text-brand-blue">
                    {loc.phone}
                  </a>
                </p>
                <div className="mt-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-blue">
                    Hours
                  </h3>
                  <ul className="mt-1 space-y-0.5 text-sm text-brand-black/80">
                    {loc.hours.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
                {loc.blurb ? (
                  <p className="mt-4 text-sm leading-relaxed text-brand-black/80">{loc.blurb}</p>
                ) : null}
                <div className="mt-6">
                  <Button
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapQuery)}`}
                    variant="secondary"
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
