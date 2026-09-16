"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { getDownloadUrl } from "@/utils/googleDrive";
import { cn } from "@/lib/utils";

interface DownloadButtonProps {
    url: string;
    className?: string;
}

export const DownloadButton = ({ url, className }: DownloadButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = () => {
        // We don't prevent default here because we want the link to open
        // But we set loading state to give feedback
        setIsLoading(true);

        // Reset loading state after a delay since we can't track the actual download
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return (
        <>
        <Button
            variant="outline"
            className={cn(
                "flex gap-2 items-center text-xs lg:text-sm transition-all duration-200",
                isLoading && "opacity-80 cursor-wait",
                className
            )}
            asChild
        >
            <a
                href={getDownloadUrl(url)}
                download
                onClick={handleDownload}
                className={cn(isLoading && "pointer-events-none")}
                aria-describedby="download-status"
            >
                {isLoading ? (
                    <>
                        <Loader2 data-icon="inline-start" className="w-4 h-4 animate-spin" />
                        Starting...
                    </>
                ) : (
                    <>
                        <Download data-icon="inline-start" className="w-4 h-4" />
                        Download
                    </>
                )}
            </a>
        </Button>
        <span id="download-status" role="status" aria-live="polite" className="sr-only">{isLoading ? "Starting download" : ""}</span>
        </>
    );
};
