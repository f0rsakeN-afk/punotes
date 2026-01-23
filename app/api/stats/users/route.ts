import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import prisma from "@/lib/prisma";
import { subDays, startOfDay } from "date-fns";

/**
 * GET /api/stats/users
 * Fetch user statistics
 * Auth: Admin only
 *
 * Returns:
 * {
 *   totalUsers: number,
 *   activeUsers: number,
 *   suspendedUsers: number,
 *   bannedUsers: number,
 *   adminCount: number,
 *   userCount: number,
 *   growth: {
 *     thisWeek: number,
 *     thisMonth: number
 *   },
 *   statusBreakdown: { ACTIVE: number, SUSPENDED: number, BANNED: number },
 *   roleDistribution: { USER: number, ADMIN: number }
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

    // Get all user counts
    const [
      totalUsers,
      activeUsers,
      suspendedUsers,
      bannedUsers,
      admins,
      regularUsers,
      usersThisWeek,
      usersThisMonth,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: "ACTIVE" } }),
      prisma.user.count({ where: { status: "SUSPENDED" } }),
      prisma.user.count({ where: { status: "BANNED" } }),
      prisma.user.count({ where: { role: "ADMIN" } }),
      prisma.user.count({ where: { role: "USER" } }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfDay(subDays(new Date(), 7)),
          },
        },
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfDay(subDays(new Date(), 30)),
          },
        },
      }),
    ]);

    // Get previous counts for growth calculation
    const usersLastWeek = await prisma.user.count({
      where: {
        createdAt: {
          gte: startOfDay(subDays(new Date(), 14)),
          lt: startOfDay(subDays(new Date(), 7)),
        },
      },
    });

    const usersLastMonth = await prisma.user.count({
      where: {
        createdAt: {
          gte: startOfDay(subDays(new Date(), 60)),
          lt: startOfDay(subDays(new Date(), 30)),
        },
      },
    });

    // Calculate growth percentages
    const weeklyGrowth = usersLastWeek > 0 ? ((usersThisWeek - usersLastWeek) / usersLastWeek) * 100 : 0;
    const monthlyGrowth = usersLastMonth > 0 ? ((usersThisMonth - usersLastMonth) / usersLastMonth) * 100 : 0;

    const stats = {
      totalUsers,
      activeUsers,
      suspendedUsers,
      bannedUsers,
      adminCount: admins,
      userCount: regularUsers,
      growth: {
        thisWeek: usersThisWeek,
        weeklyGrowthPercent: parseFloat(weeklyGrowth.toFixed(2)),
        thisMonth: usersThisMonth,
        monthlyGrowthPercent: parseFloat(monthlyGrowth.toFixed(2)),
      },
      statusBreakdown: {
        ACTIVE: activeUsers,
        SUSPENDED: suspendedUsers,
        BANNED: bannedUsers,
      },
      roleDistribution: {
        USER: regularUsers,
        ADMIN: admins,
      },
    };

    const response = NextResponse.json(stats);
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=120"
    );

    return response;
  } catch (error) {
    console.error("Error fetching user statistics:", error);
    return NextResponse.json(
      { error: "Failed to fetch user statistics" },
      { status: 500 }
    );
  }
}
