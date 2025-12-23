import jwt from 'jsonwebtoken';
import { getCookie } from 'h3';

/**
 * Obtain crucial user info from H3 event by decoding jwt.
 * @param event H3 event instance.
 * @returns decoded user info from jwt.
 */
export function getUserFromEvent(event: any) {
	const token = getCookie(event, 'auth_token');
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
