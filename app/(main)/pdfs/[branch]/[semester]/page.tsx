import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { cacheGet, cacheSet, buildCacheKey } from "@/lib/cache";
import { SearchNotesClient as NotesClient } from "./notes-client";

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

async function getNotes(branch: string, semester: string) {
  const decodedBranch = decodeURIComponent(branch).replace(/-/g, " ");
  const cacheKey = buildCacheKey("pdfs", decodedBranch, semester);

  // Try cache first
  const cached = await cacheGet<unknown>(cacheKey);
  if (cached) {
    return cached;
  }

  const data = await prisma.notes.findMany({
    where: {
      branch: {
        contains: decodedBranch,
        mode: "insensitive",
      },
      semester: semester,
    },
    orderBy: { createdAt: "asc" },
  });

  // Store in cache for 24 hours
  await cacheSet(cacheKey, data, { expire: 86400 });

  return data;
}

export default async function NotesPage({
  params,
}: {
  params: Promise<{ branch: string; semester: string }>;
}) {
  const { branch, semester } = await params;
  const decodedBranch = decodeURIComponent(branch).replace(/-/g, " ");
  const data = await getNotes(branch, semester);
  const notesData = Array.isArray(data) ? data : [];

  return (
    <div className="max-w-6xl mx-auto py-6 px-2 sm:px-4">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
          {decodedBranch} · Semester {semester}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Notes
        </h1>
        {notesData.length > 0 && (
          <p className="text-sm text-muted-foreground mt-1">{notesData.length} file{notesData.length !== 1 ? "s" : ""}</p>
        )}
      </div>

      <NotesClient initialData={notesData} />
    </div>
  );
}
