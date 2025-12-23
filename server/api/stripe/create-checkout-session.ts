import Stripe from 'stripe';
import type { IUser } from '~~/server/models/User';
import User from '~~/server/models/User';

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const stripe = new Stripe(config.stripeSecret, { apiVersion: '2025-11-17.clover' });

	// 1. Auth (ты же сказал, у тебя JWT → куки → всё ок)
	const user = getUserFromEvent(event);
	if (!user) {
		setResponseStatus(event, 401);
		return { error: 'Unauthorized.' };
	}

	const dbUser: IUser | null = await User.findById(user.id);

	if (!dbUser) {
		setResponseStatus(event, 404);
		return { error: 'User not found.' };
	}

	if (dbUser.isPremium) {
		setResponseStatus(event, 400);
		return { error: 'User already has an active subscription.' };
	}

	// 2. Price ID (хранится в .env)
	const priceId = config.stripePriceIdPremium;
	if (!priceId) {
		setResponseStatus(event, 500);
		return { error: 'Stripe price ID missing.' };
	}

	// 3. Создаём или находим Stripe Customer
	let customerId = dbUser.stripeCustomerId;

	if (!customerId) {
		const customer = await stripe.customers.create({
			email: user.email,
			metadata: {
				mongoUserId: user.id.toString(),
			},
		});

		customerId = customer.id;

		// Обновляем юзера в Mongo
		await User.findByIdAndUpdate(user.id, {
			stripeCustomerId: customerId,
		});
	}
	else {
		const activeSub = await stripe.subscriptions.list({
			customer: customerId,
			status: 'active',
			limit: 1,
		});

		if (activeSub.data.length > 0) {
			setResponseStatus(event, 400);
			return { error: 'User already has an active subscription.' };
		}
	}

	// 4. Создаём Checkout Session
	const session = await stripe.checkout.sessions.create({
		mode: 'subscription',
		payment_method_types: ['card'],
		customer: customerId,
		line_items: [
			{
				price: priceId,
				quantity: 1,
			},
		],
		success_url: `http://127.0.0.1:3000/subscription-success`, // CHANGE BASE URL IN PRODUCTION.
		cancel_url: `http://127.0.0.1:3000/pricing`, // CHANGE BASE URL IN PRODUCTION.
		subscription_data: {
			metadata: {
				mongoUserId: user.id.toString(),
			},
		},
		metadata: {
			mongoUserId: user.id.toString(),
		},
	});

	return {
		url: session.url,
	};
});
