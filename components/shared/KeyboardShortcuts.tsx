"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "react-hot-toast";

export function KeyboardShortcuts() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    let lastPressed: string | null = null;
    let lastTime = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const now = Date.now();
      const key = e.key.toLowerCase();

      // Prevent repeated triggers from key repeat
      if (key === lastPressed && now - lastTime < 300) return;
      lastPressed = key;
      lastTime = now;

      // '/' - Focus search
      if (key === "/") {
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>('input[placeholder*="Search"]');
        if (searchInput) {
          searchInput.focus();
        } else {
          router.push("/pdfs");
        }
      }

      // 'd' - Toggle dark mode
      if (key === "d") {
        e.preventDefault();
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        toast.success(`${newTheme === "dark" ? "🌙" : "☀️"} ${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode`);
      }

      // 'f' - Go to favorites
      if (key === "f" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        router.push("/favorites");
      }

      // 's' - Go to share
      if (key === "s" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        router.push("/share");
      }

      // 'g h' - Go home
      if (key === "g") {
        const handleNext = (e2: KeyboardEvent) => {
          if (e2.key.toLowerCase() === "h") {
            e2.preventDefault();
            router.push("/");
            document.removeEventListener("keydown", handleNext);
          }
        };
        document.addEventListener("keydown", handleNext);
        setTimeout(() => document.removeEventListener("keydown", handleNext), 1000);
      }

      // '?' - Show shortcuts help
      if (key === "?") {
        e.preventDefault();
        toast.success(
          <div className="text-sm">
            <p className="font-medium mb-2">Keyboard Shortcuts</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span>/</span><span>Focus search</span>
              <span>d</span><span>Toggle dark mode</span>
              <span>f</span><span>Go to favorites</span>
              <span>s</span><span>Go to share</span>
              <span>g h</span><span>Go home</span>
              <span>?</span><span>Show shortcuts</span>
            </div>
          </div>,
          { duration: 5000 }
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router, theme, setTheme]);

  return null;
}
