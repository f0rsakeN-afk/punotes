import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { getCachedUser } from "@/lib/cache";
import { z } from "zod";

const reviewSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
  adminNotes: z.string().max(500).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await getCachedUser(user.id);
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

    return NextResponse.json(links);
  } catch (error) {
    console.error("Error fetching admin public links:", error);
    return NextResponse.json({ error: "Failed to fetch links" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await getCachedUser(user.id);
    if (!userData || userData.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const { id, status, adminNotes } = body;

    if (!id) {
      return NextResponse.json({ error: "Link ID is required" }, { status: 400 });
    }

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

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
    console.error("Error updating public link:", error);
    return NextResponse.json({ error: "Failed to update link" }, { status: 500 });
  }
}
