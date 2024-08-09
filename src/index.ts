import mongoose from 'mongoose';
import config from './config';
import app from './app';
import { Server } from 'http';
import { errorLogger, logger } from './shared/logger';

// uncaught Exception handle
process.on('uncaughtException', () => {
	console.log(`😈 uncaughtException is detected , shutting down ...`);
	process.exit(1);
});

let server: Server;
//console.log(ab);
const main = async () => {
	try {
		// Mongodb connection
		await mongoose.connect(config.mongodb_url as string);
		logger.info(`MongoDB Connected -YES ${config.port}`);
		// Server creation
		server = app.listen(config.port, () => {
			logger.info(`App listening on port -YES  ${config.port}`);
		});
	} catch (error) {
		errorLogger.error(`Failed to connect database ${error}`);
	}
	//...........
};
main();

// Handle Unhandled Promise rejections
process.on('unhandledRejection', (err) => {
	console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
	if (server) {
		server.close(() => {
			errorLogger.error(err);
			process.exit(1);
		});
	}
	process.exit(1);
});
