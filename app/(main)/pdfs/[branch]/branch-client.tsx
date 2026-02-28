"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const subtitles = [
  "Foundation",
  "Foundation",
  "Core",
  "Core",
  "Advanced",
  "Advanced",
  "Specialization",
  "Specialization",
];

export default function BranchPage() {
  const { branch } = useParams<{ branch: string }>();
  const decoded = decodeURIComponent(branch);
  const formatted = decoded
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const semesters = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          {formatted}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
          Select Semester
        </h1>
        <p className="text-muted-foreground text-sm">
          Pick your semester to access notes, past papers, and resources.
        </p>
      </div>

      {/* Semester grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {semesters.map((sem, i) => (
          <motion.div
            key={sem}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04, ease: "easeOut" }}
          >
            <Link
              href={`/pdfs/${branch}/${sem}`}
              className="group flex flex-col justify-between p-5 rounded-xl border border-border/60 bg-background hover:border-border hover:shadow-md hover:bg-muted/20 transition-all duration-150 aspect-square"
            >
              <span className="text-3xl font-black text-muted-foreground/20 group-hover:text-primary/20 transition-colors select-none leading-none">
                {String(sem).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  {subtitles[i]}
                </p>
                <div className="flex items-center gap-1 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  Semester {sem}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
