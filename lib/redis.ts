import { createClient } from 'redis';

const globalForRedis = global as unknown as {
  redis: ReturnType<typeof createClient> | undefined;
};

function createRedisClient() {
  const client = createClient({
    url: process.env.REDIS_URL,
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
