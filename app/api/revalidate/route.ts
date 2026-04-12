import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import limiter from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 30 requests per minute per IP (more lenient since it's a webhook)
    try {
      limiter.checkNext(request, 30);
    } catch {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { secret, path } = await request.json();

    // Simple secret-based validation (in production, use a more secure method)
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: "Invalid revalidate secret" },
        { status: 401 }
      );
    }

    if (!path) {
      return NextResponse.json(
        { error: "Path is required" },
        { status: 400 }
      );
    }

    revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      path: path,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to revalidate",
      },
      { status: 500 }
    );
  }
}
