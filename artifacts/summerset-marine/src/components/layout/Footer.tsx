import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-navy text-white">
      <div className="mx-auto grid max-w-content gap-8 px-6 py-16 md:grid-cols-4">
        <div>
          <p className="font-serif text-lg font-semibold">Summerset Marine Construction</p>
          <p className="mt-2 text-sm text-white/70">
            Permanent waterfront systems for Wisconsin's finest lakes.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Products</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/products/permanent-piers" className="text-white/80 hover:text-white">Permanent Piers</Link></li>
            <li><Link href="/products/lifts" className="text-white/80 hover:text-white">Boat Lifts</Link></li>
            <li><Link href="/products/lifts/inventory" className="text-white/80 hover:text-white">Lift Inventory</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Markets</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/markets/lake-geneva" className="text-white/80 hover:text-white">Lake Geneva</Link></li>
            <li><Link href="/markets/oconomowoc" className="text-white/80 hover:text-white">Oconomowoc</Link></li>
            <li><Link href="/markets/door-county" className="text-white/80 hover:text-white">Door County</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Company</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/about" className="text-white/80 hover:text-white">About</Link></li>
            <li><Link href="/careers" className="text-white/80 hover:text-white">Careers</Link></li>
            <li><Link href="/contact" className="text-white/80 hover:text-white">Contact</Link></li>
            <li><Link href="/service-request" className="text-white/80 hover:text-white">Service Request</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-content px-6 py-4 text-xs text-white/50">
          © {new Date().getFullYear()} Summerset Marine Construction. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
