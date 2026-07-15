import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import Button from "@/components/ui/Button";
import CTABlock from "@/components/ui/CTABlock";
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
  new: "bg-brand-blue text-white",
  used: "bg-brand-navy text-white",
  refurbished: "bg-brand-red text-white",
};

function conditionBadgeClass(condition?: string): string {
  const key = (condition ?? "").toLowerCase();
  return CONDITION_STYLES[key] ?? "bg-brand-offwhite text-brand-navy border border-brand-border";
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
  { label: "$5,000 \u2013 $10,000", value: "5k-10k" },
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
        // BASE_URL already ends with a trailing slash.
        const res = await fetch(`${import.meta.env.BASE_URL}api/inventory`);
        if (!res.ok) {
          throw new Error(`Inventory request failed (${res.status})`);
        }
        const data = (await res.json()) as InventoryResponse;

        // Photos/notes come from Sanity, joined on netsuiteItemId. Degrade
        // gracefully when the CMS isn't configured or the fetch fails.
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
    "rounded border border-brand-border bg-white px-4 py-2 text-sm text-brand-navy";

  return (
    <Layout>
      <PageMeta
        title="Current Lift Inventory | Summerset Marine Construction"
        description="Browse Summerset Marine's current in-stock boat lift inventory — new, used, and refurbished lifts available now across our Wisconsin locations."
      />

      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h1 className="font-serif text-4xl md:text-5xl">Current Lift Inventory</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            In-stock boat lifts available now. Inventory is updated directly from our warehouse
            system &mdash; inquire to reserve a lift or ask a question.
          </p>
          {lastUpdated ? (
            <p className="mt-3 text-sm text-white/60">
              Last updated{" "}
              {new Date(lastUpdated).toLocaleDateString("en-US", { dateStyle: "long" })}
            </p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-12">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <select
            aria-label="Filter by lift type"
            className={selectClass}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All lift types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
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
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            aria-label="Filter by price"
            className={selectClass}
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            {PRICE_BUCKETS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>

        {/* States */}
        {error ? (
          <div className="mt-12 rounded-lg border border-brand-border bg-brand-offwhite p-10 text-center">
            <h2 className="font-serif text-2xl text-brand-navy">
              Inventory is temporarily unavailable
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-gray">
              We couldn&rsquo;t load the current lift inventory. Please try again shortly, or
              contact us and we&rsquo;ll let you know what&rsquo;s in stock.
            </p>
            <div className="mt-6">
              <Button href="/contact" variant="secondary">
                Contact Us
              </Button>
            </div>
          </div>
        ) : items === null ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {[0, 1, 2].map((n) => (
              <div
                key={n}
                className="h-80 animate-pulse rounded-lg border border-brand-border bg-brand-offwhite"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-12 rounded-lg border border-brand-border bg-brand-offwhite p-10 text-center">
            <h2 className="font-serif text-2xl text-brand-navy">
              {items.length === 0 ? "No lifts in stock right now" : "No lifts match those filters"}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-gray">
              {items.length === 0
                ? "Our in-stock inventory moves fast. Tell us what you're looking for and we'll notify you when a matching lift arrives."
                : "Try broadening your filters, or tell us what you're looking for and we'll help you find it."}
            </p>
            <div className="mt-6">
              <Button href="/consultation?interest=lift-inventory" variant="primary">
                Tell Us What You Need
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => {
              const photo = item.media?.photos?.[0];
              const price = formatPrice(item.price);
              return (
                <div
                  key={item.netsuiteItemId}
                  className="flex flex-col overflow-hidden rounded-lg border border-brand-border bg-white shadow-sm"
                >
                  {photo ? (
                    <img
                      src={photo.url}
                      alt={photo.alt ?? item.name}
                      className="h-52 w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-52 w-full items-center justify-center bg-brand-offwhite">
                      <span className="text-sm font-medium uppercase tracking-wide text-brand-gray">
                        Photo Coming Soon
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-serif text-xl text-brand-navy">{item.name}</h2>
                      {item.condition ? (
                        <span
                          className={`shrink-0 rounded px-2 py-1 text-xs font-semibold uppercase tracking-wide ${conditionBadgeClass(item.condition)}`}
                        >
                          {item.condition}
                        </span>
                      ) : null}
                    </div>
                    <ul className="mt-3 space-y-1 text-sm text-brand-gray">
                      {item.brand || item.model ? (
                        <li>{[item.brand, item.model].filter(Boolean).join(" ")}</li>
                      ) : null}
                      {item.year ? <li>Year: {item.year}</li> : null}
                      {item.capacity ? <li>Capacity: {item.capacity}</li> : null}
                      {item.location ? <li>Located at: {item.location}</li> : null}
                    </ul>
                    {item.media?.notes ? (
                      <p className="mt-3 text-sm italic text-brand-gray">{item.media.notes}</p>
                    ) : null}
                    <div className="mt-auto pt-5">
                      {price ? (
                        <p className="font-serif text-2xl text-brand-navy">{price}</p>
                      ) : (
                        <p className="text-sm font-medium text-brand-gray">Call for pricing</p>
                      )}
                      <div className="mt-4">
                        <Button
                          href={`/consultation?interest=lift-inventory&itemId=${encodeURIComponent(item.netsuiteItemId)}`}
                          variant="primary"
                        >
                          Inquire
                        </Button>
                      </div>
                      {item.media?.marketplaceLinks?.length ? (
                        <div className="mt-3 flex flex-wrap gap-3">
                          {item.media.marketplaceLinks.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-brand-blue underline hover:text-brand-navy"
                            >
                              View on {link.platform}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <CTABlock
        variant="light"
        headline="Don't see the lift you need?"
        subheadline="Inventory changes weekly. Tell us what you're looking for and we'll track one down."
        primaryCta={{ label: "Get a Consultation", href: "/consultation?interest=lift-inventory" }}
      />
    </Layout>
  );
}
