import React from "react";
import type { Metadata } from "next";
import { Shield, FileText, AlertTriangle, Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using PuNotes.",
};

export default function TermsPage() {
  return (
    <div className="max-w-6xl mx-auto py-6 px-2 sm:px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
          <Scale className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. Use License</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Permission is granted to temporarily download one copy of the materials (information or software) on PuNotes&apos; website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. Disclaimer</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The materials on PuNotes&apos; website are provided on an &apos;as is&apos; basis. PuNotes makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. Limitations</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  In no event shall PuNotes or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PuNotes&apos; website.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. Revisions</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  PuNotes may revise these terms of service at any time without notice. By using this website, you agree to be bound by the current version of these terms and conditions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}