import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import AuditLogsClient from "./audit-logs-client";

export const metadata: Metadata = {
  title: "Audit Logs",
  description: "View administrative actions and audit trail",
};

export const revalidate = 30; // ISR - revalidate every 30 seconds

export default async function AuditLogsPage() {
  const stackUser = await stackServerApp.getUser();

  if (!stackUser) {
    redirect("/");
  }

  // Get current user and check if admin
  const currentUser = await prisma.user.findUnique({
    where: { stackID: stackUser.id },
    select: { id: true, role: true },
  });

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/");
  }

  // Fetch initial audit logs
  const [logsData, total] = await Promise.all([
    prisma.auditLog.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
      include: {
        admin: {
          select: {
            id: true,
            email: true,
            displayName: true,
            profileImageUrl: true,
          },
        },
        target: {
          select: {
            id: true,
            email: true,
            displayName: true,
            profileImageUrl: true,
          },
        },
      },
    }),
    prisma.auditLog.count(),
  ]);

  // Cast logs to the correct type
  const logs = logsData as any;

  return (
    <>
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-1">Audit Logs</h1>
        <p className="text-sm text-muted-foreground">
          Track all administrative actions and system changes
        </p>
      </div>

      {/* Audit Logs Client */}
      <AuditLogsClient initialLogs={logs} initialTotal={total} />
    </>
  );
}
