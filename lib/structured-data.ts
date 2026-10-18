import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

/*
 * schema.org descriptions rendered as JSON-LD. They help search engines tell what Mimvo is
 * (a free, open-source security application), who publishes the site, and where each page sits.
 * Only state facts here: no ratings, reviews or claims the page itself does not make.
 */

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;
const SOFTWARE_ID = `${site.url}/#software`;

const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: site.name,
  url: site.url,
  logo: { "@type": "ImageObject", url: `${site.url}/brand/mimvo-icon.png` },
  sameAs: [site.github, site.pypi],
};

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "SoftwareApplication",
      "@id": SOFTWARE_ID,
      name: site.name,
      description: site.description,
      url: site.url,
      applicationCategory: "SecurityApplication",
      operatingSystem: "Any (Python 3.11+)",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      license: "https://www.apache.org/licenses/LICENSE-2.0",
      downloadUrl: site.pypi,
      installUrl: site.pypi,
      softwareHelp: { "@type": "CreativeWork", url: `${site.url}${site.docs}` },
      sameAs: [site.github, site.pypi],
      publisher: { "@id": ORG_ID },
      isPartOf: { "@id": WEBSITE_ID },
    },
  ],
};

export type Crumb = { name: string; path: string };

/** BreadcrumbList for a page below the home page. The home page is added first. */
export function breadcrumbStructuredData(crumbs: Crumb[]) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** TechArticle for a guide or an integration page. Dates are ISO strings (YYYY-MM-DD). */
export function articleStructuredData({
  headline,
  description,
  path,
  datePublished,
  dateModified = datePublished,
  about,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  about?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    datePublished,
    dateModified,
    inLanguage: "en",
    image: `${site.url}/opengraph-image.png`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url, logo: { "@type": "ImageObject", url: `${site.url}/brand/mimvo-icon.png` } },
    ...(about ? { about: about.map((name) => ({ "@type": "Thing", name })) } : {}),
    mentions: { "@type": "SoftwareApplication", name: site.name, url: site.url },
  };
}

/** Serialise for a <script type="application/ld+json">, escaping "<" so the content cannot close the tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
