import { NextRequest, NextResponse } from "next/server";

export const MAX_BODY_SIZE = 100 * 1024; // 100KB

/**
 * Validate request body size via Content-Length header (fast path)
 * Returns error response if body is too large, null otherwise
 */
export function validateBodySize(request: NextRequest): NextResponse | null {
  const contentLength = request.headers.get("content-length");

  if (contentLength) {
    const size = parseInt(contentLength, 10);
    if (!isNaN(size) && size > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: `Request body too large. Maximum size is ${MAX_BODY_SIZE / 1024}KB` },
        { status: 413 }
      );
    }
  }

  // If no content-length (chunked), still allow but we validate after parsing
  return null;
}

/**
 * Validate actual parsed body size (protects chunked / missing header bypass)
 * Call after await req.json() or req.text()
 */
export function validateParsedBodySize(body: unknown): NextResponse | null {
  try {
    const size = JSON.stringify(body).length;
    if (size > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: `Request body too large. Maximum size is ${MAX_BODY_SIZE / 1024}KB` },
        { status: 413 }
      );
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  return null;
}