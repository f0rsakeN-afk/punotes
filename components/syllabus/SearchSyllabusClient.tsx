"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, FileSearch, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DownloadButton } from "@/components/common/DownloadButton";
import { toOrdinalWord } from "@/utils/toOrdinalWord";

interface SyllabusData {
  id: string;
  semester: string;
  branch: string;
  fileSize: string;
  url: string;
  createdAt: Date;
}

export function SearchSyllabusClient({ initialData }: { initialData: SyllabusData[] }) {
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

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
          <FileSearch className="h-8 w-8" />
          <p className="text-sm">No syllabus found matching your search.</p>
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
                <a href={el.url} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="h-8 text-xs gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" />
                    View
                  </Button>
                </a>
                <DownloadButton url={el.url} className="h-8 text-xs" />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
