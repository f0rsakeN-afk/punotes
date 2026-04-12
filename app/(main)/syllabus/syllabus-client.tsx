"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/axios";
import { SearchSyllabusClient } from "@/components/syllabus/SearchSyllabusClient";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

async function fetchSyllabus() {
  const res = await axiosInstance.get("/api/syllabus");
  return res.data;
}

export default function SyllabusClient() {
  const { data, isError, refetch } = useQuery({
    queryKey: ["syllabus"],
    queryFn: fetchSyllabus,
    staleTime: 1000 * 60 * 60,
  });

  return (
    <div className="w-full max-w-5xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-1">
          Syllabus
        </h1>
        <p className="text-sm text-muted-foreground">
          Official syllabus for all branches and semesters
        </p>
      </div>

      {isError && (
        <div className="w-full flex flex-col items-center py-16 text-center gap-4">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <p className="text-red-500 font-semibold">
            Failed to load syllabus. Please try again.
          </p>
          <Button variant="outline" onClick={() => refetch()} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
        </div>
      )}

      {!isError && data && (
        <SearchSyllabusClient initialData={data} />
      )}
    </div>
  );
}
