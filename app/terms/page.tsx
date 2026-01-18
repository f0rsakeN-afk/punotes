import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Terms and conditions for using PuNotes.",
};

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <div className="prose dark:prose-invert max-w-none space-y-6 text-muted-foreground">
                <p>
                    Welcome to PuNotes. By accessing or using our website, you agree to be bound by these Terms of Service.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
                <p>
                    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Use License</h2>
                <p>
                    Permission is granted to temporarily download one copy of the materials (information or software) on PuNotes' website for personal, non-commercial transitory viewing only.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Disclaimer</h2>
                <p>
                    The materials on PuNotes' website are provided on an 'as is' basis. PuNotes makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Limitations</h2>
                <p>
                    In no event shall PuNotes or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PuNotes' website.
                </p>

                <p className="text-sm mt-12 pt-8 border-t border-border">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
