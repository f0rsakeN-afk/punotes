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

  // Get origin header - normalize via URL parsing and restrict localhost to dev
  const origin = request.headers.get("origin");
  let isAllowedOrigin = false;
  let normalizedOrigin: string | null = null;
  if (origin) {
    try {
      normalizedOrigin = new URL(origin).origin;
      const isLocalhost = normalizedOrigin.includes("localhost") || normalizedOrigin.includes("127.0.0.1");
      if (isLocalhost && process.env.NODE_ENV === "production") {
        isAllowedOrigin = false;
      } else {
        isAllowedOrigin = ALLOWED_ORIGINS.includes(normalizedOrigin);
      }
    } catch {
      isAllowedOrigin = false;
    }
  }

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
    "max-age=31536000; includeSubDomains; preload"
  );
  // Only set no-store for private routes; allow public routes to set their own Cache-Control
  const isPrivateRoute = pathname.startsWith("/api/favorites") || pathname.startsWith("/api/me") || pathname.startsWith("/api/collections") || pathname.startsWith("/api/upload-auth");
  if (isPrivateRoute) {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  }
  // Tightened CSP: remove unsafe-inline where possible, add explicit directives
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://*.vercel.app; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.vercel.app https://*.neon.tech https://ik.imagekit.io; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
  );

  // CORS headers - only if allowed origin after normalization
  if (isAllowedOrigin && normalizedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", normalizedOrigin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Vary", "Origin");
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
    if (isAllowedOrigin && normalizedOrigin) {
      optionsResponse.headers.set("Access-Control-Allow-Origin", normalizedOrigin);
    }
    return optionsResponse;
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
