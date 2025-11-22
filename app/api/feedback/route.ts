import prisma from "@/lib/prisma";
import { feedbackSchema } from "@/schema/feedbackSchema";
import { NextRequest, NextResponse } from "next/server";
import { treeifyError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = feedbackSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: treeifyError(parsed.error) },
        { status: 400 },
      );
    }

    const saved = await prisma.feedback.create({
      data: parsed.data,
    });

    return NextResponse.json(
      { message: "Feedback submitted", data: saved },
      { status: 200 },
    );
  } catch (error) {
    // console.error(err);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
