import { Metadata } from "next";
import NotesClient from "./notes-client";

const branches = [
  "Computer Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics and Communication",
  "BCA",
  "BIT",
];

export function generateStaticParams() {
  return branches.flatMap((branch) =>
    Array.from({ length: 8 }, (_, i) => ({
      branch: encodeURIComponent(branch),
      semester: String(i + 1),
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ branch: string; semester: string }>;
}): Promise<Metadata> {
  const { branch, semester } = await params;
  const decodedBranch = decodeURIComponent(branch).replace(/-/g, " ");

  return {
    title: `${decodedBranch} Semester ${semester} Notes | PuNotes`,
    description: `Download free study notes for ${decodedBranch}, Semester ${semester} at Purbanchal University. Access PDF resources for all subjects — completely free.`,
    keywords: [
      `${decodedBranch} Semester ${semester} Notes`,
      `${decodedBranch} Notes PDF`,
      `Purbanchal University Semester ${semester}`,
      `PU ${decodedBranch} Study Material`,
      `Engineering ${semester} Semester Notes`,
      `Free Notes Download Nepal`,
      `${decodedBranch} Subject Notes`,
      `PU Exam Preparation Materials`,
    ],
    alternates: { canonical: `/pdfs/${branch}/${semester}` },
    openGraph: {
      title: `${decodedBranch} Semester ${semester} Notes | PuNotes`,
      description: `Access all notes for ${decodedBranch} Semester ${semester} — Purbanchal University.`,
      url: `https://punotes.vercel.app/pdfs/${branch}/${semester}`,
      siteName: "PuNotes",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${decodedBranch} S${semester} Notes | PuNotes`,
      description: `Free ${decodedBranch} Semester ${semester} study notes — Purbanchal University.`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function NotesPage() {
  return <NotesClient />;
}
