"use server";

import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";

export async function getMessages(cursor?: string) {
    try {
        const user = await stackServerApp.getUser();

        // Update lastSeenAt if user is logged in
        if (user) {
            await prisma.user.update({
                where: { stackID: user.id },
                data: { lastSeenAt: new Date() },
            }).catch(() => { }); // Ignore if user not found (e.g. first load)
        }

        // Get online count (active in last 60s)
        const onlineCount = await prisma.user.count({
            where: {
                lastSeenAt: {
                    gte: new Date(Date.now() - 60 * 1000),
                },
            },
        });

        const messages = await prisma.message.findMany({
            take: 51, // Fetch 51 to know if there's a next page
            skip: cursor ? 1 : 0,
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: {
                    select: {
                        displayName: true,
                        profileImageUrl: true,
                        email: true,
                    },
                },
                reactions: {
                    include: {
                        user: {
                            select: {
                                displayName: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });

        let nextCursor: string | undefined = undefined;
        if (messages.length > 50) {
            const nextItem = messages.pop();
            nextCursor = nextItem?.id;
        }

        return {
            success: true,
            data: messages.reverse(),
            nextCursor,
            onlineCount
        };
    } catch (error) {
        console.error("Error fetching messages:", error);
        return { success: false, error: "Failed to fetch messages" };
    }
}

export async function sendMessage(content: string) {
    try {
        const user = await stackServerApp.getUser();
        if (!user) {
            return { success: false, error: "Unauthorized" };
        }

        // Rate Limiting: Check messages in last 60s
        const dbUser = await prisma.user.upsert({
            where: { stackID: user.id },
            update: {
                email: user.primaryEmail || "",
                displayName: user.displayName,
                profileImageUrl: user.profileImageUrl,
                lastSeenAt: new Date(),
            },
            create: {
                stackID: user.id,
                email: user.primaryEmail || "",
                displayName: user.displayName,
                profileImageUrl: user.profileImageUrl,
                role: "USER",
                lastSeenAt: new Date(),
            },
        });

        const recentMessagesCount = await prisma.message.count({
            where: {
                userId: dbUser.id,
                createdAt: {
                    gte: new Date(Date.now() - 60 * 1000),
                },
            },
        });

        if (recentMessagesCount >= 5) {
            return { success: false, error: "Rate limit exceeded. Max 5 messages/minute." };
        }

        // Profanity Filter
        const badWords = [
            "fuck",
            "shit",
            "bitch",
            "asshole",
            "dick",
            "pussy",
            "muji",
            "lado",
            "mc",
            "geda",
            "jatha",
            "kando",
            "puti",
            "randi",
            "machikne",
            "chikne",
            "bhalu",
            "condom",
            "radi",
            "kukur",
            "stfu",
            "wtf",
            "bs",
            "mf",
            "milf",
            "cunt",
            "whore",
            "slut",
            "bastard",
            "douche",
            "scumbag",
            "prick",
            "wanker",
            "retard",
            "faggot",
            "nigger",
            "nigga",
            "dyke",
            "tranny",
            "incel",
            "simp",
            "virgin",
            "kys",
        ];
        let cleanContent = content;
        badWords.forEach((word) => {
            const regex = new RegExp(`\\b${word}\\b`, "gi");
            cleanContent = cleanContent.replace(regex, "****");
        });

        const message = await prisma.message.create({
            data: {
                content: cleanContent,
                userId: dbUser.id,
            },
        });

        return { success: true, data: message };
    } catch (error) {
        console.error("Error sending message:", error);
        return { success: false, error: "Failed to send message" };
    }
}

export async function toggleReaction(messageId: string, emoji: string) {
    try {
        const user = await stackServerApp.getUser();
        if (!user) {
            return { success: false, error: "Unauthorized" };
        }

        const dbUser = await prisma.user.findUnique({
            where: { stackID: user.id },
        });

        if (!dbUser) {
            return { success: false, error: "User not found" };
        }

        const existingReaction = await prisma.reaction.findUnique({
            where: {
                userId_messageId_emoji: {
                    userId: dbUser.id,
                    messageId,
                    emoji,
                },
            },
        });

        if (existingReaction) {
            await prisma.reaction.delete({
                where: { id: existingReaction.id },
            });
        } else {
            await prisma.reaction.create({
                data: {
                    userId: dbUser.id,
                    messageId,
                    emoji,
                },
            });
        }

        return { success: true };
    } catch (error) {
        console.error("Error toggling reaction:", error);
        return { success: false, error: "Failed to toggle reaction" };
    }
}

export async function deleteMessage(messageId: string) {
    try {
        const user = await stackServerApp.getUser();
        if (!user) {
            return { success: false, error: "Unauthorized" };
        }

        const dbUser = await prisma.user.findUnique({
            where: { stackID: user.id },
        });

        if (!dbUser || dbUser.role !== "ADMIN") {
            return { success: false, error: "Unauthorized: Admin only" };
        }

        await prisma.message.delete({
            where: { id: messageId },
        });

        return { success: true };
    } catch (error) {
        console.error("Error deleting message:", error);
        return { success: false, error: "Failed to delete message" };
    }
}
