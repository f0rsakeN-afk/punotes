"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Code2,
  Database,
  GlobeIcon,
  HelpCircle,
  LinkedinIcon,
  Palette,
  Server,
  Shield,
  Zap,
  Cpu,
  Settings2,
  Lock,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- Data Constants ---

const teamMembers = [
  {
    name: "Naresh Rajbanshi",
    title: "Founder & Lead Developer",
    imageUrl: "/naresh.jpeg",
    linkedin: "https://www.linkedin.com/in/f0rsaken/",
    portfolio: "https://nareshrajbanshi.com.np",
  },
];

const techStack = [
  {
    title: "Frontend",
    icon: Palette,
    items: ["Next.js 16", "React 19", "Tailwind 4", "Framer Motion"],
  },
  {
    title: "Backend",
    icon: Server,
    items: ["Route Handlers", "Prisma ORM", "PostgreSQL", "Edge Comp."],
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
    a: "PuNotes is a centralized, open-source platform for Purbanchal University engineering students to access and share high-quality study materials, notes, and past questions."
  },
  {
    q: "How can I contribute?",
    a: "We welcome contributions! You can share notes by contacting us, or if you're a developer, check out our GitHub repository to contribute code."
  },
  {
    q: "Is it free?",
    a: "Yes, PuNotes is and will always be 100% free for students. Our mission is accessible education for everyone."
  },
  {
    q: "Who manages the platform?",
    a: "The platform is maintained by a dedicated team of engineering students (Naresh, Pushkar, Rakesh, Nishant) passionate about open-source technology."
  }
];

// --- Components ---

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute inset-0 bg-[url('/globe.svg')] bg-center bg-no-repeat opacity-5 -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium rounded-full bg-background border shadow-sm">
              Our Mission
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
              Empowering Students.
              <br />
              Sharing Knowledge.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're building the digital infrastructure for Purbanchal University students.
              A centralized hub for notes, resources, and community collaboration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl font-bold">Meet the Builders</h2>
          <p className="text-muted-foreground">The students behind the code.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted mb-4">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Link href={member.linkedin} target="_blank" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors">
                    <LinkedinIcon className="w-5 h-5" />
                  </Link>
                  {member.portfolio && (
                    <Link href={member.portfolio} target="_blank" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors">
                      <GlobeIcon className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-sm text-primary font-medium">{member.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="py-24 px-6 bg-muted/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Built with Modern Tech</h2>
            <p className="text-muted-foreground">Engineered for speed, scale, and developer experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((stack, i) => (
              <motion.div
                key={stack.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 h-full hover:border-primary/50 transition-colors bg-background/50 backdrop-blur-sm">
                  <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit text-primary">
                    <stack.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold mb-3">{stack.title}</h3>
                  <ul className="space-y-2">
                    {stack.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
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

      {/* Infrastructure / Deployment */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Enterprise Grade Infrastructure</h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe in transparency. PuNotes runs on a highly optimized, auto-scaling infrastructure ensuring 99.9% uptime for students during critical exam periods.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-card border shadow-sm">
                <div className="flex items-center gap-3 mb-2 text-primary">
                  <Cpu className="w-5 h-5" />
                  <span className="font-semibold">Compute</span>
                </div>
                <p className="text-sm text-muted-foreground">Auto-scaling Serverless Functions (AWS/Vercel)</p>
              </div>
              <div className="p-4 rounded-xl bg-card border shadow-sm">
                <div className="flex items-center gap-3 mb-2 text-primary">
                  <Database className="w-5 h-5" />
                  <span className="font-semibold">Storage</span>
                </div>
                <p className="text-sm text-muted-foreground">PostgreSQL with PgBouncer Pooling</p>
              </div>
            </div>
          </div>

          <Card className="p-8 bg-black text-white relative overflow-hidden border-zinc-800">
            <div className="absolute top-0 right-0 p-32 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-sm text-zinc-400">Region</span>
                <span className="font-medium">asia-pacific-1 (Singapore)</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-sm text-zinc-400">Memory</span>
                <span className="font-medium">Up to 8GB (Auto)</span>
              </div>
              <div className="flex items-center justify-between pb-2">
                <span className="font-mono text-sm text-zinc-400">CDN</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-medium">Active (Edge)</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Common Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b-border/50">
                <AccordionTrigger className="text-left font-medium text-lg hover:text-primary transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
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
