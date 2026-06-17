import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { cacheGet, cacheSet, cacheDelete, buildCacheKey } from "@/lib/cache";
import { z } from "zod";
import { rateLimiters } from "@/lib/rateLimit";
import { validateCsrf } from "@/lib/csrf";
import { validateBodySize } from "@/lib/requestLimits";
import { sanitizeError, ERROR_MESSAGES } from "@/lib/sanitizeError";

const collectionSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  description: z.string().max(200).optional(),
});

const COLLECTION_CACHE_TTL = 3600; // 1 hour

export async function GET() {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Try cache first
    const cacheKey = buildCacheKey("collections", user.id);
    const cached = await cacheGet<unknown[]>(cacheKey);
    if (cached) {
      return NextResponse.json(
        { data: cached, cached: true },
        { headers: { "Cache-Control": "private, max-age=60, stale-while-revalidate=300" } }
      );
    }

    const collections = await prisma.collection.findMany({
      where: { userId: user.id },
      include: {
        _count: {
          select: { items: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const data = collections.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      itemCount: c._count.items,
      createdAt: c.createdAt,
    }));

    // Cache for 5 minutes
    await cacheSet(cacheKey, data, { expire: COLLECTION_CACHE_TTL });

    return NextResponse.json(
      { data, cached: false },
      { headers: { "Cache-Control": "private, max-age=60, stale-while-revalidate=300" } }
    );
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // CSRF validation
    const csrfError = validateCsrf(req);
    if (csrfError) return csrfError;

    // Body size validation
    const sizeError = validateBodySize(req);
    if (sizeError) return sizeError;

    // Rate limit: 20 requests per minute
    const rateLimit = await rateLimiters.strict(req);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.RATE_LIMITED, remaining: rateLimit.remaining },
        { status: 429, headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.reset) } }
      );
    }

    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: ERROR_MESSAGES.AUTH_REQUIRED }, { status: 401 });
    }

    const body = await req.json();
    const parsed = collectionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    // Check for duplicate name
    const existing = await prisma.collection.findUnique({
      where: { userId_name: { userId: user.id, name: parsed.data.name } },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json({ error: "Collection with this name already exists" }, { status: 400 });
    }

    const collection = await prisma.collection.create({
      data: {
        userId: user.id,
        name: parsed.data.name,
        description: parsed.data.description,
      },
    });

    // Invalidate cache
    await cacheDelete(buildCacheKey("collections", user.id));

    return NextResponse.json({ id: collection.id, name: collection.name, itemCount: 0 }, { status: 201 });
  } catch (error) {
    console.error("Error creating collection:", sanitizeError(error));
    return NextResponse.json({ error: ERROR_MESSAGES.SERVER_ERROR }, { status: 500 });
  }
}
