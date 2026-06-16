"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, ExternalLink, Clock, FileText, BookOpen, ScrollText } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

interface PublicLink {
  id: string;
  url: string;
  branch: string;
  semester: string;
  type: "NOTES" | "SYLLABUS" | "PYQ";
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedBy: string | null;
  submitterEmail: string | null;
  title: string;
  description: string | null;
  adminNotes: string | null;
  createdAt: string;
}

const typeIcons = {
  NOTES: FileText,
  SYLLABUS: BookOpen,
  PYQ: ScrollText,
};

export default function PublicLinksClient({
  pendingLinks,
  reviewedLinks,
}: {
  pendingLinks: PublicLink[];
  reviewedLinks: PublicLink[];
}) {
  const [pending, setPending] = useState(pendingLinks);
  const [reviewed, setReviewed] = useState(reviewedLinks);
  const [processing, setProcessing] = useState<string | null>(null);

  const handleReview = async (id: string, status: "APPROVED" | "REJECTED") => {
    setProcessing(id);
    try {
      await axios.patch("/api/public-links/admin", { id, status });
      const link = pending.find((l) => l.id === id);
      setPending((prev) => prev.filter((l) => l.id !== id));
      setReviewed((prev) => [
        { ...link!, status, updatedAt: new Date().toISOString() } as PublicLink,
        ...prev,
      ]);
      toast.success(`Link ${status.toLowerCase()} successfully`);
    } catch {
      toast.error("Failed to update link");
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-2 sm:px-4">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Public Link Submissions
        </h1>
        <p className="text-muted-foreground">
          Review and approve links submitted by users
        </p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="w-4 h-4" />
            Pending
            {pending.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {pending.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="reviewed" className="gap-2">
            <CheckCircle className="w-4 h-4" />
            Reviewed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {pending.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No pending submissions</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pending.map((link) => (
                <Card key={link.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {(() => {
                            const Icon = typeIcons[link.type];
                            return Icon ? <Icon className="w-4 h-4 text-primary" /> : null;
                          })()}
                          <h3 className="font-semibold text-foreground truncate">
                            {link.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {link.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {link.branch} · Semester {link.semester}
                        </p>
                        {link.description && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {link.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Submitted{link.submitterEmail ? ` by ${link.submitterEmail}` : " anonymously"}</span>
                          <span>·</span>
                          <span>{new Date(link.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex sm:flex-col gap-2 shrink-0">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          View Link
                        </a>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleReview(link.id, "APPROVED")}
                          disabled={processing === link.id}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleReview(link.id, "REJECTED")}
                          disabled={processing === link.id}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="reviewed">
          {reviewed.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No reviewed links yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {reviewed.map((link) => (
                <Card key={link.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {(() => {
                            const Icon = typeIcons[link.type];
                            return Icon ? <Icon className="w-4 h-4 text-primary" /> : null;
                          })()}
                          <h3 className="font-semibold text-foreground truncate">
                            {link.title}
                          </h3>
                          <Badge
                            variant={link.status === "APPROVED" ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {link.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {link.branch} · Semester {link.semester}
                        </p>
                        {link.adminNotes && (
                          <p className="text-sm text-muted-foreground italic mb-2">
                            Admin note: {link.adminNotes}
                          </p>
                        )}
                      </div>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        View Link
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
