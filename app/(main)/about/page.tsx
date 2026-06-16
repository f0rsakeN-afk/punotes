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
    "f0rsaken-afk",
    "naresh rajbanshi",
  ],
  authors: [{ name: "f0rsaken-afk" }],
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

export default async function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "f0rsaken-afk",
            url: "https://punotes.vercel.app/about",
            image: "https://avatars.githubusercontent.com/u/125626718?v=4",
            sameAs: [
              "https://github.com/f0rsaken-afk",
            ],
            description: "Computer Engineering Student at Purbanchal University, Nepal. Creator of PuNotes.",
            affiliation: {
              "@type": "Organization",
              name: "Purbanchal University",
            },
          }),
        }}
      />
      <AboutPage />
    </>
  );
}
