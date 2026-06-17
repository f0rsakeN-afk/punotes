import prisma from "@/lib/prisma";
import { pyqSchema } from "@/schema/upload";
import { stackServerApp } from "@/stack/server";
import { NextRequest, NextResponse } from "next/server";
import { cacheGet, cacheSet, cacheDelete, cacheDeletePattern, getCachedUser } from "@/lib/cache";
import { rateLimiters } from "@/lib/rateLimit";
import { treeifyError } from "zod";
import { validateCsrf } from "@/lib/csrf";
import { validateBodySize } from "@/lib/requestLimits";
import { sanitizeError, ERROR_MESSAGES } from "@/lib/sanitizeError";

const CACHE_KEY = "pyqs:all";
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

    const data = await prisma.pYQ.findMany({
      orderBy: { createdAt: "asc" },
    });

    // Store in cache
    await cacheSet(CACHE_KEY, data, { expire: CACHE_TTL });

    return NextResponse.json(data, {
      status: 200,
      headers: { "X-Cache": "MISS", "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: ERROR_MESSAGES.SERVER_ERROR,
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // CSRF validation
    const csrfError = validateCsrf(req);
    if (csrfError) return csrfError;

    // Body size validation
    const sizeError = validateBodySize(req);
    if (sizeError) return sizeError;

    // Rate limit: 10 requests per minute
    const rateLimit = await rateLimiters.strict(req);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.RATE_LIMITED },
        { status: 429, headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.reset) } }
      );
    }

    const body = await req.json();

    const parsed = pyqSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: ERROR_MESSAGES.VALIDATION_ERROR,
          details: treeifyError(parsed.error),
        },
        { status: 400 },
      );
    }

    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json(
        {
          message: ERROR_MESSAGES.AUTH_REQUIRED,
        },
        { status: 401 },
      );
    }

    const data = await getCachedUser(user.id);

    if (!data || data.role !== "ADMIN") {
      return NextResponse.json(
        { message: ERROR_MESSAGES.FORBIDDEN },
        { status: 403 },
      );
    }

    const saved = await prisma.pYQ.create({ data: parsed.data });

    // Invalidate cache
    await cacheDelete(CACHE_KEY);

    // Invalidate about page stats cache
    await cacheDelete("stats:about");

    // Invalidate search caches
    await cacheDelete("search:all");
    await cacheDeletePattern("search:query:*");

    return NextResponse.json(
      {
        message: "PYQs added successfully.",
        data: saved,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PYQ upload error:", sanitizeError(error));
    return NextResponse.json(
      {
        error: ERROR_MESSAGES.SERVER_ERROR,
      },
      { status: 500 },
    );
  }
}
