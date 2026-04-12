import { stackServerApp } from "@/stack/server";
import prisma from "@/lib/prisma";
import { cacheDelete } from "@/lib/cache";
import MainLayoutClient from "./mainLayoutClient";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await stackServerApp.getUser();

  if (user?.primaryEmail) {
    await prisma.user.upsert({
      where: { stackID: user.id },
      update: { email: user.primaryEmail },
      create: { stackID: user.id, email: user.primaryEmail, role: "USER" },
    });
    // Bust user cache so role changes reflect immediately
    await cacheDelete(`user:${user.id}`).catch(() => {});
  }

  return <MainLayoutClient>{children}</MainLayoutClient>;
}
