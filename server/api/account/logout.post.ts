import { getUserFromEvent } from '~~/server/utils/getUserFromEvent';
import { serialize } from 'cookie';

export default defineEventHandler(async (event) => {
	const user = await getUserFromEvent(event);
	if (!user) {
		setResponseStatus(event, 401);
		return { error: 'Unauthorized.' };
	}

	event.node.res.setHeader(
		'Set-Cookie',
		serialize('auth_token', '', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
			maxAge: 0,
		}),
	);

	return { status: 'User successfully logged-out.' };
});