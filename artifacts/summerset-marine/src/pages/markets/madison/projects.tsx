import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { imageObjectSchema, serviceSchema } from "@/components/seo/JsonLd";
import ContentPlaceholder from "@/components/ui/ContentPlaceholder";
import {
  isSanityConfigured,
  sanityLiveFetch,
  MARKET_PROJECTS_QUERY,
} from "@/lib/sanity";

interface Project {
  _id: string;
  title: string;
  lake?: string;
  productType?: string;
  installYear?: number;
  caption?: string;
  afterImageUrl?: string;
  afterImageAlt?: string;
}

const PRODUCT_TYPE_FILTERS = ["All", "Permanent Piers", "Lifts", "Seasonal Systems"] as const;
const LAKE_FILTERS = ["All", "Lake Mendota"] as const;

function matchesProductType(project: Project, filter: string): boolean {
  if (filter === "All") return true;
  const type = (project.productType ?? "").toLowerCase();
  if (filter === "Permanent Piers") return type.includes("pier");
  if (filter === "Lifts") return type.includes("lift");
  return type.includes("seasonal");
}

function matchesLake(project: Project, filter: string): boolean {
  if (filter === "All") return true;
  const lake = (project.lake ?? "").toLowerCase().replace(/-/g, " ");
  const needle = filter.toLowerCase().replace(/^lake\s+/, "").replace(/\s+lake$/, "");
  return lake.includes(needle);
}

