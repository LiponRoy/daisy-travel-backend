import express from 'express';
import { tourController } from './tour.controller';

const routes = express.Router();

routes.post('/', tourController.createTour);
routes.get('/get', tourController.testOnly);

export const tourRoute = routes;
