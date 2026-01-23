"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Highlighter } from "@/components/ui/highlighter";
import { MoreHorizontal, Lock, Trash2, Eye } from "lucide-react";
import axiosInstance from "@/services/axios";
import { SuspendUserModal } from "./components/SuspendUserModal";
import { EngagementMetrics } from "./components/EngagementMetrics";

type User = {
  id: string;
  stackID: string;
  email: string;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED" | "BANNED";
  createdAt: string;
  displayName?: string | null;
  profileImageUrl?: string | null;
  suspensionReason?: string | null;
  suspendedUntil?: string | null;
  _count?: {
    messages: number;
    reactions: number;
    visits: number;
  };
};

interface UsersTableClientProps {
  users: User[];
  canManageRoles: boolean;
  isSpecialAdmin: boolean;
}

export default function UsersTableClient({
  users: initialUsers,
  canManageRoles,
  isSpecialAdmin,
}: UsersTableClientProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updating, setUpdating] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEngagement, setShowEngagement] = useState(false);

  // Prefetch users page when component mounts
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        // Prefetch data on idle time
        axiosInstance.get("/api/user").catch(() => {
          // Silent fail for prefetch
        });
      });
    }
  }, []);

  const handleRoleChange = useCallback(
    async (userId: string, newRole: "USER" | "ADMIN") => {
      setUpdating((prev) => ({ ...prev, [userId]: true }));
      setError(null);

      try {
        await axiosInstance.patch(`/api/user/${userId}`, { role: newRole });

        // Update local state
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );

        // Trigger cache revalidation after successful update
        try {
          await axiosInstance.post("/api/revalidate", {
            secret: process.env.NEXT_PUBLIC_REVALIDATE_SECRET || "",
            path: "/users",
          });
        } catch (revalidateErr) {
          // Silent fail for revalidation
          console.debug("Revalidation request sent");
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to update role";
        setError(message);
        console.error("Error updating role:", err);
      } finally {
        setUpdating((prev) => ({ ...prev, [userId]: false }));
      }
    },
    []
  );

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
          className="text-left px-0"
        >
          Email
        </Button>
      ),
    },
    {
      accessorKey: "role",
      header: () => <span>Role</span>,
      cell: ({ row }) => {
        const user = row.original;
        const isLoading = updating[user.id];

        if (!canManageRoles) {
          return (
            <Badge variant="outline">
              {user.role === "ADMIN" ? "Admin" : "User"}
            </Badge>
          );
        }

        return (
          <Select
            value={user.role}
            onValueChange={(value) =>
              handleRoleChange(user.id, value as "USER" | "ADMIN")
            }
            disabled={isLoading}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USER">User</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <span>Status</span>,
      cell: ({ row }) => {
        const user = row.original;
        const statusColors: Record<string, string> = {
          ACTIVE: "bg-green-100 text-green-800",
          SUSPENDED: "bg-yellow-100 text-yellow-800",
          BANNED: "bg-red-100 text-red-800",
        };

        return (
          <Badge className={statusColors[user.status]}>
            {user.status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
          className="text-left px-0"
        >
          Joined
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt).toLocaleDateString();
        return <span>{date}</span>;
      },
    },
    {
      id: "actions",
      header: () => <span>Actions</span>,
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user.status === "ACTIVE" && (
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedUser(user);
                    setSuspendModalOpen(true);
                  }}
                  className="text-yellow-600"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Suspend User
                </DropdownMenuItem>
              )}
              {user.status === "SUSPENDED" && (
                <DropdownMenuItem
                  onClick={async () => {
                    try {
                      await axiosInstance.delete(`/api/user/${user.id}/suspend`);
                      setUsers((prev) =>
                        prev.map((u) =>
                          u.id === user.id ? { ...u, status: "ACTIVE" } : u
                        )
                      );
                    } catch (err) {
                      setError("Failed to unsuspend user");
                    }
                  }}
                  className="text-green-600"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Unsuspend User
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  // View user activity - would navigate to a detail page
                  console.log("View activity for user:", user.id);
                }}
                className="text-blue-600"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Activity
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const filteredData = useMemo(() => {
    return users.filter((u: User) => {
      const search = globalFilter.toLowerCase();

      const matchesSearch =
        u.email.toLowerCase().includes(search) ||
        u.stackID.toLowerCase().includes(search);

      const matchesRole = roleFilter === "all" ? true : u.role === roleFilter;
      const matchesStatus = statusFilter === "all" ? true : u.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, globalFilter, roleFilter, statusFilter]);

  /* @react-compiler disable */
  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
  });

  return (
    <div className="max-w-7xl w-full mx-auto space-y-6 px-4 py-8">
      {/* FILTERS */}
      <Highlighter action="underline" color="#E7405C" multiline={true}>
        <h2 className="my-3 text-4xl sm:text-5xl font-semibold tracking-tighter text-primary">
          ALL Users({users.length})
        </h2>
      </Highlighter>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {canManageRoles && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded text-sm">
          {isSpecialAdmin
            ? "You can promote and demote users (limited admin)"
            : "You can manage user roles"}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Input
          placeholder="Search email or stackID..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="sm:max-w-xs h-12"
        />

        <Select value={roleFilter} onValueChange={(val) => setRoleFilter(val)}>
          <SelectTrigger className="sm:w-40 h-12 w-full">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val)}>
          <SelectTrigger className="sm:w-40 h-12 w-full">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="SUSPENDED">Suspended</SelectItem>
            <SelectItem value="BANNED">Banned</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => setShowEngagement(!showEngagement)}
        >
          {showEngagement ? "Hide" : "Show"} Engagement
        </Button>
      </div>

      {/* TABLE */}
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id} className="">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/50 transition">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-end gap-2 pt-2">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      {/* ENGAGEMENT METRICS */}
      {showEngagement && (
        <div className="mt-8">
          <EngagementMetrics />
        </div>
      )}

      {/* SUSPENSION MODAL */}
      {selectedUser && (
        <SuspendUserModal
          isOpen={suspendModalOpen}
          onClose={() => {
            setSuspendModalOpen(false);
            setSelectedUser(null);
          }}
          userId={selectedUser.id}
          userEmail={selectedUser.email}
          userName={selectedUser.displayName || selectedUser.email}
          onSuspended={() => {
            // Refresh user list
            setUsers((prev) =>
              prev.map((u) =>
                u.id === selectedUser.id ? { ...u, status: "SUSPENDED" } : u
              )
            );
          }}
        />
      )}
    </div>
  );
}
