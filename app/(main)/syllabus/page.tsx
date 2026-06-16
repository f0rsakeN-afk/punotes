import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { cacheGet, cacheSet } from "@/lib/cache";
import { SearchSyllabusClient as SyllabusClient } from "./syllabus-client";

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

const CACHE_KEY = "syllabus:all";

async function getSyllabus() {
  // Try cache first
  const cached = await cacheGet<unknown>(CACHE_KEY);
  if (cached) {
    return cached;
  }

  const data = await prisma.syllabus.findMany({
    orderBy: { createdAt: "asc" },
  });

  // Store in cache for 24 hours
  await cacheSet(CACHE_KEY, data, { expire: 86400 });

  return data;
}

export default async function SyllabusPage() {
  const data = await getSyllabus();
  const syllabusData = Array.isArray(data) ? data : [];

  return (
    <div className="max-w-6xl mx-auto py-6 px-2 sm:px-4">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-1">
          Syllabus
        </h1>
        <p className="text-sm text-muted-foreground">
          Official syllabus for all branches and semesters
        </p>
      </div>

      <SyllabusClient initialData={syllabusData} />
    </div>
  );
}
