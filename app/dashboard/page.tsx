import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { DashboardApp } from "@/components/dashboard/dashboard-app";

export const metadata: Metadata = pageMetadata({
  title: "Demo dashboard",
  description:
    "Interactive Mimvo demo: browse a sample security scan of an AI agent's long-term memory, or open your own mimvo --json report. Runs in your browser.",
  path: "/dashboard",
});

export default function DashboardPage() {
  return <DashboardApp />;
}
