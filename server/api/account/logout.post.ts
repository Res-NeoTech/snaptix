import { setCookie } from 'h3';

export default defineEventHandler(async (event) => {
	const user = await getUserFromEvent(event);
	const ip: string = getRequestIP(event) ?? 'unknown';
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
