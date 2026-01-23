/**
 * Prefetch utility for optimizing page navigation
 * Uses requestIdleCallback to prefetch data when browser is idle
 */

export function prefetchData(url: string): Promise<Response> {
  return fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

export function prefetchWithIdleCallback(url: string): void {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(
      () => {
        prefetchData(url).catch(() => {
          // Silent fail for prefetch
        });
      },
      { timeout: 2000 }
    );
  } else {
    // Fallback to setTimeout for browsers without requestIdleCallback
    setTimeout(() => {
      prefetchData(url).catch(() => {
        // Silent fail for prefetch
      });
    }, 100);
  }
}

export function usePrefetch(url: string): void {
  if (typeof window !== "undefined") {
    prefetchWithIdleCallback(url);
  }
}
