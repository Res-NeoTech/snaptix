import { getRedis } from '~~/server/utils/redis';

export default defineEventHandler(async () => {
	const redis = getRedis();
	await redis.set('test-key', 'Hello Redis', 'EX', 10);
	const value = await redis.get('test-key');
	return { message: value };
});
