import { site } from "@/lib/site";

/**
 * schema.org description of the site and the tool, rendered as JSON-LD on the home page.
 * It helps search engines tell what Mimvo is (a free, open-source security application) and
 * link the site to its GitHub and PyPI pages. Only state facts here: no ratings or reviews.
 */
export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${site.url}/#software`,
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
      isPartOf: { "@id": `${site.url}/#website` },
    },
  ],
};

/** Serialise for a <script type="application/ld+json">, escaping "<" so the content cannot close the tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
