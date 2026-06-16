"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface HighlighterProps {
  children: React.ReactNode
  action?: "highlight" | "underline" | "box" | "circle"
  color?: string
  padding?: number
  className?: string
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  padding = 2,
  className = "",
}: HighlighterProps) {
  const style: React.CSSProperties = {
    backgroundColor: action === "highlight" ? color : undefined,
    textDecoration: action === "underline" ? `underline ${color}` : undefined,
    border: action === "box" ? `2px solid ${color}` : undefined,
    borderRadius: action === "box" ? "4px" : undefined,
    padding: action === "box" ? `${padding}px 4px` : undefined,
  };

  return (
    <span
      className={cn(
        "relative inline-block",
        action === "underline" && "underline decoration-2",
        action === "box" && "font-semibold",
        className
      )}
      style={style}
    >
      {children}
    </span>
  )
}
