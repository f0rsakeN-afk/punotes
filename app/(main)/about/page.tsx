import { Metadata } from "next";
import AboutPage from "./about-client";

export const metadata: Metadata = {
  title: "About | PuNotes – Free Academic Platform for PU Students",
  description:
    "Learn about PuNotes — the open-source academic platform built by Purbanchal University students. Meet the team, explore the tech stack, and understand our mission of free education.",
  keywords: [
    "PuNotes About",
    "Purbanchal University Academic Platform",
    "PU Student Project",
    "Free Education Nepal",
    "Open Source Notes Platform",
    "Engineering Notes Nepal",
    "Academic Resource Sharing Nepal",
    "PuNotes Team",
    "PU Student Initiative",
    "Study Materials Nepal",
  ],
  authors: [{ name: "PuNotes Team" }],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About PuNotes",
    description:
      "Built by PU students, for PU students. Our mission is free, accessible education for everyone.",
    url: "https://punotes.vercel.app/about",
    siteName: "PuNotes",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About PuNotes",
    description:
      "Free academic resources for Purbanchal University students — built by students, for students.",
  },
  robots: { index: true, follow: true },
};

export default function About() {
  return <AboutPage />;
}
