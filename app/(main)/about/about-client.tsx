"use client";

import {
  GraduationCap,
  Users,
  Globe,
  Heart,
  Loader2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { useGetStats } from "@/services/stats";

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

function FileText(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}

function BookOpen(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function StatSkeleton() {
  return (
    <div className="text-center animate-pulse">
      <div className="w-5 h-5 mx-auto mb-3 text-primary">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
      <div className="h-8 bg-muted rounded w-16 mx-auto mb-1" />
      <div className="h-4 bg-muted rounded w-20 mx-auto" />
    </div>
  );
}

export default function AboutPage() {
  const { data: stats, isLoading } = useGetStats();

  const statItems = [
    { label: "Active Students", value: stats?.userCount.toLocaleString() ?? "—", icon: Users },
    { label: "Notes Available", value: stats?.notesCount.toLocaleString() ?? "—", icon: FileText },
    { label: "Syllabus Files", value: stats?.syllabusCount.toLocaleString() ?? "—", icon: BookOpen },
    { label: "Past Questions", value: stats?.pyqCount.toLocaleString() ?? "—", icon: GraduationCap },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="py-12 px-2 sm:px-4">
        <div className="max-w-6xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
            <Heart className="w-3.5 h-3.5" />
            Built with purpose
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Empowering Students.
            <br />
            <span className="text-primary">Sharing Knowledge.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            A centralized hub for Purbanchal University notes, resources, and
            academic materials built by students, for students.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-2 sm:px-4 border rounded-sm border-border/50 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
              : statItems.map((stat, i) => (
                  <div key={stat.label} className="text-center animate-in fade-in slide-in-from-bottom-4 duration-300" style={{ animationDelay: `${i * 75}ms` }}>
                    <stat.icon className="w-5 h-5 mx-auto mb-3 text-primary" />
                    <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 px-2 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">
                Our Mission
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-foreground">
                Democratizing Education
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We believe that quality education resources should be accessible to everyone.
                PuNotes bridges the gap between students who have notes and students who need them,
                creating a collaborative learning environment where knowledge flows freely.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4 text-primary" />
                  <span>Open to all PU students</span>
                </div>
              </div>
            </div>

            {/* Mission visual */}
            <Card className="p-6 bg-linear-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Academic Excellence</p>
                    <p className="text-xs text-muted-foreground">Curated, verified content for every subject</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Community Driven</p>
                    <p className="text-xs text-muted-foreground">Students helping students succeed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Always Free</p>
                    <p className="text-xs text-muted-foreground">No paywalls, no hidden costs</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-2 sm:px-4 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
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
