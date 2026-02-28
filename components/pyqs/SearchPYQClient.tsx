"use client";

import { useState } from "react";
import { FileText, FileSearch } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DownloadButton } from "@/components/common/DownloadButton";
import { PDFViewerDialog } from "@/components/common/PDFViewerDialog";
import { toOrdinalWord } from "@/utils/toOrdinalWord";

interface PYQData {
  id: string;
  semester: string;
  year: string;
  branch: string;
  fileSize: string;
  url: string;
  createdAt: Date;
}

export function SearchPYQClient({ initialData }: { initialData: PYQData[] }) {
  const [query, setQuery] = useState("");

  const filtered = initialData.filter((el) =>
    `${toOrdinalWord(Number(el.semester))} ${el.branch} ${el.fileSize} ${el.year}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <>
      <div className="mb-7">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by year, semester, branch…"
          className="max-w-sm h-10"
        />
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
          <FileSearch className="h-8 w-8" />
          <p className="text-sm">No past questions match your search.</p>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((el) => (
            <div
              key={el.id}
              className="group flex flex-col gap-3 p-4 rounded-xl border border-border/60 bg-background hover:border-border hover:shadow-sm transition-all duration-150"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center text-primary">
                    <FileText className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-snug">
                      Semester {el.semester}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{el.branch}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0 text-xs font-semibold">
                  {el.year}
                </Badge>
              </div>

              {/* Meta */}
              <p className="text-xs text-muted-foreground pl-11">{el.fileSize}</p>

              {/* Actions */}
              <div className="flex items-center gap-2 pl-11">
                <PDFViewerDialog url={el.url} title={`Semester ${el.semester} · ${el.year}`} buttonClassName="h-8 text-xs gap-1.5" />
                <DownloadButton url={el.url} className="h-8 text-xs" />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
