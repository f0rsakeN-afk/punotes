import prisma from "./prisma";

interface CreateAuditLogParams {
  action: "ROLE_CHANGE" | "USER_SUSPEND" | "USER_UNSUSPEND" | "USER_BAN" | "USER_UNBAN";
  performedBy: string; // Admin user ID
  targetUser?: string | null; // User being affected
  details?: Record<string, any> | null;
}

/**
 * Create an immutable audit log entry for administrative actions
 * Used to track role changes, suspensions, bans, and other admin activities
 */
export async function createAuditLog({
  action,
  performedBy,
  targetUser = null,
  details = null,
}: CreateAuditLogParams) {
  try {
    const data: any = {
      action,
      performedBy,
      targetUser,
    };
    if (details !== null) {
      data.details = details;
    }
    const auditLog = await prisma.auditLog.create({
      data,
      include: {
        admin: {
          select: {
            id: true,
            email: true,
            displayName: true,
          },
        },
        target: {
          select: {
            id: true,
            email: true,
            displayName: true,
          },
        },
      },
    });

    return auditLog;
  } catch (error) {
    console.error("Failed to create audit log:", error);
    throw error;
  }
}

/**
 * Fetch audit logs with pagination and filtering
 */
export async function getAuditLogs({
  page = 1,
  limit = 20,
  action,
  userId,
  performedBy,
}: {
  page?: number;
  limit?: number;
  action?: string;
  userId?: string;
  performedBy?: string;
} = {}) {
  const skip = (page - 1) * limit;

  const where: any = {};
  if (action) where.action = action;
  if (userId) where.targetUser = userId;
  if (performedBy) where.performedBy = performedBy;

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
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
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.auditLog.count({ where }),
  ]);

  return {
    logs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
