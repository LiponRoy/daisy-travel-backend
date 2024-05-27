import express, { Application } from 'express';
import cors from 'cors';
import { toureRoute } from './modules/tour/tour.route';
const app:Application = express();
//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// routes all
app.use("/api/v1/tour/",toureRoute)

export default app;