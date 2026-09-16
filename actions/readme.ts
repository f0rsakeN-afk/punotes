"use server";

import prisma from "@/lib/prisma";
import axios from "axios";
import { ReadmeInput, readmeSchema, BranchEnum } from "@/schema/upload";
import { getStackUser, getCurrentUser } from "@/lib/auth";
import { validateCsrfForAction } from "@/lib/csrf";
import { rateLimiters } from "@/lib/rateLimit";
import { headers } from "next/headers";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || "f0rsaken-afk";
const GITHUB_REPO = process.env.GITHUB_REPO || "punotes-content";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

const MAX_CONTENT_LENGTH = 10_000;

export async function uploadReadme(data: ReadmeInput) {
    // 1. CSRF protection for Server Action
    await validateCsrfForAction();

    // 2. Rate limiting - strict limiter first (fail-closed)
    const hdrs = await headers();
    const mockReq = { headers: { get: (k: string) => hdrs.get(k) } } as unknown as Request;
    const rl = await rateLimiters.strict(mockReq);
    if (!rl.success) {
        throw new Error("Too many requests. Please try again later.");
    }

    // 3. Auth check - ADMIN only
    const stackUser = await getStackUser();
    const dbUser = await getCurrentUser();
    if (!stackUser || !dbUser || dbUser.role !== "ADMIN") {
        throw new Error("Forbidden: Admin access required");
    }

    // 4. Zod validation with strict limits
    const parsed = readmeSchema.safeParse(data);
    if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message || "Invalid input");
    }
    // Enforce BranchEnum explicitly
    if (!BranchEnum.options.includes(data.branch as typeof BranchEnum.options[number])) {
        throw new Error("Invalid branch");
    }
    if (data.content.length > MAX_CONTENT_LENGTH) {
        throw new Error(`Content too large. Max ${MAX_CONTENT_LENGTH} characters`);
    }
    if (data.title.length > 200) {
        throw new Error("Title too long. Max 200 characters");
    }

    if (!GITHUB_TOKEN) {
        throw new Error("GITHUB_TOKEN is not configured");
    }

    const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const fileName = `${slug}.md`;
    const githubPath = `readmes/${data.branch}/${data.semester}/${fileName}`;

    try {
        // 1. Upload to GitHub
        const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${githubPath}`;

        // Check if file exists to get SHA if updating (though we'll just create for now)
        let sha: string | undefined;
        try {
            const resp = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                },
                timeout: 8000,
            });
            sha = resp.data.sha;
        } catch {
            // File doesn't exist, which is fine
        }

        await axios.put(
            url,
            {
                message: `Add readme: ${data.title}`,
                content: Buffer.from(data.content).toString("base64"),
                branch: GITHUB_BRANCH,
                sha,
            },
            {
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    Accept: "application/vnd.github.v3+json",
                },
                timeout: 10000,
            }
        );

        // 2. Save to database
        await prisma.readme.create({
            data: {
                title: data.title,
                slug,
                githubPath,
                branch: data.branch,
                semester: data.semester,
            },
        });

        return { success: true };
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } }; message?: string };
        console.error("Error uploading to GitHub:", err.response?.data || err.message);
        throw new Error(err.response?.data?.message || "Failed to upload to GitHub");
    }
}
