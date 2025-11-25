import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ semester: string; branch: string }> },
) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json(
        { message: "You are not authorized. Please signin to get access." },
        { status: 401 },
      );
    }

    const { branch: rawBranch, semester } = await params;
    const branch = decodeURIComponent(rawBranch).replace(/-/g, " ");

    const data = await prisma.notes.findMany({
      where: {
        branch: {
          contains: branch,
          mode: "insensitive",
        },
        semester: semester,
      },
      orderBy: { createdAt: "asc" },
    });
    // console.log(data,"naresh");

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch data.",
      },
      { status: 500 },
    );
  }
}
