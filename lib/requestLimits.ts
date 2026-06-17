import { NextRequest, NextResponse } from "next/server";

export const MAX_BODY_SIZE = 100 * 1024; // 100KB

/**
 * Validate request body size
 * Returns error response if body is too large, null otherwise
 */
export function validateBodySize(request: NextRequest): NextResponse | null {
  const contentLength = request.headers.get("content-length");

  if (contentLength) {
    const size = parseInt(contentLength, 10);
    if (size > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: `Request body too large. Maximum size is ${MAX_BODY_SIZE / 1024}KB` },
        { status: 413 }
      );
    }
  }

  return null;
}