import { Metadata } from "next";
import BranchesPage from "./pdfs-client";

export const metadata: Metadata = {
  title: "Notes & PDFs | PuNotes – Purbanchal University Study Materials",
  description:
    "Browse and download free study materials for Purbanchal University — Computer, Civil, Electrical, Electronics Engineering, BCA, BIT. Semester-wise notes and PDF resources.",
  keywords: [
    "PU Notes PDF",
    "Purbanchal University Engineering Notes",
    "PU Study Material",
    "Nepal Engineering Notes Download",
    "BCT Notes Purbanchal",
    "BCE Notes Purbanchal",
    "BE Computer Notes Nepal",
    "BCA Notes Download Nepal",
    "BIT Notes Purbanchal University",
    "PU Civil Engineering Notes",
    "PU Electrical Notes PDF",
    "Electronics Notes PU",
    "Engineering Study Materials Nepal",
    "Semester Notes PU Nepal",
  ],
  alternates: { canonical: "/pdfs" },
  openGraph: {
    title: "Notes & PDFs | PuNotes",
    description:
      "Choose your branch and access free study notes for Purbanchal University.",
    url: "https://punotes.vercel.app/pdfs",
    siteName: "PuNotes",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PU Notes & PDFs | PuNotes",
    description:
      "Download free engineering notes, study materials, and resources for Purbanchal University.",
  },
  robots: { index: true, follow: true },
};

export default function PdfsPage() {
  return <BranchesPage />;
}
