import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cacheGet, cacheSet, buildCacheKey } from "@/lib/cache";

const CACHE_TTL = 86400; // 1 day

export async function GET(
  req: Request,
  { params }: { params: Promise<{ semester: string; branch: string }> },
) {
  try {
    const { branch: rawBranch, semester } = await params;
    const branch = decodeURIComponent(rawBranch).replace(/-/g, " ");

    // Build cache key based on branch and semester
    const cacheKey = buildCacheKey("pdfs", branch, semester);

    // Try cache first
    const cached = await cacheGet<unknown>(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        status: 200,
        headers: { "X-Cache": "HIT", "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
      });
    }

    const data = await prisma.notes.findMany({
      where: {
        branch: {
          contains: branch,
          mode: "insensitive",
        },
        semester: semester,
      },
      orderBy: { createdAt: "asc" },
    });
    // console.log(data,"naresh");

    // Store in cache
    await cacheSet(cacheKey, data, { expire: CACHE_TTL });

    return NextResponse.json(data, {
      status: 200,
      headers: { "X-Cache": "MISS", "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch data.",
      },
      { status: 500 },
    );
  }
}
