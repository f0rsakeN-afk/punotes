import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { NextRequest, NextResponse } from "next/server";
import { getCachedUser } from "@/lib/cache";
import { rateLimiters } from "@/lib/rateLimit";
import { ERROR_MESSAGES } from "@/lib/sanitizeError";

export async function GET(req: NextRequest) {
  try {
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
        { message: "You are not authorized. Please signin to get access." },
        { status: 401 },
      );
    }

    const data = await getCachedUser(user.id);

    return NextResponse.json(
      { data },
      {
        status: 200,
        headers: { "Cache-Control": "private, max-age=60, stale-while-revalidate=120" },
      },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error." },
      { status: 500 },
    );
  }
}
