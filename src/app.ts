import express, { Application } from 'express';
import cors from 'cors';
import { toureRoute } from './modules/tour/tour.route';
import errorMiddleware from './middlewares/errors';

const app: Application = express();
//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// routes all
app.use('/api/v1/tour', toureRoute);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

// error middleware ...
app.use(errorMiddleware);

export default app;
