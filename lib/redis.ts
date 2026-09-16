import { createClient, type RedisClientType } from 'redis';

const globalForRedis = global as unknown as {
  redis: RedisClientType | undefined;
};

function createRedisClient() {
  // validate env lazily to avoid build-time crash; use process.env directly with fallback
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl && process.env.NODE_ENV === "production") {
    console.warn("[Redis] REDIS_URL missing in production");
  }
  const client = createClient({
    url: redisUrl,
    socket: {
      connectTimeout: 5000,
      reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
    },
  });

  client.on('error', (err) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Redis Error]', err);
    }
  });

  return client;
}

export const redis = globalForRedis.redis ?? createRedisClient();

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;

export async function getRedis() {
  if (!redis.isOpen) {
    await redis.connect();
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Redis] Connected');
    }
  }
  return redis;
}
