import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export default defineEventHandler(async (event) => {
	const cookies = parse(event.node.req.headers.cookie || '');
	const token = cookies.auth_token;

	if (!token) {
		setResponseStatus(event, 401);
		return { error: 'Unauthorized' };
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
			id: string;
			email: string;
		};

		// decoded.id is your Mongo user _id
		// You can now query DB if you need full user object:
		// const user = await User.findById(decoded.id);

		return { userId: decoded.id, email: decoded.email };
	}
	catch (err) {
		setResponseStatus(event, 401);
		return { error: 'Invalid or expired token' };
	}
});
