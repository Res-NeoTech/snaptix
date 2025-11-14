import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import User, { IUser } from '~~/server/models/User';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const email: string = body.email;
	const password: string = body.password;

	if (!(email && password)) {
		setResponseStatus(event, 400);
		return { error: 'Username and Password are required to login.' };
	}

	const user: IUser | null = await User.findOne({ email });

	if (!user) {
		setResponseStatus(event, 401);
		return { error: 'Incorrect login credentials. Please try again.' };
	}

	const matches = await argon2.verify(user.password, password);

	if (!matches) {
		setResponseStatus(event, 401);
		return { error: 'Incorrect login credentials. Please try again.' };
	}

	const token = jwt.sign(
		{ id: user.id, email: user.email }, // payload
		process.env.JWT_SECRET!,
		{ expiresIn: '31d' },
	);

	event.node.res.setHeader(
		'Set-Cookie',
		serialize('auth_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
			maxAge: 31 * 24 * 60 * 60,
		}),
	);

	return {
		message: 'User successfully logged-in.',
		user: { id: user.id, username: user.username, email: user.email },
	};
});
