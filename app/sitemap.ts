import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Served at /sitemap.xml and submitted in Google Search Console.
 * Add a line here when you add a page. `lastModified` is left out on purpose:
 * Google ignores it unless it tracks real content changes, and a build date does not.
 */
const PAGES = ["/", "/docs", "/demo", "/dashboard"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((path) => ({ url: path === "/" ? site.url : `${site.url}${path}` }));
}
