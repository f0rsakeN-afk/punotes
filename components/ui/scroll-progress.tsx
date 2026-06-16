"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ScrollProgress({
  className,
}: {
  className?: string
}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0
      setProgress(scrollProgress)
    }

    window.addEventListener("scroll", updateProgress, { passive: true })
    updateProgress()

    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-px bg-border",
        className
      )}
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-primary via-primary/80 to-primary/60 transition-transform duration-75 ease-out"
        style={{
          transform: `scaleX(${progress})`,
        }}
      />
    </div>
  )
}
