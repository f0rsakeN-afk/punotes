"use client";

import Features from "@/components/home/Features";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export default function Home() {
  const router = useRouter();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PuNotes",
    url: "https://punotes.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://punotes.vercel.app/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative min-h-100dvh flex items-center justify-center px-6 overflow-hidden">
        {/* Background Watermark */}
        <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[15vw] font-black text-slate-900/[0.05] dark:text-white/[0.05] whitespace-nowrap select-none uppercase tracking-tighter transform -rotate-12">
            PU NOTES
          </span>
        </div>

        <AnimatedGridPattern
          numSquares={70}
          maxOpacity={0.1}
          duration={3}
          className={cn(
            "mask-[radial-gradient(900px_circle_at_center,white,transparent)]",
            "inset-x-0 h-full skew-y-6"
          )}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center max-w-5xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Updated Regularly
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]"
          >
            Purbanchal University
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 text-transparent bg-clip-text">
              Notes & Resources
            </span>
          </motion.h1>

          <Highlighter action="box" color="#E7405C">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
            >
              Access comprehensive study materials, syllabus, past question
              papers, and lab reports—all organized and maintained for fast,
              easy access.
            </motion.p>
          </Highlighter>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="rounded-full text-base cursor-pointer px-8 py-6 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 backdrop-blur-sm group"
              onClick={() => router.push("/pdfs")}
            >
              Browse Notes
              <ArrowUpRight className="h-5 w-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base cursor-pointer px-8 py-6 backdrop-blur-sm bg-white/50 dark:bg-slate-900/50 hover:bg-white/80 dark:hover:bg-slate-900/80 transition-all duration-300"
              onClick={() => router.push("/about")}
            >
              <CirclePlay className="h-5 w-5 mr-2" />
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>
      <Features />
    </div>
  );
}
