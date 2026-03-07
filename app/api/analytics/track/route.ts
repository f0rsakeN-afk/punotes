import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "Analytics disabled" }, { status: 404 });
}

/*
import { NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const { path, referrer } = await req.json();

        const stackUser = await stackServerApp.getUser();
        const headerList = await headers();
        const userAgent = headerList.get("user-agent");
        const ip = headerList.get("x-forwarded-for") || "unknown";

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
*/
