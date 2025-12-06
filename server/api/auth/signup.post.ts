import validator from 'validator';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { setCookie } from 'h3';
import { validatePassword } from '~~/lib/utils/validators';
import { getUserFromEvent } from '~~/server/utils/getUserFromEvent';
import type { IUser } from '~~/server/models/User';
import User from '~~/server/models/User';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const username: string = body.username;
	const email: string = body.email;
	const password: string = body.password;

	// Username validation
	if (!username || !(username.length > 3 && username.length <= 100)) {
		setResponseStatus(event, 400);
		return { error: 'Username must be between 3 and 100 characters long.' };
	}

	// Email validation
	if (!validator.isEmail(email)) {
		setResponseStatus(event, 400);
		return { error: 'Please enter a valid email address.' };
	}

	// Password validation
	if (!validatePassword(password)) {
		setResponseStatus(event, 400);
		return { error: 'Password must be at least 6 characters long and include at least one number and one special character.' };
	}

	const eventUser = getUserFromEvent(event);
	if (eventUser) {
		setResponseStatus(event, 409);
		return { error: 'User is already registered.' };
	}

	// Rate-limiting signup-in attempts.
	const redis = getRedis();

	const ip: string = getRequestIP(event) ?? "unknown";

	const limits = [
		{ key: `auth:signup:fiveMinutely:${ip}`, limit: 3, ttl: 60 * 5 }, // 3 attempts per 5 minutes.
		{ key: `auth:signup:daily:${ip}`, limit: 10, ttl: 60 * 60 * 24 }, // 10 attempts per day.
	];

	for (const l of limits) {
		const count = await redis.incr(l.key);
		if (count === 1) await redis.expire(l.key, l.ttl);
		if (count > l.limit) {
			setResponseStatus(event, 429);
			return { error: "Too many signup attempts. Please wait a moment." };
		}
	}

	// Check if email already exists
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		setResponseStatus(event, 409);
		return { error: 'An account with this email already exists.' };
	}

	const hashedPassword: string = await argon2.hash(password, { type: argon2.argon2id });

	// Proceeding to create User
	const newUser: IUser = await User.create({
		username,
		email,
		password: hashedPassword,
	});

	const token = jwt.sign(
		{ id: newUser.id, email: newUser.email }, // payload
		process.env.JWT_SECRET!, // secret key (keep it secret!)
		{ expiresIn: '31d' },
	);

	setCookie(event, 'auth_token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		path: '/',
		maxAge: 31 * 24 * 60 * 60,
	});

	setResponseStatus(event, 201);
	return {
		message: 'User created and logged in.',
		user: { id: newUser.id, username: newUser.username, email: newUser.email },
	};
});
