"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { setAdviceCookie } from "@/lib/advice-cookie";
import {
  TrendingDown,
  BrainCircuit,
  Layers,
  Cpu,
  BookOpen,
  Terminal,
  MessageSquare,
  Globe,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ITEMS = [
  {
    icon: TrendingDown,
    accent: "border-red-500",
    color: "text-red-400",
    title: "AI is killing mid-level jobs. Fast.",
    body: "Mass layoffs aren't coming — they're already here. Engineers who just execute tasks are being replaced. The ones who understand how systems work, how to scale and debug them at 3am in prod? Those stay. Be that person.",
  },
  {
    icon: BrainCircuit,
    accent: "border-violet-500",
    color: "text-violet-400",
    title: "Deep knowledge is your only moat.",
    body: "AI can write code. But when it breaks at scale, leaks memory, or crashes under real load — who fixes it? The person who actually understands what's happening under the hood. Not the one who just prompted through it.",
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
    title: "Fewer jobs, same work — be the 1 in 5.",
    body: "Frontend devs, UX designers, backend engineers — still needed. But 1 person with AI now does what 4-5 used to. The question is: are you going to be that 1 person, or one of the 4 who got cut?",
  },
  {
    icon: BookOpen,
    accent: "border-amber-500",
    color: "text-amber-400",
    title: "Clear your fundamentals. Cold.",
    body: "DSA, networking, OS, DB internals — not just to crack interviews, but because frameworks come and go. The engineer who understands two layers down builds things that actually hold. Fundamentals don't expire.",
  },
  {
    icon: Terminal,
    accent: "border-orange-500",
    color: "text-orange-400",
    title: "Switch to Linux. Seriously.",
    body: "Windows hides how everything works. Linux forces you to configure it yourself — networking, permissions, processes, the file system. When things break, you fix them. That's how you actually learn systems. Use it daily and you'll understand more in 3 months than 3 years of theory.",
  },
  {
    icon: MessageSquare,
    accent: "border-emerald-500",
    color: "text-emerald-400",
    title: "Soft skills aren't optional anymore.",
    body: "Pitching an idea, explaining a tech decision to a non-technical stakeholder, writing clearly, running a room — that's what separates mid from senior. Learn to communicate. It's a skill, not a personality trait.",
  },
  {
    icon: Globe,
    accent: "border-green-500",
    color: "text-green-400",
    title: "Build in public. Now. Not when you're ready.",
    body: "Push to GitHub. Post on X, Reddit, LinkedIn. A shipped side project matters 10x more than a GPA. People who show their work get opportunities they never applied for. It's never going to be perfect — ship it anyway.",
  },
  {
    icon: Users,
    accent: "border-yellow-500",
    color: "text-yellow-400",
    title: "Community will carry you further than any degree.",
    body: "DM people. Comment on posts. Contribute to open source. Build connections while you're still a student — you have nothing to lose. End of day, opportunities come from people, not job boards.",
  },
] as const;

export default function AdviceClient() {
  const router = useRouter();

  const handleDone = () => {
    setAdviceCookie();
    router.push("/");
  };

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-muted/60 px-2.5 py-1 rounded-md text-[10px] font-semibold border border-border/50 text-muted-foreground tracking-widest uppercase">
            Comp. Engineering
          </span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          Wake Up. The Game Changed.
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-xl">
          For students who actually want to build a real career. Read this once
          every few days — not because it changes, but because you need the
          reminder.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5 flex-1">
        {ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i + 0.15 }}
            className={`border-l-2 ${item.accent} pl-4 py-1`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <h3 className="font-semibold text-[13px] leading-tight text-foreground">
                {item.title}
              </h3>
              <item.icon className={`w-3.5 h-3.5 shrink-0 ${item.color} opacity-50`} />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <p className="text-xs text-muted-foreground/60 max-w-md">
          Course knowledge alone won't cut it. Learn skills. Build things. Show
          up in public.{" "}
          <span className="text-foreground/50 font-semibold">
            Find what interests you — go deep on it.
          </span>
        </p>
        <Button
          onClick={handleDone}
          className="rounded-full px-10 bg-foreground text-background hover:bg-foreground/90 shrink-0"
        >
          Got it, let me in
        </Button>
      </motion.div>
    </div>
  );
}
