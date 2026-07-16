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
  { label: "Madison", href: "/markets/madison" },
  { label: "Whitewater", href: "/markets/whitewater" },
  { label: "Green Lake", href: "/markets/green-lake" },
  { label: "Fox Chain", href: "/markets/fox-chain" },
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
    <footer className="bg-[#060f1c] text-white px-6 md:px-[120px] pt-20">
      <div className="mx-auto max-w-[1040px]">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-14 pb-16 border-b border-white/10">
          
          {/* Column 1 — Brand */}
          <div>
            <div className="flex items-center gap-3 mb-[22px]">
              <Link href="/">
                <img
                  src="/images/summerset-marine-logo.png"
                  alt="Summerset Marine Construction"
                  className="h-8 w-auto block brightness-0 invert"
                />
              </Link>
            </div>
            <p className="font-sans text-[13px] leading-[1.8] text-[#f8f7f4]/40 m-0 mb-[28px] text-balance">
              Wisconsin&apos;s premier permanent pier and boat lift specialists. Serving lake country since 2001.
            </p>
            <div className="flex gap-[18px] items-center">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-white/40 transition-colors hover:text-brand-gold flex h-5 w-5 items-center justify-center"
                >
                  <svg className="h-full w-full" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Products */}
          <div>
            <p className="font-serif text-[11px] uppercase tracking-[.15em] text-[#f8f7f4]/30 mb-5">Products</p>
            <ul className="space-y-[10px]">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-sans text-[14px] text-[#f8f7f4]/70 transition-colors hover:text-brand-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Markets */}
          <div>
            <p className="font-serif text-[11px] uppercase tracking-[.15em] text-[#f8f7f4]/30 mb-5">Markets</p>
            <ul className="space-y-[10px]">
              {MARKET_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-sans text-[14px] text-[#f8f7f4]/70 transition-colors hover:text-brand-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <p className="font-serif text-[11px] uppercase tracking-[.15em] text-[#f8f7f4]/30 mb-5">Contact</p>
            <ul className="space-y-[10px] text-[14px] font-sans text-[#f8f7f4]/70 mb-8">
              <li>
                <a href="tel:2622488444" className="transition-colors hover:text-brand-gold">
                  (262) 248-8444
                </a>
              </li>
              <li>
                <a href="mailto:info@summersetmarine.com" className="transition-colors hover:text-brand-gold">
                  info@summersetmarine.com
                </a>
              </li>
              <li className="leading-[1.6]">
                W8315 State Road 59<br />Whitewater, WI 53190
              </li>
            </ul>
            <Button href="/consultation" variant="primary" className="!w-full border-white/20 text-white hover:border-brand-gold hover:text-brand-gold hover:bg-transparent">
              Request Consultation
            </Button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-8 text-[12px] font-sans text-[#f8f7f4]/30">
          <p>© {new Date().getFullYear()} Summerset Marine Construction.</p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="transition-colors hover:text-brand-gold">Privacy</Link>
            <a href="#" className="transition-colors hover:text-brand-gold">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
