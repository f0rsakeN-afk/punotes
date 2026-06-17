import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://punotes.vercel.app",
  "https://nareshrajbanshi.com.np",
];

const SAFE_METHODS = ["GET", "HEAD", "OPTIONS"];

/**
 * CSRF protection middleware
 * Validates Origin/Referer headers for state-changing requests
 */
export function validateCsrf(request: NextRequest): NextResponse | null {
  // Skip for safe methods
  if (SAFE_METHODS.includes(request.method)) {
    return null;
  }

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // If neither origin nor referer is present, reject (except in development)
  if (!origin && !referer) {
    if (process.env.NODE_ENV === "development") {
      return null; // Allow in dev for easier testing
    }
    return NextResponse.json(
      { error: "CSRF validation failed: missing origin" },
      { status: 403 }
    );
  }

  // Check origin if present
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json(
      { error: "CSRF validation failed: invalid origin" },
      { status: 403 }
    );
  }

  // Check referer if present (fallback for older browsers)
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const refererOrigin = refererUrl.origin;
      if (!ALLOWED_ORIGINS.includes(refererOrigin)) {
        return NextResponse.json(
          { error: "CSRF validation failed: invalid referer" },
          { status: 403 }
        );
      }
    } catch {
      // Invalid referer URL, reject
      return NextResponse.json(
        { error: "CSRF validation failed: malformed referer" },
        { status: 403 }
      );
    }
  }

  return null;
}