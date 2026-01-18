"use client";

import { useEffect, useState } from "react";
import { Github, Star } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatePresence } from "motion/react";

export function GithubFollowDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        const lastSeen = localStorage.getItem("github-star-seen");
        const now = new Date().getTime();
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (!lastSeen || now - parseInt(lastSeen) > twentyFourHours) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 10000); // 10 seconds delay

            return () => clearTimeout(timer);
        }
    }, []);

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            localStorage.setItem("github-star-seen", new Date().getTime().toString());
            setIsOpen(false);
        }
    };

    const handleAction = () => {
        localStorage.setItem("github-star-seen", new Date().getTime().toString());
        setIsOpen(false);
    };

    if (!hasMounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                    <DialogContent className="sm:max-w-[425px] border-border/50 bg-background/80 backdrop-blur-xl shadow-2xl p-6">
                        <DialogHeader className="flex flex-col items-center justify-center space-y-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full" />
                                <div className="relative bg-background p-4 rounded-full border border-border shadow-sm">
                                    <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                                </div>
                            </div>

                            <div className="text-center space-y-2">
                                <DialogTitle className="text-2xl font-bold tracking-tight text-balance">
                                    Star us on GitHub!
                                </DialogTitle>
                                <DialogDescription className="text-center text-muted-foreground text-base max-w-[300px] mx-auto">
                                    If you find <span className="font-semibold text-foreground">PuNotes</span> helpful, please consider giving it a star. It helps us reach more students!
                                </DialogDescription>
                            </div>
                        </DialogHeader>

                        <DialogFooter className="flex-col sm:flex-row gap-3 mt-6">
                            <Button
                                variant="ghost"
                                onClick={() => handleOpenChange(false)}
                                className="w-full sm:w-1/2 rounded-full"
                            >
                                Maybe Later
                            </Button>
                            <Button
                                asChild
                                className="w-full sm:w-1/2 gap-2 group rounded-full bg-foreground text-background hover:bg-foreground/90"
                                onClick={handleAction}
                            >
                                <Link
                                    href="https://github.com/f0rsakeN-afk/punotes"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github className="w-4 h-4" />
                                    Star Repository
                                </Link>
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </AnimatePresence>
    );
}
