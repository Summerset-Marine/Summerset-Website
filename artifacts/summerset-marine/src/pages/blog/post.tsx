import { useRoute } from "wouter";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";

  return (
    <Layout>
      <PageMeta
        title="Blog | Summerset Marine Construction"
        description="Insights on permanent piers, boat lifts, and Wisconsin waterfront living from Summerset Marine Construction."
      />
      <section className="mx-auto max-w-content px-6 py-22">
        <h1 className="font-serif text-4xl text-brand-navy">Blog Post</h1>
        <p className="mt-4 text-brand-gray">
          Post content for &ldquo;{slug}&rdquo; will be generated from Sanity CMS.
        </p>
      </section>
    </Layout>
  );
}
