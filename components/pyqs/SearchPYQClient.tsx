"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DownloadButton } from "@/components/common/DownloadButton";
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

interface SearchPYQClientProps {
  initialData: PYQData[];
}

export function SearchPYQClient({ initialData }: SearchPYQClientProps) {
  const [query, setQuery] = useState("");

  const filtered = initialData.filter((el) =>
    `${toOrdinalWord(Number(el.semester))} ${el.branch} ${el.fileSize} ${el.year}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <>
      <section className="mb-8">
        <Input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search by year, semester, branch, size..."
          className="max-w-3xl h-12"
        />
      </section>

      {filtered.length === 0 && (
        <div className="w-full flex flex-col items-center py-16 text-center gap-2">
          <FileText className="w-10 h-10 text-gray-400" />
          <p className="text-muted-foreground">
            No PYQs found that match your search.
          </p>
        </div>
      )}

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
                      className="flex gap-2 items-center cursor-pointer text-xs lg:text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </Button>
                  </a>

                  <DownloadButton url={el.url} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
