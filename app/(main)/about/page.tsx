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
  authors: [{ name: "Naresh Rajbanshi", url: "https://nareshrajbanshi.com.np" }],
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
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Naresh Rajbanshi",
    alternateName: "f0rsaken-afk",
    url: "https://nareshrajbanshi.com.np",
    image: "https://avatars.githubusercontent.com/u/125626718?v=4",
    sameAs: [
      "https://github.com/f0rsaken-afk",
      "https://nareshrajbanshi.com.np",
    ],
    description:
      "Computer Engineering Student at Purbanchal University, Nepal. Creator of PuNotes.",
    affiliation: {
      "@type": "Organization",
      name: "Purbanchal University",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is PuNotes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PuNotes is a centralized platform for Purbanchal University engineering students to access and share high-quality study materials, notes, and past questions.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contribute?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Head to the share page to submit notes, syllabus, or past questions. Your contributions go live after admin review and help hundreds of PU students.",
        },
      },
      {
        "@type": "Question",
        name: "Is it free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — PuNotes is and will always be 100% free for students. Our mission is accessible education for everyone.",
        },
      },
      {
        "@type": "Question",
        name: "What file formats are accepted for uploads?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We accept PDF and DOCX files only. Please convert your files to PDF or DOCX format before uploading. Images should be converted to PDF first.",
        },
      },
      {
        "@type": "Question",
        name: "What is the maximum file size for uploads?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For direct file uploads, the maximum size is 25MB. For Google Drive links, you can share files up to 100MB.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take for my submission to be approved?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Submissions typically take 24-48 hours for review. Our admin team reviews all contributions to ensure quality.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AboutPage />
    </>
  );
}
