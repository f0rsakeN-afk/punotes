"use client";

import React from "react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sparkles, Zap, Smartphone, CheckCircle2 } from "lucide-react";

export default function ChangelogPage() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <Badge variant="outline" className="mb-4 px-3 py-1 text-sm border-primary/20 text-primary bg-primary/5 rounded-full">
                    Release Notes
                </Badge>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70">
                    Changelog
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    We're constantly improving PuNotes. Here's what we've been working on.
                </p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent"
            >
                <ChangelogItem
                    version="v2.0.0"
                    date="January 18, 2026"
                    title="The Big Polish Update"
                    description="A complete visual overhaul, performance optimizations, and offline capabilities."
                    isMajor
                >
                    <ul className="space-y-4">
                        <ChangeItem
                            icon={Sparkles}
                            title="New Premium UI"
                            description="Redesigned header, polished cards, glassmorphism effects, and refined typography."
                        />
                        <ChangeItem
                            icon={Smartphone}
                            title="Offline Capabilities (PWA)"
                            description="Install PuNotes on your device. Works offline with smart caching."
                        />
                        <ChangeItem
                            icon={Zap}
                            title="Performance Boost"
                            description="Implemented Lenis smooth scrolling and intelligent data prefetching for instant feel."
                        />
                        <ChangeItem
                            icon={CheckCircle2}
                            title="Quality of Life"
                            description="Direct theme toggle, improved legal pages, and smoother page transitions."
                        />
                    </ul>
                </ChangelogItem>

                <ChangelogItem
                    version="v1.0.0"
                    date="December 15, 2025"
                    title="Initial Release"
                    description="The first version of PuNotes is live."
                >
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-2">
                        <li>Basic note sharing functionality</li>
                        <li>Branch and semester organization</li>
                        <li>Dark mode support</li>
                    </ul>
                </ChangelogItem>
            </motion.div>
        </div>
    );
}

function ChangelogItem({ version, date, title, description, children, isMajor }: any) {
    return (
        <motion.div
            variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
        >
            {/* Icon Node */}
            <div className="absolute left-0 md:left-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted shadow-sm -translate-x-1/2 shrink-0 z-10 group-[.is-active]:bg-primary group-[.is-active]:text-primary-foreground">
                <div className="w-2.5 h-2.5 bg-current rounded-full" />
            </div>

            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4">
                <Card className={`p-6 border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:bg-card hover:shadow-lg ${isMajor ? 'border-primary/20 bg-primary/5' : ''}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${isMajor ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                    {version}
                                </span>
                                <span className="text-sm text-muted-foreground">{date}</span>
                            </div>
                            <h3 className="text-xl font-bold">{title}</h3>
                        </div>
                    </div>

                    <p className="text-muted-foreground mb-6">{description}</p>

                    {children}
                </Card>
            </div>
        </motion.div>
    );
}

function ChangeItem({ icon: Icon, title, description }: any) {
    return (
        <li className="flex gap-3">
            <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
                <span className="font-semibold text-foreground">{title}</span>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </li>
    );
}
