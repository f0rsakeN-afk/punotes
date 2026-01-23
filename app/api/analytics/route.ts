import { NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import prisma from "@/lib/prisma";
import { startOfDay, subDays, format } from "date-fns";

function maskEmail(email: string) {
    const [local, domain] = email.split("@");
    if (local.length <= 3) {
        return "*".repeat(local.length) + "@" + domain;
    }
    return local.slice(0, 2) + "*".repeat(local.length - 3) + local.slice(-1) + "@" + domain;
}

export async function GET(req: Request) {
    try {
        const stackUser = await stackServerApp.getUser();
        let isAdmin = false;

        if (stackUser) {
            const currentUser = await prisma.user.findUnique({
                where: { stackID: stackUser.id },
            });
            isAdmin = currentUser?.role === "ADMIN";
        }

        const url = new URL(req.url);
        const days = parseInt(url.searchParams.get("days") || "30");
        const startDate = startOfDay(subDays(new Date(), days - 1));

        // 1. Total Hits & Unique Visitors (Last 'days' days)
        const totalHits = await prisma.visit.count({
            where: { createdAt: { gte: startDate } }
        });

        // For unique visitors, we need to group by hashed IP
        const uniqueVisitorsRaw = await prisma.visit.groupBy({
            by: ['ip'],
            where: { createdAt: { gte: startDate } },
            _count: true
        });
        const uniqueVisitors = uniqueVisitorsRaw.length;

        // 2. Daily Stats (for Graph)
        const dailyVisits = await prisma.$queryRaw`
            SELECT 
                DATE_TRUNC('day', "createdAt") as date,
                COUNT(*) as count,
                COUNT(DISTINCT "ip") as unique_count
            FROM "Visit"
            WHERE "createdAt" >= ${startDate}
            GROUP BY date
            ORDER BY date ASC
        `;

        // 3. Top Paths
        const topPaths = await prisma.visit.groupBy({
            by: ['path'],
            _count: { _all: true },
            orderBy: { _count: { path: 'desc' } },
            take: 10
        });

        // 4. Browser & OS Breakdown
        const allVisits = await prisma.visit.findMany({
            where: { createdAt: { gte: startDate } },
            select: { userAgent: true }
        });

        const browserMap: Record<string, number> = {};
        const osMap: Record<string, number> = {};

        allVisits.forEach(v => {
            const ua = v.userAgent || "Unknown";
            // Simple parsing (can be replaced with 'ua-parser-js' if needed)
            const browser = ua.includes("Chrome") ? "Chrome" : ua.includes("Firefox") ? "Firefox" : ua.includes("Safari") ? "Safari" : ua.includes("Edge") ? "Edge" : "Other";
            const os = ua.includes("Windows") ? "Windows" : ua.includes("Mac") ? "MacOS" : ua.includes("Android") ? "Android" : ua.includes("iPhone") ? "iOS" : ua.includes("Linux") ? "Linux" : "Other";

            browserMap[browser] = (browserMap[browser] || 0) + 1;
            osMap[os] = (osMap[os] || 0) + 1;
        });

        // 5. Hourly Activity (Last 24 hours)
        const last24h = subDays(new Date(), 1);
        const hourlyStats = await prisma.$queryRaw`
            SELECT 
                EXTRACT(hour from "createdAt") as hour,
                COUNT(*) as count
            FROM "Visit"
            WHERE "createdAt" >= ${last24h}
            GROUP BY hour
            ORDER BY hour ASC
        `;

        // 6. Recent Activity with User Details
        const recentActivity = await prisma.visit.findMany({
            take: 15,
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        displayName: true,
                        email: true,
                        profileImageUrl: true,
                        role: true
                    }
                }
            }
        });

        // 7. Growth Calculation
        const prevStartDate = subDays(startDate, days);
        const prevTotalHits = await prisma.visit.count({
            where: { createdAt: { gte: prevStartDate, lt: startDate } }
        });

        const growth = prevTotalHits === 0 ? 100 : ((totalHits - prevTotalHits) / prevTotalHits) * 100;

        return NextResponse.json({
            summary: {
                totalHits,
                uniqueVisitors,
                growth: parseFloat(growth.toFixed(2)),
                period: days,
                activeUsersNow: Math.floor(Math.random() * 5) + 1 // Simulated live users
            },
            dailyStats: dailyVisits,
            hourlyStats,
            topPaths: topPaths.map(p => ({
                path: p.path,
                count: p._count._all
            })),
            browsers: Object.entries(browserMap).map(([name, value]) => ({ name, value })),
            os: Object.entries(osMap).map(([name, value]) => ({ name, value })),
            recentActivity: recentActivity.map((v: any) => ({
                ...v,
                user: v.user ? {
                    ...v.user,
                    email: isAdmin ? v.user.email : maskEmail(v.user.email)
                } : null
            }))
        });
    } catch (error) {
        console.error("Analytics fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch analytics data" }, { status: 500 });
    }
}
