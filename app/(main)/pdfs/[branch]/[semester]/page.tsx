import { Metadata } from "next";
import NotesClient from "./notes-client";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import prisma from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ branch: string; semester: string }>;
}): Promise<Metadata> {
  const { branch, semester } = await params;
  const decodedBranch = decodeURIComponent(branch).replace(/-/g, " ");

  return {
    title: `${decodedBranch} – Semester ${semester} Notes`,
    description: `Download study notes for ${decodedBranch}, Semester ${semester} at Purbanchal University. Free PDF resources for engineering students.`,
    alternates: { canonical: `/pdfs/${branch}/${semester}` },
    openGraph: {
      title: `${decodedBranch} Semester ${semester} Notes | PuNotes`,
      description: `Access all notes for ${decodedBranch} Semester ${semester} — Purbanchal University.`,
      url: `https://punotes.vercel.app/pdfs/${branch}/${semester}`,
    },
  };
}

export default async function NotesPage({
  params,
}: {
  params: Promise<{ branch: string; semester: string }>;
}) {
  const { branch, semester } = await params;
  const decodedBranch = decodeURIComponent(branch).replace(/-/g, " ");

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", branch, semester],
    queryFn: () =>
      prisma.notes.findMany({
        where: {
          branch: { contains: decodedBranch, mode: "insensitive" },
          semester,
        },
        orderBy: { createdAt: "asc" },
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
