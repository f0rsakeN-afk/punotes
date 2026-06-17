import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { rateLimiters } from "@/lib/rateLimit";
import { cacheGet, cacheSet, cacheDelete } from "@/lib/cache";
import { sanitizeError, ERROR_MESSAGES } from "@/lib/sanitizeError";

const LAYOUT_CACHE_TTL = 86400; // 24 hours

export async function GET() {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.AUTH_REQUIRED },
        { status: 401 }
      );
    }

    // Try cache first
    const cacheKey = `user:layout:${user.id}`;
    const cached = await cacheGet<unknown>(cacheKey);
    if (cached) {
      return NextResponse.json({ data: cached, cached: true });
    }

    // Fetch user's layout from database
    const dbUser = await prisma.user.findUnique({
      where: { stackID: user.id },
      select: { homeLayout: true },
    });

    const layout = dbUser?.homeLayout;

    // Cache the result
    if (layout) {
      await cacheSet(cacheKey, layout, { expire: LAYOUT_CACHE_TTL });
    }

    return NextResponse.json({ data: layout, cached: false });
  } catch (error) {
    console.error("Error fetching layout:", sanitizeError(error));
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVER_ERROR },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Rate limit: 30 requests per minute
    const rateLimit = await rateLimiters.standard(req);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.RATE_LIMITED },
        { status: 429, headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.reset) } }
      );
    }

    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.AUTH_REQUIRED },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Validate the layout structure
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid layout format" },
        { status: 400 }
      );
    }

    // Validate each section has required fields
    for (const section of body) {
      if (typeof section.id !== "string" || typeof section.enabled !== "boolean") {
        return NextResponse.json(
          { error: "Invalid section format" },
          { status: 400 }
        );
      }
    }

    // Update user's layout in database
    const updated = await prisma.user.update({
      where: { stackID: user.id },
      data: { homeLayout: body },
      select: { homeLayout: true },
    });

    // Invalidate cache
    const cacheKey = `user:layout:${user.id}`;
    await cacheDelete(cacheKey);

    return NextResponse.json({ data: updated.homeLayout });
  } catch (error) {
    console.error("Error saving layout:", sanitizeError(error));
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVER_ERROR },
      { status: 500 }
    );
  }
}