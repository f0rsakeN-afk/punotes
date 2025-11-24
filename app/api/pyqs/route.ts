import prisma from "@/lib/prisma";
import { pyqSchema } from "@/schema/upload";
import { stackServerApp } from "@/stack/server";
import { NextRequest, NextResponse } from "next/server";
import { treeifyError } from "zod";

export async function GET() {
  try {
    const data = await prisma.pYQ.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch PYQs",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = pyqSchema.safeParse(body);

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
        { message: "Only admins can publish PYQs." },
        { status: 403 },
      );
    }

    const saved = await prisma.pYQ.create({ data: parsed.data });

    return NextResponse.json(
      {
        message: "PYQs added successfully.",
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
