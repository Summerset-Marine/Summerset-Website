import { type ReactNode } from "react";

interface HeroSectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function HeroSection({ eyebrow, title, subtitle, children }: HeroSectionProps) {
  return (
    <section className="bg-brand-navy text-white">
      <div className="mx-auto max-w-content px-6 py-22">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue-light">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-white/80">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
