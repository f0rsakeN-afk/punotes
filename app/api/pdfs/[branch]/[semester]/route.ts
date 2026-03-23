import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const revalidate = 86400;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ semester: string; branch: string }> },
) {
  try {
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

    return NextResponse.json(data, {
      status: 200,
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
    });
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
