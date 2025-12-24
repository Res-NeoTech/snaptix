import type { Logger } from 'pino';
import pino from 'pino';
import fs from 'fs';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

// Убедимся, что директория для логов существует
const logDir = path.resolve('/logs');
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir, { recursive: true });
}

let logger: Logger;

if (isProd) {
	const streams = [
		{ stream: process.stdout },
		{ stream: pino.destination(path.join(logDir, 'app.log')) },
	];

	logger = pino(
		{
			level: 'info',
		},
		pino.multistream(streams),
	);
}
else {
	// dev + pretty print
	logger = pino({
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

export { logger };
