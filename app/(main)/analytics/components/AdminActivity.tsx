"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";

interface AuditLog {
  id: string;
  action: string;
  createdAt: string;
  admin: {
    id: string;
    email: string;
    displayName: string | null;
    profileImageUrl: string | null;
  };
  target: {
    id: string;
    email: string;
    displayName: string | null;
    profileImageUrl: string | null;
  } | null;
}

const actionColors: Record<string, string> = {
  ROLE_CHANGE: "bg-blue-100 text-blue-800",
  USER_SUSPEND: "bg-yellow-100 text-yellow-800",
  USER_UNSUSPEND: "bg-green-100 text-green-800",
  USER_BAN: "bg-red-100 text-red-800",
  USER_UNBAN: "bg-green-100 text-green-800",
};

const actionLabels: Record<string, string> = {
  ROLE_CHANGE: "Role Changed",
  USER_SUSPEND: "User Suspended",
  USER_UNSUSPEND: "User Unsuspended",
  USER_BAN: "User Banned",
  USER_UNBAN: "User Unbanned",
};

export function AdminActivity() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentActivity();
    // Refresh every 30 seconds
    const interval = setInterval(fetchRecentActivity, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchRecentActivity = async () => {
    try {
      const response = await axios.get("/api/audit-logs", {
        params: {
          page: 1,
          limit: 10,
        },
      });
      setLogs(response.data.logs);
    } catch (error) {
      console.error("Failed to fetch admin activity:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Recent Admin Activity</CardTitle>
          <CardDescription>Latest administrative actions</CardDescription>
        </div>
        <Link href="/admin/audit-logs">
          <Button variant="outline" size="sm">
            View All
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No recent admin activity
          </div>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition"
              >
                {/* Admin Avatar */}
                <Avatar className="h-8 w-8">
                  <AvatarImage src={log.admin.profileImageUrl || undefined} />
                  <AvatarFallback>{log.admin.email[0]}</AvatarFallback>
                </Avatar>

                {/* Activity Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm truncate">
                      {log.admin.displayName || log.admin.email}
                    </span>
                    <span className="text-gray-600 text-sm truncate">
                      {actionLabels[log.action]}
                    </span>
                    {log.target && (
                      <>
                        <span className="text-gray-400">→</span>
                        <span className="font-medium text-sm truncate">
                          {log.target.displayName || log.target.email}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {format(new Date(log.createdAt), "PPP p")}
                  </div>
                </div>

                {/* Action Badge */}
                <Badge
                  className={`${actionColors[log.action] || "bg-gray-100 text-gray-800"} text-xs`}
                >
                  {log.action}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
