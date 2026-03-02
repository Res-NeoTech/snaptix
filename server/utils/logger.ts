import type { Logger } from 'pino';
import pino from 'pino';
import fs from 'fs';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

// /app/logs for production
// /logs for development
const logDir = path.resolve('/app/logs');
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir, { recursive: true });
}

let loggerConstruct: Logger;

if (isProd) {
	const streams = [
		{ stream: process.stdout },
		{ stream: pino.destination(path.join(logDir, 'app.log')) },
	];

	loggerConstruct = pino(
		{
			level: 'info',
			timestamp: pino.stdTimeFunctions.isoTime,
			base: undefined,
		},
		pino.multistream(streams),
	);
}
else {
	// dev + pretty print
	loggerConstruct = pino({
		level: 'debug',
		transport: {
			target: 'pino-pretty',
			options: {
				colorize: true,
				translateTime: 'HH:MM:ss',
				ignore: 'pid,hostname',
			},
		},
	});
}

const logger: Logger = loggerConstruct; // Because ESLint doesn't like mutable exports.

export { logger };
