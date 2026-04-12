import { Metadata } from "next";
import SyllabusClient from "./syllabus-client";

export const metadata: Metadata = {
  title: "Syllabus | PuNotes – Purbanchal University Complete Syllabus",
  description:
    "Browse and download the official Purbanchal University syllabus for all engineering branches — Computer, Civil, Electrical, Electronics, BCA, and BIT. Updated semester-wise curriculum.",
  keywords: [
    "PU Syllabus",
    "Purbanchal University Syllabus",
    "Engineering Syllabus Nepal",
    "PU BCA Syllabus",
    "PU BIT Syllabus",
    "BCT Syllabus Purbanchal",
    "BCE Syllabus Nepal",
    "Computer Engineering Syllabus PU",
    "Electrical Engineering Syllabus Nepal",
    "Electronics Syllabus PU Nepal",
    "PU Curriculum",
    "Syllabus Download Nepal",
    "Purbanchal University Curriculum",
    "BE Syllabus Nepal",
    "Semester Syllabus PU",
    "Engineering Syllabus Download",
  ],
  authors: [{ name: "PuNotes Team" }],
  alternates: { canonical: "/syllabus" },
  openGraph: {
    title: "Syllabus | PuNotes",
    description:
      "Official Purbanchal University syllabus for all branches and semesters.",
    url: "https://punotes.vercel.app/syllabus",
    siteName: "PuNotes",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PU Syllabus All Branches | PuNotes",
    description:
      "Download official Purbanchal University syllabus for Computer, Civil, Electrical, Electronics, BCA, BIT.",
  },
  robots: { index: true, follow: true },
};

export default function SyllabusPage() {
  return <SyllabusClient />;
}
