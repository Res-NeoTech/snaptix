import type { Document } from 'mongoose';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, minlength: 3, maxlength: 100 },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },

	joinDate: { type: Date, default: Date.now },
	lastUpdated: { type: Date, default: Date.now },
	isPremium: { type: Boolean, default: false },
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
}
