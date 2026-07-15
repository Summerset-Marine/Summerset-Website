import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import CTABlock from "@/components/ui/CTABlock";

/* Service pillars — ported verbatim from summersetmarine.com/residential-service */
const SERVICE_PILLARS = [
  {
    heading: "Dock & Pier Installation for Your Lakefront Home",
    intro: "Create a stunning waterfront oasis for your home with our premium piers and docks. We offer:",
    items: [
      {
        label: "Classic & Modern Designs",
        copy: "Choose from a variety of styles that blend aesthetics with durability, tailored for residential lakefront properties.",
      },
      {
        label: "Residential Solutions",
        copy: "Designed specifically for homeowners, we craft structures built to withstand Wisconsin\u2019s harsh elements, ensuring lasting beauty and function.",
      },
      {
        label: "Eco-Friendly Options",
        copy: "Sustainable materials and innovative installation methods, like vibratory pile driving, that protect your shoreline while enhancing your lakefront home\u2019s value.",
      },
    ],
  },
  {
    heading: "Residential Services & Maintenance",
    intro: "Enjoy worry-free waterfront living with professional upkeep for your lakefront home:",
    items: [
      {
        label: "Installation & Removal Services",
        copy: "Hassle-free setup and removal for your piers and lifts, ensuring your residential lakefront property is ready for any time of year.",
      },
      {
        label: "Routine Inspections",
        copy: "Preventative maintenance to extend the life of your investment, keeping your home\u2019s shoreline in top condition.",
      },
      {
        label: "Repairs & Upgrades",
        copy: "Ensure optimal performance with expert servicing and enhancements tailored to residential dock solutions.",
      },
    ],
  },
  {
    heading: "Boat Lift Systems for Your Lakefront Home",
    intro: "Keep your vessel secure and protected year-round with solutions designed for residential lakefront properties:",
    items: [
      {
        label: "Fully Adjustable Systems",
        copy: "Compatible with a wide range of boats and watercraft, ensuring a perfect fit for your residential lakefront setup.",
      },
      {
        label: "Effortless Operation",
        copy: "Manual, hydraulic, and remote-controlled options are available, making boat management easy for homeowners.",
      },
      {
        label: "Durable & Low Maintenance",
        copy: "Designed for longevity with corrosion-resistant materials, ideal for residential boat lift installations in Wisconsin\u2019s harsh conditions.",
      },
    ],
  },
];

/* Why-choose list — ported verbatim */
const WHY_CHOOSE = [
  {
    label: "Precision Engineering",
    copy: "Every dock and boat lift we build for your home is crafted with marine-grade materials, ensuring longevity and reliability for your residential lakefront property.",
  },
  {
    label: "Custom Solutions",
    copy: "From permanent piers to fully adjustable boat lifts, our solutions are tailored to fit your home\u2019s waterfront space and personal usage needs.",
  },
  {
    label: "Turnkey Service",
    copy: "We expertly handle every step for residential clients, from consultation to residential pier installation and ongoing maintenance, so you can focus on enjoying the water.",
  },
  {
    label: "Industry-Leading Warranty",
    copy: "Our products are built to last for lakefront homes and backed by warranties that provide peace of mind.",
  },
];

const SERVICE_TYPES = ["Seasonal Installation", "Seasonal Removal", "Repairs", "Inspections"];

export default function ResidentialServicesPage() {
  return (
    <Layout>
      <PageMeta
        title="Residential Lakefront Services | Summerset Marine Construction"
        description="Comprehensive residential lakefront services across southern, southeastern, and east-central Wisconsin — seasonal installation and removal, repairs, inspections, and parts for all major brands."
      />

      {/* Hero — image PLACEHOLDER — SMC TO SUPPLY */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-20">
          <h1 className="font-serif text-4xl leading-tight md:text-5xl">
            Residential Service Solutions for Wisconsin Lakefronts
          </h1>
          {/* Intro — ported verbatim */}
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/85">
            Summerset Marine Construction provides comprehensive residential lakefront services and
            repairs tailored for homeowners throughout the year. Across southern, southeastern, and
            east-central Wisconsin, we proudly support hundreds of residential waterfront clients.
            From Madison to Door County, our experienced team is always on call to ensure your
            lakefront home remains beautiful and functional with expert residential pier
            maintenance and support.
          </p>
          <div className="mt-8">
            <img
              src="/images/smc/wisconsin-residential-service-hero-001.jpg"
              alt="Crane lifting a boat lift structure off a barge during residential installation — Summerset Marine Construction"
              className="w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Service types */}
      <section className="mx-auto max-w-content px-6 py-14">
        <h2 className="font-serif text-3xl text-brand-navy">Our Services</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {SERVICE_TYPES.map((s) => (
            <span
              key={s}
              className="rounded-full border border-brand-border bg-brand-offwhite px-5 py-2 text-sm font-medium text-brand-navy"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {SERVICE_PILLARS.map((pillar) => (
            <div key={pillar.heading} className="rounded-lg border border-brand-border bg-white p-7 shadow-sm">
              <h3 className="font-serif text-xl text-brand-navy">{pillar.heading}</h3>
              <p className="mt-3 text-sm text-brand-gray">{pillar.intro}</p>
              <ul className="mt-4 space-y-4">
                {pillar.items.map((item) => (
                  <li key={item.label} className="text-sm leading-relaxed text-brand-gray">
                    <span className="font-semibold text-brand-navy">{item.label}:</span> {item.copy}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Geographic service zones — ported verbatim */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl text-brand-navy">
            Premier Residential Waterfront Service Areas
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-brand-gray">
            Summerset Marine Construction specializes in first-class residential lakefront
            services, including installation, removal, and turnkey solutions, across
            Wisconsin&rsquo;s most sought-after waterfront destinations. With locations in
            Whitewater (Lake Country), Madison, Green Lake, and Door County, we provide unmatched
            expertise and craftsmanship to keep your home&rsquo;s waterfront in peak condition and
            ready to enjoy.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {["Whitewater (Lake Country)", "Madison", "Green Lake", "Door County"].map((zone) => (
              <div key={zone} className="rounded-lg bg-white p-6 text-center shadow-sm">
                <h3 className="font-serif text-lg text-brand-navy">{zone}</h3>
                <p className="mt-2 text-sm text-brand-gray">Residential service zone</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose — ported verbatim */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">
          Why Choose Summerset Marine for Your Residential Lakefront Needs?
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {WHY_CHOOSE.map((item) => (
            <div key={item.label}>
              <h3 className="font-semibold text-brand-navy">{item.label}</h3>
              <p className="mt-2 leading-relaxed text-brand-gray">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Parts & service for all brands — ported verbatim */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl">
            Parts &amp; Service For All Brands at Your Lakefront Home
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/85">
            Although we only sell three brands of lifts and piers (ShoreStation, ShoreMaster, and
            Pier Pleasure), we can provide parts for most major brands&mdash;and all at
            factory-direct pricing! Need a new section for your pier? We have you covered. Do you
            need a cable for your boat lift? We have you covered, too!
          </p>
        </div>
      </section>

      {/* Pricing / service call info — PLACEHOLDER — SMC TO SUPPLY */}
      <section className="mx-auto max-w-content px-6 py-14">
        <ContentPlaceholder label="Pricing and service call information" />
      </section>

      <CTABlock
        variant="light"
        headline="Ready to transform your shoreline?"
        subheadline="Contact us today for a consultation and discover how our residential lakefront services can bring your waterfront vision to life."
        primaryCta={{ label: "Request Service", href: "/service-request" }}
        secondaryCta={{ label: "Get a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
