import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import CTABlock from "@/components/ui/CTABlock";
import { ProductBreadcrumb, ProductHero } from "@/components/ui/ProductDetail";
import { Link } from "wouter";
import {
  isSanityConfigured,
  sanityLiveFetch,
  LIFT_MEDIA_QUERY,
} from "@/lib/sanity";

/** Shape of an inventory item pushed by the NetSuite webhook. */
interface InventoryItem {
  netsuiteItemId: string;
  name: string;
  type?: string;
  brand?: string;
  model?: string;
  year?: number | string;
  condition?: string;
  capacity?: string;
  price?: number;
  location?: string;
  description?: string;
}

interface InventoryResponse {
  lastUpdated: string | null;
  items: InventoryItem[];
}

interface LiftMedia {
  netsuiteItemId: string;
  photos: { url: string; alt?: string }[] | null;
  notes?: string | null;
  marketplaceLinks?: { platform: string; url: string }[] | null;
}

type MergedItem = InventoryItem & { media?: LiftMedia };

const CONDITION_STYLES: Record<string, string> = {
  new: "bg-brand-navy text-white",
  used: "bg-white text-brand-navy border border-brand-hairline",
  refurbished: "bg-brand-gold text-brand-navy",
};

function conditionBadgeClass(condition?: string): string {
  const key = (condition ?? "").toLowerCase();
  return CONDITION_STYLES[key] ?? "bg-brand-offwhite text-brand-navy border border-brand-hairline";
}

