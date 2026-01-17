"use client";

import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  Building2,
  Network,
  Zap,
  Layers,
  Laptop,
  Database,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

const BranchEnum = [
  "Computer Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics and Communication",
  "BCA",
  "BIT",
] as const;

type Branch = (typeof BranchEnum)[number];
type Category = "Engineering" | "IT" | "All";

const branchCategory: Record<Branch, Category> = {
  "Computer Engineering": "Engineering",
  "Civil Engineering": "Engineering",
  "Electrical Engineering": "Engineering",
  "Electronics and Communication": "Engineering",
  BCA: "IT",
  BIT: "IT",
};

const descriptions: Record<Branch, string> = {
  "Computer Engineering":
    "Systems, architecture, AI, and cutting-edge software engineering.",
  "Civil Engineering":
    "Infrastructure, bridges, buildings, and massive structures.",
  "Electrical Engineering":
    "Power, machines, circuits, and energy systems.",
  "Electronics and Communication":
    "Telecom, embedded tech, chip design, and IoT.",
  BCA: "Programming, apps, and real-world development.",
  BIT: "IT systems, networking, cloud, and enterprise solutions.",
};

const icons: Record<Category, React.ReactNode> = {
  Engineering: <Zap className="w-4 h-4" />,
  IT: <Laptop className="w-4 h-4" />,
  All: <Layers className="w-4 h-4" />,
};

const branchIcons: Record<Branch, React.ElementType> = {
  "Computer Engineering": Cpu,
  "Civil Engineering": Building2,
  "Electrical Engineering": Zap,
  "Electronics and Communication": Network,
  BCA: Laptop,
  BIT: Database,
};

export default function BranchesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const itemsPerPage = 50;

  const filteredBranches = useMemo(() => {
    return BranchEnum.filter((b) => {
      const matchesQuery = b.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        category === "All" || branchCategory[b] === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const branches = useMemo(() => {
    setCurrentPage(1);
    return filteredBranches;
  }, [filteredBranches]);

  const totalPages = Math.ceil(branches.length / itemsPerPage);
  const paginatedBranches = branches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-(--breakpoint-xl) mx-auto py-12 px-4 sm:px-6 relative min-h-screen">
      {/* Background Watermark */}
      <div className="fixed inset-0 z-[-1] flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[12vw] font-black text-slate-900/5 dark:text-white/5 whitespace-nowrap select-none uppercase tracking-tighter transform -rotate-12">
          Departments
        </span>
      </div>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-4xl mx-auto mb-20"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium mb-6 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Department Selection
        </motion.div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
          Explore Branches
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mb-12">
          Choose your department to access comprehensive study materials and
          resources.
        </p>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex justify-center gap-3 mb-8 flex-wrap"
        >
          {(["All", "Engineering", "IT"] as Category[]).map((cat) => {
            const icon = icons[cat];
            const active = category === cat;
            return (
              <motion.div whileTap={{ scale: 0.95 }} key={cat}>
                <Button
                  variant={active ? "default" : "outline"}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2 transition-all backdrop-blur-sm",
                    active && "shadow-lg shadow-primary/20"
                  )}
                  onClick={() => setCategory(cat)}
                >
                  {icon} {cat}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="max-w-xl mx-auto"
        >
          <Input
            placeholder="Search branches..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800"
          />
        </motion.div>
      </motion.header>

      <motion.main
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {paginatedBranches.map((b, index) => {
          const Icon = branchIcons[b];
          return (
            <motion.div
              key={b}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              onClick={() => router.push(`/pdfs/${encodeURIComponent(b)}`)}
              className="group cursor-pointer"
            >
              <Card className="relative h-full overflow-hidden border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-[#1b1c1d] backdrop-blur-xl hover:border-primary/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/5">
                {/* Large Background Icon */}
                <div className="absolute -right-8 -bottom-8 opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none">
                  <Icon className="w-48 h-48 text-slate-400 dark:text-slate-600" />
                </div>

                <div className="relative z-10 p-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <motion.div
                      initial={{ x: -10, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      className="text-primary/50 group-hover:text-primary transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>

                  <div className="mt-auto">
                    <Badge className="mb-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
                      {branchCategory[b]}
                    </Badge>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-300">
                      {b}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {descriptions[b]}
                    </p>
                  </div>
                </div>

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Card>
            </motion.div>
          );
        })}
      </motion.main>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-3 mt-12 pb-8"
        >
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-6"
          >
            Previous
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className="w-10 h-10 p-0"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-6"
          >
            Next
          </Button>
        </motion.div>
      )}
    </div>
  );
}
