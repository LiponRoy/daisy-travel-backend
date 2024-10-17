import express from 'express';
import { travelController } from './Traveler.controller';
// import validateRequest from '../../middlewares/validateRequest';
// import { TourZod } from './Traveler.validation';

const routes = express.Router();

routes.post(
	'/create',
	travelController.createTraveler
);


export const travelRoutes = routes;
