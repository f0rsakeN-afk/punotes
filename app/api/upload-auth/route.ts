import { NextRequest, NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";
import { stackServerApp } from "@/stack/server";
import { rateLimiters } from "@/lib/rateLimit";
import { validateCsrf } from "@/lib/csrf";
import { sanitizeError, ERROR_MESSAGES } from "@/lib/sanitizeError";

export async function GET(req: NextRequest) {
  try {
    // CSRF validation
    const csrfError = validateCsrf(req);
    if (csrfError) return csrfError;

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
