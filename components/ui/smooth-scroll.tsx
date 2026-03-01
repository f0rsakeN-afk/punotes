"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            // touchMultiplier: 2,
            prevent: (node) => !!node.closest('[role="dialog"]'),
        });

        // Handle scroll locking (e.g., when dialogs/sheets are open)
        // Radix UI sets data-scroll-locked on body; also check overflow:hidden for other cases
        const observer = new MutationObserver(() => {
            const isLocked =
                document.body.hasAttribute("data-scroll-locked") ||
                document.body.style.overflow === "hidden";
            if (isLocked) {
                lenis.stop();
            } else {
                lenis.start();
            }
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ["style", "data-scroll-locked"],
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            observer.disconnect();
        };
    }, []);

    return null;
}
