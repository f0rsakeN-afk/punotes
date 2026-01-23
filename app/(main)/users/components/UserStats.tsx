"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Users,
  TrendingUp,
  TrendingDown,
  Ban,
  AlertCircle,
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import axios from "axios";
import { Badge } from "@/components/ui/badge";

interface UserStatsData {
  totalUsers: number;
  activeUsers: number;
  suspendedUsers: number;
  bannedUsers: number;
  adminCount: number;
  userCount: number;
  growth: {
    thisWeek: number;
    weeklyGrowthPercent: number;
    thisMonth: number;
    monthlyGrowthPercent: number;
  };
  statusBreakdown: {
    ACTIVE: number;
    SUSPENDED: number;
    BANNED: number;
  };
  roleDistribution: {
    USER: number;
    ADMIN: number;
  };
}

export function UserStats() {
  const [stats, setStats] = useState<UserStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stats/users");
      setStats(response.data);
    } catch (error) {
      console.error("Failed to fetch user statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-1/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Users */}
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
          <div className="flex items-center gap-1 mt-2">
            <Badge variant="outline" className="text-xs">
              {stats.growth.thisMonth} this month
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Active Users */}
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeUsers}</div>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs text-gray-500">
              {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% of users
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Admin Count */}
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Admins</CardTitle>
          <Badge className="bg-purple-500">Admin</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.adminCount}</div>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs text-gray-500">
              {stats.userCount} regular users
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Suspended/Banned */}
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Restricted</CardTitle>
          <AlertCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.suspendedUsers + stats.bannedUsers}
          </div>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs text-gray-500">
              {stats.suspendedUsers} suspended, {stats.bannedUsers} banned
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
