"use client";

import { ArrowUpRight, FileSearch, BookMarked, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const quickLinks = [
  { icon: BookMarked, label: "Notes", href: "/pdfs", desc: "8 semesters" },
  { icon: ScrollText, label: "Syllabus", href: "/syllabus", desc: "All branches" },
  { icon: FileSearch, label: "Past Questions", href: "/pyqs", desc: "PYQs" },
];

const floatingZs = [
  { className: "z-1", top: "10%", left: "5%" },
  { className: "z-2", top: "20%", right: "8%" },
  { className: "z-3", top: "60%", left: "3%" },
  { className: "z-4", top: "70%", right: "5%" },
];

const WELCOME_KEY = "punotes_welcome_shown";

export default function HomeHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasSeenWelcome = localStorage.getItem(WELCOME_KEY);
    if (!hasSeenWelcome) {
      setTimeout(() => {
        toast(
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg">📚</span>
            </div>
            <div>
              <p className="font-medium text-sm">PuNotes needs you!</p>
              <p className="text-xs text-muted-foreground">Have notes to share? Help other students!</p>
            </div>
          </div>,
          {
            duration: 8000,
            position: "bottom-right",
          }
        );
        localStorage.setItem(WELCOME_KEY, "true");
      }, 3000);
    }
  }, []);

  return (
    <div className="relative z-10">
      {/* Floating Z decorations */}
      <style>{`
        @keyframes swayUpToRight {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.15;
          }
          80% {
            opacity: 0.08;
          }
          100% {
            transform: translate(60px, -80px) rotate(25deg);
            opacity: 0;
          }
        }
        .z-float {
          position: absolute;
          font-size: 24px;
          font-weight: 700;
          color: var(--primary);
          opacity: 0;
          pointer-events: none;
          user-select: none;
        }
        .z-float-1 { animation: swayUpToRight 3s ease-out infinite; }
        .z-float-2 { animation: swayUpToRight 3s ease-out 0.6s infinite; }
        .z-float-3 { animation: swayUpToRight 3s ease-out 1.2s infinite; }
        .z-float-4 { animation: swayUpToRight 3s ease-out 1.8s infinite; }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none pt-16">
        {floatingZs.map((z, i) => (
          <span
            key={i}
            className={`z-float z-float-${i + 1}`}
            style={{
              top: z.top,
              left: z.left,
              right: z.right,
            }}
          >
            Z
          </span>
        ))}
      </div>

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto px-2 sm:px-4 py-12 sm:py-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-500 text-xs font-medium mb-8 animate-in fade-in duration-300">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
          </span>
          Community Maintained
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-6xl font-bold tracking-tight text-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-400 delay-75">
          Your academic companion for{" "}
          <span className="text-primary">Purbanchal University</span>
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-4 duration-400 delay-150">
          Access free notes, syllabus, and past year questions — organized by branch and semester. No fees, no hassle.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-400 delay-225">
          <Link href="/pdfs">
            <Button size="lg" className="rounded-lg px-6 h-11 text-sm font-medium shadow-sm">
              Browse Notes
              <ArrowUpRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg" className="rounded-lg px-6 h-11 text-sm font-medium">
              About PuNotes
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-400 delay-300">
          <span className="text-xs text-muted-foreground mr-1">Quick access:</span>
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button variant="secondary" size="sm" className="h-7 text-xs gap-1.5 rounded-full">
                <link.icon className="w-3 h-3" />
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
