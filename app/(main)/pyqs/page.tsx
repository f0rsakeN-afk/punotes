import { Metadata } from "next";
import PyqsClient from "./pyqs-client";

export const metadata: Metadata = {
  title: "Past Year Questions",
  description:
    "Download previous year question papers (PYQs) for Purbanchal University — all branches and semesters covered. Computer Engineering, Civil, Electrical, BCA, BIT and more.",
  keywords: [
    "PU PYQs",
    "Purbanchal University Past Questions",
    "PU Previous Year Papers",
    "Engineering Question Papers Nepal",
  ],
  alternates: { canonical: "/pyqs" },
  openGraph: {
    title: "Past Year Questions | PuNotes",
    description:
      "Free PYQ downloads for all Purbanchal University branches and semesters.",
    url: "https://punotes.vercel.app/pyqs",
  },
};

export default function PyqsPage() {
  return <PyqsClient />;
}
