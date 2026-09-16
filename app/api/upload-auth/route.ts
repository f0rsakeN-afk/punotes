import { NextRequest, NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";
import { stackServerApp } from "@/stack/server";
import { rateLimiters } from "@/lib/rateLimit";
import { sanitizeError, ERROR_MESSAGES } from "@/lib/sanitizeError";

export async function GET(req: NextRequest) {
  try {
    // GET is safe method - CSRF not required (validateCsrf skips SAFE_METHODS anyway)
    // Removed dead validateCsrf call for GET to avoid confusion

    // Rate limit: 30 requests per minute
    const rateLimit = await rateLimiters.standard(req);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.RATE_LIMITED },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": String(rateLimit.remaining),
            "X-RateLimit-Reset": String(rateLimit.reset),
          },
        },
      );
    }

    // Auth check
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.AUTH_REQUIRED },
        { status: 401 },
      );
    }

    const { token, expire, signature } = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    });

    return NextResponse.json({
      token,
      expire,
      signature,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    console.error("Auth params error:", sanitizeError(error));
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVER_ERROR },
      { status: 500 },
    );
  }
}
