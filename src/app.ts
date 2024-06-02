import express, { Application } from 'express';
import cors from 'cors';
import errorMiddleware from './middlewares/errors';
import routes from './routes';

const app: Application = express();
//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// route
app.use('/api/v1/', routes);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

// error middleware ...
app.use(errorMiddleware);

export default app;
