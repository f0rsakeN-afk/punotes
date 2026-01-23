import { NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const { path, referrer } = await req.json();

        // Log in background or wait? 
        // For simplicity, we wait, but in production this should be async/background

        const stackUser = await stackServerApp.getUser();
        const headerList = await headers();
        const userAgent = headerList.get("user-agent");
        const ip = headerList.get("x-forwarded-for") || "unknown";

        // Hash IP for privacy
        const hashedIp = crypto.createHash("sha256").update(ip).digest("hex");

        let userId = null;
        if (stackUser) {
            const user = await prisma.user.findUnique({
                where: { stackID: stackUser.id },
            });
            userId = user?.id;
        }

        await prisma.visit.create({
            data: {
                path,
                referrer,
                userAgent,
                ip: hashedIp,
                userId,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to track visit" }, { status: 500 });
    }
}
