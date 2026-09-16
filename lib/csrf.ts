import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://punotes.vercel.app",
  "https://nareshrajbanshi.com.np",
];

export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  try {
    const normalized = new URL(origin).origin;
    if ((normalized.includes("localhost") || normalized.includes("127.0.0.1")) && process.env.NODE_ENV === "production") {
      return false;
    }
    return ALLOWED_ORIGINS.includes(normalized);
  } catch {
    return false;
  }
}

/**
 * Validate CSRF for Server Actions (uses headers() API)
 */
export async function validateCsrfForAction(): Promise<void> {
  const hdrs = await headers();
  const origin = hdrs.get("origin");
  const referer = hdrs.get("referer");

  if (!origin && !referer) {
    if (process.env.ALLOW_MISSING_ORIGIN === "true" && process.env.NODE_ENV === "development") return;
    throw new Error("CSRF validation failed: missing origin");
  }

  if (origin && !isAllowedOrigin(origin)) {
    throw new Error("CSRF validation failed: invalid origin");
  }

  if (referer) {
    try {
      const refererOrigin = new URL(referer).origin;
      if (!ALLOWED_ORIGINS.includes(refererOrigin) && !isAllowedOrigin(refererOrigin)) {
        throw new Error("CSRF validation failed: invalid referer");
      }
    } catch {
      throw new Error("CSRF validation failed: malformed referer");
    }
  }

  // Optional double-submit token validation if X-CSRF-Token header is present
  const csrfToken = hdrs.get("x-csrf-token");
  const cookieToken = hdrs.get("cookie")?.match(/csrf_token=([^;]+)/)?.[1];
  if (csrfToken && cookieToken && csrfToken !== cookieToken) {
    throw new Error("CSRF validation failed: token mismatch");
  }
}

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

  // If neither origin nor referer is present, reject (except when explicitly allowed)
  if (!origin && !referer) {
    if (process.env.ALLOW_MISSING_ORIGIN === "true" && process.env.NODE_ENV === "development") {
      return null; // Allow only when explicitly opted-in via env
    }
    return NextResponse.json(
      { error: "CSRF validation failed: missing origin" },
      { status: 403 }
    );
  }

  // Check origin if present - normalize via URL parsing
  if (origin) {
    try {
      const normalizedOrigin = new URL(origin).origin;
      // Restrict localhost to dev only
      const isLocalhost = normalizedOrigin.includes("localhost") || normalizedOrigin.includes("127.0.0.1");
      if (isLocalhost && process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { error: "CSRF validation failed: localhost not allowed in production" },
          { status: 403 }
        );
      }
      if (!ALLOWED_ORIGINS.includes(normalizedOrigin)) {
        return NextResponse.json(
          { error: "CSRF validation failed: invalid origin" },
          { status: 403 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: "CSRF validation failed: malformed origin" },
        { status: 403 }
      );
    }
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