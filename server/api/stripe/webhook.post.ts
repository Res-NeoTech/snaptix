// server/api/stripe/webhook.post.ts
import Stripe from 'stripe';
import type { IncomingMessage } from 'node:http';
import type { IUser } from '~~/server/models/User';
import User from '~~/server/models/User';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2025-11-17.clover',
});

// helper to get raw Buffer from Node request
async function getRawBody(req: IncomingMessage): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		const chunks: Buffer[] = [];
		req.on('data', (chunk: Buffer | string) => {
			chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
		});
		req.on('end', () => resolve(Buffer.concat(chunks)));
		req.on('error', (err: Error) => reject(err));
	});
}

export default defineEventHandler(async (event) => {
	const rawBody = await getRawBody(event.node.req);

	const signature = event.node.req.headers['stripe-signature'] as string;
	if (!signature) {
		logger.error('[Stripe Webhook] Missing Stripe signature');
		return sendError(
			event,
			createError({ statusCode: 400, statusMessage: 'Missing Stripe signature' }),
		);
	}

	let stripeEvent: Stripe.Event;

	try {
		stripeEvent = stripe.webhooks.constructEvent(
			rawBody,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!,
		);
	}
	catch (err: unknown) {
		logger.error(err, '[Stripe Webhook] Invalid webhook signature:');
		return sendError(
			event,
			createError({ statusCode: 400, statusMessage: 'Invalid signature' }),
		);
	}

	// --------------------------------------------------
	// checkout.session.completed
	// --------------------------------------------------
	if (stripeEvent.type === 'checkout.session.completed') {
		const session = stripeEvent.data.object as Stripe.Checkout.Session;
		logger.info(`[Stripe Webhook: ${stripeEvent.type}] Checkout completed: ${session.id}`);
		return 'ok';
	}

	// --------------------------------------------------
	// customer.subscription.created
	// --------------------------------------------------
	if (stripeEvent.type === 'customer.subscription.created') {
		const subscription = stripeEvent.data.object as Stripe.Subscription & { current_period_end?: number };

		const customerId = subscription.customer as string;
		const customer = await stripe.customers.retrieve(customerId);

		const userId = (customer as Stripe.Customer).metadata?.mongoUserId;
		if (!userId) {
			logger.error(`[Stripe Webhook: ${stripeEvent.type}] No mongoUserId on customer: ${customerId}`);
			return 'ok';
		}

		const dbUser = await User.findById(userId);
		if (!dbUser) {
			logger.error(`[Stripe Webhook: ${stripeEvent.type}] User not found: ${userId}`);
			return 'ok';
		}

		dbUser.isPremium = true;
		dbUser.stripeSubscriptionId = subscription.id;
		dbUser.stripePriceId = subscription.items.data[0]?.price?.id ?? null;
		dbUser.stripeCurrentPeriodEnd = subscription.current_period_end ?? null;

		await dbUser.save();

		const redis = getRedis();
		await redis.del(`billing_overview:${dbUser.id}`);

		logger.info(`[Stripe Webhook: ${stripeEvent.type}] Subscription created. Premium is ON for : ${userId}`);
		return 'ok';
	}

	// --------------------------------------------------
	// customer.subscription.updated
	// --------------------------------------------------
	if (stripeEvent.type === 'customer.subscription.updated') {
		const subscription = stripeEvent.data.object as Stripe.Subscription & { current_period_end?: number };

		const customerId = subscription.customer as string;
		const customer = await stripe.customers.retrieve(customerId);

		const userId = (customer as Stripe.Customer).metadata?.mongoUserId;
		if (!userId) {
			logger.error(`[Stripe Webhook: ${stripeEvent.type}] No mongoUserId on customer: ${customerId}`);
			return 'ok';
		}

		const dbUser: IUser | null = await User.findById(userId);
		if (!dbUser) {
			logger.error(`[Stripe Webhook: ${stripeEvent.type}] User not found: ${userId}`);
			return 'ok';
		}

		// 🔒 Guard: если подписка уже удалена — игнорируем update
		if (!dbUser.stripeSubscriptionId) {
			logger.info(`[Stripe Webhook: ${stripeEvent.type}] Ignoring update for deleted subscription of user: ${userId}`);
			return 'ok';
		}

		const isActive: boolean = subscription.status === 'active' || subscription.status === 'trialing';

		dbUser.isPremium = isActive;
		dbUser.stripePriceId = subscription.items.data[0]?.price?.id ?? null;
		dbUser.stripeCurrentPeriodEnd = subscription.current_period_end ?? null;

		await dbUser.save();

		const redis = getRedis();
		await redis.del(`billing_overview:${dbUser.id}`);

		logger.info(`[Stripe Webhook: ${stripeEvent.type}] Subscription updated. userId: ${userId} | status: ${subscription.status} | isPremium: ${isActive}`);

		return 'ok';
	}

	// --------------------------------------------------
	// customer.subscription.deleted
	// --------------------------------------------------
	if (stripeEvent.type === 'customer.subscription.deleted') {
		const subscription = stripeEvent.data.object as Stripe.Subscription;

		const customerId = subscription.customer as string;
		const customer = await stripe.customers.retrieve(customerId);

		const userId = (customer as Stripe.Customer).metadata?.mongoUserId;
		if (!userId) {
			logger.error(`[Stripe Webhook: ${stripeEvent.type}] No mongoUserId on customer: ${customerId}`);
			return 'ok';
		}

		const dbUser: IUser | null = await User.findById(userId);
		if (!dbUser) {
			logger.error(`[Stripe Webhook: ${stripeEvent.type}] User not found: ${userId}`);
			return 'ok';
		}

		dbUser.isPremium = false;
		dbUser.stripeSubscriptionId = null;
		dbUser.stripePriceId = null;
		dbUser.stripeCurrentPeriodEnd = null;

		await dbUser.save();

		const redis = getRedis();
		await redis.del(`billing_overview:${dbUser.id}`);

		logger.info(`[Stripe Webhook: ${stripeEvent.type}] Subscription deleted. Premium is OFF for : ${userId}`);
		return 'ok';
	}

	// --------------------------------------------------
	// ignore everything else
	// --------------------------------------------------
	return 'ok';
});
