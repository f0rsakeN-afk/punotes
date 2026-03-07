export function AnalyticsTracker() {
  return null;
}

/*
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

export function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        const trackVisit = async () => {
            try {
                await axios.post("/api/analytics/track", {
                    path: pathname,
                    referrer: document.referrer,
                });
            } catch (error) {
                console.error("Analytics tracking failed:", error);
            }
        };

        trackVisit();
    }, [pathname]);

    return null;
}
*/
