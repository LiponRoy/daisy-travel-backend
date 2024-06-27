import express from 'express';
import { tourController } from './tour.controller';
import validateRequest from '../../middlewares/validateRequest';
import { TourZod } from './tour.validation';

const routes = express.Router();

routes.post('/create',validateRequest(TourZod.TourZodSchema),tourController.createTour);
routes.get('/', tourController.getTours);
routes.get('/:id', tourController.getSingleTour);
routes.patch('/:id', tourController.updateTour);
routes.delete('/:id', tourController.deleteTour);

export const tourRoutes = routes;
