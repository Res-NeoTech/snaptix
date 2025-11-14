import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

let redis: Redis;

export function getRedis() {
  if (!redis) {
    redis = new Redis(redisUrl, {
      retryStrategy(times) {
        // Reconnecting with 10 seconds delay.
        const delay = Math.min(times * 200, 10000);
        console.warn(`[Redis] Reconnecting in ${delay}ms...`);
        return delay;
      },
    });

    redis.on('connect', () => console.log('[Redis] Connected'));
    redis.on('error', (err) => console.error('[Redis] Error:', err));
    redis.on('close', () => console.warn('[Redis] Connection closed'));
  }

  return redis;
}