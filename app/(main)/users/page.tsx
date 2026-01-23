import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import UsersTableClient from "./users-client";

const SPECIAL_ADMIN_ID = "f3dad113-e93c-4878-83be-d61230c640a8";

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function UsersPage() {
  const stackUser = await stackServerApp.getUser();

  if (!stackUser) {
    redirect("/handler/signin");
  }

  // Get current user with role
  const currentUser = await prisma.user.findUnique({
    where: { stackID: stackUser.id },
  });

  if (!currentUser) {
    redirect("/handler/signin");
  }

  // Fetch all users with extended data
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      stackID: true,
      email: true,
      role: true,
      status: true,
      displayName: true,
      profileImageUrl: true,
      suspensionReason: true,
      suspendedUntil: true,
      createdAt: true,
      _count: {
        select: {
          messages: true,
          reactions: true,
          visits: true,
        },
      },
    },
  });

  const isAdmin = currentUser.role === "ADMIN";
  const isSpecialAdmin = currentUser.stackID === SPECIAL_ADMIN_ID;
  const canManageRoles = isAdmin || isSpecialAdmin;

  return (
    <UsersTableClient
      users={users as any}
      canManageRoles={canManageRoles}
      isSpecialAdmin={isSpecialAdmin}
    />
  );
}
