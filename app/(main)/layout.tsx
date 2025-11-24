import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack/server";
import prisma from "@/lib/prisma";
import MainLayoutClient from "./mainLayoutClient";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await stackServerApp.getUser();

  if (!user || !user.primaryEmail) {
    redirect("/handler/signin");
  }

  await prisma.user.upsert({
    where: { stackID: user.id },
    update: { email: user.primaryEmail },
    create: { stackID: user.id, email: user.primaryEmail, role: "USER" },
  });

  return <MainLayoutClient>{children}</MainLayoutClient>;
}
