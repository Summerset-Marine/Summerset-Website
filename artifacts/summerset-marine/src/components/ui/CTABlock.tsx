import { Link } from "wouter";
import Button from "@/components/ui/Button";

interface Cta {
  label: string;
  href: string;
}

interface CTABlockProps {
  variant?: "light" | "dark";
  headline: string;
  subheadline?: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
}

export default function CTABlock({
  variant = "light",
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
}: CTABlockProps) {
  const isDark = variant === "dark";

  return (
    <section className={isDark ? "bg-brand-navy text-white" : "bg-brand-offwhite text-brand-navy border-t border-brand-hairline"}>
      <div className="mx-auto flex max-w-[620px] flex-col items-center px-6 py-[108px] text-center">
        <div className="font-serif text-[12px] tracking-[.28em] uppercase text-brand-gold mb-[22px]">Start the Conversation</div>
        <h2 className="font-serif text-[60px] font-light italic leading-[1.02] mb-[22px]">{headline}</h2>
        <div className="w-[48px] h-[1px] bg-brand-gold mb-[30px]" />
        {subheadline ? (
          <p className={`text-[18px] leading-[1.8] ${isDark ? "text-brand-offwhite/60" : "text-brand-gray"} mb-[48px] text-balance`}>
            {subheadline}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-5">
          <Button href={primaryCta.href} variant={isDark ? "primary" : "secondary"} size="large">
            {primaryCta.label}
          </Button>
          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              className={`font-serif text-[13px] uppercase tracking-[.15em] border-b pb-[2px] transition-colors ${
                isDark ? "text-brand-gold border-brand-gold/50 hover:border-brand-gold" : "text-brand-navy border-brand-navy hover:text-brand-gold hover:border-brand-gold"
              }`}
              data-testid="link-cta-secondary"
            >
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
