import { Metadata } from "next";
import PyqsClient from "./pyqs-client";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import prisma from "@/lib/prisma";

export const revalidate = 86400;

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

export default async function PyqsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["pyqs"],
    queryFn: () => prisma.pYQ.findMany({ orderBy: { createdAt: "asc" } }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PyqsClient />
    </HydrationBoundary>
  );
}
