import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { NextResponse } from "next/server";
import axios from "axios";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || "f0rsaken-afk";
const GITHUB_REPO = process.env.GITHUB_REPO || "punotes-content";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json(
        { message: "You are not authorized. Please signin to get access." },
        { status: 401 }
      );
    }

    const { slug } = await params;

    const readme = await prisma.readme.findUnique({ where: { slug } });

    if (!readme) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${readme.githubPath}`;
    const resp = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3.raw",
      },
    });

    return NextResponse.json({ ...readme, content: resp.data });
  } catch (error) {
    console.error("Error fetching readme:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch note" },
      { status: 500 }
    );
  }
}
