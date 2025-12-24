// server/api/billing/overview.ts
import Stripe from 'stripe';
import type { IUser } from '~~/server/models/User';
import User from '~~/server/models/User';

/**
 * Formats date from UNIX Timestamp.
 * @param unixTimeStamp UNIX Timestamp obtained from seconds.
 * @returns formatted date string.
 */
function formatDate(unixTimeStamp: number): string {
	const date: Date = new Date(unixTimeStamp * 1000);
	const dd: string = String(date.getDate()).padStart(2, '0');
	const mm: string = String(date.getMonth() + 1).padStart(2, '0');
	const yyyy: string = date.getFullYear().toString();
	return dd + '.' + mm + '.' + yyyy;
}

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const redis = getRedis();
	const stripe = new Stripe(config.stripeSecret, { apiVersion: '2025-12-15.clover' });

	// 1. Auth
	const user = getUserFromEvent(event);
	if (!user) {
		setResponseStatus(event, 401);
		return { error: 'Unauthorized.' };
	}

	const cacheKey = `billing_overview:${user.id}`;

	const cached = await redis.get(cacheKey);
	if (cached) return JSON.parse(cached);

	// 2. Get user from DB
	const dbUser: IUser | null = await User.findById(user.id);
	if (!dbUser || !dbUser.stripeCustomerId) {
		return { cardLast4: null, invoices: [], nextPayment: null };
	}

	const customerId = dbUser.stripeCustomerId;

	// 3. Get default payment method
	const paymentMethods = await stripe.paymentMethods.list({
		customer: customerId,
		type: 'card',
	});

	const cardLast4 = paymentMethods.data[0]?.card?.last4 || null;

	// 4. Get subscription
	const subs = await stripe.subscriptions.list({
		customer: customerId,
		status: 'all',
		limit: 1,
	});

	const sub = subs.data[0];
	const latestInvoice = await stripe.invoices.retrieve(sub.latest_invoice as string);
	const nextPayment = formatDate(latestInvoice.period_end);

	// 5. Get invoices
	const invoices = await stripe.invoices.list({
		customer: customerId,
		limit: 5,
	});

	const response = {
		cardLast4,
		nextPayment,
		invoices: invoices.data.map(inv => ({
			id: inv.id,
			amount: inv.amount_paid / 100,
			currency: inv.currency,
			status: inv.status?.toUpperCase(),
			date: formatDate(inv.created),
			pdfUrl: inv.invoice_pdf,
		})),
	};

	await redis.set(cacheKey, JSON.stringify(response), 'EX', 60 * 60 * 24); // Cache response for 1 day.

	return response;
});
