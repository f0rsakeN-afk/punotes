"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axiosInstance from "@/services/axios";
import { ArrowLeft, Calendar, Github, User, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function ReadmeSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">
      <Skeleton className="h-9 w-32 mb-8 rounded-md" />
      <div className="space-y-6 mb-12">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-14 w-3/4" />
        <div className="flex gap-6 py-4 border-y">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-6 w-2/3 mt-6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export default function ReadmeClient() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["readme", slug],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/notes/${slug}`);
      return res.data;
    },
  });

  if (isLoading) return <ReadmeSkeleton />;

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen flex flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-lg font-medium text-red-500">Failed to load note content.</p>
        <Button variant="outline" onClick={() => refetch()} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Retry
        </Button>
        <Link href="javascript:history.back()">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Go back
          </Button>
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Note not found.</p>
        <Link href="/pdfs">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Browse Notes
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">
      <Link href="javascript:history.back()">
        <Button variant="ghost" className="mb-8 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Notes
        </Button>
      </Link>

      <div className="space-y-6 mb-12">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">{data.branch}</Badge>
          <Badge variant="outline">Semester {data.semester}</Badge>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white">
          {data.title}
        </h1>

        <div className="flex items-center gap-6 text-sm text-muted-foreground border-y py-4 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>By PuNotes Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(data.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Github className="w-4 h-4" />
            <span>Stored on GitHub</span>
          </div>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert prose-headings:font-black prose-headings:tracking-tighter prose-a:text-primary prose-img:rounded-3xl max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {data.content}
        </ReactMarkdown>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-sm text-muted-foreground italic">
          Found an error? Let us know or contribute to the repo.
        </p>
      </div>
    </div>
  );
}
