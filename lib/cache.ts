import { getRedis } from './redis';
import prisma from '@/lib/prisma';

interface CacheOptions {
  expire?: number; // TTL in seconds, default 1 hour
  keyPrefix?: string;
}

const DEFAULT_TTL = 3600; // 1 hour

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const redis = await getRedis();
    const data = await redis.get(key);
    if (!data) return null;
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Redis HIT] ${key}`);
    }
    return JSON.parse(data) as T;
  } catch (error) {
    console.error('[Redis Error] get:', error);
    return null; // Fallback to DB on Redis failure
  }
}

export async function cacheSet<T>(
  key: string,
  value: T,
  options: CacheOptions = {}
): Promise<void> {
  try {
    const redis = await getRedis();
    const ttl = options.expire ?? DEFAULT_TTL;
    await redis.setEx(key, ttl, JSON.stringify(value));
  } catch (error) {
    console.error('[Redis Error] set:', error);
    // Silently fail — app continues without caching
  }
}

export async function cacheDelete(key: string): Promise<void> {
  try {
    const redis = await getRedis();
    await redis.del(key);
  } catch (error) {
    console.error('[Redis Error] delete:', error);
  }
}

export async function cacheDeletePattern(pattern: string): Promise<void> {
  try {
    const redis = await getRedis();
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(keys);
    }
  } catch (error) {
    console.error('Cache delete pattern error:', error);
  }
}

// Helper to build cache key
export function buildCacheKey(prefix: string, ...parts: string[]): string {
  return `${prefix}:${parts.join(':')}`;
}

// User cache helper
const USER_CACHE_TTL = 300; // 5 minutes

export async function getCachedUser(stackID: string) {
  const cacheKey = buildCacheKey("user", stackID);

  // Try cache first
  const cached = await cacheGet<{ id: string; stackID: string; email: string; role: string }>(cacheKey);
  if (cached) return cached;

  // Miss → query DB
  const user = await prisma.user.findUnique({ where: { stackID } });
  if (user) {
    await cacheSet(cacheKey, user, { expire: USER_CACHE_TTL });
  }
  return user;
}
