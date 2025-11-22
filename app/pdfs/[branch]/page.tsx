"use client";
import { motion } from "motion/react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
    title: `Semester ${i + 1}`,
    subtitle:
      i < 2
        ? "Foundation"
        : i < 4
          ? "Core"
          : i < 6
            ? "Advanced"
            : "Specialization",
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
    <div className="max-w-(--breakpoint-xl) mx-auto py-10">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-4xl mx-auto mb-16"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
        >
          Academic Roadmap
        </motion.div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">
          {formattedBranch}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Explore the complete curriculum across all semesters. Select any
          semester to access syllabus documents, study materials, and resources.
        </p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-1 bg-linear-to-r from-transparent via-primary to-transparent max-w-md mx-auto mt-8 rounded-full"
        />
      </motion.header>

      <motion.main
        layout
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 "
      >
        {semesters.map((semester, index) => {
          const Icon = semesterIcons[index];
          return (
            <motion.article
              key={semester.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              role="button"
              aria-label={`Open ${semester.title}`}
              onClick={() =>
                router.push(
                  `/pdfs/${rawBranch}/${encodeURIComponent(`semester-${index + 1}`)}`,
                )
              }
              className="cursor-pointer group"
            >
              <Card className="relative overflow-hidden backdrop-blur-xl border hover:shadow-primary/10 transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.05),transparent)]" />

                <CardHeader className="relative z-10 p-6 flex flex-col items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="p-4 rounded-xl bg-linear-to-br from-primary/10 to-primary/5 text-primary group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 shadow-sm"
                  >
                    <Icon className="w-7 h-7" />
                  </motion.div>

                  <div className="flex-1 w-full">
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-primary transition-colors">
                      {semester.title}
                    </CardTitle>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                      {semester.subtitle}
                    </p>
                  </div>

                  <motion.div
                    initial={{ x: -5, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    className="absolute bottom-6 right-6 text-primary"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </CardHeader>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-primary/0 via-primary to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Card>
            </motion.article>
          );
        })}
      </motion.main>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-center mt-16 text-sm text-slate-500 dark:text-slate-400"
      >
        <p>Click on any semester card to view detailed course materials</p>
      </motion.div>
    </div>
  );
}
