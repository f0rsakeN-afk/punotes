import { Metadata } from "next";
import { getStackUser, getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import PublicLinksClient from "./public-links-client";

export const metadata: Metadata = {
  title: "Public Link Submissions | Admin",
  description: "Review and manage public link submissions",
};

export default async function PublicLinksPage() {
  const user = await getStackUser();

  if (!user) {
    redirect("/");
  }

  const userData = await getCurrentUser();

  if (!userData || userData.role !== "ADMIN") {
    redirect("/");
  }

  const pendingLinks = await prisma.publicLink.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" },
  });

  const reviewedLinks = await prisma.publicLink.findMany({
    where: { status: { in: ["APPROVED", "REJECTED"] } },
    orderBy: { updatedAt: "desc" },
    take: 50,
  });

  const serializedPending = pendingLinks.map((link) => ({
    ...link,
    createdAt: link.createdAt.toISOString(),
    updatedAt: link.updatedAt.toISOString(),
  }));

  const serializedReviewed = reviewedLinks.map((link) => ({
    ...link,
    createdAt: link.createdAt.toISOString(),
    updatedAt: link.updatedAt.toISOString(),
  }));

  return <PublicLinksClient pendingLinks={serializedPending} reviewedLinks={serializedReviewed} />;
}
