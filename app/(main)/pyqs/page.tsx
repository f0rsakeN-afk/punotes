import { AlertCircle, FileText } from "lucide-react";
import { DownloadButton } from "@/components/common/DownloadButton";
import { SearchPYQClient } from "@/components/pyqs/SearchPYQClient";
import prisma from "@/lib/prisma";

async function getPYQData() {
  try {
    const data = await prisma.pYQ.findMany({
      orderBy: { createdAt: "asc" },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch PYQs:", error);
    return null;
  }
}

export default async function PYQS() {
  const data = await getPYQData();

  return (
    <div className="w-full max-w-(--breakpoint-xl) mx-auto pb-10">
      <section className="pb-8 flex flex-col space-y-3.5">
        <h1 className="text-4xl tracking-wide font-bold text-primary">
          Past Questions
        </h1>
        <p className="text-muted-foreground">
          Access and download PYQs for all semesters and branches
        </p>
      </section>

      {data === null ? (
        <div className="w-full flex flex-col items-center py-16 text-center gap-2">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <p className="text-red-500 font-semibold">
            Failed to fetch PYQs. Please try again...
          </p>
        </div>
      ) : (
        <SearchPYQClient initialData={data} />
      )}
    </div>
  );
}
