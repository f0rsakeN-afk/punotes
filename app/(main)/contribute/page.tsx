import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  FileText,
  BookOpen,
  HelpCircle,
  Shield,
  CheckCircle,
  Clock,
  Upload,
  AlertTriangle,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import UploadSyllabus from "@/components/upload/UploadSyllabus";
import UploadPYQ from "@/components/upload/UploadPYQ";
import UploadNotes from "@/components/upload/UploadNotes";
import { getStackUser, getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";

export default async function Page() {
  const user = await getStackUser();

  if (!user) {
    redirect("/");
  }

  const userData = await getCurrentUser();

  if (!userData) {
    redirect("/");
  }

  return (
    <>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
        </div>
        <PageHeader
          center
          title="Note Sharing Platform"
          description="Share and access verified academic materials with your university community"
        />
      </div>

      <div className="grid lg:grid-cols-5 gap-6 min-w-0 w-full">
        {/* Guidelines */}
        <div className="lg:col-span-3 min-w-0">
          <Card className="h-full min-w-0 overflow-hidden">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <Alert variant="warning">
                <Shield className="h-5 w-5" />
                <AlertTitle className="ml-2 font-semibold">
                  Admin Approval Required
                </AlertTitle>
                <AlertDescription className="mt-2 text-sm">
                  All uploaded content goes through an admin verification process before being published. You&apos;ll receive a notification once your submission is reviewed.
                </AlertDescription>
              </Alert>

              <Alert>
                <HelpCircle className="h-5 w-5" />
                <AlertTitle className="ml-2 font-semibold">
                  Upload Guidelines
                </AlertTitle>
                <AlertDescription className="mt-4">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Exclusively for university students to share academic materials</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Authentication required for all uploads</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Upload only relevant academic content</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>
                        Accepted formats: <span className="font-semibold">PDF</span> and <span className="font-semibold">DOCX</span>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>
                        Convert images to <span className="font-semibold">PDF</span> before uploading
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>Maximum file size: <span className="font-semibold">25 MB</span> for direct upload, <span className="font-semibold">100 MB</span> via URL</span>
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>

              <Alert variant="warning">
                <AlertTriangle className="h-5 w-5" />
                <AlertTitle className="ml-2 font-semibold">
                  Limited Storage Space
                </AlertTitle>
                <AlertDescription className="mt-2 text-sm">
                  We have limited storage space. Please upload only necessary files, avoid duplicates, and compress images before uploading. Help us keep the platform sustainable for everyone.
                </AlertDescription>
              </Alert>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Average approval time: 24-48 hours</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Options */}
        <div className="lg:col-span-2 min-w-0">
          <Card className="h-full min-w-0 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Choose Upload Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 cursor-pointer">
                    <BookOpen data-icon="inline-start" className="h-5 w-5 text-primary" />
                    <span className="font-medium">Upload Syllabus</span>
                  </Button>
                </DialogTrigger>
                <DialogContent aria-describedby={undefined}>
                  <DialogTitle className="sr-only">Upload Syllabus</DialogTitle>
                  <UploadSyllabus />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 cursor-pointer">
                    <FileText data-icon="inline-start" className="h-5 w-5 text-primary" />
                    <span className="font-medium">Upload Notes</span>
                  </Button>
                </DialogTrigger>
                <DialogContent aria-describedby={undefined}>
                  <DialogTitle className="sr-only">Upload Notes</DialogTitle>
                  <UploadNotes />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 cursor-pointer">
                    <HelpCircle data-icon="inline-start" className="h-5 w-5 text-primary" />
                    <span className="font-medium">Upload Past Questions</span>
                  </Button>
                </DialogTrigger>
                <DialogContent aria-describedby={undefined}>
                  <DialogTitle className="sr-only">Upload Past Questions</DialogTitle>
                  <UploadPYQ />
                </DialogContent>
              </Dialog>
          </CardContent>
        </Card>
        </div>
      </div>
    </>
  );
}
