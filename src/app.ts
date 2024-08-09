import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import httpStatus from 'http-status';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app: Application = express();
//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// route
app.use('/api/v1/', routes);

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
