import prisma from "@/lib/prisma";
import { feedbackSchema } from "@/schema/feedbackSchema";
import { stackServerApp } from "@/stack/server";
import { NextRequest, NextResponse } from "next/server";
import { treeifyError } from "zod";
import { rateLimiters } from "@/lib/rateLimit";
import { getCachedUser, cacheGet, cacheSet, cacheDelete } from "@/lib/cache";
import { validateCsrf } from "@/lib/csrf";
import { validateBodySize } from "@/lib/requestLimits";
import { sanitizeError, ERROR_MESSAGES } from "@/lib/sanitizeError";

const FEEDBACK_CACHE_KEY = "feedback:all";
const FEEDBACK_CACHE_TTL = 3600; // 1 hour

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

    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json(
        {
          message: ERROR_MESSAGES.AUTH_REQUIRED,
        },
        { status: 401 },
      );
    }

    const body = await req.json();

    const parsed = feedbackSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: treeifyError(parsed.error) },
        { status: 400 },
      );
    }

    const saved = await prisma.feedback.create({
      data: { ...parsed.data },
    });

    // Invalidate feedback cache
    await cacheDelete(FEEDBACK_CACHE_KEY);

    return NextResponse.json(
      { message: "Feedback submitted", data: saved },
      { status: 200 },
    );
  } catch (error) {
    console.error("Feedback error:", sanitizeError(error));
    return NextResponse.json(
      {
        error: ERROR_MESSAGES.SERVER_ERROR,
      },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json(
        { message: ERROR_MESSAGES.AUTH_REQUIRED },
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

    // Rate limit: 30 requests per minute
    const rateLimit = await rateLimiters.standard(req as NextRequest);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.RATE_LIMITED },
        { status: 429, headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.reset) } }
      );
    }

    // Try cache first
    const cached = await cacheGet<unknown>(FEEDBACK_CACHE_KEY);
    if (cached) {
      return NextResponse.json(
        { data: cached },
        { status: 200, headers: { "Cache-Control": "private, max-age=60, stale-while-revalidate=120" } }
      );
    }

    const feedbackData = await prisma.feedback.findMany({
      select: { id: true, email: true, name: true, message: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });

    // Cache the result
    await cacheSet(FEEDBACK_CACHE_KEY, feedbackData, { expire: FEEDBACK_CACHE_TTL });

    return NextResponse.json(
      { data: feedbackData },
      { status: 200, headers: { "Cache-Control": "private, max-age=60, stale-while-revalidate=120" } }
    );
  } catch (error) {
    console.error("Feedback fetch error:", sanitizeError(error));
    return NextResponse.json(
      {
        error: ERROR_MESSAGES.SERVER_ERROR,
      },
      { status: 500 },
    );
  }
}
