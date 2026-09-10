import "server-only";

import { cache } from "react";
import { stackServerApp } from "@/stack/server";
import prisma from "@/lib/prisma";
import { cacheDelete, getCachedUser } from "@/lib/cache";

export type CachedDbUser = {
  id: string;
  stackID: string;
  email: string;
  role: string;
};

/**
 * Request-scoped dedup of Stack Auth verification.
 * Without `cache()`, every `getUser()` in layout + page + API
 * triggers its own network roundtrip to Stack (~200-800ms each).
 * With `cache()`, N calls in one request = 1 verification.
 */
export const getStackUser = cache(async () => {
  try {
    return await stackServerApp.getUser();
  } catch {
    return null;
  }
});

/**
 * Cached DB user lookup (React cache -> Redis 5min -> Postgres).
 * Use this instead of raw `prisma.user.findUnique({ where: { stackID } })`.
 */
export const getCurrentUser = cache(async (): Promise<CachedDbUser | null> => {
  const stackUser = await getStackUser();
  if (!stackUser) return null;
  try {
    return (await getCachedUser(stackUser.id)) as CachedDbUser | null;
  } catch {
    return null;
  }
});

export const isAdmin = cache(async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return user?.role === "ADMIN";
});

/**
 * Lazily ensure the Stack user exists in Postgres.
 * Call this only on write paths (first message, first upload, etc.),
 * NOT in layouts or read paths. Returns cached user when present
 * to avoid a DB write on every request.
 */
export async function ensureUserExists(): Promise<CachedDbUser | null> {
  const stackUser = await getStackUser();
  if (!stackUser?.primaryEmail) return null;

  const cached = await getCurrentUser().catch(() => null);
  if (cached) {
    // Sync email in background without blocking or busting cache.
    // Fire-and-forget: never await this from layouts.
    if (cached.email !== stackUser.primaryEmail) {
      prisma.user
        .update({
          where: { stackID: stackUser.id },
          data: { email: stackUser.primaryEmail },
        })
        .then(() => cacheDelete(`user:${stackUser.id}`))
        .catch(() => {});
    }
    return cached;
  }

  const user = await prisma.user.upsert({
    where: { stackID: stackUser.id },
    update: { email: stackUser.primaryEmail },
    create: {
      stackID: stackUser.id,
      email: stackUser.primaryEmail,
      role: "USER",
    },
    select: { id: true, stackID: true, email: true, role: true },
  });
  // Populate Redis for subsequent reads (don't delete!).
  const { cacheSet, buildCacheKey } = await import("@/lib/cache");
  await cacheSet(buildCacheKey("user", stackUser.id), user, {
    expire: 300,
  }).catch(() => {});
  return user;
}
