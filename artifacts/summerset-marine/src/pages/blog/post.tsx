import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { PortableText } from "@portabletext/react";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { articleSchema } from "@/components/seo/JsonLd";
import CTABlock from "@/components/ui/CTABlock";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import {
  isSanityConfigured,
  sanityFetch,
  sanityLiveFetch,
  BLOG_POST_BY_SLUG_QUERY,
  ALL_BLOG_POSTS_QUERY,
} from "@/lib/sanity";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  _updatedAt?: string;
  body?: unknown;
  market?: string;
  lake?: string;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt?: string;
  author?: string;
}

interface RelatedPost {
  _id: string;
  title: string;
  slug: { current: string };
  market?: string;
  excerpt?: string;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
}

const MARKET_LABELS: Record<string, string> = {
  "lake-geneva": "Lake Geneva",
  oconomowoc: "Oconomowoc / Lake Country",
  "door-county": "Door County",
};

const MARKET_LAKES: Record<string, string> = {
  "lake-geneva": "Geneva Lake",
  oconomowoc: "Lake Country",
  "door-county": "Door County",
};

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const [post, setPost] = useState<BlogPost | null | undefined>(
    isSanityConfigured ? undefined : null,
  );
  const [related, setRelated] = useState<RelatedPost[]>([]);

  useEffect(() => {
    if (!isSanityConfigured || !slug) return;
    setPost(undefined);
    sanityFetch<BlogPost | null>(BLOG_POST_BY_SLUG_QUERY, { slug })
      .then((data) => setPost(data ?? null))
      .catch(() => setPost(null));
  }, [slug]);

  useEffect(() => {
    if (!isSanityConfigured || !post?.market) {
      setRelated([]);
      return;
    }
    sanityLiveFetch<RelatedPost[]>(ALL_BLOG_POSTS_QUERY)
      .then((data) =>
        setRelated(
          (data ?? [])
            .filter((p) => p.market === post.market && p.slug.current !== slug)
            .slice(0, 3),
        ),
      )
      .catch(() => setRelated([]));
  }, [post?.market, slug]);

  const marketLabel = post?.market ? (MARKET_LABELS[post.market] ?? post.market) : null;
  const marketLake = post?.market ? (MARKET_LAKES[post.market] ?? post.market) : null;
  const contactHref = post?.market ? `/markets/${post.market}/contact` : "/consultation";

  const metaTitle =
    post?.metaTitle ?? (post ? `${post.title} | Summerset Marine Construction` : "Blog | Summerset Marine Construction");
  const metaDescription =
    post?.metaDescription ??
    post?.excerpt ??
    "Insights on permanent piers, boat lifts, and Wisconsin waterfront living from Summerset Marine Construction.";

  return (
    <Layout>
      <PageMeta
        title={metaTitle}
        description={metaDescription}
        canonical={`https://summersetmarine.com/blog/${slug}`}
      />
      {post?.publishedAt ? (
        <JsonLd
          data={articleSchema({
            title: post.title,
            description: metaDescription,
            datePublished: post.publishedAt,
            dateModified: post._updatedAt ?? post.publishedAt,
            authorName: post.author ?? "Summerset Marine Construction",
            url: `https://summersetmarine.com/blog/${slug}`,
            imageUrl: post.featuredImageUrl,
          })}
        />
      ) : null}

      {post === undefined ? (
        <section className="mx-auto max-w-content px-6 py-22" aria-busy="true">
          <div className="h-8 w-2/3 animate-pulse rounded bg-brand-offwhite" />
          <div className="mt-6 h-64 animate-pulse rounded bg-brand-offwhite" />
        </section>
      ) : post === null ? (
        <section className="mx-auto max-w-content px-6 py-22">
          <h1 className="font-serif text-4xl text-brand-navy">Post Not Found</h1>
          <p className="mt-4 text-brand-gray">
            {isSanityConfigured
              ? "This post doesn't exist or hasn't been published yet."
              : "Blog posts will appear here once the CMS is connected."}
          </p>
          {!isSanityConfigured ? (
            <ContentPlaceholder
              label={`blog post content for "${slug}" (from Sanity blogPost documents)`}
              className="mt-6 max-w-2xl"
            />
          ) : null}
          <p className="mt-6">
            <Link href="/blog" className="font-medium text-brand-blue">
              &larr; Back to Blog &amp; Resources
            </Link>
          </p>
        </section>
      ) : (
        <>
          {/* 1. Hero image */}
          {post.featuredImageUrl ? (
            <img
              src={post.featuredImageUrl}
              alt={post.featuredImageAlt ?? post.title}
              className="h-72 w-full object-cover md:h-96"
            />
          ) : null}

          <article className="mx-auto max-w-3xl px-6 py-14">
            {/* 2–3. Title + meta */}
            <h1 className="font-serif text-4xl leading-tight text-brand-navy md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-brand-gray">
              {[
                formatDate(post.publishedAt),
                post.author,
                marketLabel,
                post.lake,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>

            {/* 4–5. Body */}
            <div className="prose-smc mt-8 space-y-5 text-lg leading-relaxed text-brand-gray [&_a]:font-medium [&_a]:text-brand-blue [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-brand-navy [&_h3]:mt-8 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:text-brand-navy [&_blockquote]:border-l-4 [&_blockquote]:border-brand-blue [&_blockquote]:pl-4 [&_blockquote]:italic">
              {post.body ? (
                <PortableText value={post.body as never} />
              ) : (
                <ContentPlaceholder label="post body content (Sanity portable text)" />
              )}
            </div>
          </article>

          {/* 6. CTA */}
          <CTABlock
            variant="dark"
            headline={marketLake ? `Ready to build on ${marketLake}?` : "Ready to transform your waterfront?"}
            subheadline="Request a consultation and our team will walk your shoreline with you."
            primaryCta={{ label: "Get a Consultation", href: contactHref }}
          />

          {/* 7. Related posts */}
          {related.length > 0 ? (
            <section className="mx-auto max-w-content px-6 py-16">
              <h2 className="font-serif text-3xl text-brand-navy">
                More from {marketLabel ?? "the Blog"}
              </h2>
              <div className="mt-8 grid gap-8 md:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p._id}
                    href={`/blog/${p.slug.current}`}
                    className="group overflow-hidden rounded-lg border border-brand-border bg-white shadow-sm transition hover:shadow-md"
                  >
                    {p.featuredImageUrl ? (
                      <img
                        src={p.featuredImageUrl}
                        alt={p.featuredImageAlt ?? p.title}
                        className="h-40 w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-40 items-center justify-center bg-brand-offwhite text-sm text-brand-gray">
                        Image Coming Soon
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="font-serif text-lg text-brand-navy group-hover:text-brand-blue">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}
    </Layout>
  );
}
