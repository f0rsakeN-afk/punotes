import { stackServerApp } from "@/stack/server";
import prisma from "@/lib/prisma";
import { cacheDelete, getCachedUser } from "@/lib/cache";
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
    await cacheDelete(`user:${user.id}`).catch(() => {});
    // Invalidate about page stats cache when user count changes
    await cacheDelete("stats:about").catch(() => {});
  }

  const userData = user ? await getCachedUser(user.id) : null;
  const isAdmin = userData?.role === "ADMIN";

  return <MainLayoutClient isAdmin={isAdmin}>{children}</MainLayoutClient>;
}
