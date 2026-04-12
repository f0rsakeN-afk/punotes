import prisma from "@/lib/prisma";
import { feedbackSchema } from "@/schema/feedbackSchema";
import { stackServerApp } from "@/stack/server";
import { NextRequest, NextResponse } from "next/server";
import { treeifyError } from "zod";
import limiter from "@/lib/rateLimit";
import { getCachedUser } from "@/lib/cache";

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 10 requests per minute per IP
    try {
      limiter.checkNext(req, 10);
    } catch {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
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

    const body = await req.json();

    const parsed = feedbackSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: treeifyError(parsed.error) },
        { status: 400 },
      );
    }

    const saved = await prisma.feedback.create({
      data: { ...parsed.data },
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

export async function GET() {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json(
        {
          message: "You are not authorized. Please signin to get access.",
        },
        { status: 401 },
      );
    }

    const data = await getCachedUser(user.id);

    if (!data || data.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Only admins can access all feedbacks." },
        { status: 403 },
      );
    }

    const feedbackData = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        data: feedbackData,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch user feedbacks.",
      },
      { status: 500 },
    );
  }
}
