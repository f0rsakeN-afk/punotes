"use client";

import { useEffect, useRef, useState } from "react";
import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { MessageCircle, Send, SmilePlus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    deleteMessage,
    getMessages,
    sendMessage,
    toggleReaction,
} from "@/actions/chat";
import { useUser } from "@stackframe/stack";
import { toast } from "react-hot-toast";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useGetMe } from "@/services/me";
import { useInView } from "react-intersection-observer";

export function ChatPage() {
    const [message, setMessage] = useState("");
    const [hasAcceptedRules, setHasAcceptedRules] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();
    const user = useUser();
    const { data: meData } = useGetMe();
    const isAdmin = meData?.data?.role === "ADMIN";
    const { ref, inView } = useInView();

    useEffect(() => {
        const accepted = localStorage.getItem("chat_rules_accepted");
        if (accepted === "true") {
            setHasAcceptedRules(true);
        }
    }, []);

    const acceptRules = () => {
        localStorage.setItem("chat_rules_accepted", "true");
        setHasAcceptedRules(true);
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["chat-messages"],
        queryFn: async ({ pageParam }) => {
            const res = await getMessages(pageParam as string | undefined);
            if (res.success) return res;
            throw new Error(res.error);
        },
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        refetchInterval: 10000,
        enabled: true,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const { mutate: send, isPending } = useMutation({
        mutationFn: async (content: string) => {
            const res = await sendMessage(content);
            if (!res.success) throw new Error(res.error);
            return res.data;
        },
        onSuccess: () => {
            setMessage("");
            queryClient.invalidateQueries({ queryKey: ["chat-messages"] });
            setTimeout(() => {
                if (scrollRef.current) {
                    const scrollElement = scrollRef.current.querySelector(
                        "[data-radix-scroll-area-viewport]",
                    );
                    if (scrollElement) {
                        scrollElement.scrollTop = 0;
                    }
                }
            }, 100);
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to send message");
        },
    });

    const { mutate: react } = useMutation({
        mutationFn: async ({
            messageId,
            emoji,
        }: {
            messageId: string;
            emoji: string;
        }) => {
            const res = await toggleReaction(messageId, emoji);
            if (!res.success) throw new Error(res.error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chat-messages"] });
        },
    });

    const { mutate: removeMessage } = useMutation({
        mutationFn: async (messageId: string) => {
            const res = await deleteMessage(messageId);
            if (!res.success) throw new Error(res.error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chat-messages"] });
            toast.success("Message deleted");
        },
        onError: () => {
            toast.error("Failed to delete message");
        },
    });

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !user) return;
        send(message);
    };

    const getDisplayName = (u: any) => {
        if (u.displayName) return u.displayName;
        if (u.email) return u.email.split("@")[0];
        return "User";
    };

    const reactionEmojis = ["👍", "❤️", "😂", "😮", "😢", "😡"];

    const allMessages =
        data?.pages
            .flatMap((page) => page.data)
            .sort(
                (a: any, b: any) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
            ) || [];

    const onlineCount = data?.pages[0]?.onlineCount || 0;

    return (
        <div className="container max-w-4xl mx-auto py-8">
            <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="h-6 w-6 text-primary" />
                <div>
                    <h1 className="text-xl font-semibold">Community Chat</h1>
                    <p className="text-sm text-muted-foreground">
                        Chat live with the community. Stay respectful and have fun!
                    </p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    {onlineCount} Online
                </div>
            </div>

            <div className="bg-background border rounded-xl shadow-sm flex flex-col h-[75vh] overflow-hidden relative">
                {!hasAcceptedRules && (
                    <div className="absolute inset-0 z-50 bg-background/95 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center space-y-4">
                        <MessageCircle className="h-12 w-12 text-primary" />
                        <h3 className="text-xl font-bold">Community Guidelines</h3>
                        <p className="text-sm text-muted-foreground">
                            Welcome to the community chat! To keep this a safe and fun
                            place for everyone, please agree to the following:
                        </p>
                        <ul className="text-sm text-left list-disc pl-4 space-y-1">
                            <li>Be respectful and kind.</li>
                            <li>No hate speech or bullying.</li>
                            <li>No spamming.</li>
                            <li>Keep it appropriate.</li>
                        </ul>
                        <div className="text-xs text-destructive font-semibold mt-2 px-4">
                            ⚠️ Warning: Disrespectful behavior will lead to a PERMANENT IP
                            BAN. We collect all user data for safety and moderation
                            purposes.
                        </div>
                        <Button onClick={acceptRules} className="w-full mt-4">
                            I Agree
                        </Button>
                    </div>
                )}

                <div className="p-4 border-b bg-primary/5 flex items-center justify-between shrink-0">
                    <div>
                        <h3 className="font-semibold">Live chat</h3>
                        <p className="text-xs text-muted-foreground">
                            Messages update instantly—no more periodic refreshes.
                        </p>
                    </div>
                </div>

                <ScrollArea className="flex-1 p-4 overflow-hidden" ref={scrollRef}>
                    <div className="flex flex-col-reverse gap-4">
                        {allMessages.map((msg: any) => {
                            const isMe = user?.primaryEmail === msg.user.email;
                            const displayName = getDisplayName(msg.user);
                            return (
                                <div
                                    key={msg.id}
                                    className={`flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"
                                        }`}
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={msg.user.profileImageUrl} />
                                        <AvatarFallback>
                                            {displayName[0]?.toUpperCase() || "?"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div
                                        className={`flex flex-col max-w-[80%] ${isMe ? "items-end" : "items-start"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] text-muted-foreground">
                                                {displayName}
                                            </span>
                                            {isAdmin && (
                                                <button
                                                    onClick={() => removeMessage(msg.id)}
                                                    className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Delete Message"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </button>
                                            )}
                                        </div>

                                        <div className="group relative">
                                            <div
                                                className={`px-3 py-2 rounded-lg text-sm ${isMe
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted"
                                                    }`}
                                            >
                                                {msg.content}
                                            </div>

                                            <div
                                                className={`absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity ${isMe ? "-left-8" : "-right-8"
                                                    }`}
                                            >
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6 rounded-full"
                                                        >
                                                            <SmilePlus className="h-4 w-4 text-muted-foreground" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-1 flex gap-1">
                                                        {reactionEmojis.map((emoji) => (
                                                            <button
                                                                key={emoji}
                                                                onClick={() =>
                                                                    react({ messageId: msg.id, emoji })
                                                                }
                                                                className="p-1 hover:bg-muted rounded text-lg"
                                                            >
                                                                {emoji}
                                                            </button>
                                                        ))}
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </div>

                                        {msg.reactions && msg.reactions.length > 0 && (
                                            <div className="flex gap-1 mt-1 flex-wrap">
                                                {Array.from(
                                                    new Set(msg.reactions.map((r: any) => r.emoji)),
                                                ).map((emoji: any) => {
                                                    const count = msg.reactions.filter(
                                                        (r: any) => r.emoji === emoji,
                                                    ).length;
                                                    return (
                                                        <div
                                                            key={emoji}
                                                            className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full border flex items-center gap-0.5"
                                                        >
                                                            <span>{emoji}</span>
                                                            <span>{count}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        {hasNextPage && (
                            <div ref={ref} className="flex justify-center py-2 shrink-0">
                                {isFetchingNextPage ? (
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                ) : (
                                    <span className="text-xs text-muted-foreground">Load more</span>
                                )}
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <form
                    onSubmit={handleSend}
                    className="p-3 border-t bg-background shrink-0"
                >
                    <div className="relative flex items-center">
                        <Input
                            placeholder={
                                user ? "Type a message..." : "Sign in to chat"
                            }
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            disabled={!user || isPending}
                            className="pr-10 rounded-full bg-muted/50 border-muted focus-visible:ring-1 focus-visible:ring-primary/20"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={!user || isPending || !message.trim()}
                            className="absolute right-1 h-8 w-8 rounded-full"
                            variant="ghost"
                        >
                            <Send className="h-4 w-4 text-primary" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

