import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";

/* ── Navigation data ─────────────────────────────────────────────── */

interface NavLink {
  label: string;
  href: string;
}

const PRODUCTS_COL_1: NavLink[] = [
  { label: "Lifetime All Seasons HD", href: "/products/permanent-piers/all-seasons-hd" },
  { label: "Lifetime All Seasons", href: "/products/permanent-piers/all-seasons" },
  { label: "Lifetime Classic", href: "/products/permanent-piers/classic" },
  { label: "Lifetime Minimalist", href: "/products/permanent-piers/minimalist" },
  { label: "Commercial Pier", href: "/products/permanent-piers/commercial" },
];
const PRODUCTS_COL_1_EXTRA: NavLink[] = [
  { label: "Permanent vs. Seasonal Comparison", href: "/resources/permanent-vs-seasonal" },
];
const PRODUCTS_COL_2: NavLink[] = [
  { label: "Built-In Lift", href: "/products/lifts/built-in" },
  { label: "Standalone Lift", href: "/products/lifts/standalone" },
  { label: "PWC Lift", href: "/products/lifts/pwc" },
  { label: "View All Inventory", href: "/products/lifts/inventory" },
];
const PRODUCTS_COL_2_EXTRA: NavLink[] = [
  { label: "Seasonal Systems", href: "/products/seasonal" },
  { label: "Accessories", href: "/products/accessories" },
];

const SERVICES_LINKS: NavLink[] = [
  { label: "Marine Contracting", href: "/services/marine-contracting" },
  { label: "Residential Service", href: "/services/residential" },
  { label: "Repairs", href: "/services/repairs" },
];

const MARKET_COLUMNS: { heading: string; headingHref: string; links: NavLink[] }[] = [
  {
    heading: "Lake Geneva",
    headingHref: "/markets/lake-geneva",
    links: [
      { label: "Geneva Lake", href: "/markets/lake-geneva/geneva-lake" },
      { label: "Projects", href: "/markets/lake-geneva/projects" },
      { label: "Testimonials", href: "/markets/lake-geneva/testimonials" },
      { label: "Contact", href: "/markets/lake-geneva/contact" },
    ],
  },
  {
    heading: "Oconomowoc / Lake Country",
    headingHref: "/markets/oconomowoc",
    links: [
      { label: "Okauchee Lake", href: "/markets/oconomowoc/okauchee-lake" },
      { label: "Lac La Belle", href: "/markets/oconomowoc/lac-la-belle" },
      { label: "Nagawicka Lake", href: "/markets/oconomowoc/nagawicka-lake" },
      { label: "Beaver Lake", href: "/markets/oconomowoc/beaver-lake" },
      { label: "Projects", href: "/markets/oconomowoc/projects" },
      { label: "Testimonials", href: "/markets/oconomowoc/testimonials" },
      { label: "Contact", href: "/markets/oconomowoc/contact" },
    ],
  },
  {
    heading: "Madison",
    headingHref: "/markets/madison",
    links: [
      { label: "Projects", href: "/markets/madison/projects" },
      { label: "Testimonials", href: "/markets/madison/testimonials" },
      { label: "Contact", href: "/markets/madison/contact" },
    ],
  },
  {
    heading: "Whitewater",
    headingHref: "/markets/whitewater",
    links: [
      { label: "Projects", href: "/markets/whitewater/projects" },
      { label: "Testimonials", href: "/markets/whitewater/testimonials" },
      { label: "Contact", href: "/markets/whitewater/contact" },
    ],
  },
  {
    heading: "Green Lake",
    headingHref: "/markets/green-lake",
    links: [
      { label: "Projects", href: "/markets/green-lake/projects" },
      { label: "Testimonials", href: "/markets/green-lake/testimonials" },
      { label: "Contact", href: "/markets/green-lake/contact" },
    ],
  },
  {
    heading: "Fox Chain",
    headingHref: "/markets/fox-chain",
    links: [
      { label: "Projects", href: "/markets/fox-chain/projects" },
      { label: "Testimonials", href: "/markets/fox-chain/testimonials" },
      { label: "Contact", href: "/markets/fox-chain/contact" },
    ],
  },
  {
    heading: "Door County",
    headingHref: "/markets/door-county",
    links: [
      { label: "Green Bay", href: "/markets/door-county/green-bay" },
      { label: "Sturgeon Bay", href: "/markets/door-county/sturgeon-bay" },
      { label: "Lake Michigan", href: "/markets/door-county/lake-michigan" },
      { label: "Projects", href: "/markets/door-county/projects" },
      { label: "Testimonials", href: "/markets/door-county/testimonials" },
      { label: "Contact", href: "/markets/door-county/contact" },
    ],
  },
];

const RESOURCES_LINKS: NavLink[] = [
  { label: "FAQ", href: "/resources/faq" },
  { label: "Blog", href: "/blog" },
];
const BUYER_GUIDE_LINKS: NavLink[] = [
  { label: "Permanent vs. Seasonal", href: "/resources/permanent-vs-seasonal" },
  { label: "What Does a Pier Cost?", href: "/resources/what-does-a-pier-cost" },
  { label: "Installation Process", href: "/resources/installation-process" },
  { label: "What to Expect", href: "/resources/what-to-expect" },
];

