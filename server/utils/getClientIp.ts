import type { H3Event } from 'h3';
import { getRequestHeaders } from 'h3';

/**
 * Obtain client IP-Adress using all possible headers.
 * @param event H3 Event instance.
 * @returns IP-Adress if found.
 */
export function getClientIp(event: H3Event): string | null {
	const headers = getRequestHeaders(event);

	// 1. Cloudflare (gold standard)
	const cfIp = headers['cf-connecting-ip'];
	if (cfIp && cfIp.trim().length > 0) return cfIp.trim();

	// 2. X-Forwarded-For (первый IP = клиент)
	const xff = headers['x-forwarded-for'];
	if (xff && xff.trim().length > 0) return xff.split(',')[0].trim();

	// 3. X-Real-IP (fallback)
	const xRealIp = headers['x-real-ip'];
	if (xRealIp && xRealIp.trim().length > 0) return xRealIp.trim();

	// 4. Абсолютный fallback (docker / proxy)
	return event.node?.req?.socket?.remoteAddress ?? null;
}
