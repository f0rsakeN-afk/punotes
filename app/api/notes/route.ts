import { NextRequest, NextResponse } from "next/server";
import { notesSchema } from "@/schema/upload";
import { stackServerApp } from "@/stack/server";
import prisma from "@/lib/prisma";
import { getCachedUser, cacheDelete, buildCacheKey, cacheDeletePattern } from "@/lib/cache";
import { rateLimiters } from "@/lib/rateLimit";
import { treeifyError } from "zod";
import { validateCsrf } from "@/lib/csrf";
import { validateBodySize } from "@/lib/requestLimits";
import { sanitizeError, ERROR_MESSAGES } from "@/lib/sanitizeError";

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

    const parsed = notesSchema.safeParse(body);

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
        {
          message: ERROR_MESSAGES.FORBIDDEN,
        },
        { status: 403 },
      );
    }

    const saved = await prisma.notes.create({ data: parsed.data });

    // Invalidate PDF cache for this branch/semester
    const cacheKey = buildCacheKey("pdfs", parsed.data.branch, parsed.data.semester);
    await cacheDelete(cacheKey);

    // Invalidate about page stats cache
    await cacheDelete("stats:about");

    // Invalidate search caches
    await cacheDelete("search:all");
    await cacheDeletePattern("search:query:*");

    return NextResponse.json(
      {
        message: "Notes uploaded successfully.",
        data: saved,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Notes upload error:", sanitizeError(error));
    return NextResponse.json(
      {
        error: ERROR_MESSAGES.SERVER_ERROR,
      },
      { status: 500 },
    );
  }
}
