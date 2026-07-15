import { Link } from "wouter";

const navItems = [
  { label: "Permanent Piers", href: "/products/permanent-piers" },
  { label: "Boat Lifts", href: "/products/lifts" },
  { label: "Services", href: "/services/marine-contracting" },
  { label: "Resources", href: "/resources/faq" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-content items-center justify-between px-6">
        <Link href="/" className="font-serif text-xl font-semibold text-brand-navy" data-testid="link-home">
          Summerset Marine
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-brand-gray transition-colors hover:text-brand-navy"
              data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/consultation"
            className="rounded-md bg-brand-red px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-red-hover"
            data-testid="link-consultation"
          >
            Request Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
