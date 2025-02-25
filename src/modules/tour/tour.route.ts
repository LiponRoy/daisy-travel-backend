import express from 'express';
import { tourController } from './tour.controller';
import validateRequest from '../../middlewares/validateRequest';
import { TourZod } from './tour.validation';

const routes = express.Router();

routes.post(
	'/create',
	validateRequest(TourZod.TourZodSchema),
	tourController.createTour
);

//routes.post('/create', tourController.createTour);
routes.get('/', tourController.getTours);

routes.get('/countries', tourController.tourAllCountries);
routes.get('/totalPrice', tourController.getTotalPrice);

routes.get('/:id', tourController.getSingleTour);
routes.patch(
	'/:id',
	validateRequest(TourZod.UpdateTourZodSchema),
	tourController.updateTour
);
routes.delete('/:id', tourController.deleteTour);

export const tourRoutes = routes;
