import { StackClientApp } from "@stackframe/stack";

export const stackClientApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
});

// Graceful handling for adblock / offline: suppress noisy RetryError from Stack Auth
// These errors occur when `r.stack-auth.com` or `api*.stack-auth.com` are blocked by
// adblock (ERR_BLOCKED_BY_CLIENT) or transient network (ERR_FAILED). They do not affect
// core app functionality; client will retry on next navigation.
if (typeof window !== "undefined") {
  const originalError = console.error;
  const suppressedPatterns = [/RetryError/, /Failed to fetch/, /HexclaveAssertionError/, /EventTracker flush failed/];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.error = (...args: any[]) => {
    const msg = args.map((a) => String(a)).join(" ");
    if (suppressedPatterns.some((p) => p.test(msg)) && msg.includes("stack-auth")) {
      // Silently ignore stack-auth network noise when blocked
      return;
    }
    originalError(...args);
  };
}
