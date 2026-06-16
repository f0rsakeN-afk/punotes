"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

const STORAGE_KEY = "punotes_maintenance_banner_dismissed";

export function MaintenanceBanner() {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setBannerOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (bannerOpen) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    }
  }, [bannerOpen, mounted]);

  if (!mounted || !bannerOpen) return null;

  return (
    <div className="relative bg-destructive/10 border-b border-destructive/20">
      <div className="max-w-6xl mx-auto px-4 py-2.5 pr-10 flex items-center justify-center gap-2 text-sm">
        <span className="text-destructive font-medium">
          ⚠️ This site is no longer actively maintained.
        </span>
        <span className="text-muted-foreground">
          Want to keep it alive? Help by uploading notes at{" "}
        </span>
        <Link href="/share" className="text-primary hover:underline font-medium">
          /share
        </Link>
      </div>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 cursor-pointer text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
        onClick={() => setBannerOpen(false)}
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
