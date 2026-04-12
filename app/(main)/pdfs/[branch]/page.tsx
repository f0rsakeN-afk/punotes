import { Metadata } from "next";
import BranchPage from "./branch-client";

const branches = [
  "Computer Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics and Communication",
  "BCA",
  "BIT",
];

export function generateStaticParams() {
  return branches.map((branch) => ({ branch: encodeURIComponent(branch) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ branch: string }>;
}): Promise<Metadata> {
  const { branch } = await params;
  const decoded = decodeURIComponent(branch).replace(/-/g, " ");
  const formatted = decoded.replace(/\b\w/g, (c) => c.toUpperCase());

  const branchKeywords: Record<string, string[]> = {
    "Computer Engineering": [
      "Computer Engineering Notes",
      "BCT Notes Purbanchal",
      "Computer Science Notes Nepal",
      "CSE Study Materials PU",
      "Java Notes PU",
      "Data Structures Notes Nepal",
      "Algorithms Notes PU",
      "Web Development Notes Nepal",
    ],
    "Civil Engineering": [
      "Civil Engineering Notes",
      "BCE Notes Purbanchal",
      "Structural Analysis Notes Nepal",
      "Civil Design Notes PU",
      "Construction Notes PU",
      "Surveying Notes Nepal",
    ],
    "Electrical Engineering": [
      "Electrical Engineering Notes",
      "BEE Notes Purbanchal",
      "Power Systems Notes Nepal",
      "Circuit Theory Notes PU",
      "Electrical Machines Notes Nepal",
      "Control Systems Notes PU",
    ],
    "Electronics and Communication": [
      "Electronics Engineering Notes",
      "EXTC Notes Purbanchal",
      "Communication Systems Notes Nepal",
      "Circuit Analysis Notes PU",
      "Signal Processing Notes Nepal",
      "Microprocessors Notes PU",
    ],
    "BCA": [
      "BCA Notes Purbanchal",
      "Bachelor Computer Application Notes",
      "BCA Study Materials Nepal",
      "Programming Notes BCA",
      "Database Notes BCA Nepal",
      "Networking Notes BCA",
    ],
    "BIT": [
      "BIT Notes Purbanchal",
      "Bachelor Information Technology Notes",
      "BIT Study Materials Nepal",
      "IT Notes PU",
      "Software Engineering Notes BIT",
      "Web Tech Notes Nepal",
    ],
  };

  return {
    title: `${formatted} Notes & PDFs | PuNotes`,
    description: `Access free ${formatted} study notes and semester-wise PDF resources for Purbanchal University. Download semester 1-8 materials.`,
    keywords: [
      `${formatted} Notes`,
      `${formatted} PDFs`,
      `Purbanchal University ${formatted}`,
      "PU Notes Download",
      "Engineering Notes Nepal",
      ...(branchKeywords[decoded] || []),
    ],
    alternates: { canonical: `/pdfs/${branch}` },
    openGraph: {
      title: `${formatted} Notes | PuNotes`,
      description: `Browse all semesters for ${formatted} — Purbanchal University notes and resources.`,
      url: `https://punotes.vercel.app/pdfs/${branch}`,
      siteName: "PuNotes",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${formatted} Notes | PuNotes`,
      description: `Free ${formatted} study notes for Purbanchal University — all semesters.`,
    },
    robots: { index: true, follow: true },
  };
}

export default function BranchSemestersPage() {
  return <BranchPage />;
}
