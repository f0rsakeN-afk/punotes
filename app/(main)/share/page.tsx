import { Metadata } from "next";
import ShareClient from "./share-client";

export const metadata: Metadata = {
  title: "Share Resources | PuNotes",
  description: "Share study resources with the PuNotes community by submitting a Google Drive link",
  keywords: [
    "PuNotes Share",
    "Upload Notes PU",
    "Contribute Study Materials",
    "Share PYQs Purbanchal",
    "Upload Syllabus Nepal",
    "f0rsaken-afk",
  ],
  alternates: { canonical: "/share" },
  openGraph: {
    title: "Share Resources | PuNotes",
    description: "Help the PU community by sharing study materials. Submit a Google Drive link.",
    url: "https://punotes.vercel.app/share",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Share Resources | PuNotes",
    description: "Help the PU community by sharing study materials.",
  },
  robots: { index: true, follow: true },
};

const branches = [
  "Computer Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics and Communication",
  "BCA",
  "BIT",
];

export default function SharePage() {
  return <ShareClient branches={branches} />;
}
