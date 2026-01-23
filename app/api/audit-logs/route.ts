import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import prisma from "@/lib/prisma";
import { getAuditLogs } from "@/lib/audit";

/**
 * GET /api/audit-logs
 * Fetch audit logs with pagination and filtering
 * Auth: Admin only
 * Query params:
 *   - page: number (default: 1)
 *   - limit: number (default: 20, max: 100)
 *   - action: string (filter by action type)
 *   - userId: string (filter by target user)
 *   - performedBy: string (filter by admin who performed action)
 */
export async function GET(request: NextRequest) {
  try {
    const stackUser = await stackServerApp.getUser();

    if (!stackUser) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    // Get current user and check if admin
    const currentUser = await prisma.user.findUnique({
      where: { stackID: stackUser.id },
      select: { id: true, role: true },
    });

    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden. Admin access required." },
        { status: 403 }
      );
    }

    // Extract query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    const action = searchParams.get("action") || undefined;
    const userId = searchParams.get("userId") || undefined;
    const performedBy = searchParams.get("performedBy") || undefined;

    // Fetch audit logs with pagination
    const result = await getAuditLogs({
      page,
      limit,
      action,
      userId,
      performedBy,
    });

    const response = NextResponse.json(result);
    response.headers.set(
      "Cache-Control",
      "private, max-age=30, stale-while-revalidate=60"
    );

    return response;
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch audit logs" },
      { status: 500 }
    );
  }
}
