"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const STORAGE_KEY = "punotes_theme_mode";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [mode, setMode] = React.useState<"light" | "dark" | "auto">("auto");

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY) as "light" | "dark" | "auto" | null;
    if (saved) {
      setMode(saved);
    } else {
      setMode("auto");
    }
  }, []);

  React.useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(STORAGE_KEY, mode);

    if (mode === "auto") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(mql.matches ? "dark" : "light");
      const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? "dark" : "light");
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    } else {
      setTheme(mode);
    }
  }, [mode, mounted, setTheme]);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme" className="w-9 h-9 opacity-50">
        <Sun className="h-[18px] w-[18px]" />
      </Button>
    );
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 relative"
              >
                {mode === "auto" ? (
                  <Monitor className="h-[18px] w-[18px] text-primary" />
                ) : theme === "dark" ? (
                  <Moon className="h-[18px] w-[18px]" />
                ) : (
                  <Sun className="h-[18px] w-[18px]" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setMode("light")}
              className={mode === "light" ? "bg-muted" : ""}
            >
              <Sun className="w-4 h-4 mr-2" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setMode("dark")}
              className={mode === "dark" ? "bg-muted" : ""}
            >
              <Moon className="w-4 h-4 mr-2" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setMode("auto")}
              className={mode === "auto" ? "bg-muted" : ""}
            >
              <Monitor className="w-4 h-4 mr-2" />
              Auto (7PM - 7AM)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipContent side="bottom">
          <p className="text-xs">
            {mode === "auto"
              ? `Auto (${theme === "dark" ? "🌙 Night" : "☀️ Day"})`
              : mode === "dark"
              ? "Dark mode"
              : "Light mode"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
