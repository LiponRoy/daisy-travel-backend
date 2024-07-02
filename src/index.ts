import mongoose from "mongoose";
import config from "./config";
import app from "./app";
import { errorLogger, logger } from "./shared/logger";
import { Server } from "http";

  // if uncaught Exception happened
process.on('uncaughtException',(error)=>{
	errorLogger.error(error)
	process.exit(1);
})

let server: Server;

const bootstrap = async () => {
  
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

  // if unhandledRejection happened
  process.on('unhandledRejection', (error) => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
  //...........
};
bootstrap();

process.on('SIGTERM', () => {
	logger.info('sigterm is received');
	if(server){
		server.close();
	}
	
})

