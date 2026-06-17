"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Users,
  FileText,
  BookOpen,
  ScrollText,
  Eye,
  TrendingUp,
  TrendingDown,
  Clock,
  LayoutGrid,
  Link2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

interface AnalyticsData {
  overview: {
    totalVisits: number;
    visits7Days: number;
    visits30Days: number;
    uniqueVisitors7Days: number;
    uniqueVisitors30Days: number;
    growth7Days: number;
    growth30Days: number;
  };
  topPages: Array<{ path: string; views: number }>;
  dailyVisits: Array<{ date: string; views: number }>;
  content: {
    totalUsers: number;
    totalNotes: number;
    totalSyllabus: number;
    totalPYQ: number;
    pendingSubmissions: number;
  };
}

const chartConfig = {
  views: { label: "Page Views" },
  visits: { label: "Visits", color: "var(--chart-1)" },
  pages: { label: "Pages", color: "var(--chart-2)" },
  notes: { label: "Notes", color: "var(--chart-1)" },
  syllabus: { label: "Syllabus", color: "var(--chart-2)" },
  pyqs: { label: "PYQs", color: "var(--chart-3)" },
  approved: { label: "Approved", color: "hsl(142 76% 36%)" },
  pending: { label: "Pending", color: "hsl(38 92% 50%)" },
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: "up" | "down";
  trendValue?: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          </div>
          {trend && trendValue && (
            <div
              className={`flex items-center gap-1 text-xs font-medium ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend === "up" ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {trendValue}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function VisitsChart({ data }: { data: AnalyticsData["dailyVisits"] }) {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Page Views Trend
        </CardTitle>
        <CardDescription>Last 14 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <LineChart data={data} margin={{ top: 12, right: 24, left: 0, bottom: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              minTickGap={24}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
              }}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={12} width={40} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="views"
              type="monotone"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function TopPagesChart({ data }: { data: AnalyticsData["topPages"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <LayoutGrid className="w-4 h-4" />
          Popular Pages
        </CardTitle>
        <CardDescription>Top 10 by views</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              dataKey="path"
              type="category"
              tickLine={false}
              axisLine={false}
              width={120}
              tickFormatter={(value) => {
                if (value.length > 15) return value.slice(0, 15) + "...";
                return value;
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                />
              }
            />
            <Bar dataKey="views" fill="var(--chart-2)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const CONTENT_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"];

function ContentDistributionChart({ data }: { data: AnalyticsData["content"] }) {
  const pieData = [
    { browser: "Notes", visitors: data.totalNotes, fill: "var(--chart-1)" },
    { browser: "Syllabus", visitors: data.totalSyllabus, fill: "var(--chart-2)" },
    { browser: "PYQs", visitors: data.totalPYQ, fill: "var(--chart-3)" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Content Distribution
        </CardTitle>
        <CardDescription>Notes, Syllabus, PYQs</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={pieData}
              dataKey="visitors"
              nameKey="browser"
              labelLine={true}
              label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function SubmissionsStatusChart({ pending, total }: { pending: number; total: number }) {
  const approved = total - pending;
  const data = [
    { label: "Approved", value: approved, fill: "hsl(142 76% 36%)" },
    { label: "Pending", value: pending, fill: "hsl(38 92% 50%)" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Link2 className="w-4 h-4" />
          Submissions Status
        </CardTitle>
        <CardDescription>Approved vs pending review</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis dataKey="label" type="category" tickLine={false} axisLine={false} width={80} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((item, index) => (
                <Cell key={`cell-${index}`} fill={item.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default function AnalyticsClient() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await axios.get<AnalyticsData>("/api/analytics/stats");
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Eye className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-sm text-muted-foreground">Track site performance and engagement</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-4 w-20 mt-3" />
                <Skeleton className="h-8 w-16 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <Skeleton className="h-[380px] lg:col-span-2" />
          <Skeleton className="h-[380px]" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <Eye className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Failed to load analytics</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Eye className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-sm text-muted-foreground">Track site performance and engagement</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Views"
          value={data.overview.totalVisits.toLocaleString()}
          icon={Eye}
        />
        <StatCard
          title="7-Day Views"
          value={data.overview.visits7Days.toLocaleString()}
          icon={Clock}
          trend={data.overview.growth7Days >= 0 ? "up" : "down"}
          trendValue={`${data.overview.growth7Days >= 0 ? "+" : ""}${data.overview.growth7Days}%`}
        />
        <StatCard
          title="Unique Visitors (7d)"
          value={data.overview.uniqueVisitors7Days.toLocaleString()}
          icon={Users}
        />
        <StatCard
          title="Total Users"
          value={data.content.totalUsers.toLocaleString()}
          icon={Users}
        />
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Notes"
          value={data.content.totalNotes.toLocaleString()}
          icon={FileText}
        />
        <StatCard
          title="Syllabus"
          value={data.content.totalSyllabus.toLocaleString()}
          icon={BookOpen}
        />
        <StatCard
          title="Past Questions"
          value={data.content.totalPYQ.toLocaleString()}
          icon={ScrollText}
        />
        <StatCard
          title="Pending Submissions"
          value={data.content.pendingSubmissions.toLocaleString()}
          icon={Clock}
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <VisitsChart data={data.dailyVisits} />
        <TopPagesChart data={data.topPages} />
        <ContentDistributionChart data={data.content} />
        <SubmissionsStatusChart
          pending={data.content.pendingSubmissions}
          total={data.content.totalNotes + data.content.totalSyllabus + data.content.totalPYQ}
        />
      </div>
    </div>
  );
}