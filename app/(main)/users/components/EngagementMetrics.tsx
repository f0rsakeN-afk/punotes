"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";

interface EngagementMetric {
  id: string;
  email: string;
  displayName: string;
  profileImageUrl: string | null;
  messagesCount: number;
  reactionsCount: number;
  visitsCount: number;
  lastActive: string;
  engagementScore: number;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

type SortField = "engagement" | "messages" | "reactions" | "visits" | "lastActive";
type SortOrder = "asc" | "desc";

export function EngagementMetrics() {
  const [data, setData] = useState<EngagementMetric[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortField>("engagement");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  useEffect(() => {
    fetchEngagementData();
  }, [pagination.page, sortBy, sortOrder]);

  const fetchEngagementData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stats/engagement", {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          sortBy,
          sortOrder,
        },
      });
      setData(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Failed to fetch engagement metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = async () => {
    try {
      // Fetch all data for CSV export
      const response = await axios.get("/api/stats/engagement", {
        params: {
          page: 1,
          limit: 1000,
          sortBy,
          sortOrder,
        },
      });

      const csvData = response.data.data;
      let csv = "Email,Display Name,Messages,Reactions,Visits,Last Active,Engagement Score\n";

      csvData.forEach((user: EngagementMetric) => {
        csv += `"${user.email}","${user.displayName}",${user.messagesCount},${user.reactionsCount},${user.visitsCount},"${format(new Date(user.lastActive), "PPP p")}",${user.engagementScore}\n`;
      });

      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `engagement-metrics-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Failed to export CSV:", error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>User Engagement Metrics</CardTitle>
          <CardDescription>Track user activity and engagement scores</CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={exportToCSV}
          disabled={loading}
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-4">
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortField)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engagement">Sort by Engagement</SelectItem>
              <SelectItem value="messages">Sort by Messages</SelectItem>
              <SelectItem value="reactions">Sort by Reactions</SelectItem>
              <SelectItem value="visits">Sort by Visits</SelectItem>
              <SelectItem value="lastActive">Sort by Last Active</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as SortOrder)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Highest First</SelectItem>
              <SelectItem value="asc">Lowest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-900">
                <TableHead>User</TableHead>
                <TableHead className="text-right">Messages</TableHead>
                <TableHead className="text-right">Reactions</TableHead>
                <TableHead className="text-right">Visits</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Engagement Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No engagement data available
                  </TableCell>
                </TableRow>
              ) : (
                data.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                    <TableCell className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profileImageUrl || undefined} />
                        <AvatarFallback>{user.displayName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.displayName}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {user.messagesCount}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {user.reactionsCount}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {user.visitsCount}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {format(new Date(user.lastActive), "MMM d, h:mm a")}
                    </TableCell>
                    <TableCell className="text-right font-bold text-blue-600">
                      {user.engagementScore}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
              {pagination.total} users
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPagination({
                    ...pagination,
                    page: Math.max(1, pagination.page - 1),
                  })
                }
                disabled={pagination.page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPagination({
                    ...pagination,
                    page: Math.min(pagination.totalPages, pagination.page + 1),
                  })
                }
                disabled={pagination.page === pagination.totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
