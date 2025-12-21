import type { IUser } from '~~/server/models/User';
import User from '~~/server/models/User';
import argon2 from 'argon2';
import { validatePassword } from '~~/lib/utils/validators';
import { getUserFromEvent } from '~~/server/utils/getUserFromEvent';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const password: string = body.password;
	const newUsername: string = body.newUsername;
	const newPassword: string = body.newPassword;

	if (!password) {
		setResponseStatus(event, 400);
		return { error: 'Password is required to edit account info.' };
	}

	if (!newUsername && !newPassword) {
		setResponseStatus(event, 400);
		return { error: 'At least new username or new password are required to edit account info.' };
	}

	// Username validation
	if (newUsername && !(newUsername.length > 3 && newUsername.length <= 100)) {
		setResponseStatus(event, 400);
		return { error: 'Username must be between 3 and 100 characters long.' };
	}

	// New password validation
	if (newPassword && !validatePassword(newPassword)) {
		setResponseStatus(event, 400);
		return { error: 'Password must be at least 6 characters long and include at least one number and one special character.' };
	}

	const user = await getUserFromEvent(event);
	if (!user) {
		setResponseStatus(event, 401);
		return { error: 'Unauthorized.' };
	}

	const dbUser: IUser | null = await User.findById(user.id);
	if (!dbUser) {
		setResponseStatus(event, 404);
		return { error: 'User not found.' };
	}

	const matches: boolean = await argon2.verify(dbUser.password, password);

	if (!matches) {
		setResponseStatus(event, 403);
		return { error: 'Incorrect password. Please try again.' };
	}

	if (newUsername && newUsername != dbUser.username) dbUser.username = newUsername;
	if (newPassword) dbUser.password = await argon2.hash(newPassword, { type: argon2.argon2id });

	dbUser.lastUpdated = new Date();
	await dbUser.save();

	logger.info(`[Edit User] Successfully edited user info : ${dbUser.id}`);

	setResponseStatus(event, 204);
	return null;
});
