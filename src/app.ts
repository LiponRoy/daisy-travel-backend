import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import httpStatus from 'http-status';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorHandler';
import config from './config';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
//middlewares
app.use(
	cors({
		origin: config.frontend_URL,
		credentials: true,
	})
);
app.use(express.urlencoded({ extended: true }));

// route
app.use('/api/v1', routes);

// Testing
app.get('/test', (req: Request, res: Response, next: NextFunction) => {
	//res.send('This is Testing Router...');
	//Promise.reject(new Error('unhandled Promise reject'));
	throw new Error('Testing Error......');
});

// error middleware ...
app.use(globalErrorHandler);

// Not found error middleware
app.use(notFound);

export default app;
