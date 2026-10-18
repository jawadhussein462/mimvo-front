import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { breadcrumbStructuredData, jsonLd, type Crumb } from "@/lib/structured-data";

/** A <script type="application/ld+json"> block. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />;
}

/**
 * Layout for indexable content pages (integrations, guides): site header, visible breadcrumbs that match
 * the BreadcrumbList JSON-LD, one readable column, and the site footer.
 */
export function ContentPage({
  crumbs,
  eyebrow,
  title,
  lead,
  structuredData = [],
  children,
}: {
  /** Breadcrumbs below Home; the last one is the current page. */
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  structuredData?: unknown[];
  children: ReactNode;
}) {
  return (
    <div className="theme-light theme-light-page min-h-screen bg-background text-foreground">
      <JsonLd data={breadcrumbStructuredData(crumbs)} />
      {structuredData.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-[13px] text-muted-foreground">
            {[{ name: "Home", path: "/" }, ...crumbs].map((c, i, all) => {
              const last = i === all.length - 1;
              return (
                <li key={c.path} className="flex items-center gap-1">
                  {last ? (
                    <span aria-current="page" className="text-foreground">
                      {c.name}
                    </span>
                  ) : (
                    <>
                      <Link href={c.path} className="transition-colors hover:text-foreground">
                        {c.name}
                      </Link>
                      <ChevronRight className="size-3.5" aria-hidden="true" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <header className="mt-8">
          {eyebrow && (
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{eyebrow}</p>
          )}
          <h1 className="type-display mt-4 text-[2.2rem] font-semibold leading-[1.05] sm:text-[2.8rem]">{title}</h1>
          {lead && <div className="mt-5 text-[17px] leading-[1.65] text-muted-foreground">{lead}</div>}
        </header>

        <div className="mt-12">{children}</div>
      </main>
      <div className="border-t">
        <SiteFooter />
      </div>
    </div>
  );
}
