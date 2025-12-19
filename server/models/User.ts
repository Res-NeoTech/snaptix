import type { Document } from 'mongoose';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, minlength: 3, maxlength: 100 },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },

	joinDate: { type: Date, default: Date.now },
	lastUpdated: { type: Date, default: Date.now },
	isPremium: { type: Boolean, default: false },

	stripeCustomerId: { type: String, default: null },
	stripeSubscriptionId: { type: String, default: null },
	stripePriceId: { type: String, default: null },
	stripeStatus: { type: String, default: 'none' }, // possible: none | active | past_due | canceled | unpaid
	stripeCurrentPeriodEnd: { type: Number, default: null }, // UNIX timestamp
});

export default mongoose.models.User || mongoose.model('User', UserSchema);

export interface IUser extends Document {
	id: string;
	username: string;
	email: string;
	password: string;

	joinDate: Date;
	lastUpdated: Date;
	isPremium: boolean;

	stripeCustomerId: string;
	stripeSubscriptionId: string | null;
	stripeStatus: string;
	stripePriceId: string | null;
	stripeCurrentPeriodEnd: number | null;
}
