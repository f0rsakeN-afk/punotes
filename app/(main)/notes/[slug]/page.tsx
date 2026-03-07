import { Metadata } from "next";
import prisma from "@/lib/prisma";
import ReadmeClient from "./readme-client";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import axios from "axios";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || "f0rsaken-afk";
const GITHUB_REPO = process.env.GITHUB_REPO || "punotes-content";

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

export default async function ReadmePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["readme", slug],
    queryFn: async () => {
      const readme = await prisma.readme.findUnique({ where: { slug } });
      if (!readme) return null;

      const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${readme.githubPath}`;
      const resp = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3.raw",
        },
      });

      return { ...readme, content: resp.data };
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReadmeClient />
    </HydrationBoundary>
  );
}
