import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

let redis: Redis;

/**
 * Get singleton Redis instance.
 * @returns Redis instance.
 */
export function getRedis(): Redis {
	if (!redis) {
		redis = new Redis(redisUrl, {
			retryStrategy(times) {
				// Reconnecting with 10 seconds delay.
				const delay = Math.min(times * 200, 10000);
				logger.warn(`[Redis] Reconnecting in ${delay}ms...`);
				return delay;
			},
		});

		redis.on('connect', () => logger.info('[Redis] Connected'));
		redis.on('error', err => logger.error(err, '[Redis] Error:'));
		redis.on('close', () => logger.warn('[Redis] Connection closed'));
	}

	return redis;
}

/**
 * Safely decrements a key in Redis if it exists and has a positive numeric value.
 * @param redis Redis client instance
 * @param key Key to decrement
 */
export async function safeDecr(redis: Redis, key: string) {
	try {
		const exists = await redis.exists(key);
		if (!exists) return;
		const current = Number(await redis.get(key));
		if (!isNaN(current) && current > 0) {
			await redis.decr(key);
		}
	}
	catch (err) {
		// логируем, но не кидаем — нельзя ломать обработку ошибки внешнего API
		logger.error(err, '[safeDecr] error:');
	}
}

/**
 * Applies a rate limit using Redis.
 * @param redis Redis client instance
 * @param key Key to use for rate limiting
 * @param max Maximum allowed count
 * @returns true if within rate limit, false if exceeded
 */
export async function applyRateLimit(redis: Redis, key: string, max: number) {
	const count = await redis.incr(key);

	if (count === 1) {
		await redis.expire(key, 24 * 60 * 60);
	}

	if (count > max) {
		await safeDecr(redis, key); // Undo increment
		return false;
	}

	return true;
}
