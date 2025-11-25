"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/Sidebar";
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
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => {
    const qc = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 60 * 1,
          gcTime: 1000 * 60 * 60 * 1,
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
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />

      <SidebarProvider>
        <ScrollProgress />
        <AppSidebar />
        <SidebarInset className="p-2">
          <SidebarTrigger className="mt-2" />
          <Toaster position="top-right" />
          {children}
          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
