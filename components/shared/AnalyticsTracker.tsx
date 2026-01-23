"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

export function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        const trackVisit = async () => {
            try {
                // We'll call an API route to log the visit
                await axios.post("/api/analytics/track", {
                    path: pathname,
                    referrer: document.referrer,
                });
            } catch (error) {
                // Silently fail to not disrupt user experience
                console.error("Analytics tracking failed:", error);
            }
        };

        trackVisit();
    }, [pathname]);

    return null;
}
