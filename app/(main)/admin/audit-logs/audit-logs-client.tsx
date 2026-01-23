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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";

interface AuditLog {
  id: string;
  action: string;
  createdAt: string;
  details: Record<string, any> | null;
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

interface AuditLogsClientProps {
  initialLogs: AuditLog[];
  initialTotal: number;
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

export default function AuditLogsClient({
  initialLogs,
  initialTotal,
}: AuditLogsClientProps) {
  const [logs, setLogs] = useState<AuditLog[]>(initialLogs);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [action, setAction] = useState("all");
  const [searchUser, setSearchUser] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchLogs();
  }, [page, action, searchUser]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params: Record<string, any> = {
        page,
        limit,
      };

      if (action !== "all") {
        params.action = action;
      }

      if (searchUser.trim()) {
        params.userId = searchUser;
      }

      const response = await axios.get("/api/audit-logs", { params });
      setLogs(response.data.logs);
      setTotal(response.data.pagination.total);
    } catch (error) {
      console.error("Failed to fetch audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Action Type</label>
              <Select value={action} onValueChange={setAction}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="ROLE_CHANGE">Role Changed</SelectItem>
                  <SelectItem value="USER_SUSPEND">User Suspended</SelectItem>
                  <SelectItem value="USER_UNSUSPEND">User Unsuspended</SelectItem>
                  <SelectItem value="USER_BAN">User Banned</SelectItem>
                  <SelectItem value="USER_UNBAN">User Unbanned</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Search User ID</label>
              <Input
                placeholder="Enter user ID to filter..."
                value={searchUser}
                onChange={(e) => {
                  setSearchUser(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Trail</CardTitle>
          <CardDescription>
            {total} total entries • Page {page} of {totalPages}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              Loading audit logs...
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No audit logs found
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      {/* Admin Avatar */}
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={log.admin.profileImageUrl || undefined} />
                        <AvatarFallback>{log.admin.email[0]}</AvatarFallback>
                      </Avatar>

                      {/* Action Details */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium">{log.admin.displayName || log.admin.email}</span>
                          <span className="text-gray-600">{actionLabels[log.action]}</span>
                          {log.target && (
                            <>
                              <span className="text-gray-400">→</span>
                              <span className="font-medium">
                                {log.target.displayName || log.target.email}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {format(new Date(log.createdAt), "PPP p")}
                        </div>
                      </div>

                      {/* Action Badge */}
                      <Badge
                        className={actionColors[log.action] || "bg-gray-100 text-gray-800"}
                      >
                        {log.action}
                      </Badge>
                    </div>

                    {/* Expand Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setExpandedId(expandedId === log.id ? null : log.id)
                      }
                    >
                      {expandedId === log.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {/* Details */}
                  {expandedId === log.id && log.details && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="bg-gray-50 rounded p-3 text-sm font-mono text-gray-700 overflow-auto">
                        <pre>{JSON.stringify(log.details, null, 2)}</pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <div className="text-sm text-gray-600">
                Showing {(page - 1) * limit + 1} to{" "}
                {Math.min(page * limit, total)} of {total}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1 || loading}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages || loading}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
