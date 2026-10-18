import type { MetadataRoute } from "next";
import { INTEGRATION_SLUGS } from "@/lib/integrations";
import { absoluteUrl } from "@/lib/seo";

/**
 * Served at /sitemap.xml and submitted in Google Search Console.
 * Add a line here when you add a page. `lastModified` is left out on purpose:
 * Google ignores it unless it tracks real content changes, and a build date does not.
 */
const PAGES = [
  "/",
  "/docs",
  "/integrations",
  ...INTEGRATION_SLUGS.map((slug) => `/integrations/${slug}`),
  "/learn",
  "/learn/ai-agent-memory-poisoning",
  "/dashboard",
  "/demo",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((path) => ({ url: absoluteUrl(path) }));
}
