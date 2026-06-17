import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { cacheGet, cacheSet, cacheDelete, buildCacheKey } from "@/lib/cache";
import { z } from "zod";
import { rateLimiters } from "@/lib/rateLimit";
import { validateCsrf } from "@/lib/csrf";
import { validateBodySize } from "@/lib/requestLimits";
import { sanitizeError, ERROR_MESSAGES } from "@/lib/sanitizeError";

const updateSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  description: z.string().max(200).optional(),
});

const COLLECTION_CACHE_TTL = 300; // 5 minutes

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { id } = await params;

    // Try cache first
    const cacheKey = buildCacheKey("collection", id);
    const cached = await cacheGet<unknown>(cacheKey);
    if (cached) {
      return NextResponse.json(
        { data: cached, cached: true },
        { headers: { "Cache-Control": "private, max-age=60, stale-while-revalidate=300" } }
      );
    }

    const collection = await prisma.collection.findFirst({
      where: { id, userId: user.id },
      include: {
        items: {
          include: {
            favorite: {
              select: { type: true, itemId: true },
            },
          },
          orderBy: { addedAt: "desc" },
        },
      },
    });

    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    const data = {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      items: collection.items.map((item) => ({
        id: item.id,
        type: item.favorite.type,
        itemId: item.favorite.itemId,
        addedAt: item.addedAt,
      })),
      createdAt: collection.createdAt,
    };

    // Cache for 5 minutes
    await cacheSet(cacheKey, data, { expire: COLLECTION_CACHE_TTL });

    return NextResponse.json(
      { data, cached: false },
      { headers: { "Cache-Control": "private, max-age=60, stale-while-revalidate=300" } }
    );
  } catch (error) {
    console.error("Error fetching collection:", error);
    return NextResponse.json({ error: "Failed to fetch collection" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
        { error: ERROR_MESSAGES.RATE_LIMITED },
        { status: 429, headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.reset) } }
      );
    }

    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: ERROR_MESSAGES.AUTH_REQUIRED }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const collection = await prisma.collection.findFirst({
      where: { id, userId: user.id },
    });

    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    const updated = await prisma.collection.update({
      where: { id },
      data: {
        name: parsed.data.name,
        description: parsed.data.description,
      },
    });

    // Invalidate cache
    await cacheDelete(buildCacheKey("collection", id));
    await cacheDelete(buildCacheKey("collections", user.id));

    return NextResponse.json({ id: updated.id, name: updated.name });
  } catch (error) {
    console.error("Error updating collection:", sanitizeError(error));
    return NextResponse.json({ error: ERROR_MESSAGES.SERVER_ERROR }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
        { error: ERROR_MESSAGES.RATE_LIMITED },
        { status: 429, headers: { "X-RateLimit-Remaining": String(rateLimit.remaining), "X-RateLimit-Reset": String(rateLimit.reset) } }
      );
    }

    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: ERROR_MESSAGES.AUTH_REQUIRED }, { status: 401 });
    }

    const { id } = await params;

    const collection = await prisma.collection.findFirst({
      where: { id, userId: user.id },
    });

    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    await prisma.collection.delete({ where: { id } });

    // Invalidate cache
    await cacheDelete(buildCacheKey("collection", id));
    await cacheDelete(buildCacheKey("collections", user.id));

    return NextResponse.json({ message: "Collection deleted" });
  } catch (error) {
    console.error("Error deleting collection:", sanitizeError(error));
    return NextResponse.json({ error: ERROR_MESSAGES.SERVER_ERROR }, { status: 500 });
  }
}
