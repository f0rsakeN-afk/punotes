import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cacheGet, cacheSet } from "@/lib/cache";

const STATS_CACHE_KEY = "stats:about";
const STATS_CACHE_TTL = 3600; // 1 hour

export async function GET() {
  try {
    // Try cache first
    const cached = await cacheGet<{
      userCount: number;
      notesCount: number;
      syllabusCount: number;
      pyqCount: number;
    }>(STATS_CACHE_KEY);
    if (cached) {
      return NextResponse.json(cached, {
        status: 200,
        headers: {
          "X-Cache": "HIT",
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
        },
      });
    }

    const [userCount, notesCount, syllabusCount, pyqCount] = await Promise.all([
      prisma.user.count({ where: { status: "ACTIVE" } }),
      prisma.notes.count(),
      prisma.syllabus.count(),
      prisma.pYQ.count(),
    ]);

    const stats = { userCount, notesCount, syllabusCount, pyqCount };

    // Cache for 1 hour
    await cacheSet(STATS_CACHE_KEY, stats, { expire: STATS_CACHE_TTL });

    return NextResponse.json(stats, {
      status: 200,
      headers: {
        "X-Cache": "MISS",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}