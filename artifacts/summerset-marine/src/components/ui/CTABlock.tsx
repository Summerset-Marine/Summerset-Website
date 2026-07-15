import { Link } from "wouter";

interface CTABlockProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function CTABlock({
  title = "Ready to build something permanent?",
  subtitle = "Schedule a consultation with our waterfront specialists.",
  buttonLabel = "Request a Consultation",
  buttonHref = "/consultation",
}: CTABlockProps) {
  return (
    <section className="bg-brand-blue text-white">
      <div className="mx-auto flex max-w-content flex-col items-start gap-6 px-6 py-18 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-serif text-3xl">{title}</h2>
          <p className="mt-2 text-white/80">{subtitle}</p>
        </div>
        <Link
          href={buttonHref}
          className="rounded-md bg-brand-red px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-red-hover"
          data-testid="button-cta"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
