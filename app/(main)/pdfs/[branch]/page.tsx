"use client";
import { motion } from "motion/react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  ArrowRight,
  Star,
  GraduationCap,
  FileText,
  Award,
  TrendingUp,
} from "lucide-react";

export default function Page() {
  const router = useRouter();
  const params = useParams<{ branch: string }>();
  const rawBranch = params.branch;
  const decoded = decodeURIComponent(rawBranch);
  const formattedBranch = decoded
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const semesters = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Semester ${i + 1}`,
    subtitle:
      i < 2
        ? "Foundation"
        : i < 4
          ? "Core"
          : i < 6
            ? "Advanced"
            : "Specialization",
    description: "Access syllabus, notes, and resources",
  }));

  const semesterIcons = [
    BookOpen,
    Calendar,
    Star,
    GraduationCap,
    FileText,
    Award,
    TrendingUp,
    GraduationCap,
  ];

  return (
    <div className="max-w-(--breakpoint-xl) mx-auto py-12 px-4 sm:px-6 relative min-h-screen">
      {/* Background Watermark */}
      <div className="fixed inset-0 z-[-1] flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[12vw] font-black text-slate-900/5 dark:text-white/5 whitespace-nowrap select-none uppercase tracking-tighter transform -rotate-12">
          {formattedBranch}
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
          Academic Roadmap
        </motion.div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
          {formattedBranch}
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Select your current semester to access curated study materials,
          syllabus, and past questions.
        </p>
      </motion.header>

      <motion.main
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {semesters.map((semester, index) => {
          const Icon = semesterIcons[index];
          return (
            <motion.div
              key={semester.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              onClick={() =>
                router.push(
                  `/pdfs/${rawBranch}/${encodeURIComponent(`${index + 1}`)}`
                )
              }
              className="group cursor-pointer"
            >
              <Card className="relative h-full overflow-hidden border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl hover:border-primary/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/5">
                {/* Large Background Number */}
                <div className="absolute -right-4 -top-8 text-[120px] font-bold text-slate-100 dark:text-slate-800/50 opacity-50 group-hover:opacity-100 group-hover:text-primary/5 transition-all duration-500 select-none pointer-events-none">
                  {String(semester.id).padStart(2, "0")}
                </div>

                <div className="relative z-10 p-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
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
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
                      {semester.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                      Semester {semester.id}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                      {semester.description}
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
    </div>
  );
}