function formatPrice(price?: number): string | null {
  if (typeof price !== "number" || Number.isNaN(price)) return null;
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

const PRICE_BUCKETS = [
  { label: "All prices", value: "all" },
  { label: "Under $5,000", value: "under-5k" },
  { label: "$5,000 – $10,000", value: "5k-10k" },
  { label: "Over $10,000", value: "over-10k" },
] as const;

function inPriceBucket(price: number | undefined, bucket: string): boolean {
  if (bucket === "all") return true;
  if (typeof price !== "number") return false;
  if (bucket === "under-5k") return price < 5000;
  if (bucket === "5k-10k") return price >= 5000 && price <= 10000;
  return price > 10000;
}

export default function LiftInventoryPage() {
  const [items, setItems] = useState<MergedItem[] | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [typeFilter, setTypeFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}api/inventory`);
        if (!res.ok) {
          throw new Error(`Inventory request failed (${res.status})`);
        }
        const data = (await res.json()) as InventoryResponse;

        let media: LiftMedia[] = [];
        if (isSanityConfigured) {
          try {
            media = await sanityLiveFetch<LiftMedia[]>(LIFT_MEDIA_QUERY);
          } catch {
            media = [];
          }
        }
        const mediaById = new Map(media.map((m) => [m.netsuiteItemId, m]));

        if (!cancelled) {
          setItems(
            (data.items ?? []).map((item) => ({
              ...item,
              media: mediaById.get(item.netsuiteItemId),
            })),
          );
          setLastUpdated(data.lastUpdated);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load inventory");
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const types = useMemo(
    () =>
      Array.from(
        new Set((items ?? []).map((i) => i.type).filter((t): t is string => Boolean(t))),
      ).sort(),
    [items],
  );
  const conditions = useMemo(
    () =>
      Array.from(
        new Set(
          (items ?? []).map((i) => i.condition).filter((c): c is string => Boolean(c)),
        ),
      ).sort(),
    [items],
  );

  const filtered = useMemo(
    () =>
      (items ?? []).filter(
        (item) =>
          (typeFilter === "all" || item.type === typeFilter) &&
          (conditionFilter === "all" || item.condition === conditionFilter) &&
          inPriceBucket(item.price, priceFilter),
      ),
    [items, typeFilter, conditionFilter, priceFilter],
  );

  const selectClass =
    "border border-brand-hairline bg-white px-[20px] py-[10px] font-serif text-[14px] text-brand-navy focus:outline-none focus:border-brand-gold";

  return (
    <Layout>
      <PageMeta
        title="Current Lift Inventory | Summerset Marine Construction"
        description="Browse Summerset Marine's current in-stock boat lift inventory — new, used, and refurbished lifts available now across our Wisconsin locations."
      />

      <ProductBreadcrumb 
        items={[
          { label: "Products", href: "/products" },
          { label: "Lifts", href: "/products/lifts" },
          { label: "Inventory" }
        ]} 
      />

      <ProductHero
        kicker="Lift Systems"
        title="Current Inventory"
        description="In-stock boat lifts available now. Inventory is updated directly from our warehouse system — inquire to reserve a lift."
        ctaLabel=""
      />

      <section className="bg-brand-offwhite px-6 md:px-[120px] py-[40px] border-b border-brand-hairline">
        <div className="max-w-[1040px] mx-auto">
          <div className="flex flex-wrap items-center gap-[16px]">
            <select
              aria-label="Filter by lift type"
              className={selectClass}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All lift types</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select
              aria-label="Filter by condition"
              className={selectClass}
              value={conditionFilter}
              onChange={(e) => setConditionFilter(e.target.value)}
            >
              <option value="all">All conditions</option>
              {conditions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              aria-label="Filter by price"
              className={selectClass}
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              {PRICE_BUCKETS.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
            {lastUpdated && (
              <span className="font-serif text-[13px] text-[#201f1d]/50 ml-auto">
                Updated {new Date(lastUpdated).toLocaleDateString("en-US", { dateStyle: "long" })}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="bg-brand-offwhite px-6 md:px-[120px] py-[88px]">
        <div className="max-w-[1040px] mx-auto">
          {error ? (
            <div className="border border-brand-hairline bg-white p-[60px] text-center">
              <h2 className="font-serif text-[28px] text-[#201f1d] mb-[12px]">
                Inventory is temporarily unavailable
              </h2>
              <p className="font-serif text-[16px] text-brand-gray max-w-[600px] mx-auto mb-[32px]">
                We couldn't load the current lift inventory. Please try again shortly, or contact us and we'll let you know what's in stock.
              </p>
              <Link
                href="/contact"
                className="inline-block px-[40px] py-[13px] border border-brand-navy font-serif text-[13px] tracking-[.16em] text-brand-navy uppercase hover:bg-brand-navy hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          ) : items === null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
              {[0, 1, 2].map((n) => (
                <div key={n} className="h-[400px] bg-white border border-brand-hairline animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="border border-brand-hairline bg-white p-[60px] text-center">
              <h2 className="font-serif text-[28px] text-[#201f1d] mb-[12px]">
                {items.length === 0 ? "No lifts in stock right now" : "No lifts match those filters"}
              </h2>
              <p className="font-serif text-[16px] text-brand-gray max-w-[600px] mx-auto mb-[32px]">
                {items.length === 0
                  ? "Our in-stock inventory moves fast. Tell us what you're looking for and we'll notify you when a matching lift arrives."
                  : "Try broadening your filters, or tell us what you're looking for and we'll help you find it."}
              </p>
              <Link
                href="/consultation?interest=lift-inventory"
                className="inline-block px-[40px] py-[13px] border border-brand-navy bg-brand-navy font-serif text-[13px] tracking-[.16em] text-white uppercase hover:bg-white hover:text-brand-navy transition-colors"
              >
                Tell Us What You Need
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
              {filtered.map((item) => {
                const photo = item.media?.photos?.[0];
                const price = formatPrice(item.price);
                return (
                  <div key={item.netsuiteItemId} className="bg-white border border-brand-hairline flex flex-col group hover:border-brand-gold transition-colors">
                    <div className="h-[240px] overflow-hidden bg-brand-offwhite">
                      {photo ? (
                        <img
                          src={photo.url}
                          alt={photo.alt ?? item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="font-serif text-[12px] uppercase tracking-[.1em] text-brand-gray/50">
                            Photo Coming Soon
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-[32px] flex flex-col flex-1">
                      <div className="flex justify-between items-start gap-4 mb-[16px]">
                        <h2 className="font-serif text-[22px] leading-[1.2] text-[#201f1d] m-0">
                          {item.name}
                        </h2>
                      </div>
                      <div className="mb-[20px]">
                        {item.condition && (
                          <span className={`inline-block px-[8px] py-[4px] font-serif text-[11px] uppercase tracking-[.1em] mb-[12px] ${conditionBadgeClass(item.condition)}`}>
                            {item.condition}
                          </span>
                        )}
                        <ul className="list-none p-0 m-0 space-y-[4px]">
                          {item.brand || item.model ? (
                            <li className="font-serif text-[14px] text-brand-gray">
                              {[item.brand, item.model].filter(Boolean).join(" ")}
                            </li>
                          ) : null}
                          {item.year && <li className="font-serif text-[14px] text-brand-gray">Year: {item.year}</li>}
                          {item.capacity && <li className="font-serif text-[14px] text-brand-gray">Capacity: {item.capacity}</li>}
                          {item.location && <li className="font-serif text-[14px] text-brand-gray">Location: {item.location}</li>}
                        </ul>
                      </div>
                      
                      {item.media?.notes && (
                        <p className="font-serif text-[14px] italic text-brand-gray mb-[24px]">
                          {item.media.notes}
                        </p>
                      )}

                      <div className="mt-auto pt-[24px] border-t border-brand-hairline">
                        <div className="mb-[20px]">
                          {price ? (
                            <span className="font-serif text-[24px] text-[#201f1d]">{price}</span>
                          ) : (
                            <span className="font-serif text-[15px] italic text-brand-gray">Call for pricing</span>
                          )}
                        </div>
                        <Link
                          href={`/consultation?interest=lift-inventory&itemId=${encodeURIComponent(item.netsuiteItemId)}`}
                          className="inline-block w-full text-center px-[24px] py-[11px] border border-brand-navy bg-brand-navy font-serif text-[12px] tracking-[.16em] text-white uppercase hover:bg-white hover:text-brand-navy transition-colors"
                        >
                          Inquire
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CTABlock
        variant="dark"
        headline="Don't see the lift you need?"
        subheadline="Inventory changes weekly. Tell us what you're looking for and we'll track one down."
        primaryCta={{ label: "Request a Consultation", href: "/consultation?interest=lift-inventory" }}
      />
    </Layout>
  );
}
