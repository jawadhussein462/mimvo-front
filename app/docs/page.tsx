import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { DocsContent } from "@/components/docs/content";
import { DocsShell } from "@/components/docs/docs-shell";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

export const metadata: Metadata = pageMetadata({
  title: "Docs",
  description:
    "Mimvo docs: install from PyPI, scan Chroma, Qdrant, pgvector, Pinecone, LangChain, mem0 or JSONL agent memory, gate CI with SARIF, and read the findings.",
  path: "/docs",
});

export default function DocsPage() {
  return (
    <div className="theme-light theme-light-page min-h-screen bg-background text-foreground">
      <SiteHeader />
      <DocsShell>
        <DocsContent />
      </DocsShell>
      <div className="border-t">
        <SiteFooter />
      </div>
    </div>
  );
}
