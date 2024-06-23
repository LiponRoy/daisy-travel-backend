import express from 'express';
import { tourController } from './tour.controller';

const routes = express.Router();

routes.post('/create', tourController.createTour);
routes.get('/', tourController.getTours);
routes.get('/:id', tourController.getSingleTour);
routes.patch('/:id', tourController.updateTour);
routes.delete('/:id', tourController.deleteTour);

export const tourRoutes = routes;
