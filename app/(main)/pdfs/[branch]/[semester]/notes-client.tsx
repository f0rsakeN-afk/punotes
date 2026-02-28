"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axiosInstance from "@/services/axios";
import { SearchNotesClient } from "@/components/notes/SearchNotesClient";
import { AlertCircle, FileSearch, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function NotesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-6 h-6 rounded" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
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

export default function NotesClient() {
  const params = useParams<{ branch: string; semester: string }>();
  const branch = params.branch;
  const semester = params.semester;

  const decodedBranch = decodeURIComponent(branch).replace(/-/g, " ");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["notes", branch, semester],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/pdfs/${branch}/${semester}`);
      return res.data;
    },
  });

  return (
    <div className="w-full max-w-(--breakpoint-xl) mx-auto pb-10">
      <section className="pb-8 flex flex-col space-y-3.5">
        <h1 className="text-4xl tracking-wide font-bold text-primary pb-2">
          Notes – {decodedBranch} / Semester {semester}
        </h1>
        {!isLoading && !isError && data && (
          <p className="text-muted-foreground pb-6">Total Notes: {data.length}</p>
        )}
      </section>

      {isLoading && <NotesSkeleton />}

      {isError && (
        <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
          <AlertCircle className="h-10 w-10 text-red-500" />
          <p className="text-lg font-medium text-red-500">Failed to load notes.</p>
          <Button variant="outline" onClick={() => refetch()} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
        </div>
      )}

      {!isLoading && !isError && data?.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[50vh] gap-3">
          <FileSearch className="h-10 w-10 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">No notes found.</p>
        </div>
      )}

      {!isLoading && !isError && data?.length > 0 && (
        <SearchNotesClient initialData={data} />
      )}
    </div>
  );
}
