import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { getStackUser, getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import AuditLogsClient from "./audit-logs-client";

export const metadata: Metadata = {
  title: "Audit Logs",
  description: "View administrative actions and audit trail",
};

export const revalidate = 30; // ISR - revalidate every 30 seconds

export default async function AuditLogsPage() {
  const stackUser = await getStackUser();

  if (!stackUser) {
    redirect("/");
  }

  // Get current user and check if admin (Redis-cached, no extra Stack call)
  const currentUser = await getCurrentUser();

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const logs = logsData as any;

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <PageHeader
          title="Audit Logs"
          description="Track all administrative actions and system changes"
        />
      </div>

      {/* Audit Logs Client */}
      <AuditLogsClient initialLogs={logs} initialTotal={total} />
    </>
  );
}
