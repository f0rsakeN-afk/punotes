import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import prisma from "@/lib/prisma";

/**
 * GET /api/stats/engagement
 * Fetch user engagement metrics
 * Auth: Admin only
 *
 * Query params:
 *   - page: number (default: 1)
 *   - limit: number (default: 20, max: 100)
 *   - sortBy: "engagement" | "messages" | "reactions" | "visits" | "lastActive" (default: "engagement")
 *   - sortOrder: "asc" | "desc" (default: "desc")
 *
 * Returns array of users with engagement metrics:
 * {
 *   id: string,
 *   email: string,
 *   displayName: string,
 *   profileImageUrl: string,
 *   messagesCount: number,
 *   reactionsCount: number,
 *   visitsCount: number,
 *   lastActive: DateTime,
 *   engagementScore: number
 * }
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
    const sortBy = searchParams.get("sortBy") || "engagement";
    const sortOrder = (searchParams.get("sortOrder") || "desc").toLowerCase() as "asc" | "desc";

    const skip = (page - 1) * limit;

    // Validate sortBy parameter
    const validSortFields = ["engagement", "messages", "reactions", "visits", "lastActive"];
    const validSort = validSortFields.includes(sortBy) ? sortBy : "engagement";

    // Fetch all users with their engagement data
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        displayName: true,
        profileImageUrl: true,
        lastSeenAt: true,
        messages: {
          select: { id: true },
        },
        reactions: {
          select: { id: true },
        },
        visits: {
          select: { id: true },
        },
      },
    });

    // Calculate engagement metrics for each user
    const engagementData = users.map((user) => {
      const messagesCount = user.messages.length;
      const reactionsCount = user.reactions.length;
      const visitsCount = user.visits.length;

      // Calculate engagement score: messages * 3 + reactions * 1 + visits * 0.5
      const engagementScore = messagesCount * 3 + reactionsCount * 1 + visitsCount * 0.5;

      return {
        id: user.id,
        email: user.email,
        displayName: user.displayName || "Anonymous",
        profileImageUrl: user.profileImageUrl,
        messagesCount,
        reactionsCount,
        visitsCount,
        lastActive: user.lastSeenAt,
        engagementScore: parseFloat(engagementScore.toFixed(2)),
      };
    });

    // Sort based on sortBy parameter
    const sorted = engagementData.sort((a, b) => {
      let aVal: number | Date;
      let bVal: number | Date;

      switch (validSort) {
        case "messages":
          aVal = a.messagesCount;
          bVal = b.messagesCount;
          break;
        case "reactions":
          aVal = a.reactionsCount;
          bVal = b.reactionsCount;
          break;
        case "visits":
          aVal = a.visitsCount;
          bVal = b.visitsCount;
          break;
        case "lastActive":
          aVal = new Date(a.lastActive).getTime();
          bVal = new Date(b.lastActive).getTime();
          break;
        case "engagement":
        default:
          aVal = a.engagementScore;
          bVal = b.engagementScore;
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    // Paginate
    const total = sorted.length;
    const paginatedData = sorted.slice(skip, skip + limit);

    const response = NextResponse.json({
      data: paginatedData,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=120"
    );

    return response;
  } catch (error) {
    console.error("Error fetching engagement metrics:", error);
    return NextResponse.json(
      { error: "Failed to fetch engagement metrics" },
      { status: 500 }
    );
  }
}
