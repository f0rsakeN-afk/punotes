import { NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import crypto from "crypto";
import { rateLimiters } from "@/lib/rateLimit";
import { sanitizeError, ERROR_MESSAGES } from "@/lib/sanitizeError";
import { z } from "zod";
import { validateParsedBodySize } from "@/lib/requestLimits";

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

    const body = await req.json();
    const sizeErr = validateParsedBodySize(body);
    if (sizeErr) return sizeErr;

    const analyticsSchema = z.object({
      path: z.string().max(500).refine((v) => v.startsWith("/") && !/[<>]/.test(v), "Invalid path"),
      referrer: z.string().max(500).optional().refine((v) => !v || !/[<>]/.test(v), "Invalid referrer"),
    });
    const parsed = analyticsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }
    const { path, referrer } = parsed.data;

    const stackUser = await stackServerApp.getUser();
    const headerList = await headers();
    const userAgent = headerList.get("user-agent") || "unknown";
    const forwarded = headerList.get("x-forwarded-for");
    const realIp = headerList.get("x-real-ip");
    const ip = (realIp || (forwarded ? forwarded.split(",")[0].trim() : "unknown")).trim();

    // HMAC with salt for privacy - prevents rainbow table reversal
    const salt = process.env.ANALYTICS_SALT || "default-salt-change-in-production";
    const hashedIp = crypto.createHmac("sha256", salt).update(ip).digest("hex");

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
