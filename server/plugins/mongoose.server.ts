import type { ConnectOptions } from 'mongoose';
import mongoose from 'mongoose';
import type { EventEmitter } from 'events';

declare global {
	// for hot-reload in dev (so we don’t reconnect each time)

	var _mongoose: Promise<typeof mongoose> | undefined;
}

// Ensure the global augmentation actually works
globalThis._mongoose ??= undefined;

export default defineNitroPlugin(() => {
	const config = useRuntimeConfig();
	const uri = config.MONGO_URI;

	if (!globalThis._mongoose) {
		console.log('Trying to connect to MongoDB at:', uri);
		globalThis._mongoose = mongoose.connect(uri, {
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 5000,
		} as ConnectOptions);

		(mongoose.connection as unknown as EventEmitter).on('connected', () => {
			console.log('✔ Mongoose connected');
		});
	}

	return globalThis._mongoose;
});
