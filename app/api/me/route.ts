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

    return NextResponse.json(
      {
        data,
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
