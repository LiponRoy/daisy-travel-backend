// import dotEnv from 'dotenv';
// import mongoose from 'mongoose';
// import config from './config';
// import app from './app';
// import { errorLogger, logger } from './shared/logger';

// dotEnv.config();

// // for test only is it running on development or production mode
// console.log('Running on -- ', app.get('env'));

// // Handle Uncaught exceptions
// process.on('uncaughtException', (err) => {
// 	console.log(`ERROR: ${err.stack}`);
// 	console.log('Shutting down due to uncaught exception');
// 	process.exit(1);
// });

// // Database connection
// const connect = async () => {
// 	try {
// 		mongoose.set('strictQuery', false);
// 		await mongoose.connect(config.mongodb_url as string);
// 		logger.info('Connected to mongoDB.');
// 	} catch (error) {
// 		errorLogger.error(error);
// 		throw error;
// 	}
// };
// mongoose.connection.on('disconnected', () => {
// 	errorLogger.error('mongoDB disconnected!');
// });

// // Server Creation
// const port = config.port || 5000;
// const server = app.listen(port, () => {
// 	connect();
// 	const myApp = `App is running on port : ${port} in ${config.node_env} mode`;
// 	logger.info(myApp);
// });

// // Handle Unhandled Promise rejections
// process.on('unhandledRejection', (err: any) => {
// 	console.log(`ERROR: ${err.stack}`);
// 	console.log('Shutting down the server due to Unhandled Promise rejection');
// 	server.close(() => {
// 		process.exit(1);
// 	});
// });
