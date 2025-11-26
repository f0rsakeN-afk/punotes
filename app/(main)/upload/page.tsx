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
} from "lucide-react";
import Image from "next/image";
import { Highlighter } from "@/components/ui/highlighter";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UploadSyllabus from "@/components/upload/UploadSyllabus";
import UploadPYQ from "@/components/upload/UploadPYQ";
import UploadNotes from "@/components/upload/UploadNotes";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function Page() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/");
  }

  const userData = await prisma.user.findUnique({
    where: {
      stackID: user.id,
    },
  });

  if (!userData || userData.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className=" bg-linear-to-br from-background via-muted/30 to-muted/50 flex items-center justify-center">
      <div className="w-full max-w-(--breakpoint-xl) mx-auto pb-10">
        <div className="text-center space-y-4 pb-5">
          <div className="flex items-center justify-center mb-5">
            <Image
              src={"/logo.webp"}
              height={200}
              width={200}
              className="dark:invert"
              alt="punotes logo"
            />
          </div>
          <Highlighter action="underline" color="#E7405C">
            <h1 className="text-4xl xl:text-5xl font-bold text-primary">
              Note Sharing Platform
            </h1>
          </Highlighter>
          <p className="text-muted-foreground xl:text-lg max-w-2xl mx-auto">
            Share and access verified academic materials with your university
            community
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <Card className="border shadow-lg h-full">
              <CardContent className=" xl:p-8 space-y-6">
                <Alert className="border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-950">
                  <Shield className="h-5 w-5 text-amber-600" />
                  <AlertTitle className="ml-2 font-semibold">
                    Admin Approval Required
                  </AlertTitle>
                  <AlertDescription className="mt-3 text-sm">
                    All uploaded content goes through an admin verification
                    process before being published. You'll receive a
                    notification once your submission is reviewed.
                  </AlertDescription>
                </Alert>

                <Alert className="border-l-4 border-l-primary">
                  <HelpCircle className="h-5 w-5" />
                  <AlertTitle className="ml-2 font-semibold">
                    Upload Guidelines
                  </AlertTitle>
                  <AlertDescription className="mt-4">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>
                          Exclusively for university students to share academic
                          materials
                        </span>
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
                          Accepted formats:{" "}
                          <Highlighter action="underline" color="#E7405C">
                            <span className="font-semibold">PDF</span>
                          </Highlighter>
                          &nbsp; and &nbsp;
                          <Highlighter action="underline" color="#E7405C">
                            <span className="font-semibold">DOCX</span>
                          </Highlighter>
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>
                          Convert &nbsp;&nbsp;
                          <Highlighter action="box" padding={1} color="#E7405C">
                            <span className="font-semibold">images to PDF</span>
                          </Highlighter>
                          &nbsp;&nbsp;before uploading
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>
                          Maximum file size:{" "}
                          <span className="font-semibold">100 MB</span>
                        </span>
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                  <Clock className="h-4 w-4" />
                  <span>Average approval time: 24-48 hours</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="border shadow-lg h-full">
              <CardHeader>
                <CardTitle className="text-xl">Choose Upload Type</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-start gap-3 h-auto py-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
                      <BookOpen className="h-5 w-5" />
                      <span className="font-medium">Upload Syllabus</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <UploadSyllabus />
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-start gap-3 h-auto py-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
                      <FileText className="h-5 w-5" />
                      <span className="font-medium">Upload Notes</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <UploadNotes />
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-start gap-3 h-auto py-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
                      <HelpCircle className="h-5 w-5" />
                      <span className="font-medium">Upload Past Questions</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <UploadPYQ />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
