"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Download,
  FileText,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const syllabusData = [
  {
    id: 1,
    semester: "2",
    year: "2025",
    branch: "Computer Engineering",
    fileSize: "2.3 MB",
    url: "https://docs.google.com/document/d/1U_8vfv2wPuGIYZExxBzeytCnkmgZegWjhVwJSANWiJA/edit?usp=drive_link",
  },
  {
    id: 2,
    semester: "2",
    year: "2025",
    branch: "Computer Engineering",
    fileSize: "1.8 MB",
    url: "https://example.com/syllabus/discrete-math.pdf",
  },
  {
    id: 3,
    semester: "2",
    year: "2025",
    branch: "Computer Engineering",
    fileSize: "2.0 MB",
    url: "https://example.com/syllabus/digital-logic.pdf",
  },
  {
    id: 4,
    semester: "3",
    year: "2025",
    branch: "Computer Engineering",
    fileSize: "3.1 MB",
    url: "https://example.com/syllabus/dsa.pdf",
  },
  {
    id: 5,
    semester: "3",
    year: "2025",
    branch: "Computer Engineering",
    fileSize: "2.7 MB",
    url: "https://example.com/syllabus/computer-architecture.pdf",
  },
];

export default function PYQS() {
  const [query, setQuery] = useState("");

  const filtered = syllabusData.filter((el) =>
    `${el.semester} ${el.branch} ${el.fileSize} ${el.year}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <div className="w-full max-w-(--breakpoint-xl) mx-auto pb-10">
      <section className="pb-8 flex flex-col space-y-3.5">
        <h1 className="text-4xl tracking-wide font-bold text-primary">Past Questions</h1>
        <p className="text-muted-foreground">
          Access and download PYQs for all semesters and branches
        </p>

        <Input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search by year, semester, branch, size..."
          className="max-w-3xl h-12"
        />
      </section>

      {/*{loading && (
        <div className="w-full flex justify-center py-16">
          <Loader2 className="animate-spin w-8 h-8 text-primary" />
        </div>
      )}

      {!loading && error && (
        <div className="w-full flex flex-col items-center py-16 text-center gap-2">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <p className="text-red-500 font-semibold">{error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="w-full flex flex-col items-center py-16 text-center gap-2">
          <FileText className="w-10 h-10 text-gray-400" />
          <p className="text-muted-foreground">
            No syllabus found that matches your search.
          </p>
        </div>
      )}*/}

      {/*{!loading && !error && filtered.length > 0 && (*/}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
          {filtered.map((el) => (
            <Card
              key={el.id}
              className="border shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
            >
              <CardHeader className="flex flex-row items-center gap-3 relative">
                <FileText className="w-6 h-6 text-primary" />
                <div>
                  <CardTitle className="text-base font-semibold">
                    Semester {el.semester}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{el.branch}</p>
                </div>
                <Badge className="absolute right-6 top-0" variant={"secondary"}>
                  {el.year}
                </Badge>
              </CardHeader>

              <CardContent className="flex flex-col gap-3 h-full">
                <p className="text-sm text-muted-foreground">
                  Size: {el.fileSize}
                </p>

                <div className="mt-auto flex items-center gap-3 pt-2">
                  <a href={el.url} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="default"
                      className="flex gap-2 items-center cursor-pointer text-xs lg:text-sm "
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </Button>
                  </a>

                  <a href={el.url} download>
                    <Button
                      variant="outline"
                      className="flex gap-2 items-center text-xs lg:text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
