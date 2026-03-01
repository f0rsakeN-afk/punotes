"use client";

import { TopHeader } from "@/components/shared/TopHeader";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import Footer from "@/components/shared/Footer";
import SmoothScroll from "@/components/ui/smooth-scroll";
import { GithubFollowDialog } from "@/components/shared/GithubFollowDialog";
import { VolunteerDialog } from "@/components/shared/VolunteerDialog";

import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { isAdviceDue } from "@/lib/advice-cookie";

export default function MainLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/advice") return;
    if (isAdviceDue()) router.push("/advice");
  }, [pathname, router]);

  const [queryClient] = useState(() => {
    const qc = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 30,
          gcTime: 1000 * 60 * 30,
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
      <SmoothScroll />
      <ScrollProgress />
      <div className="flex flex-col min-h-screen">
        <TopHeader />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Toaster position="top-right" />
          {children}
        </main>
        <GithubFollowDialog />
        <VolunteerDialog />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
