import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { NextResponse } from "next/server";

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

    const data = await prisma.user.findUnique({
      where: {
        stackID: user.id,
      },
    });

    if (!data || data.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Only admins can access all feedbacks." },
        { status: 403 },
      );
    }

    const userData = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({
      data: userData,
    });
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
