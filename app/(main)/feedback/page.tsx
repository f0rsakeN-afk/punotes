import { Metadata } from "next";
import FeedbackPage from "./feedback-client";

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Share your suggestions, report issues, or send us your thoughts. Help us improve PuNotes for the entire Purbanchal University student community.",
  alternates: { canonical: "/feedback" },
  openGraph: {
    title: "Share Feedback | PuNotes",
    description:
      "Your feedback helps us improve. Tell us what you think about PuNotes.",
    url: "https://punotes.vercel.app/feedback",
    type: "website",
  },
  robots: { index: false, follow: true },
};

export default function Feedback() {
  return <FeedbackPage />;
}
