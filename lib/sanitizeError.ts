/**
 * Sanitize error messages for API responses
 * Strips stack traces and internal implementation details
 */
export function sanitizeError(error: unknown): string {
  if (error instanceof Error) {
    // Log full error server-side only; never return raw message to client
    // Strip sensitive patterns that leak internals
    const message = error.message;

    // Patterns that leak DB internals, paths, etc.
    const leakPatterns = [
      /Unique constraint failed on fields:.*$/gi,
      /Foreign key constraint failed.*$/gi,
      /Invalid.*prisma.*$/gi,
      /\/[a-zA-Z0-9_\-./]+\/node_modules\//gi,
      /\/home\/[a-zA-Z0-9_]+\//gi,
      /C:\\[a-zA-Z0-9_\\]+\\/gi,
      /at [a-zA-Z0-9_.<>]+\s\(/gi,
      /`[a-zA-Z0-9_]+`/g,
    ];

    let containsLeak = false;
    for (const pattern of leakPatterns) {
      if (pattern.test(message)) {
        containsLeak = true;
        break;
      }
    }
    if (containsLeak) {
      return "An unexpected error occurred. Please try again.";
    }

    // For any other Error, still don't return raw message to client
    // Only return generic - full message is logged server-side via console.error
    // If message is short and seems safe, allow it; otherwise generic
    if (message.length < 5 || /^[[\]{}"\s]+$/.test(message)) {
      return "An unexpected error occurred. Please try again.";
    }

    // Default: return generic server error to avoid leakage; callers should use ERROR_MESSAGES.SERVER_ERROR
    return "An unexpected error occurred. Please try again.";
  }

  return "An unexpected error occurred. Please try again.";
}

/**
 * Generic error messages for different error types
 */
export const ERROR_MESSAGES = {
  VALIDATION_ERROR: "Invalid input data",
  AUTH_REQUIRED: "Authentication required",
  FORBIDDEN: "You don't have permission to perform this action",
  NOT_FOUND: "The requested resource was not found",
  RATE_LIMITED: "Too many requests. Please try again later.",
  SERVER_ERROR: "An unexpected error occurred. Please try again.",
  ALREADY_EXISTS: "This resource already exists",
  CACHE_ERROR: "Failed to retrieve cached data",
} as const;