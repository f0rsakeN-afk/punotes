import { NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import crypto from "crypto";
import { rateLimiters } from "@/lib/rateLimit";
import { sanitizeError, ERROR_MESSAGES } from "@/lib/sanitizeError";

export async function POST(req: Request) {
  try {
    // Rate limit: 60 requests per minute (silent tracking, generous limit)
    const rateLimit = await rateLimiters.lenient(req);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.RATE_LIMITED },
        { status: 429 }
      );
    }

    const { path, referrer } = await req.json();

    const stackUser = await stackServerApp.getUser();
    const headerList = await headers();
    const userAgent = headerList.get("user-agent") || "unknown";
    const forwarded = headerList.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    // Hash IP for privacy - we only need uniqueness, not identity
    const hashedIp = crypto.createHash("sha256").update(ip).digest("hex");

    let userId = null;
    if (stackUser) {
      const user = await prisma.user.findUnique({
        where: { stackID: stackUser.id },
        select: { id: true },
      });
      userId = user?.id;
    }

    // Don't await - fire and forget for performance
    prisma.visit.create({
      data: {
        path: path?.slice(0, 200) || "/",
        referrer: referrer?.slice(0, 500),
        userAgent: userAgent.slice(0, 500),
        ip: hashedIp,
        userId,
      },
    }).catch((err) => console.error("Visit tracking error:", sanitizeError(err)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics track error:", sanitizeError(error));
    return NextResponse.json({ error: ERROR_MESSAGES.SERVER_ERROR }, { status: 500 });
  }
}
