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
      className={`flex min-h-[120px] items-center justify-center rounded-lg border border-dashed border-yellow-400 bg-yellow-50 p-6 text-center ${className}`}
    >
      <p className="text-sm font-medium tracking-wide text-yellow-800">
        PLACEHOLDER — SMC TO SUPPLY: {label}
      </p>
    </div>
  );
}
