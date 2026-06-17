import { getRedis } from "./redis";

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number; // Timestamp when the window resets
}

/**
 * Sliding window rate limiter using Redis
 * More accurate than fixed window - prevents burst at window boundaries
 */
export async function slidingWindowRateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const redis = await getRedis();
  const key = `ratelimit:${identifier}`;
  const now = Date.now();
  const windowStart = now - config.windowMs;

  try {
    // Remove old entries outside the window
    await redis.zRemRangeByScore(key, windowStart.toString(), "+inf");

    // Count current requests in window
    const currentCount = await redis.zCard(key);

    // Check if over limit before adding
    if (currentCount >= config.maxRequests) {
      return {
        success: false,
        remaining: 0,
        reset: now + config.windowMs,
      };
    }

    // Add current request with timestamp as score
    await redis.zAdd(key, { score: now, value: `${now}-${Math.random()}` });

    // Set expiry on the key
    await redis.pExpire(key, config.windowMs);

    const remaining = Math.max(0, config.maxRequests - currentCount - 1);

    return {
      success: true,
      remaining,
      reset: now + config.windowMs,
    };
  } catch (error) {
    console.error("Rate limit error:", error);
    // Fail open - allow request if Redis is down
    return { success: true, remaining: config.maxRequests, reset: now + config.windowMs };
  }
}

/**
 * Get client identifier for rate limiting
 * Uses X-Forwarded-For header or fallback to IP
 */
export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return `ip:${ip}`;
}

/**
 * Create a rate limit checker for a specific endpoint
 */
export function createRateLimiter(windowMs: number, maxRequests: number) {
  return async (request: Request): Promise<{ success: boolean; remaining: number; reset: number }> => {
    const identifier = getClientIdentifier(request);
    return slidingWindowRateLimit(identifier, { windowMs, maxRequests });
  };
}

// Pre-configured rate limiters for different use cases
export const rateLimiters = {
  // Strict: 10 requests per minute (for sensitive endpoints)
  strict: createRateLimiter(60 * 1000, 10),

  // Standard: 30 requests per minute (for general API endpoints)
  standard: createRateLimiter(60 * 1000, 30),

  // Lenient: 60 requests per minute (for search/filtering)
  lenient: createRateLimiter(60 * 1000, 60),

  // Webhook: 100 requests per minute (for webhooks/callbacks)
  webhook: createRateLimiter(60 * 1000, 100),
};
