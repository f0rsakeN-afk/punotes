import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://punotes.vercel.app',
  'https://nareshrajbanshi.com.np',
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply to API routes
  if (!pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Get origin header
  const origin = request.headers.get('origin');
  const isAllowedOrigin = origin && ALLOWED_ORIGINS.includes(origin);

  // Build base response
  const response = pathname === '/api/feedback'
    ? NextResponse.next() // Passthrough for feedback (may need modifications)
    : NextResponse.next();

  // Security headers for all API responses
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // CORS headers
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  // Handle preflight OPTIONS
  if (request.method === 'OPTIONS') {
    const optionsResponse = new NextResponse(null, { status: 204 });
    optionsResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    optionsResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    optionsResponse.headers.set('Access-Control-Max-Age', '86400');
    if (isAllowedOrigin) {
      optionsResponse.headers.set('Access-Control-Allow-Origin', origin);
    }
    return optionsResponse;
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
