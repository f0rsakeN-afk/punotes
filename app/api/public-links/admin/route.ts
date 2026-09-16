import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getStackUser, getCurrentUser } from "@/lib/auth";
import { z } from "zod";
import { rateLimiters } from "@/lib/rateLimit";
import { validateCsrf } from "@/lib/csrf";
import { validateBodySize, validateParsedBodySize } from "@/lib/requestLimits";
import { sanitizeError, ERROR_MESSAGES } from "@/lib/sanitizeError";

const reviewSchema = z.object({
  id: z.string().cuid("Invalid ID"),
  status: z.enum(["APPROVED", "REJECTED"]),
  adminNotes: z.string().max(500).optional().refine((v) => !v || !/[<>]/.test(v), "Invalid adminNotes"),
});

export async function GET(req: NextRequest) {
  try {
    const rateLimit = await rateLimiters.standard(req);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.RATE_LIMITED },
        { status: 429, headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.reset) } }
      );
    }

    const user = await getStackUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await getCurrentUser();
    if (!userData || userData.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const where = status ? { status: status as "PENDING" | "APPROVED" | "REJECTED" } : {};

    const links = await prisma.publicLink.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(links, {
      headers: { "Cache-Control": "private, max-age=30, stale-while-revalidate=60" },
    });
  } catch (error) {
    console.error("Error fetching admin public links:", sanitizeError(error));
    return NextResponse.json({ error: ERROR_MESSAGES.SERVER_ERROR }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    // CSRF validation
    const csrfError = validateCsrf(req);
    if (csrfError) return csrfError;

    // Body size validation
    const sizeError = validateBodySize(req);
    if (sizeError) return sizeError;

    // Rate limit: 30 requests per minute
    const rateLimit = await rateLimiters.standard(req);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.RATE_LIMITED },
        { status: 429, headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.reset) } }
      );
    }

    const user = await getStackUser();

    if (!user) {
      return NextResponse.json({ error: ERROR_MESSAGES.AUTH_REQUIRED }, { status: 401 });
    }

    const userData = await getCurrentUser();
    if (!userData || userData.role !== "ADMIN") {
      return NextResponse.json({ error: ERROR_MESSAGES.FORBIDDEN }, { status: 403 });
    }

    const body = await req.json();
    const sizeErr = validateParsedBodySize(body);
    if (sizeErr) return sizeErr;

    const parsed = reviewSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }
    const { id, status, adminNotes } = parsed.data;

    const existing = await prisma.publicLink.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    const link = await prisma.publicLink.update({
      where: { id },
      data: {
        status,
        adminNotes: adminNotes || null,
      },
    });

    return NextResponse.json({ message: `Link ${status.toLowerCase()} successfully`, data: link });
  } catch (error) {
    console.error("Error updating public link:", sanitizeError(error));
    return NextResponse.json({ error: ERROR_MESSAGES.SERVER_ERROR }, { status: 500 });
  }
}
