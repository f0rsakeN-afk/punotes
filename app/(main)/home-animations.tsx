"use client";

import { motion, type Transition } from "motion/react";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut", delay } as Transition,
});

export default function HomeHero() {
  return (
    <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
      {/* Live badge */}
      <motion.div
        {...fade(0)}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold mb-8 tracking-wide uppercase"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
        </span>
        Updated regularly
      </motion.div>

      {/* Headline */}
      <motion.h1
        {...fade(0.08)}
        className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.08]"
      >
        Purbanchal University
        <br />
        <span className="bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
          Notes &amp; Resources
        </span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        {...fade(0.16)}
        className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
      >
        Access comprehensive study materials, syllabus, past question papers,
        and lab reports organized by branch and semester.
      </motion.p>

      {/* CTAs */}
      <motion.div
        {...fade(0.24)}
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <Link href="/pdfs">
          <Button
            size="lg"
            className="rounded-full px-7 h-11 text-sm font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 transition-all duration-200 group"
          >
            Browse Notes
            <ArrowUpRight className="h-4 w-4 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>
        </Link>
        <Link href="/about">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-7 h-11 text-sm font-medium"
          >
            <CirclePlay className="h-4 w-4 mr-1.5" />
            Learn More
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
