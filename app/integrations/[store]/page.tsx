import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ContentPage } from "@/components/content/content-page";
import { A, C, Callout, Code, DocSection, P, Table, UL } from "@/components/docs/primitives";
import { StoreGlyph } from "@/components/security/store-glyph";
import { Button } from "@/components/ui/button";
import { RULE_ORDER, STORE_ORDER, installCommand, ruleFor, severities } from "@/lib/catalog";
import { INTEGRATIONS, INTEGRATION_SLUGS, integrationBySlug, integrationPath } from "@/lib/integrations";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { articleStructuredData } from "@/lib/structured-data";

/** First published with the integration pages. Bump when a page's content changes materially. */
const PUBLISHED = "2026-10-18";

export const dynamicParams = false;

export function generateStaticParams() {
  return INTEGRATION_SLUGS.map((store) => ({ store }));
}

type Props = { params: Promise<{ store: string }> };

const pageTitle = (title: string) => `${title} memory security scanner`;
const headline = (title: string) => `Scan ${title} for memory poisoning, prompt injection and leaked secrets`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = integrationBySlug((await params).store);
  if (!found) return {};
  return pageMetadata({
    title: pageTitle(found.copy.title),
    description: found.copy.description,
    path: integrationPath(found.id),
    type: "article",
  });
}

export default async function IntegrationPage({ params }: Props) {
  const found = integrationBySlug((await params).store);
  if (!found) notFound();
  const { id, store, copy } = found;
  const path = integrationPath(id);
  const scan = `${store.command(store.demo)} \\\n  --report report.html`;
  const ciScan = `${store.command(store.demo)} \\\n  --fail-on high \\\n  --sarif mimvo.sarif \\\n  --markdown "$GITHUB_STEP_SUMMARY"`;
  const others = STORE_ORDER.filter((s) => s !== id);

  return (
    <ContentPage
      crumbs={[
        { name: "Integrations", path: "/integrations" },
        { name: copy.title, path },
      ]}
      eyebrow="Integration"
      title={headline(copy.title)}
      lead={<p>{copy.intro}</p>}
      structuredData={[
        articleStructuredData({
          headline: headline(copy.title),
          description: copy.description,
          path,
          datePublished: PUBLISHED,
          about: [copy.title, "AI agent memory", "Memory poisoning", "Prompt injection", "Secret scanning"],
        }),
      ]}
    >
      <DocSection id="install" title="Install">
        <P>
          Mimvo is an open-source Python package for Python 3.11+, published on PyPI.{" "}
          {copy.installNote ??
            (store.extra
            ? `The ${store.extra} extra adds the ${copy.title} client and nothing else.`
            : "The core package reads JSONL with no extra dependencies.")}
        </P>
        <Code code={id === "langchain" ? `${installCommand(id)}      # LangChain vector stores\npip install "mimvo[langgraph]"   # LangGraph / LangMem stores` : installCommand(id)} />
      </DocSection>

      <DocSection id="scan" title={`Scan ${copy.title} from the command line`}>
        <P>
          One command reads every record, runs the secrets, injection and poisoning checks, and writes a self-contained
          HTML report you can forward.
        </P>
        <Code code={scan} />
        <Table
          head={["Option", "What it does"]}
          rows={store.flags.map((f) => [<C key={f.flag}>{f.flag}</C>, f.description])}
          caption={`mimvo scan ${store.slug} options`}
        />
        <UL>
          {copy.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </UL>
      </DocSection>

      <DocSection id="python" title="Scan from Python">
        <P>The same scan from your own code, for a scheduled job or a notebook.</P>
        <Code code={store.python} lang="python" />
      </DocSection>

      <DocSection id="what-it-finds" title={`What Mimvo finds in ${copy.title}`}>
        <P>
          Thirteen finding codes across three checks. Each finding comes with a severity, a recommended action, the
          evidence (secrets masked), fix steps, and an OWASP and CWE mapping. Details are in the{" "}
          <A href={site.rulesDocs}>finding code reference</A>.
        </P>
        <Table
          head={["Finding", "Code", "Severity", "Action"]}
          rows={RULE_ORDER.map((code) => {
            const rule = ruleFor(code);
            return [rule.title, <C key={code}>{code}</C>, severities[rule.severity].label, rule.action];
          })}
          caption="Mimvo finding codes"
        />
      </DocSection>

      <DocSection id="ci" title="Gate CI on the results">
        <P>
          Fail the job on high-severity findings, send results to GitHub code scanning as SARIF, and put a summary on
          the run page. See <A href="/docs#use-in-ci">Use in CI</A> for a full GitHub Actions workflow.
        </P>
        <Code code={ciScan} />
      </DocSection>

      <DocSection id="safety" title={`Is it safe to run against production ${copy.title}?`}>
        <P>{store.access}</P>
        <P>
          The default detectors run on your machine with no API key and no model download, so memory text does not leave
          it. Secret values are masked in every report. Hosted detectors are opt-in.
        </P>
        <Callout title="Try it without connecting anything">
          Open the <A href="/dashboard">live dashboard</A> to browse a sample scan, or read the{" "}
          <A href="/learn/ai-agent-memory-poisoning">guide to AI agent memory poisoning</A>.
        </Callout>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild>
            <Link href={site.docs}>
              Read the docs
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <a href={site.github} target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          </Button>
        </div>
      </DocSection>

      <DocSection id="other-integrations" title="Other integrations">
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {others.map((s) => (
            <li key={s}>
              <Link
                href={integrationPath(s)}
                className="flex items-center gap-3 rounded-lg border bg-card px-3.5 py-3 text-[14.5px] transition-colors hover:border-foreground/30"
              >
                <StoreGlyph store={s} />
                Scan {INTEGRATIONS[s].title}
              </Link>
            </li>
          ))}
        </ul>
      </DocSection>
    </ContentPage>
  );
}

