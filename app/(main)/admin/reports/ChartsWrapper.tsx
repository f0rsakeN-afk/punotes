"use client";

import dynamic from "next/dynamic";

interface ChartsWrapperProps {
  data: Array<{
    date: string;
    messages: number;
    reactions: number;
    visits: number;
    activeUsers: number;
    newUsers: number;
  }>;
}

const LineChartComponent = dynamic(
  () => import("./Charts").then((mod) => mod.LineChartComponent),
  {
    ssr: false,
    loading: () => <div className="h-[300px] animate-pulse bg-muted rounded-lg" />
  }
);

const BarChartComponent = dynamic(
  () => import("./Charts").then((mod) => mod.BarChartComponent),
  {
    ssr: false,
    loading: () => <div className="h-[300px] animate-pulse bg-muted rounded-lg" />
  }
);

export function ChartsWrapper({ data }: ChartsWrapperProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Activity Trend */}
      <LineChartComponent data={data} />

      {/* User Activity */}
      <BarChartComponent data={data} />
    </div>
  );
}

export function ChartLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="h-[300px] animate-pulse bg-muted rounded-lg" />
      <div className="h-[300px] animate-pulse bg-muted rounded-lg" />
    </div>
  );
}