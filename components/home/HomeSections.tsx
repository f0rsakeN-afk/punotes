"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  ArrowUpRight,
  BookMarked,
  ScrollText,
  Users,
  FileText,
  BookOpen,
  HelpCircle,
  Upload,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-20 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium mb-8">
          <Star className="w-3 h-3 fill-primary text-primary" />
          Community Driven · 100% Free
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
          Your study companion for{" "}
          <span className="text-primary">Purbanchal University</span>
        </h1>

        {/* Subtext */}
        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Notes, syllabus, and past questions — organized by branch and semester. No signup required to download.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link href="/pdfs">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              Browse Notes
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/share">
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
              <Upload className="w-4 h-4" />
              Contribute
            </Button>
          </Link>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Jump to:</span>
          {[
            { label: "Notes", href: "/pdfs" },
            { label: "Syllabus", href: "/syllabus" },
            { label: "PYQs", href: "/pyqs" },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <Button variant="link" size="sm" className="h-auto p-0 text-primary text-sm gap-1">
                {link.label}
                <ArrowUpRight className="w-3 h-3" />
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickAccessSection() {
  const links = [
    { icon: BookMarked, label: "Notes", href: "/pdfs", desc: "8 semesters" },
    { icon: BookOpen, label: "Syllabus", href: "/syllabus", desc: "All branches" },
    { icon: HelpCircle, label: "Past Questions", href: "/pyqs", desc: "PYQs & solutions" },
  ];

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="group hover:bg-accent/50 transition-colors">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <link.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm">{link.label}</p>
                    <p className="text-xs text-muted-foreground">{link.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["home-stats"],
    queryFn: async () => {
      const res = await axios.get("/api/stats/about");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const stats = [
    { label: "Notes", value: data?.notesCount ?? 0, icon: FileText },
    { label: "Syllabus", value: data?.syllabusCount ?? 0, icon: BookOpen },
    { label: "Past Questions", value: data?.pyqCount ?? 0, icon: ScrollText },
  ];

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-card">
              <CardContent className="p-4 text-center">
                <p className="text-xl sm:text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContributeSection() {
  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="bg-muted/50 border-none">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-semibold text-sm">Have notes to share?</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Help fellow students by contributing study materials
              </p>
            </div>
            <Link href="/share">
              <Button size="sm" variant="outline" className="shrink-0">
                Get Started
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function RecentNotesSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["home-recent-notes"],
    queryFn: async () => {
      const res = await axios.get("/api/stats/about");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const content = [
    { label: "Notes", value: data?.notesCount ?? 0, icon: FileText, href: "/pdfs" },
    { label: "Syllabus", value: data?.syllabusCount ?? 0, icon: BookOpen, href: "/syllabus" },
    { label: "Past Questions", value: data?.pyqCount ?? 0, icon: HelpCircle, href: "/pyqs" },
  ];

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Browse Resources</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {content.map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="group hover:bg-accent/50 transition-colors">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm">{item.value} {item.label}</p>
                    <p className="text-xs text-muted-foreground">Available</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: BookMarked, title: "Complete Notes", desc: "Semester-wise materials for all branches" },
    { icon: Users, title: "Community Driven", desc: "Uploaded by students, for students" },
    { icon: Star, title: "100% Free", desc: "No hidden fees or paywalls" },
  ];

  return (
    <section className="py-10 border-t">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-lg font-semibold mb-5 text-center">Why PuNotes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((f) => (
            <Card key={f.title} className="bg-muted/30">
              <CardContent className="p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <f.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">{f.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnalyticsSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["home-analytics"],
    queryFn: async () => {
      const res = await axios.get("/api/analytics/stats");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading || !data) return null;

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="bg-muted/30">
          <CardContent className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-xl font-bold">{data.overview.totalVisits.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Views</p>
              </div>
              <div>
                <p className="text-xl font-bold">{data.overview.visits7Days.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
              <div>
                <p className="text-xl font-bold">{data.overview.uniqueVisitors7Days.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Visitors</p>
              </div>
              <div>
                <p className="text-xl font-bold">{data.content.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function HomeSections() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <QuickAccessSection />
      <RecentNotesSection />
      <StatsSection />
      <ContributeSection />
      <FeaturesSection />
      <AnalyticsSection />
    </div>
  );
}
