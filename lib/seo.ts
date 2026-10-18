import type { Metadata } from "next";
import { site } from "@/lib/site";

const OG_IMAGE_ALT = "Mimvo: scan your AI agent memory for poisoned facts, hidden instructions, and leaked secrets.";
const ogImages = [{ url: "/opengraph-image.png", width: 2560, height: 1280, type: "image/png", alt: OG_IMAGE_ALT }];
const twitterImages = [{ url: "/twitter-image.png", width: 2560, height: 1280, type: "image/png", alt: OG_IMAGE_ALT }];

/**
 * Metadata for one page: title, description, canonical URL, and matching Open Graph and Twitter tags.
 *
 * Next.js merges `openGraph` and `twitter` shallowly, so a page that sets only `title` and `description`
 * inherits the home page's og:title, og:description and og:url. Shared links and search previews then
 * all look like the home page. Every page builds its metadata here instead, so the tags always agree.
 * Setting `openGraph` or `twitter` on a page also drops the file-based images from `app/opengraph-image.png`
 * and `app/twitter-image.png`, so they are listed here explicitly.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  /** Page title without the site name; `null` for the home page. */
  title: string | null;
  description: string;
  /** Path starting with "/". */
  path: string;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = title ? `${title} · ${site.name}` : site.title;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      title: fullTitle,
      description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: twitterImages,
    },
  };
}

/** Absolute URL for a site path. */
export const absoluteUrl = (path: string) => (path === "/" ? site.url : `${site.url}${path}`);
