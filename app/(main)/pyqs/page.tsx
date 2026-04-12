import { Metadata } from "next";
import PyqsClient from "./pyqs-client";

export const metadata: Metadata = {
  title: "Past Year Questions | PuNotes – Purbanchal University PYQs",
  description:
    "Download previous year question papers (PYQs) for Purbanchal University — all branches and semesters covered. Computer Engineering, Civil, Electrical, BCA, BIT and more.",
  keywords: [
    "PU PYQs",
    "Purbanchal University Past Questions",
    "PU Previous Year Papers",
    "Engineering Question Papers Nepal",
    "BCT PYQ Purbanchal",
    "BCE PYQ Nepal",
    "Computer PYQ PU Nepal",
    "Electrical PYQ Purbanchal",
    "BCA PYQ Nepal",
    "BIT PYQ Purbanchal",
    "PU Exam Papers Nepal",
    "Past Papers Download Nepal",
    "PU Question Bank",
    "Engineering Exam Papers Nepal",
    "PU Mid Term Papers",
    "PU Final Year Papers",
    "Semester Papers PU Nepal",
  ],
  authors: [{ name: "PuNotes Team" }],
  alternates: { canonical: "/pyqs" },
  openGraph: {
    title: "Past Year Questions | PuNotes",
    description:
      "Free PYQ downloads for all Purbanchal University branches and semesters.",
    url: "https://punotes.vercel.app/pyqs",
    siteName: "PuNotes",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PU Past Year Questions | PuNotes",
    description:
      "Download free previous year question papers for Purbanchal University — all branches and semesters.",
  },
  robots: { index: true, follow: true },
};

export default function PyqsPage() {
  return <PyqsClient />;
}
