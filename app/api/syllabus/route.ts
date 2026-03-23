import prisma from "@/lib/prisma";
import { syllabusSchema } from "@/schema/upload";
import { stackServerApp } from "@/stack/server";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 86400;
import { treeifyError } from "zod";

export async function GET() {
  try {
    const data = await prisma.syllabus.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(data, {
      status: 200,
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
    });
  } catch (error) {
    // console.log(error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch syllabus",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = syllabusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: treeifyError(parsed.error),
        },
        { status: 400 },
      );
    }

    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "You are not authorized. Please signin to get access.",
        },
        { status: 401 },
      );
    }

    const data = await prisma.user.findUnique({
      where: {
        stackID: user.id,
      },
    });

    if (!data || data.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Only admins can publish notes." },
        { status: 403 },
      );
    }

    const saved = await prisma.syllabus.create({ data: parsed.data });

    return NextResponse.json(
      {
        message: "Syllabus added successfully.",
        data: saved,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Internal server error.",
      },
      { status: 500 },
    );
  }
}
