"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import axiosInstance from "@/services/axios";
import { ArrowLeft, Calendar, Loader, User, AlertCircle, RefreshCw, FileText } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";
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
      <>
        <Card>
          <CardContent className="py-12 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-4">Failed to load note content.</p>
            <div className="flex items-center justify-center gap-3">
              <Button variant="outline" onClick={() => refetch()} className="gap-2">
                <RefreshCw data-icon="inline-start" className="w-4 h-4" />
                Retry
              </Button>
              <Button variant="ghost" className="gap-2" asChild>
                <Link href="/pdfs">
                  <ArrowLeft data-icon="inline-start" className="w-4 h-4" />
                  Browse Notes
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Card>
          <CardContent className="py-12 text-center space-y-3">
            <FileText className="w-10 h-10 mx-auto text-muted-foreground/40" />
            <h3 className="text-lg font-medium">No data available</h3>
            <p className="text-sm text-muted-foreground mb-4">The requested note could not be found or has been removed.</p>
            <Button variant="outline" className="mt-2" asChild>
              <Link href="/pdfs">
                <ArrowLeft data-icon="inline-start" className="w-4 h-4" />
                Browse Notes
              </Link>
            </Button>
          </CardContent>
        </Card>
      </>
    );
  }

  const isEmptyContent = !data.content || data.content.trim().length === 0;

  if (isEmptyContent) {
    return (
      <>
        <Button variant="ghost" className="mb-6 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors gap-2" asChild>
          <Link href="/pdfs">
            <ArrowLeft data-icon="inline-start" className="w-4 h-4" />
            Back to Notes
          </Link>
        </Button>
        <Card>
          <CardContent className="py-16 text-center space-y-3">
            <FileText className="w-10 h-10 mx-auto text-muted-foreground/40" />
            <h3 className="font-medium">No content available</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">This note has no content yet. Please check back later or browse other notes.</p>
            <Button variant="outline" className="mt-4" asChild><Link href="/pdfs">Browse Notes</Link></Button>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      <Button variant="ghost" className="mb-6 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors gap-2" asChild>
        <Link href="/pdfs">
          <ArrowLeft data-icon="inline-start" className="w-4 h-4" />
          Back to Notes
        </Link>
      </Button>

      <div className="space-y-6 mb-12">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">{data.branch}</Badge>
          <Badge variant="outline">Semester {data.semester}</Badge>
        </div>

        <PageHeader title={data.title} />

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
    </>
  );
}