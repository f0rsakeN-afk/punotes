import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import prisma from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";
import { addDays } from "date-fns";

const SPECIAL_ADMIN_ID = "f3dad113-e93c-4878-83be-d61230c640a8";

/**
 * POST /api/user/[id]/suspend
 * Suspend a user (temporary or permanent)
 * Auth: Admin only (Special Admin can only suspend, not access full audit logs)
 *
 * Request body:
 * {
 *   type: "temporary" | "permanent",
 *   durationDays?: number (required if type is "temporary"),
 *   reason: string (required)
 * }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const stackUser = await stackServerApp.getUser();

    if (!stackUser) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    // Get current user
    const currentUser = await prisma.user.findUnique({
      where: { stackID: stackUser.id },
      select: { id: true, role: true, stackID: true },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "Current user not found" },
        { status: 404 }
      );
    }

    // Check admin permission
    const isAdmin = currentUser.role === "ADMIN";
    const isSpecialAdmin = currentUser.stackID === SPECIAL_ADMIN_ID;

    if (!isAdmin && !isSpecialAdmin) {
      return NextResponse.json(
        { error: "Forbidden. Admin access required." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { type, durationDays, reason } = body;

    // Validate input
    if (!type || !["temporary", "permanent"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid type. Must be 'temporary' or 'permanent'" },
        { status: 400 }
      );
    }

    if (!reason || typeof reason !== "string" || reason.trim().length === 0) {
      return NextResponse.json(
        { error: "Reason is required" },
        { status: 400 }
      );
    }

    if (type === "temporary" && !durationDays) {
      return NextResponse.json(
        { error: "Duration in days is required for temporary suspension" },
        { status: 400 }
      );
    }

    // Get target user
    const targetUser = await prisma.user.findUnique({
      where: { id },
      select: { id: true, status: true, email: true },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "Target user not found" },
        { status: 404 }
      );
    }

    // Prevent suspending self
    if (targetUser.id === currentUser.id) {
      return NextResponse.json(
        { error: "Cannot suspend yourself" },
        { status: 400 }
      );
    }

    // Calculate suspension end date if temporary
    const suspendedUntil = type === "temporary" ? addDays(new Date(), durationDays) : null;

    // Update user with suspension
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        status: "SUSPENDED",
        suspendedAt: new Date(),
        suspendedUntil,
        suspensionReason: reason,
        suspendedBy: currentUser.id,
      },
      select: {
        id: true,
        email: true,
        status: true,
        suspendedAt: true,
        suspendedUntil: true,
        suspensionReason: true,
      },
    });

    // Create audit log
    await createAuditLog({
      action: "USER_SUSPEND",
      performedBy: currentUser.id,
      targetUser: id,
      details: {
        type,
        durationDays: type === "temporary" ? durationDays : null,
        reason,
      },
    });

    return NextResponse.json({ data: updatedUser });
  } catch (error) {
    console.error("Error suspending user:", error);
    return NextResponse.json(
      { error: "Failed to suspend user" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/user/[id]/suspend
 * Unsuspend a user
 * Auth: Admin only
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const stackUser = await stackServerApp.getUser();

    if (!stackUser) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    // Get current user
    const currentUser = await prisma.user.findUnique({
      where: { stackID: stackUser.id },
      select: { id: true, role: true },
    });

    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden. Admin access required." },
        { status: 403 }
      );
    }

    // Get target user
    const targetUser = await prisma.user.findUnique({
      where: { id },
      select: { id: true, status: true, email: true },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "Target user not found" },
        { status: 404 }
      );
    }

    if (targetUser.status !== "SUSPENDED") {
      return NextResponse.json(
        { error: "User is not suspended" },
        { status: 400 }
      );
    }

    // Unsuspend user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        status: "ACTIVE",
        suspendedAt: null,
        suspendedUntil: null,
        suspensionReason: null,
        suspendedBy: null,
      },
      select: {
        id: true,
        email: true,
        status: true,
      },
    });

    // Create audit log
    await createAuditLog({
      action: "USER_UNSUSPEND",
      performedBy: currentUser.id,
      targetUser: id,
      details: {
        unsuspendedBy: currentUser.id,
      },
    });

    return NextResponse.json({ data: updatedUser });
  } catch (error) {
    console.error("Error unsuspending user:", error);
    return NextResponse.json(
      { error: "Failed to unsuspend user" },
      { status: 500 }
    );
  }
}
