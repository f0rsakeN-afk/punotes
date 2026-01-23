import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { NextResponse } from "next/server";

function maskEmail(email: string, visibleChars = 7) {
  const [local, domain] = email.split("@");
  if (local.length <= visibleChars) {
    return "***@" + domain;
  }
  return local.slice(0, visibleChars) + "***@" + domain;
}

export async function GET() {
  try {
    const stackUser = await stackServerApp.getUser();

    if (!stackUser) {
      return NextResponse.json(
        { message: "You are not authorized. Please signin to get access." },
        { status: 401 }
      );
    }

    // Get logged-in user with role
    const currentUser = await prisma.user.findUnique({
      where: { stackID: stackUser.id },
    });

    if (!currentUser) {
      return NextResponse.json(
        { message: "No user data found" },
        { status: 404 }
      );
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        stackID: true,
        email: true,
        role: true,
        createdAt: true,
        displayName: true,
        profileImageUrl: true,
      },
    });

    const isAdmin = currentUser.role === "ADMIN";

    const sanitizedUsers = users.map((user) => ({
      ...user,
      email: isAdmin ? user.email : maskEmail(user.email),
    }));

    const response = NextResponse.json({ data: sanitizedUsers });

    // Add cache headers for prefetching optimization
    response.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch user data.",
      },
      { status: 500 }
    );
  }
}
