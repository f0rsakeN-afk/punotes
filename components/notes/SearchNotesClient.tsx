"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

interface SearchNotesClientProps {
  initialData: NotesData[];
}

export function SearchNotesClient({ initialData }: SearchNotesClientProps) {
  const [query, setQuery] = useState("");

  const filtered = initialData.filter((el) =>
    `${el.name} ${el.subject}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <section className="mb-8">
        <Input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search by name, subject..."
          className="max-w-3xl h-12"
        />
      </section>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[50vh] gap-3">
          <FileSearch className="h-10 w-10 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">No notes found.</p>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((note) => (
            <Card key={note.id} className="border hover:shadow-md transition">
              <CardHeader className="flex flex-row items-start gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle className="text-lg">{note.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {note.subject}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground">
                    {note.fileSize} MB •{" "}
                    {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="grid grid-cols-2 gap-3 mt-2">
                <a
                  href={note.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    variant="default"
                    className="flex gap-2 items-center cursor-pointer text-xs lg:text-sm w-full"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View
                  </Button>
                </a>
                <DownloadButton url={note.url} className="w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
