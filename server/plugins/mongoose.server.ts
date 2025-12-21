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
		globalThis._mongoose = mongoose.connect(uri, {
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 5000,
		} as ConnectOptions);

		(mongoose.connection as unknown as EventEmitter).on('connected', () => {
			logger.info('[Mongoose] Connected');
		});
	}

	return globalThis._mongoose;
});
