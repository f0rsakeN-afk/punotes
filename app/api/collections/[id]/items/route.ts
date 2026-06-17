import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { cacheDelete, buildCacheKey } from "@/lib/cache";
import { z } from "zod";
import { rateLimiters } from "@/lib/rateLimit";
import { validateCsrf } from "@/lib/csrf";
import { validateBodySize } from "@/lib/requestLimits";
import { sanitizeError, ERROR_MESSAGES } from "@/lib/sanitizeError";

const addItemSchema = z.object({
  favoriteId: z.string().min(1),
});

export async function POST(
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

    // Rate limit: 30 requests per minute
    const rateLimit = await rateLimiters.standard(req);
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
    const parsed = addItemSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    // Verify collection belongs to user
    const collection = await prisma.collection.findFirst({
      where: { id, userId: user.id },
    });

    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    // Verify favorite belongs to user
    const favorite = await prisma.favorite.findFirst({
      where: { id: parsed.data.favoriteId, userId: user.id },
    });

    if (!favorite) {
      return NextResponse.json({ error: "Favorite not found" }, { status: 404 });
    }

    // Check if already in collection
    const existing = await prisma.collectionItem.findFirst({
      where: { collectionId: id, favoriteId: parsed.data.favoriteId },
    });

    if (existing) {
      return NextResponse.json({ error: "Item already in collection" }, { status: 400 });
    }

    const item = await prisma.collectionItem.create({
      data: {
        collectionId: id,
        favoriteId: parsed.data.favoriteId,
      },
    });

    return NextResponse.json({ id: item.id }, { status: 201 });
  } catch (error) {
    console.error("Error adding to collection:", sanitizeError(error));
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

    // Rate limit: 30 requests per minute
    const rateLimit = await rateLimiters.standard(req);
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
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("itemId");

    if (!itemId) {
      return NextResponse.json({ error: "itemId is required" }, { status: 400 });
    }

    // Verify collection belongs to user
    const collection = await prisma.collection.findFirst({
      where: { id, userId: user.id },
    });

    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    await prisma.collectionItem.deleteMany({
      where: { collectionId: id, favoriteId: itemId },
    });

    return NextResponse.json({ message: "Item removed" });
  } catch (error) {
    console.error("Error removing from collection:", sanitizeError(error));
    return NextResponse.json({ error: ERROR_MESSAGES.SERVER_ERROR }, { status: 500 });
  }
}
