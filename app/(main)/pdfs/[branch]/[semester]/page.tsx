"use client";

import { useGetNotes } from "@/services/notes";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  FileText,
  AlertTriangle,
  FileSearch,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function PDFS() {
  const [query, setQuery] = useState("");
  const params = useParams();

  const branch = params?.branch as string;
  const semester = params?.semester as string;

  const { data, isLoading, isError } = useGetNotes(branch, semester);

  const notes = Array.isArray(data) ? data : [];

  const filtered = notes?.filter((el) =>
    `${el.name} ${el.subject}`.toLowerCase().includes(query.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-3">
        <AlertTriangle className="h-10 w-10 text-red-500" />
        <p className="text-lg font-medium text-red-500">
          Failed to load notes.
        </p>
      </div>
    );
  }

  if (notes.length === 0 || filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-3">
        <FileSearch className="h-10 w-10 text-muted-foreground" />
        <p className="text-lg text-muted-foreground">No notes found.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-(--breakpoint-xl) mx-auto pb-10">
      <section className="pb-8 flex flex-col spce-y-3.5">
        <h1 className="text-4xl tracking-wide font-bold text-primary pb-8">
          Notes – {decodeURIComponent(branch)} / Semester {semester}
        </h1>

        <Input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search by name, subject..."
          className="max-w-3xl h-12"
        />
      </section>

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
                  {note.fileSize} MB
                </p>
              </div>
            </CardHeader>

            <CardContent className="flex justify-between items-center mt-2">
              <div className="text-sm text-muted-foreground">
                {new Date(note.createdAt).toLocaleDateString()}
              </div>

              <a href={note.url} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="default"
                  className="flex gap-2 items-center cursor-pointer text-xs lg:text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  View
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
