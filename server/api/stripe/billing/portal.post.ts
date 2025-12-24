import Stripe from 'stripe';
import type { IUser } from '~~/server/models/User';
import User from '~~/server/models/User';

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const stripe = new Stripe(config.stripeSecret, {
		apiVersion: '2025-12-15.clover',
	});

	// 1. Auth
	const user = getUserFromEvent(event);
	if (!user) {
		setResponseStatus(event, 401);
		return { error: 'Unauthorized.' };
	}

	// 2. DB user
	const dbUser: IUser | null = await User.findById(user.id);
	if (!dbUser || !dbUser.stripeCustomerId) {
		setResponseStatus(event, 400);
		return { error: 'Billing is not available for this user.' };
	}

	// 3. Create Billing Portal session
	const session = await stripe.billingPortal.sessions.create({
		customer: dbUser.stripeCustomerId,
		return_url: `https://snaptix.net/dashboard?section=billing`,
	});

	// 4. Return URL
	return {
		url: session.url,
	};
});
