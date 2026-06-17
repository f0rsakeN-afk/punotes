import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cacheGet, cacheSet } from "@/lib/cache";
import { startOfDay, subDays, format } from "date-fns";

const ANALYTICS_CACHE_KEY = "analytics:stats";
const ANALYTICS_CACHE_TTL = 300; // 5 minutes

export async function GET() {
  try {
    // Try cache first
    const cached = await cacheGet<AnalyticsStats>(ANALYTICS_CACHE_KEY);
    if (cached) {
      return NextResponse.json(cached, {
        status: 200,
        headers: { "X-Cache": "HIT" },
      });
    }

    const today = startOfDay(new Date());
    const last7Days = subDays(today, 7);
    const last30Days = subDays(today, 30);

    // Fetch all data in parallel
    const [
      totalVisits,
      last7DaysVisits,
      last30DaysVisits,
      uniqueVisitors7Days,
      uniqueVisitors30Days,
      topPages,
      dailyVisits,
      totalUsers,
      totalNotes,
      totalSyllabus,
      totalPYQ,
      pendingLinks,
    ] = await Promise.all([
      // Total visits
      prisma.visit.count(),

      // Visits in last 7 days
      prisma.visit.count({ where: { createdAt: { gte: last7Days } } }),

      // Visits in last 30 days
      prisma.visit.count({ where: { createdAt: { gte: last30Days } } }),

      // Unique visitors (by hashed IP) in last 7 days
      prisma.visit.groupBy({
        by: ["ip"],
        where: { createdAt: { gte: last7Days } },
        _count: true,
      }).then(res => res.length),

      // Unique visitors in last 30 days
      prisma.visit.groupBy({
        by: ["ip"],
        where: { createdAt: { gte: last30Days } },
        _count: true,
      }).then(res => res.length),

      // Top 10 pages by visits (using raw query for proper ordering)
      prisma.$queryRaw`
        SELECT path, COUNT(*)::int as views
        FROM "Visit"
        GROUP BY path
        ORDER BY views DESC
        LIMIT 10
      ` as Promise<Array<{ path: string; views: number }>>,

      // Daily visits for chart (last 14 days)
      prisma.$queryRaw`
        SELECT DATE("createdAt") as date, COUNT(*)::int as count
        FROM "Visit"
        WHERE "createdAt" >= ${subDays(today, 14)}
        GROUP BY DATE("createdAt")
        ORDER BY date ASC
      `,

      // Total active users
      prisma.user.count({ where: { status: "ACTIVE" } }),

      // Total content counts
      prisma.notes.count(),
      prisma.syllabus.count(),
      prisma.pYQ.count(),

      // Pending public link submissions
      prisma.publicLink.count({ where: { status: "PENDING" } }),
    ]);

    // Calculate growth
    const prev7Days = subDays(last7Days, 7);
    const prev7DaysVisits = await prisma.visit.count({
      where: { createdAt: { gte: prev7Days, lt: last7Days } },
    });
    const growth7Days = prev7DaysVisits > 0
      ? ((last7DaysVisits - prev7DaysVisits) / prev7DaysVisits) * 100
      : 0;

    const prev30Days = subDays(last30Days, 30);
    const prev30DaysVisits = await prisma.visit.count({
      where: { createdAt: { gte: prev30Days, lt: last30Days } },
    });
    const growth30Days = prev30DaysVisits > 0
      ? ((last30DaysVisits - prev30DaysVisits) / prev30DaysVisits) * 100
      : 0;

    const stats: AnalyticsStats = {
      overview: {
        totalVisits,
        visits7Days: last7DaysVisits,
        visits30Days: last30DaysVisits,
        uniqueVisitors7Days,
        uniqueVisitors30Days,
        growth7Days: Math.round(growth7Days * 10) / 10,
        growth30Days: Math.round(growth30Days * 10) / 10,
      },
      topPages,
      dailyVisits: (dailyVisits as Array<{ date: Date; count: number }>).map(d => ({
        date: format(new Date(d.date), "MMM dd"),
        views: d.count,
      })),
      content: {
        totalUsers,
        totalNotes,
        totalSyllabus,
        totalPYQ,
        pendingSubmissions: pendingLinks,
      },
    };

    // Cache for 5 minutes
    await cacheSet(ANALYTICS_CACHE_KEY, stats, { expire: ANALYTICS_CACHE_TTL });

    return NextResponse.json(stats, {
      status: 200,
      headers: { "X-Cache": "MISS" },
    });
  } catch (error) {
    console.error("Analytics stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}

interface AnalyticsStats {
  overview: {
    totalVisits: number;
    visits7Days: number;
    visits30Days: number;
    uniqueVisitors7Days: number;
    uniqueVisitors30Days: number;
    growth7Days: number;
    growth30Days: number;
  };
  topPages: Array<{ path: string; views: number }>;
  dailyVisits: Array<{ date: string; views: number }>;
  content: {
    totalUsers: number;
    totalNotes: number;
    totalSyllabus: number;
    totalPYQ: number;
    pendingSubmissions: number;
  };
}