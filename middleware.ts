import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === "/advice" ||
    pathname.startsWith("/handler") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  const adviceSeen = request.cookies.get("advice_seen");
  if (!adviceSeen) {
    return NextResponse.redirect(new URL("/advice", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon|.*\\..*).*)"],
};
