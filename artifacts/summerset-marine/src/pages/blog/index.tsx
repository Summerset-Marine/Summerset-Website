import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import { isSanityConfigured, sanityLiveFetch, ALL_BLOG_POSTS_QUERY } from "@/lib/sanity";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  excerpt?: string;
  market?: string;
  lake?: string;
  productType?: string;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
}

const MARKET_FILTERS = [
  { label: "All", value: "All" },
  { label: "Lake Geneva", value: "lake-geneva" },
  { label: "Oconomowoc", value: "oconomowoc" },
  { label: "Door County", value: "door-county" },
] as const;

const PRODUCT_FILTERS = ["All", "Permanent Piers", "Lifts", "Marine Contracting"] as const;

const MARKET_LABELS: Record<string, string> = {
  "lake-geneva": "Lake Geneva",
  oconomowoc: "Oconomowoc / Lake Country",
  "door-county": "Door County",
};

const PAGE_SIZE = 12;

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogIndexPage() {
  const [posts, setPosts] = useState<BlogPost[] | null>(isSanityConfigured ? null : []);
  const [marketFilter, setMarketFilter] = useState<string>("All");
  const [productFilter, setProductFilter] = useState<string>("All");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isSanityConfigured) return;
    sanityLiveFetch<BlogPost[]>(ALL_BLOG_POSTS_QUERY)
      .then((data) => setPosts(data ?? []))
      .catch(() => setPosts([]));
  }, []);

  const filtered = useMemo(
    () =>
      (posts ?? []).filter((p) => {
        if (marketFilter !== "All" && p.market !== marketFilter) return false;
        if (productFilter !== "All") {
          const type = (p.productType ?? "").toLowerCase();
          if (productFilter === "Permanent Piers" && !type.includes("pier")) return false;
          if (productFilter === "Lifts" && !type.includes("lift")) return false;
          if (productFilter === "Marine Contracting" && !type.includes("contract")) return false;
        }
        return true;
      }),
    [posts, marketFilter, productFilter],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const selectClass =
    "rounded border border-brand-border bg-white px-4 py-2 text-sm text-brand-navy";

  return (
    <Layout>
      <PageMeta
        title="Blog & Waterfront Resources | Summerset Marine Construction"
        description="Expert guidance on permanent piers, boat lifts, waterfront installation, and lake living from Summerset Marine Construction."
        canonical="https://summersetmarine.com/blog"
      />

      {/* 1. Header */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h1 className="font-serif text-4xl md:text-5xl">Blog &amp; Resources</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Expert guidance on permanent piers, boat lifts, waterfront installation, and lake
            living.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-12">
        {/* 2. Filter bar */}
        <div className="flex flex-wrap items-center gap-4">
          <select
            aria-label="Filter by market"
            className={selectClass}
            value={marketFilter}
            onChange={(e) => {
              setMarketFilter(e.target.value);
              setPage(1);
            }}
          >
            {MARKET_FILTERS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.value === "All" ? "All markets" : f.label}
              </option>
            ))}
          </select>
          <select
            aria-label="Filter by product type"
            className={selectClass}
            value={productFilter}
            onChange={(e) => {
              setProductFilter(e.target.value);
              setPage(1);
            }}
          >
            {PRODUCT_FILTERS.map((f) => (
              <option key={f} value={f}>
                {f === "All" ? "All product types" : f}
              </option>
            ))}
          </select>
        </div>

        {/* 3–5. Post grid */}
        {posts === null ? (
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="h-80 animate-pulse rounded-lg border border-brand-border bg-brand-offwhite"
              />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="mt-10">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="flex h-80 items-center justify-center rounded-lg border border-brand-border bg-brand-gray-light"
                >
                  <span className="text-sm font-medium uppercase tracking-wide text-brand-black/80">
                    Posts Coming Soon
                  </span>
                </div>
              ))}
            </div>
            <ContentPlaceholder
              label="blog posts — titles, featured images, excerpts, market/lake tags (from Sanity blogPost documents)"
              className="mt-8"
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-brand-border bg-white shadow-sm transition hover:shadow-md"
              >
                {post.featuredImageUrl ? (
                  <img
                    src={post.featuredImageUrl}
                    alt={post.featuredImageAlt ?? post.title}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-brand-offwhite text-sm text-brand-black/80">
                    Image Coming Soon
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  {post.market || post.lake ? (
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
                      {MARKET_LABELS[post.market ?? ""] ?? post.market}
                      {post.lake ? ` · ${post.lake}` : ""}
                    </span>
                  ) : null}
                  <h2 className="mt-2 font-serif text-xl text-brand-navy group-hover:text-brand-blue">
                    {post.title}
                  </h2>
                  {formatDate(post.publishedAt) ? (
                    <p className="mt-1 text-sm text-brand-black/80">{formatDate(post.publishedAt)}</p>
                  ) : null}
                  {post.excerpt ? (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-black/80">
                      {post.excerpt}
                    </p>
                  ) : null}
                  <span className="mt-4 font-medium text-brand-red">Read More &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 6. Pagination */}
        {totalPages > 1 ? (
          <nav aria-label="Blog pagination" className="mt-10 flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                aria-current={n === currentPage ? "page" : undefined}
                onClick={() => setPage(n)}
                className={`rounded border px-4 py-2 text-sm font-medium ${
                  n === currentPage
                    ? "border-brand-navy bg-brand-navy text-white"
                    : "border-brand-border bg-white text-brand-navy hover:border-brand-navy"
                }`}
              >
                {n}
              </button>
            ))}
          </nav>
        ) : null}
      </section>
    </Layout>
  );
}
