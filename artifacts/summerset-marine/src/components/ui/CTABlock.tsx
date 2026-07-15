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
    <section className={isDark ? "bg-brand-navy text-white" : "bg-brand-offwhite text-brand-navy"}>
      <div className="mx-auto flex max-w-content flex-col items-center px-6 py-20 text-center">
        <h2 className="max-w-2xl font-serif text-3xl leading-tight md:text-4xl">{headline}</h2>
        {subheadline ? (
          <p className={`mt-4 max-w-xl text-lg ${isDark ? "text-white/75" : "text-brand-gray"}`}>
            {subheadline}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          {isDark ? (
            <Button href={primaryCta.href} variant="primary" size="large">
              {primaryCta.label}
            </Button>
          ) : (
            <Button
              href={primaryCta.href}
              variant="primary"
              size="large"
              className="!border-transparent !bg-brand-blue hover:!bg-brand-navy"
            >
              {primaryCta.label}
            </Button>
          )}
          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              className={`font-medium underline-offset-4 hover:underline ${
                isDark ? "text-white/85" : "text-brand-blue"
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
