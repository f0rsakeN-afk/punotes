import Features from "@/components/home/Features";
import type { Metadata } from "next";
import HomeHero from "./home-animations";

export const metadata: Metadata = {
  title: "PuNotes | Purbanchal University Notes, Syllabus & PYQs",
  description:
    "Your one-stop destination for Purbanchal University (PU) notes, syllabus, previous year questions (PYQs), and academic resources for all engineering branches and semesters. Download PDFs for free.",
  keywords: [
    "PuNotes",
    "Purbanchal University Notes",
    "PU Notes PDF",
    "PU Syllabus",
    "PU PYQs",
    "Purbanchal University Previous Year Questions",
    "PU Engineering Notes",
    "BCT Notes",
    "BCE Notes",
    "BE Notes Nepal",
    "BCA Notes Nepal",
    "BIT Notes Nepal",
    "Purbanchal University Question Papers",
    "Free Engineering Notes Nepal",
    "PU Study Materials",
    "Semester Notes PU",
  ],
  authors: [{ name: "PuNotes Team" }],
  creator: "@punotes",
  alternates: { canonical: "/" },
  openGraph: {
    title: "PuNotes | Free Notes & Resources for PU Students",
    description:
      "Access comprehensive study materials, syllabus, and past questions for Purbanchal University — all free.",
    url: "https://punotes.vercel.app",
    siteName: "PuNotes",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PuNotes | Free PU Notes, Syllabus & PYQs",
    description:
      "Download free study materials, syllabus, and past year questions for Purbanchal University — all branches and semesters.",
    creator: "@punotes",
  },
  robots: { index: true, follow: true },
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <HomeHero />
      <Features />
    </div>
  );
}
