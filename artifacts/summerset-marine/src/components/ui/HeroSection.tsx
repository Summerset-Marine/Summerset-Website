import Button from "@/components/ui/Button";

interface Cta {
  label: string;
  href: string;
}

interface HeroSectionProps {
  variant: "full-bleed" | "split" | "video-bg";
  headline: string;
  subheadline?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  imageSrc: string;
  imageAlt: string;
  videoSrc?: string;
  /** Content alignment for full-bleed / video-bg variants */
  align?: "center" | "left";
}

export default function HeroSection({
  variant,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
  videoSrc,
  align = "left",
}: HeroSectionProps) {
  if (variant === "split") {
    return (
      <section className="bg-brand-offwhite">
        <div className="mx-auto grid min-h-[600px] max-w-content items-stretch px-0 lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-16 lg:pr-14">
            <h1 className="font-serif text-[44px] italic font-light leading-[1.1] text-brand-navy md:text-[50px]">
              {headline}
            </h1>
            <div className="mt-[22px] mb-[26px] h-[1px] w-[32px] bg-brand-gold" />
            {subheadline ? (
              <p className="max-w-xl text-[17px] leading-[1.9] text-[#4a4540]">
                {subheadline}
              </p>
            ) : null}
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap gap-4">
                {primaryCta ? (
                  <Button href={primaryCta.href} variant="primary" size="large">
                    {primaryCta.label}
                  </Button>
                ) : null}
                {secondaryCta ? (
                  <Button href={secondaryCta.href} variant="secondary" size="large">
                    {secondaryCta.label}
                  </Button>
                ) : null}
              </div>
            )}
          </div>
          <div className="relative min-h-[320px]">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </section>
    );
  }

  // full-bleed and video-bg share the overlay layout
  const isVideo = variant === "video-bg" && videoSrc;
  const alignClasses =
    align === "center"
      ? "items-center text-center"
      : "items-start text-left";

  return (
    <section className="relative flex min-h-[580px] h-[88vh] w-full overflow-hidden bg-brand-navy">
      {isVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={videoSrc}
          poster={imageSrc}
          autoPlay
          muted
          loop
          playsInline
          aria-label={imageAlt}
        />
      ) : (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-[#060f1c]/20 to-[#060f1c]/70 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-content px-6 pointer-events-none">
        <div className={`flex w-full flex-col justify-center py-24 ${alignClasses}`}>
          <h1 className="max-w-[820px] font-serif text-[60px] md:text-[82px] font-light italic leading-none text-brand-offwhite mb-6">
            {headline}
          </h1>
          <div className="h-[1px] w-[48px] bg-brand-gold mb-[26px]" />
          {subheadline ? (
            <p className="max-w-[540px] font-serif text-[18px] md:text-[21px] font-light leading-[1.55] text-brand-offwhite/70 mb-11 tracking-wide">
              {subheadline}
            </p>
          ) : null}
          {(primaryCta || secondaryCta) && (
            <div className={`flex flex-wrap gap-4 pointer-events-auto ${align === "center" ? "justify-center" : ""}`}>
              {primaryCta ? (
                <Button href={primaryCta.href} variant="primary" size="large">
                  {primaryCta.label}
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button href={secondaryCta.href} variant="ghost" size="large">
                  {secondaryCta.label}
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
