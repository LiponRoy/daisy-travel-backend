import express from 'express';
import { tourController } from './tour.controller';

const routes = express.Router();

routes.post('/create', tourController.createTour);
routes.get('/:id', tourController.getSingleTour);
routes.get('/all', tourController.getTours);

export const tourRoutes = routes;
