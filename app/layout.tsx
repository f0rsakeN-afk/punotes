import type { Metadata, Viewport } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "@/stack/client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://punotes.vercel.app"),
  title: {
    default: "PuNotes | Purbanchal University Notes, Syllabus & PYQs",
    template: "%s | PuNotes",
  },
  description:
    "Your one-stop destination for Purbanchal University (PU) notes, syllabus, previous year questions (PYQs), and academic resources for all engineering branches and semesters. Download PDFs for free.",
  keywords: [
    "Purbanchal University",
    "PU Notes",
    "PU Syllabus",
    "PU Question Papers",
    "Engineering Notes",
    "Computer Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics Engineering",
    "B.E. Notes",
    "Nepal Engineering",
    "Academic Resources",
    "PU PDF Downloads",
    "Purbanchal University Engineering Syllabus",
  ],
  authors: [{ name: "PuNotes Team" }],
  creator: "PuNotes",
  publisher: "PuNotes",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://punotes.vercel.app",
    siteName: "PuNotes",
    title: "PuNotes | Purbanchal University Academic Resources",
    description:
      "Access comprehensive notes, syllabus, and question papers for Purbanchal University engineering students. The ultimate academic companion.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PuNotes - Purbanchal University Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PuNotes | Purbanchal University Notes & Syllabus",
    description:
      "The best academic resource for Purbanchal University students. Get notes, syllabus, and PYQs instantly.",
    images: ["/og-image.png"],
    creator: "@punotes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PuNotes",
    "url": "https://punotes.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://punotes.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
