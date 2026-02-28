import { Metadata } from "next";
import AboutPage from "./about-client";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about PuNotes — the open-source academic platform built by Purbanchal University students. Meet the team, explore the tech stack, and understand our mission.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About PuNotes",
    description:
      "Built by PU students, for PU students. Our mission is free, accessible education for everyone.",
    url: "https://punotes.vercel.app/about",
  },
};

export default function About() {
  return <AboutPage />;
}
