import { Link } from "wouter";
import Button from "@/components/ui/Button";

const PRODUCT_LINKS = [
  { label: "Permanent Piers", href: "/products/permanent-piers" },
  { label: "Boat & PWC Lifts", href: "/products/lifts" },
  { label: "Seasonal Systems", href: "/products/seasonal" },
  { label: "Accessories", href: "/products/accessories" },
  { label: "Lift Inventory", href: "/products/lifts/inventory" },
  { label: "Permanent vs. Seasonal", href: "/resources/permanent-vs-seasonal" },
];

const MARKET_LINKS = [
  { label: "Lake Geneva", href: "/markets/lake-geneva" },
  { label: "Oconomowoc / Lake Country", href: "/markets/oconomowoc" },
  { label: "Door County", href: "/markets/door-county" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/", // TODO: replace with SMC profile URL
    icon: (
      <path d="M13.5 9H15V6.5h-1.5c-1.933 0-3.5 1.567-3.5 3.5v1.5H8V14h2v5.5h2.5V14h2l.5-2.5h-2.5V10c0-.552.448-1 1-1z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/", // TODO: replace with SMC profile URL
    icon: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.2" cy="7.8" r="1" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/", // TODO: replace with SMC profile URL
    icon: (
      <path d="M7.5 9.5H5V19h2.5V9.5zM6.25 8.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM19 13.5c0-2.485-1.567-4-3.5-4-1.02 0-1.883.462-2.5 1.203V9.5h-2.5V19H13v-5c0-1.105.895-2 2-2s1.5.895 1.5 2v5H19v-5.5z" />
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto grid max-w-content gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Column 1 — Brand */}
        <div>
          <Link href="/" className="inline-block rounded bg-white px-3 py-2">
            <img
              src="/images/summerset-marine-logo.svg"
              alt="Summerset Marine Construction"
              className="h-10 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Engineering Wisconsin&apos;s finest waterfront systems since 1990.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-brand-blue hover:text-white"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Products */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-white/60">Products</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {PRODUCT_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/80 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Markets */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-white/60">Markets</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {MARKET_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/80 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contact */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-white/60">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            <li>
              {/* TODO: replace with real SMC phone number */}
              <a href="tel:[SMC_PHONE_PLACEHOLDER]" className="transition-colors hover:text-white">
                [SMC_PHONE_PLACEHOLDER]
              </a>
            </li>
            <li>
              {/* TODO: replace with real SMC email */}
              <a href="mailto:[SMC_EMAIL_PLACEHOLDER]" className="transition-colors hover:text-white">
                [SMC_EMAIL_PLACEHOLDER]
              </a>
            </li>
            <li className="leading-relaxed">
              Summerset Marine Construction
              <br />
              Whitewater, WI
            </li>
          </ul>
          <div className="mt-6">
            <Button href="/consultation" variant="primary" className="w-full">
              Get a Consultation
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-content flex-col gap-2 px-6 py-4 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 Summerset Marine Construction. All rights reserved.</p>
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
