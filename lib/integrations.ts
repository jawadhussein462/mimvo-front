import { STORE_ORDER, stores } from "@/lib/catalog";
import type { StoreId } from "@/lib/types";

/*
 * Copy for the /integrations/<store> pages: one page per memory store Mimvo scans, so a search for
 * "scan Qdrant for prompt injection" or "pgvector memory poisoning" lands on a page about that store.
 * The commands, flags and Python come from lib/catalog.ts, so they stay in step with the dashboard.
 * Keep every statement here true of the package; nothing store-specific that Mimvo does not do.
 */

export interface IntegrationCopy {
  /** Short name used in titles ("Qdrant"). */
  title: string;
  /** <meta name="description">, under ~155 characters. */
  description: string;
  /** Opening paragraph: how agents use this store as memory, and what Mimvo does with it. */
  intro: string;
  /** Store-specific setup notes. */
  notes: string[];
  /** Replaces the default install sentence when the extras need explaining. */
  installNote?: string;
}

export const INTEGRATIONS: Record<StoreId, IntegrationCopy> = {
  chroma: {
    title: "Chroma",
    description:
      "Scan a Chroma collection for poisoned memories, prompt injections and leaked secrets. Open source, read-only, runs locally with mimvo scan chroma.",
    intro:
      "Chroma is a common default for agent memory and RAG prototypes: the agent embeds what it learns and writes it to a local collection, then retrieves it as context later. Mimvo opens the same persist directory, reads every record and its stored vector, and reports the records to review, quarantine or delete.",
    notes: [
      "Point --path at the directory your app passes to Chroma's PersistentClient, and --collection at the collection the agent writes to.",
      "Stored embeddings are read along with the text, so the vector detectors (near-duplicate clusters, hub records) run without extra setup.",
      "Mimvo only calls get(). It never adds, updates, upserts or deletes, so it is safe to run next to a live app.",
    ],
  },
  qdrant: {
    title: "Qdrant",
    description:
      "Scan a Qdrant collection used as agent memory for poisoned facts, prompt injections and leaked secrets. Open source and read-only: mimvo scan qdrant.",
    intro:
      "Qdrant often holds an agent's long-term memory in production: points carry the embedding and a payload with the remembered text. Mimvo scrolls through the collection, checks every payload and vector, and reports which points to review, quarantine or delete. It never writes to the collection.",
    notes: [
      "Use a read-only API key. --api-key defaults to the QDRANT_API_KEY environment variable.",
      "By default Mimvo looks for the text in common payload keys such as content, text, page_content, document and memory. Set --text-field if your app uses another key.",
      "On a large collection, start with --sample 10000 for a quick look, then run the full scan in CI.",
    ],
  },
  pgvector: {
    title: "Postgres and pgvector",
    description:
      "Scan a Postgres pgvector memory table for poisoned facts, prompt injections and leaked secrets. SELECT-only, open source: mimvo scan pgvector.",
    intro:
      "Many teams keep agent memory in the Postgres they already run, with the pgvector extension for similarity search. Mimvo reads the memory table with SELECT queries only, checks every row's text and, if you name it, its embedding, and reports the rows to review, quarantine or delete.",
    notes: [
      "Connect with a role limited to SELECT on the memory table. Mimvo runs SELECT queries only.",
      "Pass --embedding-column so the vector detectors (TrustRAG near-duplicate clusters, hub records) can run.",
      "Pass --created-at-column to order records in time, so newer memories that contradict older ones can be flagged.",
      "--table accepts schema.table, and --id-column defaults to id.",
    ],
  },
  pinecone: {
    title: "Pinecone",
    description:
      "Scan a Pinecone index used as AI agent memory for poisoned records, prompt injections and leaked secrets. Read-scoped and open source: mimvo scan pinecone.",
    intro:
      "Pinecone is a common managed home for agent memory: each vector carries metadata with the remembered text, often split by namespace per user or tenant. Mimvo lists and fetches the vectors in one namespace, checks the text and the vectors, and reports which records to review, quarantine or delete.",
    notes: [
      "Use a read-scoped API key. --api-key defaults to the PINECONE_API_KEY environment variable.",
      "Scan one namespace at a time with --namespace; without it, Mimvo reads the default namespace.",
      "Set --text-field to the metadata field that holds the text, and --host for a serverless index.",
    ],
  },
  langchain: {
    title: "LangChain and LangGraph",
    installNote:
      "The langchain extra adds langchain-core for LangChain vector stores. For a LangGraph or LangMem store, install the langgraph extra instead.",
    description:
      "Scan a LangChain vector store or LangGraph / LangMem memory store for poisoned memories, prompt injections and leaked secrets. Open source and read-only.",
    intro:
      "Agents built with LangChain store memory in a vector store, and LangGraph agents (including LangMem) keep long-term memory in a LangGraph store. Mimvo scans the store object your code already builds, so it sees exactly what the agent retrieves, and reports the documents or items to review, quarantine or delete.",
    notes: [
      "--factory takes module:attr, imported from the current directory the way uvicorn app:app is: a store, or a function or class that returns one.",
      "For a LangGraph store, --namespace limits the scan to a namespace prefix such as memories/alice, and --text-field names the item key that holds the text.",
      "Mimvo lists and fetches documents or items. It never adds, updates or deletes them.",
    ],
  },
  mem0: {
    title: "mem0",
    description:
      "Scan mem0 memories, open source or platform, for poisoned facts, prompt injections and leaked secrets. Read-only and open source: mimvo scan mem0.",
    intro:
      "mem0 extracts facts from conversations and saves them as long-term memories for each user or agent. Mimvo reads those memories, through your open-source config file or the mem0 platform API, and reports which ones to review, quarantine or delete. It never adds, updates or deletes a memory.",
    notes: [
      "Open source: pass --config with the same file your app passes to Memory.from_config.",
      "Platform: pass --api-key (defaults to MEM0_API_KEY) and one of --user-id, --agent-id or --run-id.",
      "Leave out the ids on the open-source store to scan every memory, or set --user-id to scan one user.",
    ],
  },
  jsonl: {
    title: "JSONL exports",
    description:
      "Scan a JSONL export of any agent memory or vector store for poisoned facts, prompt injections and leaked secrets. Works offline, no store access needed.",
    intro:
      "When Mimvo has no connector for your store, or you would rather not give a scanner database access, export the memory to JSON Lines and scan the file. Only content is required on each line; ids, metadata, embeddings and timestamps unlock more of the checks. The file is opened read-only.",
    notes: [
      "Each line is a JSON object with content, and optionally id, metadata, embedding and created_at.",
      "Include embedding so the vector detectors run, and created_at so contradictions between older and newer memories can be found.",
      "Pass - instead of a path to read from stdin, for example from your own export script.",
    ],
  },
};

/** Slugs in display order, for generateStaticParams, the sitemap and the index page. */
export const INTEGRATION_SLUGS = STORE_ORDER.map((id) => stores[id].slug);

export function integrationBySlug(slug: string) {
  const id = STORE_ORDER.find((s) => stores[s].slug === slug);
  return id ? { id, store: stores[id], copy: INTEGRATIONS[id] } : null;
}

export const integrationPath = (id: StoreId) => `/integrations/${stores[id].slug}`;
