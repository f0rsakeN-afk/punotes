import { Metadata } from "next";
import BranchesPage from "./pdfs-client";

export const metadata: Metadata = {
  title: "Notes & PDFs",
  description:
    "Browse Purbanchal University study materials by branch — Computer Engineering, Civil, Electrical, Electronics, BCA, BIT. Select your branch and semester to find notes.",
  keywords: [
    "PU Notes PDF",
    "Purbanchal University Engineering Notes",
    "PU Study Material",
    "Nepal Engineering Notes Download",
  ],
  alternates: { canonical: "/pdfs" },
  openGraph: {
    title: "Notes & PDFs | PuNotes",
    description:
      "Choose your branch and access free study notes for Purbanchal University.",
    url: "https://punotes.vercel.app/pdfs",
  },
};

export default function PdfsPage() {
  return <BranchesPage />;
}
