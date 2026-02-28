import Features from "@/components/home/Features";
import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import HomeAnimations from "./home-animations";

export const metadata: Metadata = {
  title: "PuNotes | Purbanchal University Notes, Syllabus & PYQs",
  description:
    "Your one-stop destination for Purbanchal University (PU) notes, syllabus, previous year questions (PYQs), and academic resources for all engineering branches and semesters. Download PDFs for free.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "PuNotes | Free Notes & Resources for PU Students",
    description:
      "Access comprehensive study materials, syllabus, and past questions for Purbanchal University — all free.",
    url: "https://punotes.vercel.app",
  },
};

export default function Home() {
  return (
    <div>
      <div className="relative min-h-dvh flex items-center justify-center px-6 overflow-hidden">
        {/* Background Watermark */}
        <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[15vw] font-black text-slate-900/[0.05] dark:text-white/[0.05] whitespace-nowrap select-none uppercase tracking-tighter transform -rotate-12">
            PU NOTES
          </span>
        </div>

        <HomeAnimations>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Updated Regularly
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]">
            Purbanchal University
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 text-transparent bg-clip-text">
              Notes &amp; Resources
            </span>
          </h1>

          <Highlighter action="box" color="#E7405C">
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Access comprehensive study materials, syllabus, past question
              papers, and lab reports—all organized and maintained for fast,
              easy access.
            </p>
          </Highlighter>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pdfs">
              <Button
                size="lg"
                className="rounded-full text-base cursor-pointer px-8 py-6 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 backdrop-blur-sm group"
              >
                Browse Notes
                <ArrowUpRight className="h-5 w-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full text-base cursor-pointer px-8 py-6 backdrop-blur-sm bg-white/50 dark:bg-slate-900/50 hover:bg-white/80 dark:hover:bg-slate-900/80 transition-all duration-300"
              >
                <CirclePlay className="h-5 w-5 mr-2" />
                Learn More
              </Button>
            </Link>
          </div>
        </HomeAnimations>
      </div>
      <Features />
    </div>
  );
}
