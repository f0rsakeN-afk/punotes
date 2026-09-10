"use client";

import { TopHeader } from "@/components/shared/TopHeader";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import Footer from "@/components/shared/Footer";
import { MaintenanceBanner } from "@/components/shared/MaintenanceBanner";
import { KeyboardShortcuts } from "@/components/shared/KeyboardShortcuts";
import { InstallPrompt } from "@/components/common/InstallPrompt";

import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";

function TrackPageView() {
  useEffect(() => {
    // Fire and forget - don't block UI
    axios.post("/api/analytics/track", {
      path: window.location.pathname,
      referrer: document.referrer,
    }).catch(() => {});
  }, []);

  return null;
}

export default function MainLayoutClient({
  children,
  isAdmin,
  initialUser,
}: {
  children: React.ReactNode;
  isAdmin?: boolean;
  initialUser?: {
    displayName: string | null;
    primaryEmail: string | null;
    profileImageUrl: string | null;
  } | null;
}) {
  const [queryClient] = useState(() => {
    const qc = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 60,
          gcTime: 1000 * 60 * 60,
          retry: 1,
        },
      },
    });

    if (typeof window !== "undefined") {
      const persister = createAsyncStoragePersister({
        storage: window.localStorage,
      });

      persistQueryClient({
        queryClient: qc,
        persister,
        maxAge: 1000 * 60 * 60 * 24,
        buster: "v1",
      });
    }

    return qc;
  });

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
      )}
      <ScrollProgress />
      <KeyboardShortcuts />
      <TrackPageView />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="flex flex-col min-h-screen">
        <MaintenanceBanner />
        <TopHeader isAdmin={isAdmin} initialUser={initialUser} />
        <main id="main-content" className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Toaster position="top-right" />
          {children}
        </main>
        <Footer />
        <InstallPrompt />
      </div>
    </QueryClientProvider>
  );
}
