"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-dvh bg-linear-to-br from-primary/5 to-primary/10 dark:from-background dark:to-muted/40 text-center px-4">

      <AlertTriangle className="w-16 h-16 text-primary mb-6 animate-bounce" />

      <h1 className="text-6xl font-extrabold text-primary mb-4">
        404
      </h1>

      <h2 className="text-2xl font-semibold mb-2 text-foreground">
        Page Not Found
      </h2>

      <p className="text-muted-foreground max-w-md mb-6">
        Oops! The page you are looking for does not exist, may have been moved, or is temporarily unavailable.
      </p>

      <Button
        onClick={() => router.push("/")}
        className="flex items-center gap-2"
      >
        Go Back Home
      </Button>

      {/* Optional Fun Illustration */}
      <div className="mt-12 text-9xl select-none opacity-10 dark:opacity-20">
        🐾🚀
      </div>
    </div>
  );
}
