"use client";

import Image from "next/image";
import {
  GraduationCap,
  Users,
  Globe,
  Heart,
  Loader2,
} from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { useGetStats } from "@/services/stats";

const faqs = [
  {
    q: "What is PuNotes?",
    a: "PuNotes is a centralized platform for Purbanchal University engineering students to access and share high-quality study materials, notes, and past questions.",
  },
  {
    q: "How can I contribute?",
    a: "Head to /share to submit notes, syllabus, or past questions. Your contributions go live after admin review and help hundreds of PU students.",
  },
  {
    q: "Is it free?",
    a: "Yes — PuNotes is and will always be 100% free for students. Our mission is accessible education for everyone.",
  },
  {
    q: "Who manages the platform?",
    a: "The platform is maintained by engineering students passionate about open-source technology and accessible education.",
  },
  {
    q: "What file formats are accepted for uploads?",
    a: "We accept PDF and DOCX files only. Please convert your files to PDF or DOCX format before uploading. Images should be converted to PDF first.",
  },
  {
    q: "What is the maximum file size for uploads?",
    a: "For direct file uploads, the maximum size is 25MB. For Google Drive links, you can share files up to 100MB. Please compress large files or use Google Drive for bigger content.",
  },
  {
    q: "Why is there a storage limit warning?",
    a: "We have limited storage space on our servers. Please only upload necessary files, avoid duplicates, and compress images before uploading. Every byte saved helps keep the platform sustainable.",
  },
  {
    q: "How long does it take for my submission to be approved?",
    a: "Submissions typically take 24-48 hours for review. Please be patient — our admin team reviews all contributions to ensure quality.",
  },
  {
    q: "Can I delete or edit my submissions?",
    a: "Currently, you cannot edit submissions once approved. If you need to remove duplicate or incorrect content, please contact an admin through the feedback page.",
  },
  {
    q: "My file won't upload. What should I do?",
    a: "First, ensure your file is under 25MB and in PDF or DOCX format. If you're still having issues, try using a Google Drive link instead. Clear your browser cache and try again.",
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
      <section className="relative overflow-hidden py-10">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-220px] h-[420px] w-[720px] max-w-none -translate-x-1/2 rounded-full bg-primary/[0.12] blur-3xl dark:bg-primary/[0.15]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
            <Heart className="w-3.5 h-3.5" />
            Built with purpose
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
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
      <section className="py-10 border rounded-xl border-border/50 bg-muted/30" aria-live="polite" aria-atomic="true">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" role="status" aria-live="polite">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
              : statItems.map((stat, i) => (
                  <div key={stat.label} className="text-center animate-in fade-in slide-in-from-bottom-4 duration-300" style={{ animationDelay: `${i * 75}ms` }}>
                    <stat.icon className="w-5 h-5 mx-auto mb-3 text-primary" aria-hidden="true" />
                    <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
          </div>
          <span className="sr-only" role="status" aria-live="polite">
            {isLoading ? "Loading statistics" : `Loaded ${statItems.length} statistics`}
          </span>
        </div>
      </section>

      {/* Mission */}
      <section className="py-10">
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
                  <Globe data-icon="inline-start" className="w-4 h-4 text-primary" />
                  <span>Open to all PU students</span>
                </div>
              </div>
            </div>

            {/* Mission visual */}
            <Card className="p-6 bg-linear-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <GraduationCap data-icon="inline-start" className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Academic Excellence</p>
                    <p className="text-xs text-muted-foreground">Curated, verified content for every subject</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Users data-icon="inline-start" className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Community Driven</p>
                    <p className="text-xs text-muted-foreground">Students helping students succeed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Heart data-icon="inline-start" className="w-4 h-4 text-primary" />
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

      {/* Creator */}
      <section className="py-10 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
              Maintainer
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              Built & Maintained by
            </h2>
          </div>
          <div className="flex justify-center">
            <Card className="p-6 w-full max-w-md">
              <CardContent className="flex flex-col items-center text-center">
                <Image
                  src="https://avatars.githubusercontent.com/u/125626718?v=4"
                  alt="f0rsakeN-afk"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full mb-4 border-2 border-primary/20"
                />
                <h3 className="font-semibold text-lg mb-1">Naresh Rajbanshi</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Computer Engineering · Purbanchal University
                </p>
                <p className="text-sm text-muted-foreground mb-4 italic">
                  &ldquo;I&apos;m afraid I&apos;ll disappear long before<br />
                  my heart ever learns to let go.&rdquo;
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="https://nareshrajbanshi.com.np"
                    target="_blank"
                    rel="author noopener"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Globe data-icon="inline-start" className="w-4 h-4" />
                    Portfolio
                  </a>
                  <a
                    href="https://github.com/f0rsaken-afk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href="/share"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Contribute
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-muted-foreground text-sm mt-6 italic">
            Built with code and a whole lot of love 💕
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 border-t border-border/50">
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
