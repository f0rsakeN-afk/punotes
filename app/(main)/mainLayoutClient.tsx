"use client";

import { TopHeader } from "@/components/shared/TopHeader";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import Footer from "@/components/shared/Footer";

import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function MainLayoutClient({
  children,
  isAdmin,
}: {
  children: React.ReactNode;
  isAdmin?: boolean;
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
      <div className="flex flex-col min-h-screen">
        <TopHeader isAdmin={isAdmin} />
        <main className="flex-1 w-full max-w-6xl mx-auto px-2 sm:px-4 py-6">
          <Toaster position="top-right" />
          {children}
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
