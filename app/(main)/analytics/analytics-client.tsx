"use client";

import * as React from "react";
import dynamic from "next/dynamic";
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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/shared/PageHeader";
import type { AnalyticsData } from "./analytics-charts";

// Recharts is heavy (~100KB+) — load it only when charts scroll into view.
const AnalyticsCharts = dynamic(
  () => import("./analytics-charts").then((mod) => mod.AnalyticsCharts),
  {
    ssr: false,
    loading: () => (
      <div className="grid lg:grid-cols-2 gap-4">
        <Skeleton className="h-[380px]" />
        <Skeleton className="h-[380px]" />
      </div>
    ),
  }
);

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
                trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
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
          <PageHeader
            title="Analytics"
            description="Track site performance and engagement"
          />
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
        <PageHeader
          title="Analytics"
          description="Track site performance and engagement"
        />
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

      {/* Charts — heavy recharts bundle loads on demand */}
      <AnalyticsCharts data={data} />
    </div>
  );
}