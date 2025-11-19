"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-dvh bg-linear-to-br from-pink-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 text-center px-4">

      <AlertTriangle className="w-16 h-16 text-primary mb-6 animate-bounce" />

      <h1 className="text-6xl font-extrabold text-primary mb-4">
        404
      </h1>

      <h2 className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
        Page Not Found
      </h2>

      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
        Oops! The page you are looking for does not exist, may have been moved, or is temporarily unavailable.
      </p>

      <Button
        onClick={() => router.push("/")}
        className="bg-primary hover:bg-pink-700 text-white flex items-center gap-2"
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
