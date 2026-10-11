import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Served at /robots.txt. Everything is crawlable except the demo-request endpoint. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