export default function MadisonProjectsPage() {
  const [projects, setProjects] = useState<Project[] | null>(
    isSanityConfigured ? null : [],
  );
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [lakeFilter, setLakeFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isSanityConfigured) return;
    sanityLiveFetch<Project[]>(MARKET_PROJECTS_QUERY, { market: "madison" })
      .then((data) => setProjects(data ?? []))
      .catch(() => setProjects([]));
  }, []);

  const filtered = useMemo(
    () =>
      (projects ?? []).filter(
        (p) => matchesProductType(p, typeFilter) && matchesLake(p, lakeFilter),
      ),
    [projects, typeFilter, lakeFilter],
  );

  const lightboxProjects = useMemo(
    () => filtered.filter((p) => p.afterImageUrl),
    [filtered],
  );

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    lastTriggerRef.current?.focus();
    lastTriggerRef.current = null;
  }, []);
  const step = useCallback(
    (delta: number) => {
      setLightboxIndex((current) => {
        if (current === null || lightboxProjects.length === 0) return current;
        return (current + delta + lightboxProjects.length) % lightboxProjects.length;
      });
    },
    [lightboxProjects.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusables = dialog.querySelectorAll<HTMLElement>(
          "button, [href], [tabindex]:not([tabindex='-1'])",
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !dialog.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !dialog.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, step]);

  const selectClass =
    "rounded border border-brand-border bg-white px-4 py-2 text-sm text-brand-navy";
  const lightboxProject = lightboxIndex !== null ? lightboxProjects[lightboxIndex] : null;

  return (
    <Layout>
      <PageMeta
        title="Pier & Lift Projects — Madison, WI | Summerset Marine Construction"
        description="Browse completed Summerset Marine Construction projects on Lake Mendota and across the Madison market. Permanent piers, boat lifts, and waterfront systems."
        canonical="https://summersetmarine.com/markets/madison/projects"
      />
      <JsonLd
        data={serviceSchema({
          name: "Permanent Pier & Boat Lift Installation",
          market: "Madison",
          marketSlug: "madison",
          lake: "Lake Mendota",
        })}
      />
      {(projects ?? [])
        .filter((p) => p.afterImageUrl)
        .map((p) => (
          <JsonLd
            key={p._id}
            data={imageObjectSchema({
              url: p.afterImageUrl as string,
              caption: p.caption ?? p.title,
              lake: p.lake === "lake-mendota" ? "Lake Mendota" : (p.lake ?? "Lake Mendota"),
              productType: p.productType ?? "Permanent Pier",
              location: "Madison",
            })}
          />
        ))}

      {/* 1. Header */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-content px-6 py-16">
          <h1 className="font-serif text-4xl md:text-5xl">Madison Projects</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Completed permanent piers, boat lifts, and waterfront systems built by Summerset
            Marine across the Madison market.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-12">
        {/* 2. Filter bar */}
        <div className="flex flex-wrap items-center gap-4">
          <select
            aria-label="Filter by product type"
            className={selectClass}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {PRODUCT_TYPE_FILTERS.map((f) => (
              <option key={f} value={f}>
                {f === "All" ? "All product types" : f}
              </option>
            ))}
          </select>
          <select
            aria-label="Filter by lake"
            className={selectClass}
            value={lakeFilter}
            onChange={(e) => setLakeFilter(e.target.value)}
          >
            {LAKE_FILTERS.map((f) => (
              <option key={f} value={f}>
                {f === "All" ? "All lakes" : f}
              </option>
            ))}
          </select>
        </div>

        {/* 3–6. Grid / placeholder */}
        {projects === null ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="h-72 animate-pulse rounded-lg border border-brand-border bg-brand-offwhite"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-10">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="flex h-72 items-center justify-center rounded-lg border border-brand-border bg-brand-gray-light"
                >
                  <span className="text-sm font-medium uppercase tracking-wide text-brand-gray">
                    Projects Coming Soon
                  </span>
                </div>
              ))}
            </div>
            <ContentPlaceholder
              label="Madison project photos, captions, and install years (from Sanity projects)"
              className="mt-8"
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => {
              const lightboxPos = lightboxProjects.findIndex((p) => p._id === project._id);
              return (
                <button
                  key={project._id}
                  type="button"
                  onClick={(e) => {
                    if (lightboxPos >= 0) {
                      lastTriggerRef.current = e.currentTarget;
                      setLightboxIndex(lightboxPos);
                    }
                  }}
                  className="group overflow-hidden rounded-lg border border-brand-border bg-white text-left shadow-sm transition hover:shadow-md"
                >
                  {project.afterImageUrl ? (
                    <img
                      src={project.afterImageUrl}
                      alt={project.afterImageAlt ?? project.title}
                      className="h-56 w-full object-cover transition group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-56 items-center justify-center bg-brand-offwhite text-sm text-brand-gray">
                      Photo Coming Soon
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded bg-brand-navy px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                        {project.lake === "lake-mendota"
                          ? "Lake Mendota"
                          : (project.lake ?? "Lake Mendota")}
                      </span>
                      {project.productType ? (
                        <span className="rounded bg-brand-blue px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                          {project.productType}
                        </span>
                      ) : null}
                    </div>
                    <h2 className="mt-3 font-serif text-xl text-brand-navy">{project.title}</h2>
                    {project.caption ? (
                      <p className="mt-1 text-sm text-brand-gray">{project.caption}</p>
                    ) : null}
                    {project.installYear ? (
                      <p className="mt-1 text-sm text-brand-gray">{project.installYear}</p>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Lightbox */}
      {lightboxProject?.afterImageUrl ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxProject.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            const start = touchStartX.current;
            const end = e.changedTouches[0]?.clientX;
            touchStartX.current = null;
            if (start === null || end === undefined) return;
            const delta = end - start;
            if (Math.abs(delta) > 50) step(delta > 0 ? -1 : 1);
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 text-2xl leading-none text-white hover:bg-white/20"
            onClick={closeLightbox}
          >
            &times;
          </button>
          <button
            type="button"
            aria-label="Previous project"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-2xl text-white hover:bg-white/20 md:left-6"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            &larr;
          </button>
          <figure
            className="max-h-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxProject.afterImageUrl}
              alt={lightboxProject.afterImageAlt ?? lightboxProject.title}
              className="max-h-[80vh] w-full rounded object-contain"
            />
            <figcaption className="mt-4 text-center text-white">
              <span className="font-serif text-xl">{lightboxProject.title}</span>
              {lightboxProject.caption ? (
                <span className="mt-1 block text-sm text-white/75">
                  {lightboxProject.caption}
                </span>
              ) : null}
            </figcaption>
          </figure>
          <button
            type="button"
            aria-label="Next project"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-2xl text-white hover:bg-white/20 md:right-6"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            &rarr;
          </button>
        </div>
      ) : null}
    </Layout>
  );
}
