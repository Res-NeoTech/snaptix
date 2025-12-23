import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { setCookie } from 'h3';
import type { IUser } from '~~/server/models/User';
import User from '~~/server/models/User';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const email: string = body.email;
	const password: string = body.password;

	if (!(email && password)) {
		setResponseStatus(event, 400);
		return { error: 'Username and Password are required to login.' };
	}

	const eventUser = getUserFromEvent(event);

	if (eventUser) {
		setResponseStatus(event, 409);
		return { error: 'User is already authentified.' };
	}

	// Rate-limiting log-in attempts.
	const redis = getRedis();

	const ip: string = getRequestIP(event) ?? 'unknown';

	const limits = [
		{ key: `auth:login:minutely:${ip}`, limit: 5, ttl: 60 }, // 5 attempts per minute.
		{ key: `auth:login:hourly:${ip}`, limit: 20, ttl: 60 * 60 }, // 20 attempts per hour.
	];

	for (const l of limits) {
		const count = await redis.incr(l.key);
		if (count === 1) await redis.expire(l.key, l.ttl);
		if (count > l.limit) {
			setResponseStatus(event, 429);
			logger.warn(`[Log-In] Rate-limit triggered for key : ${l.key}`);
			return { error: 'Too many login attempts. Please wait a moment.' };
		}
	}

	const user: IUser | null = await User.findOne({ email });

	if (!user) {
		setResponseStatus(event, 401);
		logger.warn(`[Log-In] Failed to authentify user. Email not found : ${email} | IP: ${ip}`);
		return { error: 'Incorrect login credentials. Please try again.' };
	}

	const matches = await argon2.verify(user.password, password);

	if (!matches) {
		setResponseStatus(event, 401);
		logger.warn(`[Log-In] Failed to authentify user. Password didn't match for this user : ${user.id} | IP: ${ip}`);
		return { error: 'Incorrect login credentials. Please try again.' };
	}

	const token = jwt.sign(
		{ id: user.id, email: user.email }, // payload
		process.env.JWT_SECRET!,
		{ expiresIn: '31d' },
	);

	setCookie(event, 'auth_token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		path: '/',
		maxAge: 31 * 24 * 60 * 60,
	});

	logger.info(`[Log-In] User successfully authentified: ${user.id} | IP: ${ip}`);

	return {
		message: 'User successfully authentified.',
		user: { id: user.id, username: user.username, email: user.email },
	};
});
