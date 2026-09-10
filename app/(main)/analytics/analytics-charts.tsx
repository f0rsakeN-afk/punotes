"use client";

// Heavy chart bundle (recharts) — loaded on demand via next/dynamic
// so it never blocks the initial analytics page render.
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
import { Clock, FileText, LayoutGrid, Link2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export interface AnalyticsData {
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
                    return new Date(String(value)).toLocaleDateString("en-US", {
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

export function AnalyticsCharts({ data }: { data: AnalyticsData }) {
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <VisitsChart data={data.dailyVisits} />
      <TopPagesChart data={data.topPages} />
      <ContentDistributionChart data={data.content} />
      <SubmissionsStatusChart
        pending={data.content.pendingSubmissions}
        total={data.content.totalNotes + data.content.totalSyllabus + data.content.totalPYQ}
      />
    </div>
  );
}
