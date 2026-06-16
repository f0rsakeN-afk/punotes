"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FileText, FileSearch } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toOrdinalWord } from "@/utils/toOrdinalWord";

const PDFViewerDialog = dynamic(
  () => import("@/components/common/PDFViewerDialog").then((m) => m.PDFViewerDialog),
  { loading: () => <button className="h-8 text-xs gap-1.5 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-3 text-xs font-medium animate-pulse">Loading...</button> }
);

interface SyllabusData {
  id: string;
  semester: string;
  branch: string;
  fileSize: string;
  url: string;
  createdAt: Date;
}

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-border/60 bg-background animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-muted shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-3/4 bg-muted rounded" />
          <div className="h-3 w-1/2 bg-muted rounded" />
        </div>
      </div>
      <div className="h-3 w-1/4 ml-11 bg-muted rounded" />
      <div className="flex items-center gap-2 ml-11">
        <div className="h-8 w-16 bg-muted rounded-md" />
        <div className="h-8 w-20 bg-muted rounded-md" />
      </div>
    </div>
  );
}

export function SearchSyllabusClient({
  initialData,
  isLoading,
}: {
  initialData: SyllabusData[];
  isLoading?: boolean;
}) {
  const [query, setQuery] = useState("");

  const filtered = initialData.filter((el) =>
    `${toOrdinalWord(Number(el.semester))} ${el.branch} ${el.fileSize}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <>
      <div className="mb-7">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by semester or branch…"
          className="max-w-sm h-10"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
          <FileSearch className="h-8 w-8" />
          <p className="text-sm">No syllabus found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((el) => (
            <div
              key={el.id}
              className="group flex flex-col gap-3 p-4 rounded-xl border border-border/60 bg-background hover:border-border hover:shadow-sm transition-all duration-150"
            >
              {/* Top row */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center text-primary">
                  <FileText className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-snug">
                    {toOrdinalWord(Number(el.semester))} Semester
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{el.branch}</p>
                </div>
              </div>

              {/* Meta */}
              <p className="text-xs text-muted-foreground pl-11">{el.fileSize}</p>

              {/* Actions */}
              <div className="flex items-center gap-2 pl-11">
                <PDFViewerDialog url={el.url} title={`${toOrdinalWord(Number(el.semester))} Semester · ${el.branch}`} buttonClassName="h-8 text-xs gap-1.5" />
                <a
                  href={`https://drive.google.com/uc?export=download&id=${el.url.match(/\/d\/([^\/]+)/)?.[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 h-8 px-3 text-xs font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
