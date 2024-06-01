import express from 'express';
import { tourController } from './tour.controller';

const routes = express.Router();

routes.post('/create', tourController.createTour);
routes.get('/get', tourController.testOnly);

export const toureRoute = routes;
