import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import User, { IUser } from '~~/server/models/User';

export default defineEventHandler(async (event) => {
	const cookies = parse(event.node.req.headers.cookie || '');
	const token = cookies.auth_token;

	if (!token) {
		setResponseStatus(event, 401);
		return { error: 'Unauthorized.' };
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
			id: string;
			email: string;
		};

		// decoded.id is Mongo user _id
		const user: IUser | null = await User.findById(decoded.id);

		if (!user) {
			setResponseStatus(event, 401);
			return { error: 'Deleted or uknown user.' };
		}

		return { userId: user.id, email: user.email };
	}
	catch {
		setResponseStatus(event, 401);
		return { error: 'Invalid or expired token.' };
	}
});
