import type { IUser } from '~~/server/models/User';
import User from '~~/server/models/User';
import { getRedis } from '~~/server/utils/redis';
import { getUserFromEvent } from '~~/server/utils/getUserFromEvent';

export default defineEventHandler(async (event) => {
	const user = await getUserFromEvent(event);
	if (!user) {
		setResponseStatus(event, 401);
		return { error: 'Unauthorized.' };
	}

	const dbInfo: IUser | null = await User.findById(user.id);
	if (!dbInfo) {
		setResponseStatus(event, 404);
		return { error: 'User not found.' };
	}

	// Date formatting
	const dd: string = String(dbInfo.joinDate.getDate()).padStart(2, '0');
	const mm: string = String(dbInfo.joinDate.getMonth() + 1).padStart(2, '0');
	const yyyy: string = dbInfo.joinDate.getFullYear().toString();
	const formattedDate: string = dd + '.' + mm + '.' + yyyy;

	// Limitation management
	const redis = await getRedis();

	const userKey: string = `fixes:${dbInfo?.isPremium ? 'premium' : 'user'}:${dbInfo.id}`;
	const countStr = await redis.get(userKey);
	const ttl: number = await redis.ttl(userKey);

	const correctionLimit: number = dbInfo.isPremium ? 50 : 15;
	const correctionCount: number = countStr ? Number(countStr) : 0;

	return {
		id: dbInfo.id.toUpperCase(),
		username: dbInfo.username,
		email: dbInfo.email,
		joinDate: formattedDate,
		isPremium: dbInfo.isPremium,
		correctionLimit,
		correctionCount,
		correctionQuotaReset: ttl === -2 ? 'NONE' : formatDuration(ttl),
	};
});

/**
 * Formats seconds to a human-readable string.
 * @param seconds - The number of seconds to format.
 * @returns A string representing the duration in hours and minutes.
 */
function formatDuration(seconds: number): string {
	const h: number = Math.floor(seconds / 3600);
	const m: number = Math.floor((seconds % 3600) / 60);

	const parts: string[] = [];
	if (h > 0) parts.push(`${h} hour${h > 1 ? 's' : ''}`);
	if (m > 0) parts.push(`${m} minute${m > 1 ? 's' : ''}`);

	return parts.join(' ');
}
