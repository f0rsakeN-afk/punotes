import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://punotes.vercel.app",
  "https://nareshrajbanshi.com.np",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply to API routes
  if (!pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Get origin header
  const origin = request.headers.get("origin");
  const isAllowedOrigin = origin && ALLOWED_ORIGINS.includes(origin);

  // Build base response
  const response = NextResponse.next();

  // Security headers for all API responses
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.vercel.app https://*.neon.tech"
  );

  // CORS headers
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }

  // Handle preflight OPTIONS
  if (request.method === "OPTIONS") {
    const optionsResponse = new NextResponse(null, { status: 204 });
    optionsResponse.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    optionsResponse.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, X-CSRF-Token"
    );
    optionsResponse.headers.set("Access-Control-Max-Age", "86400");
    optionsResponse.headers.set("Access-Control-Allow-Credentials", "true");
    if (isAllowedOrigin) {
      optionsResponse.headers.set("Access-Control-Allow-Origin", origin);
    }
    return optionsResponse;
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
