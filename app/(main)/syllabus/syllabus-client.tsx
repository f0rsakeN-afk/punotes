"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/axios";
import { SearchSyllabusClient } from "@/components/syllabus/SearchSyllabusClient";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

async function fetchSyllabus() {
  const res = await axiosInstance.get("/api/syllabus");
  return res.data;
}

function SyllabusSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-6 h-6 rounded" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <Skeleton className="h-3 w-20" />
          <div className="flex gap-2 pt-1">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SyllabusClient() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["syllabus"],
    queryFn: fetchSyllabus,
  });

  return (
    <div className="w-full max-w-(--breakpoint-xl) mx-auto pb-10">
      <section className="pb-8 flex flex-col space-y-3.5">
        <h1 className="text-4xl tracking-wide font-bold text-primary">
          Syllabus
        </h1>
        <p className="text-muted-foreground">
          Access and download syllabus for all semesters and branches
        </p>
      </section>

      {isLoading && <SyllabusSkeleton />}

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

      {!isLoading && !isError && data && (
        <SearchSyllabusClient initialData={data} />
      )}
    </div>
  );
}
