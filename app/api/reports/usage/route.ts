import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, parseISO } from "date-fns";

type Period = "daily" | "weekly" | "monthly";

/**
 * GET /api/reports/usage
 * Fetch usage reports with aggregated activity data
 * Auth: Admin only
 *
 * Query params:
 *   - period: "daily" | "weekly" | "monthly" (default: "daily")
 *   - startDate: ISO date string (optional, defaults to 30 days ago)
 *   - endDate: ISO date string (optional, defaults to today)
 *   - format: "json" | "csv" (default: "json")
 *
 * Returns:
 * {
 *   period: string,
 *   dateRange: { start: Date, end: Date },
 *   summary: {
 *     totalMessages: number,
 *     totalReactions: number,
 *     totalVisits: number,
 *     activeUsers: number,
 *     newUsers: number
 *   },
 *   data: Array<{
 *     date: string,
 *     messages: number,
 *     reactions: number,
 *     visits: number,
 *     activeUsers: number,
 *     newUsers: number
 *   }>
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
    const period = (searchParams.get("period") || "daily") as Period;
    const format = searchParams.get("format") || "json";

    // Validate period
    if (!["daily", "weekly", "monthly"].includes(period)) {
      return NextResponse.json(
        { error: "Invalid period. Must be 'daily', 'weekly', or 'monthly'" },
        { status: 400 }
      );
    }

    // Parse date range
    const now = new Date();
    const defaultStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago

    let startDate: Date;
    let endDate: Date;

    try {
      startDate = searchParams.get("startDate") ? parseISO(searchParams.get("startDate")!) : defaultStart;
      endDate = searchParams.get("endDate") ? parseISO(searchParams.get("endDate")!) : now;
    } catch {
      return NextResponse.json(
        { error: "Invalid date format. Use ISO 8601 (YYYY-MM-DD)" },
        { status: 400 }
      );
    }

    // Fetch all messages, reactions, and visits within date range
    const [messages, reactions, visits, newUsers] = await Promise.all([
      prisma.message.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: { createdAt: true, userId: true },
      }),
      prisma.reaction.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: { createdAt: true, userId: true },
      }),
      prisma.visit.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: { createdAt: true, userId: true },
      }),
      prisma.user.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: { id: true, createdAt: true },
      }),
    ]);

    // Group data by time period
    const getData = (date: Date): string => {
      const d = new Date(date);
      switch (period) {
        case "daily":
          return d.toISOString().split("T")[0];
        case "weekly":
          const weekStart = startOfWeek(d);
          const weekEnd = endOfWeek(d);
          return `${weekStart.toISOString().split("T")[0]} to ${weekEnd.toISOString().split("T")[0]}`;
        case "monthly":
          return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
        default:
          return d.toISOString().split("T")[0];
      }
    };

    // Aggregate data by period
    const aggregatedData: Record<string, any> = {};

    messages.forEach((msg) => {
      const key = getData(msg.createdAt);
      if (!aggregatedData[key]) {
        aggregatedData[key] = {
          date: key,
          messages: 0,
          reactions: 0,
          visits: 0,
          activeUsers: new Set(),
          newUsers: 0,
        };
      }
      aggregatedData[key].messages++;
      aggregatedData[key].activeUsers.add(msg.userId);
    });

    reactions.forEach((react) => {
      const key = getData(react.createdAt);
      if (!aggregatedData[key]) {
        aggregatedData[key] = {
          date: key,
          messages: 0,
          reactions: 0,
          visits: 0,
          activeUsers: new Set(),
          newUsers: 0,
        };
      }
      aggregatedData[key].reactions++;
      aggregatedData[key].activeUsers.add(react.userId);
    });

    visits.forEach((visit) => {
      const key = getData(visit.createdAt);
      if (!aggregatedData[key]) {
        aggregatedData[key] = {
          date: key,
          messages: 0,
          reactions: 0,
          visits: 0,
          activeUsers: new Set(),
          newUsers: 0,
        };
      }
      aggregatedData[key].visits++;
      if (visit.userId) {
        aggregatedData[key].activeUsers.add(visit.userId);
      }
    });

    newUsers.forEach((user) => {
      const key = getData(user.createdAt);
      if (!aggregatedData[key]) {
        aggregatedData[key] = {
          date: key,
          messages: 0,
          reactions: 0,
          visits: 0,
          activeUsers: new Set(),
          newUsers: 0,
        };
      }
      aggregatedData[key].newUsers++;
    });

    // Convert Sets to counts and sort by date
    const data = Object.values(aggregatedData)
      .map((item: any) => ({
        date: item.date,
        messages: item.messages,
        reactions: item.reactions,
        visits: item.visits,
        activeUsers: item.activeUsers.size,
        newUsers: item.newUsers,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Calculate summary
    const summary = {
      totalMessages: messages.length,
      totalReactions: reactions.length,
      totalVisits: visits.length,
      activeUsers: new Set(
        [...messages, ...reactions, ...visits]
          .filter((item) => "userId" in item && item.userId)
          .map((item) => item.userId)
      ).size,
      newUsers: newUsers.length,
    };

    const reportData = {
      period,
      dateRange: {
        start: startDate,
        end: endDate,
      },
      summary,
      data,
    };

    // Return CSV format if requested
    if (format === "csv") {
      let csv = "Date,Messages,Reactions,Visits,Active Users,New Users\n";
      data.forEach((item) => {
        csv += `"${item.date}",${item.messages},${item.reactions},${item.visits},${item.activeUsers},${item.newUsers}\n`;
      });

      const response = new NextResponse(csv);
      response.headers.set("Content-Type", "text/csv");
      response.headers.set("Content-Disposition", "attachment; filename=usage-report.csv");
      return response;
    }

    // Return JSON format
    const response = NextResponse.json(reportData);
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=120"
    );
    return response;
  } catch (error) {
    console.error("Error generating usage report:", error);
    return NextResponse.json(
      { error: "Failed to generate usage report" },
      { status: 500 }
    );
  }
}
