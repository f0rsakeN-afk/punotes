"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Cpu, Building2, Network, Zap, Layers, Laptop, Database, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const branches = [
  "Computer Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics and Communication",
  "BCA",
  "BIT",
] as const;

type Branch = (typeof branches)[number];
type Category = "All" | "Engineering" | "IT";

const category: Record<Branch, Exclude<Category, "All">> = {
  "Computer Engineering": "Engineering",
  "Civil Engineering": "Engineering",
  "Electrical Engineering": "Engineering",
  "Electronics and Communication": "Engineering",
  BCA: "IT",
  BIT: "IT",
};

const description: Record<Branch, string> = {
  "Computer Engineering": "Systems, architecture, AI, and software engineering.",
  "Civil Engineering": "Infrastructure, bridges, and structural design.",
  "Electrical Engineering": "Power systems, circuits, and energy.",
  "Electronics and Communication": "Telecom, embedded systems, and IoT.",
  BCA: "Programming, apps, and real-world development.",
  BIT: "IT systems, networking, and enterprise solutions.",
};

const icon: Record<Branch, React.ElementType> = {
  "Computer Engineering": Cpu,
  "Civil Engineering": Building2,
  "Electrical Engineering": Zap,
  "Electronics and Communication": Network,
  BCA: Laptop,
  BIT: Database,
};

const filters: { label: Category; icon: React.ReactNode }[] = [
  { label: "All", icon: <Layers className="w-3.5 h-3.5" /> },
  { label: "Engineering", icon: <Zap className="w-3.5 h-3.5" /> },
  { label: "IT", icon: <Laptop className="w-3.5 h-3.5" /> },
];

export default function BranchesPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Category>("All");

  const filtered = useMemo(
    () =>
      branches.filter(
        (b) =>
          (active === "All" || category[b] === active) &&
          b.toLowerCase().includes(query.toLowerCase())
      ),
    [query, active]
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
          Explore Branches
        </h1>
        <p className="text-muted-foreground">
          Choose your department to access notes, syllabus, and past papers.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Filter pills */}
        <div className="flex items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.label}
              onClick={() => setActive(f.label)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 h-9 rounded-full text-sm font-medium border transition-all duration-150",
                active === f.label
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/40"
              )}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <Input
          placeholder="Search branches…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-9 sm:max-w-52"
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground text-sm">
          No branches match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((b, i) => {
            const Icon = icon[b];
            return (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04, ease: "easeOut" }}
              >
                <Link
                  href={`/pdfs/${encodeURIComponent(b)}`}
                  prefetch
                  className="group flex flex-col gap-4 p-5 rounded-xl border border-border/60 bg-background hover:border-border hover:shadow-md transition-all duration-150"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                      <Icon className="w-4.5 h-4.5" strokeWidth={1.75} />
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-[11px] font-medium"
                    >
                      {category[b]}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-150">
                      {b}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {description[b]}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors mt-auto">
                    Select semester
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
