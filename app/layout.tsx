import type { Metadata, Viewport } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "@/stack/client";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { cn } from "@/lib/utils";

const outfit = Outfit({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#DEDBC8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
        url: "/logo.webp",
        width: 512,
        height: 512,
        alt: "PuNotes - Purbanchal University Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PuNotes | Purbanchal University Notes & Syllabus",
    description:
      "The best academic resource for Purbanchal University students. Get notes, syllabus, and PYQs instantly.",
    images: ["/logo.webp"],
    creator: "@punotes",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.webp",
    apple: "/icons/icon-512x512.png",
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
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PuNotes",
    "url": "https://punotes.vercel.app",
    "logo": "https://punotes.vercel.app/logo.webp",
    "description": "Free academic resources for Purbanchal University students - notes, syllabus, and past year questions.",
    "sameAs": [
      "https://twitter.com/punotes",
      "https://github.com/f0rsaken-afk",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PuNotes",
    "url": "https://punotes.vercel.app",
    "description": "Free academic resources for Purbanchal University students.",
    "publisher": {
      "@type": "Organization",
      "name": "PuNotes",
      "logo": {
        "@type": "ImageObject",
        "url": "https://punotes.vercel.app/logo.webp",
      },
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://punotes.vercel.app/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
      "description": "Search for study notes and resources",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", outfit.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://drive.google.com" />
        <link rel="apple-touch-icon" href="/icons/icon-512x512.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PuNotes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
