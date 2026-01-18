"use client";

import { useEffect, useState } from "react";
import { Sparkles, Zap, Smartphone, Moon, ArrowRight } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

export function ChangelogDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        const hasSeenChangelog = localStorage.getItem("v2-changelog-seen");

        if (!hasSeenChangelog) {
            // Show after a short delay to not overwhelm immediately
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem("v2-changelog-seen", "true");
        setIsOpen(false);
    };

    if (!hasMounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
                    <DialogContent className="sm:max-w-[500px] border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl p-0 overflow-hidden">
                        <div className="relative h-32 bg-linear-to-br from-primary/20 to-secondary/20 p-6 flex flex-col justify-end">
                            <div className="absolute top-4 right-4 bg-background/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                                v2.0 Update
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <DialogTitle className="text-3xl font-bold tracking-tight text-balance">
                                    What's New in PuNotes
                                </DialogTitle>
                                <DialogDescription className="text-foreground/80 mt-1">
                                    We've completely overhauled availability & performance.
                                </DialogDescription>
                            </motion.div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                <FeatureItem
                                    icon={Sparkles}
                                    title="Brand New UI"
                                    description="A premium, cleaner aesthetic with glassmorphism and refined details."
                                    color="text-yellow-500"
                                />
                                <FeatureItem
                                    icon={Smartphone}
                                    title="Install as App (PWA)"
                                    description="Install PuNotes on your home screen and use it offline."
                                    color="text-blue-500"
                                />
                                <FeatureItem
                                    icon={Zap}
                                    title="Blazing Fast"
                                    description="Instant navigation with smart prefetching and optimized assets."
                                    color="text-orange-500"
                                />
                                <FeatureItem
                                    icon={Moon}
                                    title="Deep Dark Mode"
                                    description="Refined dark theme for better readability at night."
                                    color="text-indigo-500"
                                />
                            </div>
                        </div>

                        <DialogFooter className="p-6 pt-0 flex-row gap-3 sm:justify-between items-center bg-muted/20">
                            <Button
                                variant="ghost"
                                asChild
                                className="text-muted-foreground hover:text-primary p-0 h-auto font-normal"
                            >
                                <Link href="/changelog" onClick={handleClose}>
                                    View full changelog <ArrowRight className="w-3 h-3 ml-1" />
                                </Link>
                            </Button>
                            <Button onClick={handleClose} className="rounded-full px-8">
                                Got it
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </AnimatePresence>
    );
}

function FeatureItem({ icon: Icon, title, description, color }: any) {
    return (
        <div className="flex gap-4 items-start">
            <div className={`mt-1 p-2 rounded-lg bg-muted/50 ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <h4 className="font-semibold text-sm">{title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{description}</p>
            </div>
        </div>
    );
}
