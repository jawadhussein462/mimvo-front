import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContentPage } from "@/components/content/content-page";
import { A, P } from "@/components/docs/primitives";
import { StoreGlyph } from "@/components/security/store-glyph";
import { STORE_ORDER, stores } from "@/lib/catalog";
import { INTEGRATIONS, integrationPath } from "@/lib/integrations";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const description =
  "Mimvo scans AI agent memory in Chroma, Qdrant, pgvector, Pinecone, LangChain, LangGraph, mem0 and JSONL exports for poisoning, prompt injection and secrets.";

export const metadata: Metadata = pageMetadata({ title: "Integrations", description, path: "/integrations" });

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Mimvo integrations",
  itemListElement: STORE_ORDER.map((id, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `Scan ${INTEGRATIONS[id].title}`,
    url: absoluteUrl(integrationPath(id)),
  })),
};

export default function IntegrationsPage() {
  return (
    <ContentPage
      crumbs={[{ name: "Integrations", path: "/integrations" }]}
      eyebrow="Integrations"
      title="Scan the memory store your agent already uses"
      lead={
        <p>
          Mimvo reads agent memory where it lives: vector databases, framework memory stores, and plain exports. Every
          connector is read-only, and the default checks run offline.
        </p>
      }
      structuredData={[itemList]}
    >
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {STORE_ORDER.map((id) => (
          <li key={id}>
            <Link
              href={integrationPath(id)}
              className="group flex h-full gap-3.5 rounded-lg border bg-card p-4 transition-colors hover:border-foreground/30"
            >
              <StoreGlyph store={id} size="lg" />
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 text-[15px] font-semibold">
                  {INTEGRATIONS[id].title}
                  <ArrowRight
                    className="size-3.5 opacity-0 transition-[opacity,transform] group-hover:translate-x-0.5 group-hover:opacity-60"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-1 block text-[13.5px] leading-snug text-muted-foreground">{stores[id].description}</span>
                <code className="mt-2 block font-mono text-[12px] text-muted-foreground">mimvo scan {stores[id].slug}</code>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 space-y-4">
        <P>
          Using another store? Export it to JSON Lines and use the <A href={integrationPath("jsonl")}>JSONL scanner</A>,
          or write a scan source in a few lines of Python and package it as a plugin (see the{" "}
          <A href="/docs#python-api">Python API</A>). Requests and contributions are welcome on{" "}
          <A href={`${site.github}/issues`}>GitHub</A>.
        </P>
      </div>
    </ContentPage>
  );
}
