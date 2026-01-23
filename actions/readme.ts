"use server";

import prisma from "@/lib/prisma";
import axios from "axios";
import { ReadmeInput } from "@/schema/upload";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || "f0rsaken-afk";
const GITHUB_REPO = process.env.GITHUB_REPO || "punotes-content";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

export async function uploadReadme(data: ReadmeInput) {
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
            });
            sha = resp.data.sha;
        } catch (e) {
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
    } catch (error: any) {
        console.error("Error uploading to GitHub:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to upload to GitHub");
    }
}
