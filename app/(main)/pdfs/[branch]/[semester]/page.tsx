import {
  AlertTriangle,
  FileSearch,
} from "lucide-react";
import { DownloadButton } from "@/components/common/DownloadButton";
import { SearchNotesClient } from "@/components/notes/SearchNotesClient";
import prisma from "@/lib/prisma";

async function getNoteData(branch: string, semester: string) {
  try {
    const decodedBranch = decodeURIComponent(branch).replace(/-/g, " ");
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
    return data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return null;
  }
}

export default async function PDFS({
  params,
}: {
  params: Promise<{ branch: string; semester: string }>;
}) {
  const { branch, semester } = await params;
  const data = await getNoteData(branch, semester);

  if (data === null) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-3">
        <AlertTriangle className="h-10 w-10 text-red-500" />
        <p className="text-lg font-medium text-red-500">
          Failed to load notes.
        </p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-3">
        <FileSearch className="h-10 w-10 text-muted-foreground" />
        <p className="text-lg text-muted-foreground">No notes found.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-(--breakpoint-xl) mx-auto pb-10">
      <section className="pb-8 flex flex-col space-y-3.5">
        <h1 className="text-4xl tracking-wide font-bold text-primary pb-2">
          Notes – {decodeURIComponent(branch).replace(/-/g, " ")} / Semester {semester}
        </h1>
        <p className="text-muted-foreground pb-6">
          Total Notes: {data.length}
        </p>
      </section>

      <SearchNotesClient initialData={data} />
    </div>
  );
}
