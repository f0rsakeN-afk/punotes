"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/axios";
import { SearchPYQClient } from "@/components/pyqs/SearchPYQClient";
import { AlertCircle, Loader, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

async function fetchPYQs() {
  const res = await axiosInstance.get("/api/pyqs");
  return res.data;
}

export default function PyqsClient() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["pyqs"],
    queryFn: fetchPYQs,
  });

  return (
    <div className="w-full max-w-5xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-1">
          Past Questions
        </h1>
        <p className="text-sm text-muted-foreground">
          Previous year question papers for all branches and semesters
        </p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <Loader className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {isError && (
        <div className="w-full flex flex-col items-center py-16 text-center gap-4">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <p className="text-red-500 font-semibold">
            Failed to load past questions. Please try again.
          </p>
          <Button variant="outline" onClick={() => refetch()} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
        </div>
      )}

      {!isLoading && !isError && data && (
        <SearchPYQClient initialData={data} />
      )}
    </div>
  );
}
