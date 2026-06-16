import React from "react";
import type { Metadata } from "next";
import { Shield, Lock, Eye, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for PuNotes.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-6xl mx-auto py-6 px-2 sm:px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
          Privacy Policy
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
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we&apos;re collecting it and how it will be used.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Information</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We retain collected information for as long as necessary to provide you with your requested service. What data we store, we&apos;ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. Sharing of Information</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We don&apos;t share any personally identifying information publicly or with third-parties, except when required to by law. Your data is kept confidential and is only used to improve your experience on PuNotes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. Third Parties</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. Data Security</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}