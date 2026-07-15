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
    "bg-brand-red text-white hover:bg-brand-red-hover border-2 border-transparent",
  secondary:
    "border-2 border-brand-blue text-brand-blue bg-transparent hover:bg-brand-blue hover:text-white",
  ghost:
    "border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-navy",
};

const SIZE_CLASSES: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "px-6 py-3 text-sm",
  large: "px-8 py-4 text-base",
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
