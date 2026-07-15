import { createClient, type SanityClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset =
  (import.meta.env.VITE_SANITY_DATASET as string | undefined) ?? "production";
const apiVersion =
  (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) ??
  "2024-01-01";

export const isSanityConfigured = Boolean(projectId);

export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  if (!sanityClient) {
    throw new Error(
      "Sanity is not configured. Set VITE_SANITY_PROJECT_ID to enable CMS content.",
    );
  }
  return sanityClient.fetch<T>(query, params ?? {});
}
