"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useUser } from "@stackframe/stack";
import { Link2, FileText, BookOpen, ScrollText, CheckCircle, Loader2, Users, FileUp, BookMarked, HelpCircle, Upload, AlertTriangle } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import confetti from "canvas-confetti";
import FileDropZone from "@/components/upload/FileDropZone";

interface ShareClientProps {
  branches: string[];
}

interface Stats {
  userCount: number;
  notesCount: number;
  syllabusCount: number;
  pyqCount: number;
}

export default function ShareClient({ branches }: ShareClientProps) {
  const user = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"link" | "upload">("link");
  const [form, setForm] = useState({
    url: "",
    branch: "",
    semester: "",
    type: "NOTES" as "NOTES" | "SYLLABUS" | "PYQ",
    subject: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    axios.get("/api/stats/about").then((res) => {
      setStats(res.data);
    }).catch(() => {});
  }, []);

  // Clear URL when switching upload methods
  useEffect(() => {
    setForm((prev) => ({ ...prev, url: "" }));
  }, [uploadMethod]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.url || !form.branch || !form.semester || !form.title) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (uploadMethod === "link" && !form.url.includes("drive.google.com")) {
      toast.error("Only Google Drive links are accepted");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post("/api/public-links", {
        url: form.url,
        branch: form.branch,
        semester: form.semester,
        type: form.type,
        subject: form.subject || undefined,
        title: form.title,
        description: form.description || undefined,
      });
      toast.success("Link submitted! It will be reviewed by an admin.");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#ec4899", "#f59e0b", "#10b981"],
      });
      setForm({
        url: "",
        branch: "",
        semester: "",
        type: "NOTES",
        subject: "",
        title: "",
        description: "",
      });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error(err.response?.data?.error || "Failed to submit link");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
          <Link2 className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Share Resources
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Help the PU community by sharing study materials. Submit a Google Drive link and our admins will review it.
        </p>
      </div>

      {/* Stats Section */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.userCount}+</p>
                  <p className="text-xs text-muted-foreground">Contributors</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.notesCount}</p>
                  <p className="text-xs text-muted-foreground">Notes Shared</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookMarked className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.syllabusCount}</p>
                  <p className="text-xs text-muted-foreground">Syllabus Files</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pyqCount}</p>
                  <p className="text-xs text-muted-foreground">PYQs Shared</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Upload Method Toggle */}
                <Tabs value={uploadMethod} onValueChange={(v) => setUploadMethod(v as "link" | "upload")}>
                  <TabsList className="w-full">
                    <TabsTrigger value="link" className="flex-1 gap-2">
                      <Link2 className="w-4 h-4" />
                      Google Drive Link
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="flex-1 gap-2">
                      <Upload className="w-4 h-4" />
                      Upload File
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="link" className="mt-4 space-y-2">
                    <Label htmlFor="url">
                      Google Drive Link <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="url"
                      placeholder="https://drive.google.com/..."
                      value={form.url}
                      onChange={(e) => setForm({ ...form, url: e.target.value })}
                      className="h-11"
                    />
                    <p className="text-xs text-muted-foreground">
                      Make sure the link is publicly accessible (anyone with the link can view)
                    </p>
                  </TabsContent>

                  <TabsContent value="upload" className="mt-4 space-y-2">
                    <Label>
                      File <span className="text-destructive">*</span>
                    </Label>
                    <FileDropZone
                      onUploadComplete={(url) => setForm({ ...form, url })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Max file size: 25MB. Accepted formats: PDF, DOCX
                    </p>
                  </TabsContent>
                </Tabs>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Data Structures Notes - Semester 3"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="h-11"
                  />
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <Label>Type <span className="text-destructive">*</span></Label>
                  <Select
                    value={form.type}
                    onValueChange={(v) => setForm({ ...form, type: v as typeof form.type })}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NOTES">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Notes
                        </div>
                      </SelectItem>
                      <SelectItem value="SYLLABUS">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Syllabus
                        </div>
                      </SelectItem>
                      <SelectItem value="PYQ">
                        <div className="flex items-center gap-2">
                          <ScrollText className="w-4 h-4" />
                          Past Questions
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Mathematics, Physics"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="h-11"
                  />
                </div>

                {/* Branch and Semester */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>
                      Branch <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={form.branch}
                      onValueChange={(v) => setForm({ ...form, branch: v })}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((b) => (
                          <SelectItem key={b} value={b}>
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Semester <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={form.semester}
                      onValueChange={(v) => setForm({ ...form, semester: v })}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 8 }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1)}>
                            Semester {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of what's in this file..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                {!user && (
                  <p className="text-xs text-muted-foreground text-center">
                    You&apos;re submitting as a guest.{" "}
                    <a href="/handler/signin" className="text-primary hover:underline">
                      Sign in
                    </a>{" "}
                    to track your submissions.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Guidelines */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-1">Limited Storage</h4>
                    <p className="text-amber-700 dark:text-amber-300 text-xs">
                      We have limited storage space. Please only upload necessary files. Avoid duplicates or low-quality scans. Compress images before uploading.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Use Your Own Google Drive</h4>
                <p className="text-muted-foreground">
                  Upload your study materials to your own Google Drive and paste the share link here. Make sure the file is publicly accessible.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Link Requirements</h4>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Must be a Google Drive link you own, OR upload a file directly</li>
                  <li>Google Drive: file must be publicly viewable (anyone with link can view)</li>
                  <li>Accepted formats: PDF, DOCX</li>
                  <li>Maximum file size: 25MB for direct upload, 100MB for Google Drive</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">What Happens Next?</h4>
                <p className="text-muted-foreground">
                  Admins will review your submission. Approved links are added to the resource library for everyone.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
