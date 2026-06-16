"use client";

import { FileText, BookOpen, ScrollText, Clock, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Submission {
  id: string;
  url: string;
  title: string;
  branch: string;
  semester: string;
  type: "NOTES" | "SYLLABUS" | "PYQ";
  status: "PENDING" | "APPROVED" | "REJECTED";
  description: string | null;
  adminNotes: string | null;
  createdAt: string;
}

interface SubmissionsClientProps {
  initialData: Submission[];
}

const typeIcons = {
  NOTES: FileText,
  SYLLABUS: BookOpen,
  PYQ: ScrollText,
};

const statusConfig = {
  PENDING: {
    label: "Pending Review",
    icon: Clock,
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  APPROVED: {
    label: "Approved",
    icon: CheckCircle,
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
};

export default function SubmissionsClient({ initialData }: SubmissionsClientProps) {
  const submissions: Submission[] = initialData.map((s) => ({
    ...s,
    createdAt: new Date(s.createdAt).toISOString(),
  }));

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-1">
          My Submissions
        </h1>
        <p className="text-sm text-muted-foreground">
          Track the status of your shared Google Drive links
        </p>
      </div>

      {submissions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
              <FileText className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No submissions yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Share your study materials by submitting a Google Drive link
            </p>
            <Button asChild>
              <a href="/share">Share Resources</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => {
            const Icon = typeIcons[submission.type];
            const status = statusConfig[submission.status];
            const StatusIcon = status.icon;

            return (
              <Card key={submission.id}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="font-medium text-foreground line-clamp-1">
                            {submission.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {submission.branch} · Semester {submission.semester}
                          </p>
                        </div>
                        <Badge className={cn("shrink-0", status.className)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                      {submission.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {submission.description}
                        </p>
                      )}
                      {submission.adminNotes && (
                        <div className="mb-3 p-3 rounded-lg bg-muted/50 text-sm">
                          <span className="font-medium">Admin note: </span>
                          <span className="text-muted-foreground">{submission.adminNotes}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Submitted {new Date(submission.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <a
                          href={submission.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          View Link
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}