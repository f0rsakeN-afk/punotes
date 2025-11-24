"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  // Download,
  FileText,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGetSyllabus } from "@/services/syllabus";
import { toOrdinalWord } from "@/utils/toOrdinalWord";

export default function Syllabus() {
  const [query, setQuery] = useState("");

  const { data, isLoading, isError } = useGetSyllabus();

  const filtered =
    data?.filter((el) =>
      `${toOrdinalWord(Number(el.semester))} ${el.branch} ${el.fileSize}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    ) ?? [];

  return (
    <div className="w-full max-w-(--breakpoint-xl) mx-auto pb-10">
      <section className="pb-8 flex flex-col space-y-3.5">
        <h1 className="text-4xl tracking-wide font-bold text-primary">
          Syllabus
        </h1>
        <p className="text-muted-foreground">
          Access and download syllabus for all semesters and branches
        </p>

        <Input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search by semester, branch, size..."
          className="max-w-3xl h-12"
        />
      </section>

      {isLoading && (
        <div className="w-full flex justify-center py-16">
          <Loader2 className="animate-spin w-8 h-8 text-primary" />
        </div>
      )}

      {!isLoading && isError && (
        <div className="w-full flex flex-col items-center py-16 text-center gap-2">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <p className="text-red-500 font-semibold">
            Failed to fetch syllabus data. Please try again...
          </p>
        </div>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <div className="w-full flex flex-col items-center py-16 text-center gap-2">
          <FileText className="w-10 h-10 text-gray-400" />
          <p className="text-muted-foreground">
            No syllabus found that matches your search.
          </p>
        </div>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
          {filtered.map((el) => (
            <Card
              key={el.id}
              className="border shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
            >
              <CardHeader className="flex flex-row items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                <div>
                  <CardTitle className="text-base font-semibold">
                    {toOrdinalWord(Number(el.semester))} Semester
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{el.branch}</p>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col gap-3 h-full">
                <p className="text-sm text-muted-foreground">
                  Size: {el.fileSize}
                </p>

                <div className="mt-auto flex items-center gap-3 pt-2">
                  <a href={el.url} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="default"
                      className="flex gap-2 items-center cursor-pointer text-xs lg:text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </Button>
                  </a>

                  {/*<a href={el.url} download>
                    <Button
                      variant="outline"
                      className="flex gap-2 items-center text-xs lg:text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </a>*/}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
