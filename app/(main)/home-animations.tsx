"use client";

import { motion } from "motion/react";

export default function HomeAnimations({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 text-center max-w-5xl"
    >
      {children}
    </motion.div>
  );
}
