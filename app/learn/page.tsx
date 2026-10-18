import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContentPage } from "@/components/content/content-page";
import { A, P } from "@/components/docs/primitives";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Learn AI agent memory security",
  description:
    "Guides to AI agent memory security: memory poisoning, prompt injection stored in vector databases, and leaked secrets in RAG and long-term memory.",
  path: "/learn",
});

/** Add a guide here when you add one under app/learn/, and to PAGES in app/sitemap.ts. */
const GUIDES = [
  {
    href: "/learn/ai-agent-memory-poisoning",
    title: "What is AI agent memory poisoning?",
    body: "How planted records get into long-term memory and RAG stores, why prompt filters miss them, and how to detect and prevent them.",
  },
];

export default function LearnPage() {
  return (
    <ContentPage
      crumbs={[{ name: "Learn", path: "/learn" }]}
      eyebrow="Learn"
      title="AI agent memory security"
      lead={<p>Plain-language guides to the risks in what AI agents remember, and what to do about them.</p>}
    >
      <ul className="space-y-3">
        {GUIDES.map((g) => (
          <li key={g.href}>
            <Link
              href={g.href}
              className="group block rounded-lg border bg-card p-5 transition-colors hover:border-foreground/30"
            >
              <span className="flex items-center gap-1.5 text-[16px] font-semibold">
                {g.title}
                <ArrowRight
                  className="size-3.5 opacity-0 transition-[opacity,transform] group-hover:translate-x-0.5 group-hover:opacity-60"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-1.5 block text-[14px] leading-relaxed text-muted-foreground">{g.body}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <P>
          Looking for setup instructions instead? Start with the <A href={site.docs}>docs</A> or pick your store on the{" "}
          <A href="/integrations">integrations</A> page.
        </P>
      </div>
    </ContentPage>
  );
}
