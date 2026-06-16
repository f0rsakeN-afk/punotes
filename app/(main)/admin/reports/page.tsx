"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { format, subDays } from "date-fns";
import { Download } from "lucide-react";
import { ChartsWrapper, ChartLoading } from "./ChartsWrapper";

type Period = "daily" | "weekly" | "monthly";

interface ReportData {
  period: string;
  dateRange: { start: string; end: string };
  summary: {
    totalMessages: number;
    totalReactions: number;
    totalVisits: number;
    activeUsers: number;
    newUsers: number;
  };
  data: Array<{
    date: string;
    messages: number;
    reactions: number;
    visits: number;
    activeUsers: number;
    newUsers: number;
  }>;
}

export default function ReportsPage() {
  const [period, setPeriod] = useState<Period>("daily");
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(
    format(subDays(new Date(), 30), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));

  useEffect(() => {
    fetchReport();
  }, [period, startDate, endDate]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {
        period,
        startDate,
        endDate,
      };

      const response = await axios.get("/api/reports/usage", { params });
      setReport(response.data);
    } catch (error) {
      console.error("Failed to fetch report:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = async () => {
    try {
      const params: Record<string, string> = {
        period,
        startDate,
        endDate,
        format: "csv",
      };

      const response = await axios.get("/api/reports/usage", {
        params,
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `usage-report-${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Failed to export CSV:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-2 sm:px-4 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Usage Reports</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track platform activity and engagement metrics
        </p>
      </div>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Report Settings</CardTitle>
          <CardDescription>Configure the report parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Period</label>
              <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="space-y-2 flex items-end">
              <Button
                onClick={exportCSV}
                disabled={loading || !report}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      {report && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{report.summary.totalMessages}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Reactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{report.summary.totalReactions}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Visits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{report.summary.totalVisits}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{report.summary.activeUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{report.summary.newUsers}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts */}
      {report && report.data.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartsWrapper data={report.data} />
          </CardContent>
        </Card>
      ) : loading ? (
        <Card>
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartLoading />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No data available for this period</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}