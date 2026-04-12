import prisma from "@/lib/prisma";
import { syllabusSchema } from "@/schema/upload";
import { stackServerApp } from "@/stack/server";
import { NextRequest, NextResponse } from "next/server";
import { cacheGet, cacheSet, cacheDelete, getCachedUser } from "@/lib/cache";
import limiter from "@/lib/rateLimit";

import { treeifyError } from "zod";

const CACHE_KEY = "syllabus:all";
const CACHE_TTL = 86400; // 1 day

export async function GET() {
  try {
    // Try cache first
    const cached = await cacheGet<unknown>(CACHE_KEY);
    if (cached) {
      return NextResponse.json(cached, {
        status: 200,
        headers: { "X-Cache": "HIT", "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
      });
    }

    const data = await prisma.syllabus.findMany({
      orderBy: { createdAt: "asc" },
    });

    // Store in cache
    await cacheSet(CACHE_KEY, data, { expire: CACHE_TTL });

    return NextResponse.json(data, {
      status: 200,
      headers: { "X-Cache": "MISS", "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
    });
  } catch (error) {
    // console.log(error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch syllabus",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 10 requests per minute per IP
    try {
      limiter.checkNext(req, 10);
    } catch {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    const parsed = syllabusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: treeifyError(parsed.error),
        },
        { status: 400 },
      );
    }

    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "You are not authorized. Please signin to get access.",
        },
        { status: 401 },
      );
    }

    const data = await getCachedUser(user.id);

    if (!data || data.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Only admins can publish notes." },
        { status: 403 },
      );
    }

    const saved = await prisma.syllabus.create({ data: parsed.data });

    // Invalidate cache
    await cacheDelete(CACHE_KEY);

    return NextResponse.json(
      {
        message: "Syllabus added successfully.",
        data: saved,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Internal server error.",
      },
      { status: 500 },
    );
  }
}
