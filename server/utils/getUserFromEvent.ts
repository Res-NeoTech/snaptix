import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export function getUserFromEvent(event: any) {
	const cookies = parse(event.node.req.headers.cookie || '');
	const token = cookies.auth_token;
	if (!token) return null;

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
			id: string;
			email: string;
		};
		return decoded;
	}
	catch {
		return null;
	}
}
