import prisma from "@/lib/prisma";
import { feedbackSchema } from "@/schema/feedbackSchema";
import { stackServerApp } from "@/stack/server";
import { NextRequest, NextResponse } from "next/server";
import { treeifyError } from "zod";
import limiter from "@/lib/rateLimit";
import { getCachedUser, cacheGet, cacheSet, cacheDelete } from "@/lib/cache";

const FEEDBACK_CACHE_KEY = "feedback:all";
const FEEDBACK_CACHE_TTL = 3600; // 1 hour

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

    // Invalidate feedback cache
    await cacheDelete(FEEDBACK_CACHE_KEY);

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

    // Try cache first
    const cached = await cacheGet<unknown>(FEEDBACK_CACHE_KEY);
    if (cached) {
      return NextResponse.json({ data: cached }, { status: 200 });
    }

    const feedbackData = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Cache the result
    await cacheSet(FEEDBACK_CACHE_KEY, feedbackData, { expire: FEEDBACK_CACHE_TTL });

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
