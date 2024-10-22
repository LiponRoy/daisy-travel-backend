import express from 'express';

import { travelControllerBig } from './TravelerBig.controller';
import upload from '../../middlewares/multerMiddleware';
const routes = express.Router();

routes.post(
	'/createBig',
	upload.fields([{ name: 'pdf1' }, { name: 'pdf2' }]),
	travelControllerBig.createTravelerBig,
);


export const travelRoutesBig = routes;
