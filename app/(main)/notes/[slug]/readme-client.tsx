"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import axiosInstance from "@/services/axios";
import { ArrowLeft, Calendar, Github, Loader, User, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import remarkGfm from "remark-gfm";

const ReactMarkdown = dynamic(
  () => import("react-markdown").then((mod) => mod.default),
  { ssr: false, loading: () => <div className="animate-pulse h-64 bg-muted rounded-lg" /> }
);

export default function ReadmeClient() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["readme", slug],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/notes/${slug}`);
      return res.data;
    },
  });

  if (isLoading) return (
    <div className="flex items-center justify-center py-24">
      <Loader className="w-6 h-6 animate-spin text-muted-foreground" />
    </div>
  );

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto py-6 px-2 sm:px-4">
        <Card>
          <CardContent className="py-12 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-4">Failed to load note content.</p>
            <div className="flex items-center justify-center gap-3">
              <Button variant="outline" onClick={() => refetch()} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Retry
              </Button>
              <Link href="/pdfs">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Browse Notes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-6xl mx-auto py-6 px-2 sm:px-4">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg text-muted-foreground mb-4">Note not found.</p>
            <Link href="/pdfs">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Browse Notes
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-2 sm:px-4">
      <Link href="/pdfs">
        <Button variant="ghost" className="mb-6 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Notes
        </Button>
      </Link>

      <div className="space-y-6 mb-12">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">{data.branch}</Badge>
          <Badge variant="outline">Semester {data.semester}</Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {data.title}
        </h1>

        <div className="flex items-center gap-6 text-sm text-muted-foreground border-y py-4 border-border">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>By PuNotes Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(data.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 sm:p-8">
          <div className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data.content}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          Found an error? Let us know via the feedback page or contribute to the repository.
        </p>
      </div>
    </div>
  );
}