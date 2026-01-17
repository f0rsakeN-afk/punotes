"use client";

import { Card } from "@/components/ui/card";
import { Highlighter } from "../ui/highlighter";
import {
  Code2,
  Database,
  Lock,
  Wrench,
  Palette,
  Server,
  Shield,
  Boxes,
} from "lucide-react";

export default function TechStack() {
  const sections = [
    {
      title: "Frontend",
      icon: Palette,
      items: [
        "Next.js 16",
        "React 19",
        "Tailwind CSS 4",
        "Framer Motion (motion)",
        "Radix UI",
        "Lucide & Tabler Icons",
        "next-themes",
        "react-hook-form",
        "Zod validation",
      ],
    },
    {
      title: "Backend",
      icon: Server,
      items: [
        "Next.js Route Handlers",
        "Prisma ORM",
        "Prisma Accelerate",
        "PostgreSQL (Database)",
      ],
    },
    {
      title: "Authentication",
      icon: Shield,
      items: ["Stack Auth (@stackframe/stack)"],
    },
    {
      title: "Other Tools",
      icon: Wrench,
      items: [
        "dotenv",
        "clsx + class-variance-authority",
        "rough-notation",
        "TypeScript",
        "ESLint & Prettier",
        "Tailwind Merge",
      ],
    },
  ];

  return (
    <section className="w-full max-w-(--breakpoint-xl) mx-auto py-16 space-y-12">
      <div className="text-center space-y-4">
        <Highlighter action="box" color="#E7405C">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            Tech Stack
          </h2>
        </Highlighter>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Built with modern technologies for optimal performance and developer
          experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card
              key={section.title}
              className="relative overflow-hidden border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-[#1b1c1d] backdrop-blur-xl hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 group"
            >
              {/* Background Icon */}
              <div className="absolute -right-8 -bottom-8 opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none">
                <Icon className="w-48 h-48 text-slate-400 dark:text-slate-600" />
              </div>

              <div className="relative z-10 p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                    {section.title}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                      <span className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Card>
          );
        })}
      </div>
    </section>
  );
}
