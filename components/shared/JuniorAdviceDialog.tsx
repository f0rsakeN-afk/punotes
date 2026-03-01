"use client";

import { useEffect, useState } from "react";
import {
  TrendingDown,
  BrainCircuit,
  Layers,
  Cpu,
  BookOpen,
  MessageSquare,
  Globe,
  Users,
  Terminal,
} from "lucide-react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;
const STORAGE_KEY = "junior-advice-last-seen";

const ITEMS = [
  {
    icon: TrendingDown,
    accent: "border-red-500",
    color: "text-red-400",
    title: "AI is killing mid-level jobs. Fast.",
    body: "Mass layoffs aren't coming  they're already here. Engineers who just execute tasks are being replaced. The ones who understand how systems work, how to scale and debug them at 3am in prod? Those stay. Be that person.",
  },
  {
    icon: BrainCircuit,
    accent: "border-violet-500",
    color: "text-violet-400",
    title: "Deep knowledge is your only moat.",
    body: "AI can write code. But when it breaks at scale, leaks memory, or crashes under real load  who fixes it? The person who actually understands what's happening under the hood. Not the one who just prompted through it.",
  },
  {
    icon: Layers,
    accent: "border-sky-500",
    color: "text-sky-400",
    title: "Don't lock yourself to one stack.",
    body: "The dev who built this site does frontend with Next.js and TS. Also runs Fastify, Node, Express, handles MongoDB and Postgres with Prisma, deploys with Docker, proxies with Nginx, monitors with Grafana. Not a flex. That's just what makes you the person no one wants to lose. Build breadth alongside depth.",
  },
  {
    icon: Cpu,
    accent: "border-blue-500",
    color: "text-blue-400",
    title: "Fewer jobs, same work  be the 1 in 5.",
    body: "Frontend devs, UX designers, backend engineers  still needed. But 1 person with AI now does what 4-5 used to. The question is: are you going to be that 1 person, or one of the 4 who got cut?",
  },
  {
    icon: BookOpen,
    accent: "border-amber-500",
    color: "text-amber-400",
    title: "Clear your fundamentals. Cold.",
    body: "DSA, networking, OS, DB internals  not just to crack interviews, but because frameworks come and go. The engineer who understands two layers down builds things that actually hold. Fundamentals don't expire.",
  },
  {
    icon: Terminal,
    accent: "border-orange-500",
    color: "text-orange-400",
    title: "Switch to Linux. Seriously.",
    body: "Windows hides how everything works. Linux forces you to configure it yourself networking, permissions, processes, the file system. When things break, you fix them. That's how you actually learn systems. Use it daily and you'll understand more in 3 months than 3 years of theory.",
  },
  {
    icon: MessageSquare,
    accent: "border-emerald-500",
    color: "text-emerald-400",
    title: "Soft skills aren't optional anymore.",
    body: "Pitching an idea, explaining a tech decision to a non-technical stakeholder, writing clearly, running a room  that's what separates mid from senior. Learn to communicate. It's a skill, not a personality trait.",
  },
  {
    icon: Globe,
    accent: "border-green-500",
    color: "text-green-400",
    title: "Build in public. Now. Not when you're ready.",
    body: "Push to GitHub. Post on X, Reddit, LinkedIn. A shipped side project matters 10x more than a GPA. People who show their work get opportunities they never applied for. It's never going to be perfect  ship it anyway.",
  },
  {
    icon: Users,
    accent: "border-yellow-500",
    color: "text-yellow-400",
    title: "Community will carry you further than any degree.",
    body: "DM people. Comment on posts. Contribute to open source. Build connections while you're still a student  you have nothing to lose. End of day, opportunities come from people, not job boards.",
  },
] as const;

export function JuniorAdviceDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const lastSeen = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (!lastSeen || now - parseInt(lastSeen) > THREE_DAYS) {
      const timer = setTimeout(() => setIsOpen(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setIsOpen(false);
  };

  if (!hasMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
          <DialogContent className="sm:max-w-3xl border-border/40 bg-background/98 backdrop-blur-xl shadow-2xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto overscroll-contain">
            {/* Header */}
            <div className="relative bg-muted/30 border-b border-border/30 px-6 py-5">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-500/6 to-transparent" />
              <div className="flex items-start justify-between relative">
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <h2 className="text-lg font-black tracking-tight text-foreground">
                    Wake Up. The Game Changed.
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    For students who actually want to build a real career.
                  </p>
                </motion.div>
                <span className="shrink-0 ml-4 bg-muted/60 px-2.5 py-1 rounded-md text-[10px] font-semibold border border-border/50 text-muted-foreground tracking-widest uppercase">
                  Comp. Engineering
                </span>
              </div>
            </div>

            {/* Grid body */}
            <div className="p-5 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {ITEMS.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i + 0.2 }}
                    className={`border-l-2 ${item.accent} pl-3 py-1`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-[12.5px] leading-tight text-foreground">
                        {item.title}
                      </h4>
                      <item.icon
                        className={`w-3 h-3 shrink-0 ${item.color} opacity-60`}
                      />
                    </div>
                    <p className="text-[11.5px] text-muted-foreground leading-relaxed mt-1.5">
                      {item.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-border/30">
                <p className="text-[11px] text-muted-foreground/70 leading-relaxed text-center">
                  Course knowledge alone won't cut it. Learn skills. Build
                  things. Show up in public.{" "}
                  <span className="text-foreground/60 font-semibold">
                    Find what interests you and go deep on it.
                  </span>
                </p>
              </div>
            </div>

            {/* Footer */}
            <DialogFooter className="px-6 pb-5 pt-3 border-t border-border/20 flex-row gap-3 sm:justify-between items-center bg-muted/10">
              <p className="text-[11px] text-muted-foreground/50 italic">
                Shown every 3 days.
              </p>
              <Button
                onClick={handleClose}
                size="sm"
                className="rounded-full px-7 bg-foreground text-background hover:bg-foreground/90"
              >
                Got it
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
