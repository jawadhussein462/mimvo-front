import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/site";
import "./globals.css";

// Fonts are downloaded at build time and self-hosted by Next.js:
// the running site makes no requests to Google.
const sans = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s · Mimvo",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "Mimvo", url: site.url }],
  creator: "Mimvo",
  robots: {
    index: true,
    follow: true,
    // Let Google show full-size image previews and full snippets in results.
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: { google: site.googleSiteVerification },
  keywords: [
    "AI agent memory",
    "AI agent security",
    "memory poisoning",
    "RAG poisoning",
    "prompt injection",
    "secret scanning",
    "RAG security",
    "vector database security",
    "LLM security",
  ],
  // Per-page Open Graph and Twitter tags come from pageMetadata() in lib/seo.ts.
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    locale: "en_US",
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1115" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-18526819487" strategy="beforeInteractive" />
        <Script id="google-ads-gtag" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18526819487');`}
        </Script>
        {/* Marks the page as scripted before paint, so scroll reveals can start hidden without a flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
