import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { z } from "zod";
import { cacheGet, cacheSet, cacheDelete } from "@/lib/cache";
import { treeifyError } from "zod";

interface Favorite {
  id: string;
  userId: string;
  type: "NOTES" | "SYLLABUS" | "PYQ";
  itemId: string;
  createdAt: Date;
}

const favoriteSchema = z.object({
  type: z.enum(["NOTES", "SYLLABUS", "PYQ"]),
  itemId: z.string().min(1, "Item ID is required"),
});

const FAVORITES_CACHE_TTL = 300; // 5 minutes

export async function GET() {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Try cache first
    const cacheKey = `favorites:${user.id}`;
    const cached = await cacheGet<Favorite[]>(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        status: 200,
        headers: { "X-Cache": "HIT" },
      });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    // Cache for 5 minutes
    await cacheSet(cacheKey, favorites, { expire: FAVORITES_CACHE_TTL });

    return NextResponse.json(favorites, {
      status: 200,
      headers: { "X-Cache": "MISS" },
    });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await req.json();
    const result = favoriteSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: treeifyError(result.error) },
        { status: 400 }
      );
    }

    const { type, itemId } = result.data;

    // Check if already favorited
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_type_itemId: {
          userId: user.id,
          type,
          itemId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ message: "Already favorited", favorited: true });
    }

    // Validate item exists in the corresponding table
    if (type === "NOTES") {
      const note = await prisma.notes.findUnique({ where: { id: itemId } });
      if (!note) {
        return NextResponse.json({ error: "Note not found" }, { status: 404 });
      }
    } else if (type === "SYLLABUS") {
      const syllabus = await prisma.syllabus.findUnique({ where: { id: itemId } });
      if (!syllabus) {
        return NextResponse.json({ error: "Syllabus not found" }, { status: 404 });
      }
    } else if (type === "PYQ") {
      const pyq = await prisma.pYQ.findUnique({ where: { id: itemId } });
      if (!pyq) {
        return NextResponse.json({ error: "PYQ not found" }, { status: 404 });
      }
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: user.id,
        type,
        itemId,
      },
    });

    // Invalidate cache
    await cacheDelete(`favorites:${user.id}`);

    return NextResponse.json({ message: "Added to favorites", favorited: true, data: favorite }, { status: 201 });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const itemId = searchParams.get("itemId");

    if (!type || !itemId) {
      return NextResponse.json({ error: "Missing type or itemId" }, { status: 400 });
    }

    // Validate type
    if (!["NOTES", "SYLLABUS", "PYQ"].includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    await prisma.favorite.delete({
      where: {
        userId_type_itemId: {
          userId: user.id,
          type: type as "NOTES" | "SYLLABUS" | "PYQ",
          itemId,
        },
      },
    });

    // Invalidate cache
    await cacheDelete(`favorites:${user.id}`);

    return NextResponse.json({ message: "Removed from favorites", favorited: false });
  } catch (error) {
    // If not found, that's fine - already removed
    if (error instanceof Error && error.message.includes("Record to delete does not exist")) {
      return NextResponse.json({ message: "Already removed from favorites", favorited: false });
    }
    console.error("Error removing favorite:", error);
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 });
  }
}
