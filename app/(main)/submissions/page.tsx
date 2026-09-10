import { Metadata } from "next";
import { getStackUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import SubmissionsClient from "./submissions-client";

export const metadata: Metadata = {
  title: "My Submissions | PuNotes",
  description: "Track your submitted Google Drive links and their status",
};

export default async function SubmissionsPage() {
  const user = await getStackUser();

  if (!user) {
    redirect("/handler/signin");
  }

  const submissions = await prisma.publicLink.findMany({
    where: {
      submittedBy: user.id,
    },
    orderBy: { createdAt: "desc" },
  });

  const serialized = submissions.map((s) => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }));

  return <SubmissionsClient initialData={serialized} />;
}