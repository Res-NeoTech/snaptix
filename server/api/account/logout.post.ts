import { setCookie } from 'h3';
import { getClientIp } from '~~/server/utils/getClientIp';

export default defineEventHandler(async (event) => {
	const user = await getUserFromEvent(event);
	const ip: string = getClientIp(event) ?? 'unknown';
	if (!user) {
		setResponseStatus(event, 401);
		return { error: 'Unauthorized.' };
	}

	setCookie(event, 'auth_token', '', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		path: '/',
		maxAge: 0,
	});

	logger.info(`[Log-Out] User logged-out: ${user.id} | IP: ${ip}`);

	return { status: 'User successfully logged-out.' };
});
