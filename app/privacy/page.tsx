import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy policy for PuNotes.",
};

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <div className="prose dark:prose-invert max-w-none space-y-6 text-muted-foreground">
                <p>
                    Your privacy is important to us. It is PuNotes' policy to respect your privacy regarding any information we may collect from you across our website.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
                <p>
                    We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. How We Use Information</h2>
                <p>
                    We retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Sharing of Information</h2>
                <p>
                    We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Third Parties</h2>
                <p>
                    Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
                </p>

                <p className="text-sm mt-12 pt-8 border-t border-border">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
