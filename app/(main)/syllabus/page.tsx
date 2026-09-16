import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { cacheGet, cacheSet } from "@/lib/cache";
import { PageHeader } from "@/components/shared/PageHeader";
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
export const revalidate = 3600;

async function getSyllabus(page = 0, limit = 48) {
  const cacheKey = `${CACHE_KEY}:${page}:${limit}`;
  // Try cache first
  const cached = await cacheGet<unknown>(cacheKey);
  if (cached) {
    return cached;
  }

  const data = await prisma.syllabus.findMany({
    select: { id: true, branch: true, semester: true, url: true, fileSize: true, createdAt: true },
    orderBy: { createdAt: "asc" },
    take: limit,
    skip: page * limit,
  });

  // Store in cache for 1 hour (revalidate at page level too)
  await cacheSet(cacheKey, data, { expire: 3600 });

  return data;
}

export default async function SyllabusPage() {
  const data = await getSyllabus();
  const syllabusData = Array.isArray(data) ? data : [];

  return (
    <>
      <div className="mb-8">
        <PageHeader
          title="Syllabus"
          description="Official syllabus for all branches and semesters"
        />
      </div>

      <SyllabusClient initialData={syllabusData} />
    </>
  );
}
