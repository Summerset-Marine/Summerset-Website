/**
 * PLACEHOLDER — SMC TO SUPPLY
 *
 * Visually-obvious staging placeholder for content that must be supplied by
 * Summerset Marine Construction. Rendered with a light yellow background so
 * missing content is impossible to miss during staging review.
 */
interface ContentPlaceholderProps {
  label: string;
  className?: string;
}

export default function ContentPlaceholder({ label, className = "" }: ContentPlaceholderProps) {
  return (
    <div
      className={`flex min-h-[120px] items-center justify-center rounded-[2px] border border-dashed border-brand-gold bg-[#fff3e4] p-6 text-center ${className}`}
    >
      <p className="text-[11px] font-medium tracking-[.1em] uppercase text-[#a06f24]">
        PLACEHOLDER — SMC TO SUPPLY: {label}
      </p>
    </div>
  );
}
