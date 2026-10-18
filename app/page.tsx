import type { Metadata } from "next";
import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { StoresStrip } from "@/components/landing/stores-strip";
import { Problem } from "@/components/landing/problem";
import { Scanners } from "@/components/landing/scanners";
import { HowItWorks } from "@/components/landing/how-it-works";
import { DashboardPreviewSection } from "@/components/landing/dashboard-preview-section";
import { OpenSource } from "@/components/landing/open-source";
import { FinalCta } from "@/components/landing/final-cta";
import { SiteFooter } from "@/components/landing/site-footer";
import { homeStructuredData, jsonLd } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ title: null, description: site.description, path: "/" });

export default function HomePage() {
  return (
    <div className="theme-light theme-light-page min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(homeStructuredData) }} />
      <SiteHeader />
      <main>
        <Hero />
        <StoresStrip />
        <Problem />
        <Scanners />
        <HowItWorks />
        <DashboardPreviewSection />
        <OpenSource />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
