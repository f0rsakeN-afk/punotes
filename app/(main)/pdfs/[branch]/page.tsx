import { Metadata } from "next";
import BranchPage from "./branch-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ branch: string }>;
}): Promise<Metadata> {
  const { branch } = await params;
  const decoded = decodeURIComponent(branch).replace(/-/g, " ");
  const formatted = decoded.replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${formatted} – Select Semester`,
    description: `Access semester-wise study notes and resources for ${formatted} at Purbanchal University. Choose your semester to get started.`,
    alternates: { canonical: `/pdfs/${branch}` },
    openGraph: {
      title: `${formatted} | PuNotes`,
      description: `Browse all semesters for ${formatted} — Purbanchal University notes and resources.`,
      url: `https://punotes.vercel.app/pdfs/${branch}`,
    },
  };
}

export default function BranchSemestersPage() {
  return <BranchPage />;
}
