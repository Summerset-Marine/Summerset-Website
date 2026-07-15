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
      <section className="bg-white">
        <div className="mx-auto grid min-h-[600px] max-w-content items-stretch px-0 lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-16 lg:pr-14">
            <h1 className="font-serif text-4xl leading-tight text-brand-navy md:text-5xl">
              {headline}
            </h1>
            {subheadline ? (
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-gray">
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
    <section className="relative flex min-h-[70vh] w-full overflow-hidden md:min-h-[85vh]">
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
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-content px-6">
        <div className={`flex w-full flex-col justify-center py-24 ${alignClasses}`}>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight text-white md:text-6xl">
            {headline}
          </h1>
          {subheadline ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
              {subheadline}
            </p>
          ) : null}
          {(primaryCta || secondaryCta) && (
            <div className={`mt-9 flex flex-wrap gap-4 ${align === "center" ? "justify-center" : ""}`}>
              {primaryCta ? (
                <Button href={primaryCta.href} variant="ghost" size="large">
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
