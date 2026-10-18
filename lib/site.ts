const repo = "https://github.com/jawadhussein462/mimvo";

export const site = {
  name: "Mimvo",
  tagline: "Security scanner for AI agent memory.",
  /** Default <title>: brand plus the category people search for. */
  title: "Mimvo · Security scanner for AI agent memory",
  /**
   * Home page meta description and default for social previews. Kept under ~155 characters so Google
   * shows it whole, with the category and the stores people search for up front.
   */
  description:
    "Open-source security scanner for AI agent memory. Find poisoned facts, prompt injections and leaked secrets in Chroma, Qdrant, pgvector, Pinecone and mem0.",
  url: "https://mimvo.dev",
  github: repo,
  /** "Try open source" lands on the docs, and the docs lead to GitHub (the promptfoo pattern). */
  docs: "/docs",
  rulesDocs: "/docs#what-it-finds",
  /** "Book a demo" lands on the demo request page. */
  demo: "/demo",
  /**
   * Where demo requests are emailed. `/api/demo` delivers the form here.
   * Set `demoBookingUrl` to a Cal.com / Calendly link to show a scheduling button instead of the form.
   */
  contactEmail: "jawadhussein462@gmail.com",
  demoBookingUrl: "" as string,
  /** Published package. Install lines across the site use this. */
  pypi: "https://pypi.org/project/mimvo/",
  install: "pip install mimvo",
  license: "Apache-2.0",
  /**
   * Google Search Console ownership token (HTML tag method). Rendered as
   * <meta name="google-site-verification"> on every page; keep it deployed
   * after verifying, or Search Console drops the ownership.
   */
  googleSiteVerification: "yWxki1Pz9Y3XrLq1BHs1qTc77i_KuAiG_jqEzCTRfP0",
};

/** Link to a file in the package repo on GitHub. */
export const repoFile = (path: string) => `${repo}/blob/main/${path}`;
