"use client";

import { motion } from "motion/react";
import {
  Palette,
  Server,
  Shield,
  Wrench,
  Cpu,
  Database,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const techStack = [
  {
    title: "Frontend",
    icon: Palette,
    items: ["Next.js 15", "React 19", "Tailwind 4", "Motion"],
  },
  {
    title: "Backend",
    icon: Server,
    items: ["Route Handlers", "Prisma ORM", "PostgreSQL", "Edge Runtime"],
  },
  {
    title: "Security",
    icon: Shield,
    items: ["Stack Auth", "Zod Validation", "Middleware", "RBAC"],
  },
  {
    title: "DevOps",
    icon: Wrench,
    items: ["Docker", "Vercel", "Turbopack", "GitHub Actions"],
  },
];

const faqs = [
  {
    q: "What is PuNotes?",
    a: "PuNotes is a centralized platform for Purbanchal University engineering students to access and share high-quality study materials, notes, and past questions.",
  },
  {
    q: "How can I contribute?",
    a: "You can share notes by contacting us directly, or contribute code via our GitHub repository.",
  },
  {
    q: "Is it free?",
    a: "Yes — PuNotes is and will always be 100% free for students. Our mission is accessible education for everyone.",
  },
  {
    q: "Who manages the platform?",
    a: "The platform is maintained by engineering students passionate about open-source technology and accessible education.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-full"
            >
              Our Mission
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
              Empowering Students.
              <br />
              Sharing Knowledge.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              A centralized hub for Purbanchal University notes, resources, and
              academic materials — built by students, for students.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-6 border-y border-border/40 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Stack
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Built with modern tech
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((stack, i) => (
              <motion.div
                key={stack.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
              >
                <Card className="p-5 h-full hover:border-border transition-colors bg-background/60 backdrop-blur-sm">
                  <div className="mb-4 w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center text-primary">
                    <stack.icon className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-semibold text-sm mb-3">{stack.title}</h3>
                  <ul className="space-y-1.5">
                    {stack.items.map((item) => (
                      <li
                        key={item}
                        className="text-xs text-muted-foreground flex items-center gap-2"
                      >
                        <div className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Infrastructure
              </p>
              <h2 className="text-2xl font-bold tracking-tight mb-4">
                Reliable by design
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                PuNotes runs on auto-scaling, edge-optimized infrastructure —
                so notes load fast whether it's a quiet Tuesday or exam week.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-card border">
                  <div className="flex items-center gap-2 mb-1.5 text-primary">
                    <Cpu className="w-4 h-4" />
                    <span className="text-xs font-semibold">Compute</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Serverless Functions on Vercel Edge
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-card border">
                  <div className="flex items-center gap-2 mb-1.5 text-primary">
                    <Database className="w-4 h-4" />
                    <span className="text-xs font-semibold">Storage</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    PostgreSQL with connection pooling
                  </p>
                </div>
              </div>
            </div>

            {/* Terminal card */}
            <Card className="p-6 bg-zinc-950 text-white border-zinc-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/10 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none" />
              <div className="relative space-y-5 text-sm font-mono">
                <div className="flex items-center justify-between border-b border-white/8 pb-4">
                  <span className="text-zinc-500 text-xs">Region</span>
                  <span className="text-zinc-200">ap-southeast-1</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/8 pb-4">
                  <span className="text-zinc-500 text-xs">Runtime</span>
                  <span className="text-zinc-200">Edge / Node 20</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-xs">Status</span>
                  <span className="flex items-center gap-2 text-zinc-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Operational
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 border-t border-border/40 bg-muted/20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              FAQ
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              Common questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium hover:text-primary transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