/* ── Desktop dropdown primitives ─────────────────────────────────── */

function NavTrigger({ label, open }: { label: string; open: boolean }) {
  return (
    <span
      className={`flex cursor-pointer items-center gap-1 py-5 text-[14px] tracking-[.06em] font-serif transition-colors ${
        open ? "text-brand-gold" : "text-[#3a3630] hover:text-brand-gold"
      }`}
    >
      {label}
      <svg
        className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 010-1.08z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

function Dropdown({
  label,
  children,
  wide,
}: {
  label: string;
  children: ReactNode;
  wide?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const menuId = `menu-${label.toLowerCase().replace(/\s+/g, "-")}`;

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="bg-transparent"
      >
        <NavTrigger label={label} open={open} />
      </button>
      {open ? (
        <div
          id={menuId}
          className={`absolute top-full z-50 rounded-b-[2px] border border-t-0 border-brand-hairline bg-brand-offwhite shadow-lg ${
            wide ? "left-1/2 -translate-x-1/2" : "left-0"
          }`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

function MenuLink({ link }: { link: NavLink }) {
  return (
    <Link
      href={link.href}
      className="block px-3 py-1.5 text-[14px] text-brand-navy/80 transition-colors hover:text-brand-gold font-sans"
      data-testid={`link-menu-${link.href.replace(/\//g, "-").replace(/^-/, "")}`}
    >
      {link.label}
    </Link>
  );
}

function MenuHeading({ children }: { children: ReactNode }) {
  return (
    <p className="px-3 pb-2 text-[11px] uppercase tracking-[.15em] font-serif text-[#b68235]">
      {children}
    </p>
  );
}

/* ── Mobile accordion ────────────────────────────────────────────── */

function MobileAccordion({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-brand-hairline/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left font-serif text-[16px] tracking-[.04em] text-brand-navy"
        aria-expanded={open}
      >
        {label}
        <svg
          className={`h-4 w-4 text-brand-navy/60 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 010-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open ? <div className="pb-4 pl-3">{children}</div> : null}
    </div>
  );
}

function MobileLink({ link }: { link: NavLink }) {
  return (
    <Link
      href={link.href}
      className="block py-1.5 text-[14px] font-sans text-brand-navy/75 hover:text-brand-gold"
    >
      {link.label}
    </Link>
  );
}

/* ── Header ──────────────────────────────────────────────────────── */

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <div className="bg-brand-navy h-[40px] hidden md:flex items-center justify-between px-[60px]">
        <span className="font-sans text-[11px] text-[#f8f7f4]/45 tracking-[.04em]">Serving Wisconsin Lake Country · Est. 2001</span>
        <div className="flex items-center gap-[24px]">
          <span className="font-sans text-[12px] text-[#f8f7f4]/60">(262) 248-8444</span>
          <span className="block w-[1px] h-[14px] bg-[#f8f7f4]/15" />
          <Link href="/consultation" className="font-serif text-[11px] tracking-[.18em] uppercase text-brand-gold hover:text-white transition-colors">
            Schedule Consultation
          </Link>
        </div>
      </div>
      <header className="sticky top-0 z-50 bg-brand-offwhite border-b border-brand-hairline px-6 md:px-[60px] h-[64px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-[14px] no-underline" data-testid="link-home">
          <div className="bg-brand-navy px-[16px] py-[8px] flex items-center">
            <img
              src="/images/summerset-marine-logo.png"
              alt="Summerset Marine Construction"
              className="h-[28px] w-auto block brightness-0 invert"
            />
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-[36px] md:flex" aria-label="Main">
          <Dropdown label="Products" wide>
            <div className="flex w-[560px] gap-8 p-6">
              <div className="flex-1">
                <MenuHeading>Permanent Systems</MenuHeading>
                {PRODUCTS_COL_1.map((l) => (
                  <MenuLink key={l.href} link={l} />
                ))}
                <div className="my-3 border-t border-brand-hairline" />
                {PRODUCTS_COL_1_EXTRA.map((l) => (
                  <MenuLink key={l.href} link={l} />
                ))}
              </div>
              <div className="flex-1">
                <MenuHeading>Lifts &amp; Other</MenuHeading>
                {PRODUCTS_COL_2.map((l) => (
                  <MenuLink key={l.href} link={l} />
                ))}
                <div className="my-3 border-t border-brand-hairline" />
                {PRODUCTS_COL_2_EXTRA.map((l) => (
                  <MenuLink key={l.href} link={l} />
                ))}
              </div>
            </div>
          </Dropdown>

          <Dropdown label="Services">
            <div className="w-64 p-4">
              {SERVICES_LINKS.map((l) => (
                <MenuLink key={l.href} link={l} />
              ))}
            </div>
          </Dropdown>

          <Dropdown label="Markets" wide>
            <div className="flex w-[720px] gap-8 p-6">
              {MARKET_COLUMNS.map((col) => (
                <div key={col.heading} className="flex-1">
                  <Link
                    href={col.headingHref}
                    className="mb-2 block px-3 text-[11px] font-serif uppercase tracking-[.15em] text-[#b68235] hover:text-brand-navy"
                  >
                    {col.heading}
                  </Link>
                  {col.links.map((l) => (
                    <MenuLink key={l.href} link={l} />
                  ))}
                </div>
              ))}
            </div>
          </Dropdown>

          <Dropdown label="Resources">
            <div className="w-72 p-4">
              {RESOURCES_LINKS.map((l) => (
                <MenuLink key={l.href} link={l} />
              ))}
              <div className="my-3 border-t border-brand-hairline" />
              <MenuHeading>Buyer Guides</MenuHeading>
              {BUYER_GUIDE_LINKS.map((l) => (
                <MenuLink key={l.href} link={l} />
              ))}
            </div>
          </Dropdown>

          <Link
            href="/about"
            className="py-5 text-[14px] tracking-[.06em] font-serif text-[#3a3630] transition-colors hover:text-brand-gold"
            data-testid="link-nav-about"
          >
            About
          </Link>

          <Link
            href="/locations"
            className="py-5 text-[14px] tracking-[.06em] font-serif text-[#3a3630] transition-colors hover:text-brand-gold"
            data-testid="link-nav-locations"
          >
            Locations
          </Link>

          <Link
            href="/consultation"
            className="px-[22px] py-[9px] border border-brand-navy font-serif text-[12px] tracking-[.13em] text-brand-navy uppercase transition-colors hover:bg-brand-navy hover:text-white"
          >
            Get a Consultation
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-brand-navy md:hidden"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          data-testid="button-open-menu"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile drawer */}
        {drawerOpen ? (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col bg-brand-offwhite shadow-2xl">
              <div className="flex items-center justify-between border-b border-brand-hairline px-5 py-4">
                <div className="bg-brand-navy px-[12px] py-[6px] flex items-center">
                  <img
                    src="/images/summerset-marine-logo.png"
                    alt="Summerset Marine Construction"
                    className="h-[20px] w-auto block brightness-0 invert"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="flex h-9 w-9 items-center justify-center text-brand-navy"
                  aria-label="Close menu"
                  data-testid="button-close-menu"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5">
                <MobileAccordion label="Products">
                  <p className="pb-1 text-[10px] uppercase tracking-[.15em] font-serif text-[#b68235]">Permanent Systems</p>
                  {[...PRODUCTS_COL_1, ...PRODUCTS_COL_1_EXTRA].map((l) => (
                    <MobileLink key={l.href} link={l} />
                  ))}
                  <p className="pb-1 pt-4 text-[10px] uppercase tracking-[.15em] font-serif text-[#b68235]">Lifts &amp; Other</p>
                  {[...PRODUCTS_COL_2, ...PRODUCTS_COL_2_EXTRA].map((l) => (
                    <MobileLink key={l.href} link={l} />
                  ))}
                </MobileAccordion>

                <MobileAccordion label="Services">
                  {SERVICES_LINKS.map((l) => (
                    <MobileLink key={l.href} link={l} />
                  ))}
                </MobileAccordion>

                <MobileAccordion label="Markets">
                  {MARKET_COLUMNS.map((col) => (
                    <div key={col.heading} className="pb-3">
                      <Link
                        href={col.headingHref}
                        className="block pb-1 pt-2 text-[11px] uppercase tracking-[.15em] font-serif text-[#b68235]"
                      >
                        {col.heading}
                      </Link>
                      {col.links.map((l) => (
                        <MobileLink key={l.href} link={l} />
                      ))}
                    </div>
                  ))}
                </MobileAccordion>

                <MobileAccordion label="Resources">
                  {RESOURCES_LINKS.map((l) => (
                    <MobileLink key={l.href} link={l} />
                  ))}
                  <p className="pb-1 pt-4 text-[10px] uppercase tracking-[.15em] font-serif text-[#b68235]">Buyer Guides</p>
                  {BUYER_GUIDE_LINKS.map((l) => (
                    <MobileLink key={l.href} link={l} />
                  ))}
                </MobileAccordion>

                <Link href="/about" className="block border-b border-brand-hairline py-4 font-serif text-[16px] tracking-[.04em] text-brand-navy">
                  About
                </Link>
                <Link href="/locations" className="block border-b border-brand-hairline py-4 font-serif text-[16px] tracking-[.04em] text-brand-navy">
                  Locations
                </Link>
              </div>

              <div className="border-t border-brand-hairline p-5">
                <Link
                  href="/consultation"
                  className="flex w-full justify-center px-[22px] py-[12px] border border-brand-navy font-serif text-[12px] tracking-[.13em] text-brand-navy uppercase transition-colors hover:bg-brand-navy hover:text-white"
                >
                  Get a Consultation
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}