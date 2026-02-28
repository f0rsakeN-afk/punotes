"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, FileSearch, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DownloadButton } from "@/components/common/DownloadButton";

interface NotesData {
  id: string;
  name: string;
  subject: string;
  fileSize: string;
  url: string;
  createdAt: Date;
  semester: string;
  branch: string;
}

export function SearchNotesClient({ initialData }: { initialData: NotesData[] }) {
  const [query, setQuery] = useState("");

  const filtered = initialData.filter((n) =>
    `${n.name} ${n.subject}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="mb-7">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or subject…"
          className="max-w-sm h-10"
        />
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
          <FileSearch className="h-8 w-8" />
          <p className="text-sm">No notes match your search.</p>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((note) => (
            <div
              key={note.id}
              className="group flex flex-col gap-3 p-4 rounded-xl border border-border/60 bg-background hover:border-border hover:shadow-sm transition-all duration-150"
            >
              {/* Top row */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center text-primary">
                  <FileText className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-snug truncate">
                    {note.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{note.subject}</p>
                </div>
              </div>

              {/* Meta */}
              <p className="text-xs text-muted-foreground pl-11">
                {note.fileSize} MB &middot; {new Date(note.createdAt).toLocaleDateString()}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2 pl-11">
                <a href={note.url} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="h-8 text-xs gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" />
                    View
                  </Button>
                </a>
                <DownloadButton url={note.url} className="h-8 text-xs" />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
