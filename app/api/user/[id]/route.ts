import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { NextResponse } from "next/server";
import { createAuditLog } from "@/lib/audit";

const SPECIAL_ADMIN_ID = "f3dad113-e93c-4878-83be-d61230c640a8";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const stackUser = await stackServerApp.getUser();

    if (!stackUser) {
      return NextResponse.json(
        { message: "You are not authorized. Please signin to get access." },
        { status: 401 }
      );
    }

    // Get current user with role
    const currentUser = await prisma.user.findUnique({
      where: { stackID: stackUser.id },
    });

    if (!currentUser) {
      return NextResponse.json(
        { message: "No user data found" },
        { status: 404 }
      );
    }

    // Check if user has permission to update roles
    const isAdmin = currentUser.role === "ADMIN";
    const isSpecialAdmin = currentUser.stackID === SPECIAL_ADMIN_ID;

    if (!isAdmin && !isSpecialAdmin) {
      return NextResponse.json(
        { message: "You don't have permission to update user roles" },
        { status: 403 }
      );
    }

    const { role } = await request.json();

    if (!role || !["USER", "ADMIN"].includes(role)) {
      return NextResponse.json(
        { message: "Invalid role. Must be USER or ADMIN" },
        { status: 400 }
      );
    }

    // Get the target user to check their current role
    const targetUser = await prisma.user.findUnique({
      where: { id },
      select: { role: true },
    });

    if (!targetUser) {
      return NextResponse.json(
        { message: "Target user not found" },
        { status: 404 }
      );
    }

    const oldRole = targetUser.role;

    // Only log if role actually changed
    if (oldRole !== role) {
      // Update user role
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { role },
        select: {
          id: true,
          stackID: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      // Create audit log
      await createAuditLog({
        action: "ROLE_CHANGE",
        performedBy: currentUser.id,
        targetUser: id,
        details: {
          oldRole,
          newRole: role,
        },
      });

      return NextResponse.json({ data: updatedUser });
    } else {
      // No change needed
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          stackID: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });
      return NextResponse.json({ data: user });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update user role.",
      },
      { status: 500 }
    );
  }
}
