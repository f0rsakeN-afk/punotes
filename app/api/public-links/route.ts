import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { z } from "zod";

const publicLinkSchema = z.object({
  url: z.string().url("Invalid URL"),
  branch: z.string().min(1, "Branch is required"),
  semester: z.string().min(1, "Semester is required"),
  type: z.enum(["NOTES", "SYLLABUS", "PYQ"]),
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(500).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get user's own submissions
    const links = await prisma.publicLink.findMany({
      where: {
        submittedBy: user.id,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(links);
  } catch (error) {
    console.error("Error fetching public links:", error);
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser();

    const body = await req.json();
    const result = publicLinkSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { url, branch, semester, type, title, description } = result.data;

    // Validate Google Drive URL
    if (!url.includes("drive.google.com")) {
      return NextResponse.json(
        { error: "Only Google Drive links are accepted" },
        { status: 400 }
      );
    }

    const link = await prisma.publicLink.create({
      data: {
        url,
        branch,
        semester,
        type,
        title,
        description,
        submittedBy: user?.id || null,
        submitterEmail: user?.primaryEmail || null,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      { message: "Link submitted successfully! It will be reviewed by an admin.", data: link },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating public link:", error);
    return NextResponse.json(
      { error: "Failed to submit link" },
      { status: 500 }
    );
  }
}
