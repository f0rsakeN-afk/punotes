import { Metadata } from "next";
import SyllabusClient from "./syllabus-client";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Syllabus",
  description:
    "Browse and download the official Purbanchal University syllabus for all engineering branches — Computer, Civil, Electrical, Electronics, BCA, and BIT.",
  keywords: [
    "PU Syllabus",
    "Purbanchal University Syllabus",
    "Engineering Syllabus Nepal",
    "PU BCA Syllabus",
    "PU BIT Syllabus",
  ],
  alternates: { canonical: "/syllabus" },
  openGraph: {
    title: "Syllabus | PuNotes",
    description:
      "Official Purbanchal University syllabus for all branches and semesters.",
    url: "https://punotes.vercel.app/syllabus",
  },
};

export default async function SyllabusPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["syllabus"],
    queryFn: () => prisma.syllabus.findMany({ orderBy: { createdAt: "asc" } }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SyllabusClient />
    </HydrationBoundary>
  );
}
