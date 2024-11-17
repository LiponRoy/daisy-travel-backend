import express from 'express';
import { travelController } from './Traveler.controller';
import upload from '../../middlewares/multerMiddleware';
const routes = express.Router();

routes.post(
	'/create',
	upload.fields([{ name: 'pdf1' }, { name: 'pdf2' }]),
	travelController.createTraveler
);


export const travelRoutes = routes;
