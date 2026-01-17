import { AlertCircle, FileText } from "lucide-react";
import { DownloadButton } from "@/components/common/DownloadButton";
import { SearchSyllabusClient } from "@/components/syllabus/SearchSyllabusClient";
import prisma from "@/lib/prisma";

async function getSyllabusData() {
  try {
    const data = await prisma.syllabus.findMany({
      orderBy: { createdAt: "asc" },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch syllabus:", error);
    return null;
  }
}

export default async function Syllabus() {
  const data = await getSyllabusData();

  return (
    <div className="w-full max-w-(--breakpoint-xl) mx-auto pb-10">
      <section className="pb-8 flex flex-col space-y-3.5">
        <h1 className="text-4xl tracking-wide font-bold text-primary">
          Syllabus
        </h1>
        <p className="text-muted-foreground">
          Access and download syllabus for all semesters and branches
        </p>
      </section>

      {data === null ? (
        <div className="w-full flex flex-col items-center py-16 text-center gap-2">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <p className="text-red-500 font-semibold">
            Failed to fetch syllabus data. Please try again...
          </p>
        </div>
      ) : (
        <SearchSyllabusClient initialData={data} />
      )}
    </div>
  );
}
