import { type MouseEventHandler, type ReactNode } from "react";
import { Link } from "wouter";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "large";
  href?: string;
  onClick?: MouseEventHandler;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "border border-brand-gold text-brand-gold hover:bg-brand-gold/10",
  secondary:
    "border border-brand-navy text-brand-navy bg-transparent hover:bg-brand-navy/5",
  ghost:
    "border border-white text-white bg-transparent hover:bg-white/10",
};

const SIZE_CLASSES: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "px-[22px] py-[9px] text-[12px] uppercase tracking-[.13em] font-serif",
  large: "px-12 py-[15px] text-[13px] uppercase tracking-[.18em] font-serif",
};

export default function Button({
  variant = "primary",
  size = "default",
  href,
  onClick,
  children,
  className = "",
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-150 disabled:pointer-events-none disabled:opacity-60",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    const isExternal = /^(https?:)?\/\//.test(href) || href.startsWith("tel:") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a href={href} onClick={onClick} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
