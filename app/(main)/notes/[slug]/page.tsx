import { Metadata } from "next";
import prisma from "@/lib/prisma";
import ReadmeClient from "./readme-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const readme = await prisma.readme.findUnique({
    where: { slug },
    select: { title: true, branch: true, semester: true },
  });

  if (!readme) {
    return { title: "Note Not Found" };
  }

  return {
    title: readme.title,
    description: `Study notes for ${readme.title} — ${readme.branch}, Semester ${readme.semester}. Purbanchal University resources.`,
    alternates: { canonical: `/notes/${slug}` },
    openGraph: {
      title: `${readme.title} | PuNotes`,
      description: `${readme.branch} Semester ${readme.semester} — ${readme.title}`,
      url: `https://punotes.vercel.app/notes/${slug}`,
    },
  };
}

export default function ReadmePage() {
  return <ReadmeClient />;
}
