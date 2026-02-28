"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axiosInstance from "@/services/axios";
import { SearchNotesClient } from "@/components/notes/SearchNotesClient";
import { AlertCircle, FileSearch, Loader, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="w-full max-w-5xl mx-auto pb-10">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
          {decodedBranch} · Semester {semester}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Notes
        </h1>
        {!isLoading && !isError && data && (
          <p className="text-sm text-muted-foreground mt-1">{data.length} file{data.length !== 1 ? "s" : ""}</p>
        )}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <Loader className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}

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
