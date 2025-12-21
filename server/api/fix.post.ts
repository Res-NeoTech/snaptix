import uniqid from 'uniqid';
import type { IUser } from '~~/server/models/User';
import User from '~~/server/models/User';
import crypto from 'crypto';
import { getRedis, applyRateLimit, safeDecr } from '~~/server/utils/redis';
import { getUserFromEvent } from '~~/server/utils/getUserFromEvent';
import { getCookie, setCookie } from 'h3';

// --- CONFIG ---
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/agents/completions';
const API_KEY = process.env.MISTRAL_API_KEY;

const LIMITS = {
	guest: 5,
	user: 15,
	premium: 50,
};

// --- HELPERS ---

function setGuestCookie(event: any) {
	let guestId = getCookie(event, 'guest_id');

	if (!guestId) {
		guestId = uniqid('snaptix-');
		setCookie(event, 'guest_id', guestId, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
			maxAge: 24 * 60 * 60,
		});
	}

	return guestId;
}

// --- MAIN ROUTE ---

export default defineEventHandler(async (event) => {
	const redis = getRedis();
	const user = await getUserFromEvent(event);

	let rateKey = '';
	let max = LIMITS.guest;

	// --- Guest flow ---
	if (!user) {
		const guestId = getCookie(event, 'guest_id');

		// If no guest cookie, generate it (bots usually ignore cookies)
		const finalGuestId = guestId ?? setGuestCookie(event);

		// Parse UA
		const ua = event.node.req.headers['user-agent'] || 'unknown';

		// Normalize UA (bots often send garbage or empty)
		const normalizedUA = !ua || ua.length < 10 ? 'unknown' : ua;

		// Hash UA (short)
		const uaHash = crypto
			.createHash('sha256')
			.update(normalizedUA)
			.digest('hex')
			.slice(0, 10);

		// Rate limit key: combines both cookie + UA
		// Bots with no cookie + no UA will all share same key → instant throttle
		rateKey = `fixes:guest:${finalGuestId}:${uaHash}`;

		max = LIMITS.guest;
	}
	else {
		const dbInfo: IUser | null = await User.findById(user.id);
		if (!dbInfo) {
			setResponseStatus(event, 404);
			return { error: 'User not found' };
		}

		const type = dbInfo.isPremium ? 'premium' : 'user';
		max = LIMITS[type];
		rateKey = `fixes:${type}:${dbInfo.id}`;
	}

	// Apply rate limit
	const allowed = await applyRateLimit(redis, rateKey, max);
	if (!allowed) {
		const rateLimitUserType: string = rateKey.split(':')[1];
		logger.warn(`[Fix] Rate-limit triggered for key : ${rateKey}`);
		setResponseStatus(event, 429);
		return {
			error: 'Daily limit exceeded.',
			typeUser: rateLimitUserType,
		};
	}

	// --- Body ---
	const { prompt } = await readBody(event);

	try {
		// --- API request ---
		const fixRequest = await fetch(MISTRAL_API_URL, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				agent_id: 'ag:85f5a2fd:20250806:snaptix-preview:269a3576',
				stream: false,
				messages: [{ role: 'user', content: prompt }],
			}),
		});

		if (!fixRequest.ok) {
			// undo increment
			await safeDecr(redis, rateKey);

			const text = await fixRequest.text();
			logger.error(`[Fix] Mistral API error ${fixRequest.status}: ${text}`);
			setResponseStatus(event, 500);
			return { error: 'Server-side exception occured.' };
		}

		const data = await fixRequest.json();
		return { response: data.choices[0].message.content };
	}
	catch (err) {
		// network / unexpected error — обязательно откатываем лимит
		await safeDecr(redis, rateKey);
		logger.error(err, '[Fix] Mistral fetch exception:');
		setResponseStatus(event, 500);
		return { error: 'Server-side exception occured.' };
	}
});
