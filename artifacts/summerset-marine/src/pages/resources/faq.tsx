import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { faqSchema } from "@/components/seo/JsonLd";
import CTABlock from "@/components/ui/CTABlock";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import { isSanityConfigured, sanityLiveFetch, FAQ_QUERY } from "@/lib/sanity";

interface FaqEntry {
  _id: string;
  question: string;
  answer: string;
  category?: string;
}

const PLACEHOLDER_QUESTIONS = [
  "How much does a permanent pier cost?",
  "How long does installation take?",
  "Do permanent piers survive Wisconsin winters and ice?",
  "Do I need a permit to install a pier on my lake?",
  "Can you add a boat lift to my existing pier?",
];

function AccordionItem({
  question,
  isOpen,
  onToggle,
  children,
}: {
  question: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-brand-border">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className={`flex w-full items-center justify-between gap-4 py-5 text-left font-semibold ${
          isOpen ? "text-brand-blue" : "text-brand-navy"
        }`}
      >
        <span>{question}</span>
        <span aria-hidden="true" className="text-2xl leading-none">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen ? <div className="pb-6">{children}</div> : null}
    </div>
  );
}

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FaqEntry[]>([]);
  const [category, setCategory] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (!isSanityConfigured) return;
    sanityLiveFetch<FaqEntry[]>(FAQ_QUERY)
      .then((data) => setFaqs(data ?? []))
      .catch(() => setFaqs([]));
  }, []);

  const categories = useMemo(() => {
    const set = new Set(faqs.map((f) => f.category).filter((c): c is string => Boolean(c)));
    return ["All", ...Array.from(set)];
  }, [faqs]);

  const visible = useMemo(
    () => (category === "All" ? faqs : faqs.filter((f) => f.category === category)),
    [faqs, category],
  );

  return (
    <Layout>
      <PageMeta
        title="FAQ — Permanent Piers & Boat Lifts | Summerset Marine Construction"
        description="Answers to common questions about permanent pier installation, boat lifts, costs, process, and working with Summerset Marine Construction in Wisconsin."
        canonical="https://summersetmarine.com/resources/faq"
      />
      {faqs.length > 0 ? (
        <JsonLd
          data={faqSchema({
            faqs: faqs.map((f) => ({ question: f.question, answer: f.answer })),
          })}
        />
      ) : null}

      {/* 1. Hero */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h1 className="font-serif text-4xl md:text-5xl">Frequently Asked Questions</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Everything you need to know about permanent piers, boat lifts, and working with
            Summerset Marine.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-12">
        {/* 2. Category tabs */}
        {categories.length > 1 ? (
          <div role="tablist" aria-label="FAQ categories" className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={category === c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  category === c
                    ? "border-brand-navy bg-brand-navy text-white"
                    : "border-brand-border bg-white text-brand-navy hover:border-brand-navy"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        ) : null}

        {/* 3–5. Accordion */}
        {visible.length > 0 ? (
          <div className="mt-8 max-w-3xl">
            {visible.map((f) => (
              <AccordionItem
                key={f._id}
                question={f.question}
                isOpen={openId === f._id}
                onToggle={() => setOpenId(openId === f._id ? null : f._id)}
              >
                <p className="leading-relaxed text-brand-gray">{f.answer}</p>
              </AccordionItem>
            ))}
          </div>
        ) : (
          <div className="mt-8 max-w-3xl">
            {PLACEHOLDER_QUESTIONS.map((q) => (
              <AccordionItem
                key={q}
                question={q}
                isOpen={openId === q}
                onToggle={() => setOpenId(openId === q ? null : q)}
              >
                <ContentPlaceholder label={`answer to "${q}"`} />
              </AccordionItem>
            ))}
            <ContentPlaceholder
              label="FAQ entries — questions, answers, and categories (from Sanity faqEntry documents)"
              className="mt-8"
            />
          </div>
        )}
      </section>

      {/* 6. CTA */}
      <CTABlock
        variant="dark"
        headline="Still have questions?"
        subheadline="Request a consultation and get answers specific to your shoreline."
        primaryCta={{ label: "Get a Consultation", href: "/consultation" }}
      />
    </Layout>
  );
}
