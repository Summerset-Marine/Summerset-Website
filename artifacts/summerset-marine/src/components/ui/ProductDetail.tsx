import { ReactNode } from "react";
import { Link } from "wouter";

export function ProductBreadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <div className="bg-brand-offwhite px-6 md:px-[120px] py-[14px] border-b border-brand-hairline">
      <div className="max-w-[1040px] mx-auto flex flex-wrap items-center gap-[10px]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <div key={item.label} className="flex items-center gap-[10px]">
              {item.href ? (
                <Link
                  href={item.href}
                  className="font-serif text-[12px] tracking-[.02em] text-[#201f1d]/45 hover:text-brand-gold transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-serif text-[12px] text-[#201f1d]">{item.label}</span>
              )}
              {!isLast && <span className="text-[11px] text-[#201f1d]/30">›</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProductHero({
  kicker,
  title,
  description,
  videoSrc,
  posterSrc,
  ctaLabel = "Request a Consultation",
  ctaHref = "/consultation"
}: {
  kicker: string;
  title: string;
  description: string;
  videoSrc?: string;
  posterSrc?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative h-[72vh] min-h-[520px] overflow-hidden bg-brand-navy">
      {videoSrc ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : posterSrc ? (
        <img src={posterSrc} alt={title} className="absolute inset-0 w-full h-full object-cover object-center" />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060f1c]/80 via-[#060f1c]/60 to-[#060f1c]/30 pointer-events-none"></div>
      <div className="absolute inset-0 flex items-center px-6 md:px-[120px] pointer-events-none">
        <div className="max-w-[560px]">
          <div className="animate-heroFade1 font-serif text-[12px] tracking-[.28em] text-brand-gold uppercase mb-[20px]">
            {kicker}
          </div>
          <h1 className="animate-heroFade2 font-serif text-[50px] md:text-[72px] font-light leading-[1.0] text-brand-offwhite italic mb-[20px]">
            {title}
          </h1>
          <div className="animate-heroFade3 w-[40px] h-[1px] bg-brand-gold mb-[22px]"></div>
          <p className="animate-heroFade4 font-serif text-[16px] md:text-[18px] leading-[1.8] text-brand-offwhite/70 mb-[36px] font-normal">
            {description}
          </p>
          {ctaLabel && (
            <Link
              href={ctaHref}
              className="animate-heroFade5 inline-block px-[40px] py-[13px] border border-brand-gold font-serif text-[13px] tracking-[.16em] text-brand-gold uppercase pointer-events-auto hover:bg-brand-gold hover:text-brand-navy transition-colors"
            >
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function ProductNavStrip({ links }: { links: { label: string; href: string; active?: boolean }[] }) {
  return (
    <div className="bg-brand-navy border-t border-brand-gold/20 px-6 md:px-[120px] overflow-x-auto">
      <div className="max-w-[1040px] mx-auto flex whitespace-nowrap">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`font-serif text-[13px] tracking-[.1em] uppercase px-[24px] pt-[16px] pb-[14px] border-b-2 transition-colors hover:text-brand-gold ${
              link.active ? "text-brand-gold border-brand-gold" : "text-brand-offwhite/45 border-transparent"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ProductFeatures({
  kicker,
  title,
  features
}: {
  kicker: string;
  title: ReactNode;
  features: { label: string; copy: string; icon?: ReactNode }[];
}) {
  return (
    <section className="bg-brand-offwhite px-6 md:px-[120px] py-[88px]">
      <div className="max-w-[1040px] mx-auto">
        <div className="text-center mb-[64px]">
          <div className="font-serif text-[12px] tracking-[.28em] uppercase text-brand-gold mb-[16px]">
            {kicker}
          </div>
          <h2 className="font-serif text-[36px] md:text-[46px] font-light text-[#201f1d] m-0">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]">
          {features.map((f, i) => (
            <div
              key={f.label}
              className="p-[40px_36px] border border-brand-hairline bg-white transition-colors duration-250 hover:border-brand-gold group"
              style={{
                marginLeft: i % 3 !== 0 ? "-1px" : "0",
                marginTop: i >= 3 ? "-1px" : "0"
              }}
            >
              <div className="w-[40px] h-[40px] mb-[24px] flex items-center justify-center text-brand-gold">
                {f.icon || (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
              <h3 className="font-serif text-[24px] font-semibold text-[#201f1d] mb-[14px] leading-[1.2]">
                {f.label}
              </h3>
              <p className="font-serif text-[15px] leading-[1.8] text-[#5a5550] m-0">
                {f.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductLakeStats({
  kicker = "Proven on Wisconsin Waters",
  title,
  stats
}: {
  kicker?: string;
  title: ReactNode;
  stats: {
    lake: string;
    items: { value: string; label: string }[];
  }[];
}) {
  return (
    <section className="bg-brand-navy px-6 md:px-[120px] py-[88px]">
      <div className="max-w-[1040px] mx-auto">
        <div className="mb-[60px]">
          <div className="font-serif text-[12px] tracking-[.28em] uppercase text-brand-gold mb-[16px]">
            {kicker}
          </div>
          <h2 className="font-serif text-[36px] md:text-[46px] font-light text-brand-offwhite italic m-0 leading-[1.05]">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-[40px] lg:gap-[64px]">
          {/* Split stats into two columns for layout if there's enough, or just render normally. 
              The design had left column and right column separated by a 1px line. */}
          <div className="flex flex-col gap-[32px]">
            {stats.slice(0, Math.ceil(stats.length / 2)).map((stat, i) => (
              <div key={stat.lake} className="border-b border-brand-offwhite/5 pb-[28px]">
                <div className="font-serif text-[22px] font-semibold text-brand-offwhite mb-[10px]">
                  {stat.lake}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-[16px]">
                  {stat.items.map((item) => (
                    <div key={item.label}>
                      <div className="font-serif text-[28px] font-light text-brand-gold tabular-nums">
                        {item.value}
                      </div>
                      <div className="font-serif text-[11px] text-brand-offwhite/40 mt-[4px]">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="hidden lg:block w-[1px] bg-brand-offwhite/5 self-stretch"></div>
          <div className="flex flex-col gap-[32px]">
            {stats.slice(Math.ceil(stats.length / 2)).map((stat, i) => (
              <div key={stat.lake} className="border-b border-brand-offwhite/5 pb-[28px]">
                <div className="font-serif text-[22px] font-semibold text-brand-offwhite mb-[10px]">
                  {stat.lake}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-[16px]">
                  {stat.items.map((item) => (
                    <div key={item.label}>
                      <div className="font-serif text-[28px] font-light text-brand-gold tabular-nums">
                        {item.value}
                      </div>
                      <div className="font-serif text-[11px] text-brand-offwhite/40 mt-[4px]">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductSpecs({
  title,
  specs,
  gallery
}: {
  title: ReactNode;
  specs: { label: string; value: string }[];
  gallery?: ReactNode;
}) {
  return (
    <section className="bg-brand-offwhite px-6 md:px-[120px] py-[88px] border-t border-brand-hairline">
      <div className="max-w-[1040px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-start">
          <div>
            <div className="font-serif text-[12px] tracking-[.28em] uppercase text-brand-gold mb-[20px]">
              Specifications
            </div>
            <h2 className="font-serif text-[36px] md:text-[40px] font-light text-[#201f1d] m-0 mb-[32px] leading-[1.1]">
              {title}
            </h2>
            <div className="flex flex-col gap-0">
              {specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`grid grid-cols-1 sm:grid-cols-2 py-[16px] gap-[8px] sm:gap-0 ${
                    i !== specs.length - 1 ? "border-b border-[#e8e4de]" : ""
                  }`}
                >
                  <span className="font-serif text-[13px] text-[#201f1d]/50 tracking-[.04em]">
                    {spec.label}
                  </span>
                  <span className="font-serif text-[14px] text-[#201f1d]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            {gallery}
          </div>
        </div>
      </div>
    </section>
  );
}
