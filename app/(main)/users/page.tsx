"use client";

import { useState, useMemo } from "react";
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

import { useGetUser } from "@/services/user";
import { Highlighter } from "@/components/ui/highlighter";

type User = {
  id: string;
  stackID: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "stackID",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting()}
        className="text-left px-0"
      >
        Stack ID
      </Button>
    ),
  },
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
];

export default function UsersTable() {
  const { data, isLoading, isError } = useGetUser();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredData = useMemo(() => {
    const list = data?.data ?? [];

    return list.filter((u: User) => {
      const search = globalFilter.toLowerCase();

      const matchesSearch =
        u.email.toLowerCase().includes(search) ||
        u.stackID.toLowerCase().includes(search);

      const matchesRole = roleFilter === "all" ? true : u.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [data, globalFilter, roleFilter]);

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
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Failed to load users</div>;

  return (
    <div className="max-w-7xl w-full mx-auto space-y-6 px-4 py-8">
      {/* FILTERS */}
      <Highlighter action="underline" color="#E7405C" multiline={true}>
        <h2 className="my-3 text-4xl sm:text-5xl font-semibold tracking-tighter text-primary">
          ALl Users
        </h2>
      </Highlighter>
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
                      header.getContext(),
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
                    <TableCell key={cell.id} className="p
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
    </div>
  );
}
