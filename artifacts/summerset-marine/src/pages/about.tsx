import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { organizationSchema } from "@/components/seo/JsonLd";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import CTABlock from "@/components/ui/CTABlock";

const EXECUTIVE_TEAM = [
  {
    name: "Larry Chapman",
    title: "Founder, Owner & President",
    bio: "Larry Chapman founded Summerset Marine in 1990 while studying at UW-Whitewater, transforming it into a leading marine construction company. With decades of expertise in boating and waterfront design, he pioneered the development of Lifetime Piers\u00AE\u2014combining innovation, durability, and timeless craftsmanship to redefine lakefront living.",
  },
  {
    name: "Henry Chapman",
    title: "Director of Sales and Marketing",
    bio: "Henry Chapman, Director of Sales and Marketing, leads Summerset Marine\u2019s efforts to expand market reach, strengthen customer relationships, and drive revenue growth. With a focus on strategic planning and brand development, he partners closely with clients to ensure Summerset\u2019s piers, lifts, and services continue to exceed expectations while advancing the company\u2019s long-term growth goals.",
  },
  {
    name: "Matt Arend",
    title: "Vice President of Finance",
    bio: "Matt Arend, Vice President of Finance since 2025, brings significant experience in financial management and reporting, corporate development, and operations. His expertise in financial planning and process improvement helps drive Summerset Marine\u2019s growth and innovation.",
  },
  {
    name: "Danny Delgado",
    title: "General Manager of Construction",
    bio: "Danny Delgado, General Manager of Construction, leverages his years of experience in the marine industry, proven leadership skills, and deep operational knowledge to oversee Summerset Marine\u2019s construction projects. His role ensures every build meets the highest standards of quality, efficiency, and customer satisfaction.",
  },
  {
    name: "Jake Ohnesorge",
    title: "Director of Engineering",
    bio: "Jake Ohnesorge, Director of Engineering, leads Summerset Marine\u2019s Engineering Department and Manufacturing Operations. He focuses on new product development, continuous improvement of existing products, and ensuring operational excellence across all aspects of manufacturing.",
  },
];

export default function AboutPage() {
  return (
    <Layout>
      <PageMeta
        title="About Summerset Marine | Pier & Lift Experts Since 1990"
        description="Engineering luxury permanent waterfront systems across Wisconsin since 1990. Family-owned, designed and built in Whitewater, WI."
      />
      <JsonLd data={organizationSchema()} />

      {/* Intro — ported verbatim from summersetmarine.com/about-summerset-marine */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-20">
          <h1 className="font-serif text-4xl md:text-5xl">About Us</h1>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/85">
            Summerset Marine Construction&rsquo;s brand,{" "}
            <strong className="text-white">Lifetime</strong>, manufactures high-end, virtually
            maintenance-free Lifetime All Seasons HD Piers, Lifetime All Seasons Piers, Lifetime
            Classic Piers, Lifetime Minimalist Piers, Lifetime Built-In Lifts, and Lifetime
            Standalone Lifts, as well as a variety of Lifetime waterfront accessories. Lifetime
            prides itself on local manufacturing and sourcing of environmentally friendly products
            in the Midwest. Lifetime Piers&reg; decking is eco-friendly, as it is constructed of
            HDPE (high-density polyethylene), a durable, long-lasting recycled plastic made into
            composite wood or plastic lumber for many years of use. HDPE plastic is the most
            environmentally stable of all plastics &ndash; giving off no harmful fumes into the
            environment.
          </p>
          <p className="mt-6 font-serif text-2xl italic">
            Family-owned. American-made. Built to last.
          </p>
          <video
            src="/videos/about.mp4"
            poster="/images/smc/summerset-marine-construction-whitewater-wi-headquarters-001.jpg"
            className="mt-10 aspect-[21/9] w-full rounded-lg object-cover"
            autoPlay muted loop playsInline
            aria-label="Summerset Marine Construction headquarters in Whitewater, Wisconsin"
            />
        </div>
      </section>

      {/* Competitive differentiator — leads BEFORE founding history per spec.
          PLACEHOLDER — SMC TO SUPPLY */}
      <section className="mx-auto max-w-content px-6 py-16">
        <h2 className="font-serif text-3xl text-brand-navy">The Summerset Difference</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ContentPlaceholder label="Why Summerset over a regional competitor" />
          <ContentPlaceholder label="Why Lifetime permanent systems" />
          <ContentPlaceholder label="What the engineering difference is" />
          <ContentPlaceholder label="Design, manufacture, and installation in-house" />
        </div>
      </section>

      {/* Our Journey — ported verbatim */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl text-brand-navy">Our Journey</h2>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-brand-gray">
            Summerset Marine Construction began in 1990 with Larry Chapman&rsquo;s vision to
            redefine waterfront living. What started in East Troy grew into a family-driven
            operation, expanding to Eagle in 2000 and later making a bold move to a 70,000 sq. ft.
            facility in Whitewater in 2022. As demand grew, so did our family&mdash;welcoming DL
            Anderson in Madison and opening locations in Green Lake and Door County between 2021
            and 2024. Through it all, our mission has remained the same: helping Wisconsin families
            make the most of their time on the water.
          </p>
        </div>
      </section>

      {/* Mission & Vision — ported verbatim */}
      <section className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl text-brand-navy">Our Mission</h2>
            <p className="mt-5 text-lg leading-relaxed text-brand-gray">
              For decades, our family has cherished the joy of life on the water. As a
              family-owned, multi-generational business, we&rsquo;re dedicated to helping families
              and businesses craft enduring waterfront memories by providing durable, beautiful,
              and{" "}
              <span className="font-semibold uppercase text-brand-navy">
                functional marine solutions.
              </span>
            </p>
          </div>
          <div>
            <h2 className="font-serif text-3xl text-brand-navy">Our Vision</h2>
            <p className="mt-5 text-lg leading-relaxed text-brand-gray">
              Building timeless memories through lasting{" "}
              <span className="font-semibold uppercase text-brand-navy">
                connections to the water.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Executive team — names, titles, and bios ported from existing site */}
      <section className="bg-brand-offwhite">
        <div className="mx-auto max-w-content px-6 py-16">
          <h2 className="font-serif text-3xl text-brand-navy">Meet Our Executive Team</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {EXECUTIVE_TEAM.map((member) => (
              <div key={member.name} className="rounded-lg bg-white p-6 shadow-sm">
                {/* PLACEHOLDER — SMC TO SUPPLY: team member photo */}
                <ContentPlaceholder label={`Photo of ${member.name}`} className="min-h-[180px]" />
                <h3 className="mt-5 font-serif text-xl text-brand-navy">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand-blue">
                  {member.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-brand-gray">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        variant="dark"
        headline="Ready to transform your shoreline?"
        subheadline="Talk with our team about a permanent pier or lift system built for your waterfront."
        primaryCta={{ label: "Get a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
