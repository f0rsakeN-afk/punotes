import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { rateLimiters } from "@/lib/rateLimit";
import { validateCsrf } from "@/lib/csrf";
import { validateBodySize } from "@/lib/requestLimits";
import { sanitizeError, ERROR_MESSAGES } from "@/lib/sanitizeError";

export async function POST(request: NextRequest) {
  try {
    // CSRF validation - webhooks may have different origins
    const csrfError = validateCsrf(request);
    if (csrfError) return csrfError;

    // Body size validation
    const sizeError = validateBodySize(request);
    if (sizeError) return sizeError;

    // Rate limit: 100 requests per minute (webhook endpoint)
    const rateLimit = await rateLimiters.webhook(request);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.RATE_LIMITED },
        { status: 429, headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.reset) } }
      );
    }

    const { secret, path } = await request.json();

    // Simple secret-based validation (in production, use a more secure method)
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: "Invalid revalidate secret" },
        { status: 401 }
      );
    }

    if (!path) {
      return NextResponse.json(
        { error: "Path is required" },
        { status: 400 }
      );
    }

    revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      path: path,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidate error:", sanitizeError(error));
    return NextResponse.json(
      {
        error: ERROR_MESSAGES.SERVER_ERROR,
      },
      { status: 500 }
    );
  }
}
