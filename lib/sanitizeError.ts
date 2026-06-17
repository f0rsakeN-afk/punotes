/**
 * Sanitize error messages for API responses
 * Strips stack traces and internal implementation details
 */
export function sanitizeError(error: unknown): string {
  if (error instanceof Error) {
    // Don't expose internal paths or implementation details
    const message = error.message;

    // Common patterns to strip
    const patterns = [
      /\/[a-zA-Z0-9_\-./]+\/node_modules\//gi,
      /\/home\/[a-zA-Z0-9_]+\//gi,
      /C:\\[a-zA-Z0-9_\\]+\\/gi,
      /at [a-zA-Z0-9_.<>]+\s\(/gi,
      /`[a-zA-Z0-9_]+`/g,
    ];

    let sanitized = message;
    for (const pattern of patterns) {
      sanitized = sanitized.replace(pattern, "[internal]");
    }

    // If the sanitized message is too short or looks like garbage, use generic message
    if (sanitized.length < 5 || /^[[\]{}"\s]+$/.test(sanitized)) {
      return "An unexpected error occurred. Please try again.";
    }

    return sanitized;
  }

  // For non-Error objects, use generic message
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