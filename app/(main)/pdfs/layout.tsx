"use client";
import { Home } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function PDFLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="relative">
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/")}
        aria-label="Go Home"
        className="fixed bottom-8 right-8 z-50 px-3 py-3 cursor-pointer rounded-full bg-linear-to-r from-primary to-primary/80 text-white shadow-2xl hover:shadow-primary/50 transition-all flex items-center gap-2 font-medium"
      >
        <Home className="w-4 h-4" />
      </motion.button>

      <main>{children}</main>
    </div>
  );
}
