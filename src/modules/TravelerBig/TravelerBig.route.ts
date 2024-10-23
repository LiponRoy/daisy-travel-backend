import express from 'express';

import { travelControllerBig } from './TravelerBig.controller';
import upload from '../../middlewares/multerMiddleware';
const routes = express.Router();


routes.post(
	'/createBig',
	upload.fields([
		{ name: 'pdf1', maxCount: 1 }, // Main traveler pdf1
		{ name: 'pdf2', maxCount: 1 }, // Main traveler pdf2
		{ name: 'Travelers[0][pdf1]', maxCount: 1 }, // First sub-traveler's pdf1
		{ name: 'Travelers[0][pdf2]', maxCount: 1 }, // First sub-traveler's pdf2
		{ name: 'Travelers[1][pdf1]', maxCount: 1 }, // Second sub-traveler's pdf1
		{ name: 'Travelers[1][pdf2]', maxCount: 1 }, // Second sub-traveler's pdf2
		{ name: 'Travelers[2][pdf1]', maxCount: 1 }, // Second sub-traveler's pdf1
		{ name: 'Travelers[2][pdf2]', maxCount: 1 }, // Second sub-traveler's pdf2
		{ name: 'Travelers[3][pdf1]', maxCount: 1 }, // Second sub-traveler's pdf1
		{ name: 'Travelers[3][pdf2]', maxCount: 1 }, // Second sub-traveler's pdf2
		{ name: 'Travelers[4][pdf1]', maxCount: 1 }, // Second sub-traveler's pdf1
		{ name: 'Travelers[4][pdf2]', maxCount: 1 }, // Second sub-traveler's pdf2
		{ name: 'Travelers[5][pdf1]', maxCount: 1 }, // Second sub-traveler's pdf1
		{ name: 'Travelers[5][pdf2]', maxCount: 1 }, // Second sub-traveler's pdf2
		// Add more entries if needed for other sub-travelers
	  ]),
	travelControllerBig.createTravelerBig,
);


export const travelRoutesBig = routes;
