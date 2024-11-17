import express from 'express';

import { travelControllerBig } from './TravelerBig.controller';
import upload from '../../middlewares/multerMiddleware';
const routes = express.Router();

routes.post(
	'/createBig',

// 	passport_img?: FileList;
//   photo_img?: FileList;
//   bankStatement_pdf?: FileList;


	upload.fields([
		{ name: 'passport_img', maxCount: 1 }, // Main traveler pdf1
		{ name: 'photo_img', maxCount: 1 }, // Main traveler pdf2
		{ name: 'bankStatement_pdf', maxCount: 1 }, // Main traveler pdf2
		{ name: 'Travelers[0][passport_img]', maxCount: 1 }, // First sub-traveler's pdf1
		{ name: 'Travelers[0][photo_img]', maxCount: 1 }, // First sub-traveler's pdf2
		{ name: 'Travelers[0][bankStatement_pdf]', maxCount: 1 }, // First sub-traveler's pdf2
		{ name: 'Travelers[1][passport_img]', maxCount: 1 }, // Second sub-traveler's pdf1
		{ name: 'Travelers[1][photo_img]', maxCount: 1 }, // Second sub-traveler's pdf2
		{ name: 'Travelers[1][bankStatement_pdf]', maxCount: 1 }, // Second sub-traveler's pdf2
		// { name: 'Travelers[2][pdf1]', maxCount: 1 }, // Second sub-traveler's pdf1
		// { name: 'Travelers[2][pdf2]', maxCount: 1 }, // Second sub-traveler's pdf2
		// { name: 'Travelers[3][pdf1]', maxCount: 1 }, // Second sub-traveler's pdf1
		// { name: 'Travelers[3][pdf2]', maxCount: 1 }, // Second sub-traveler's pdf2
		// { name: 'Travelers[4][pdf1]', maxCount: 1 }, // Second sub-traveler's pdf1
		// { name: 'Travelers[4][pdf2]', maxCount: 1 }, // Second sub-traveler's pdf2
		// { name: 'Travelers[5][pdf1]', maxCount: 1 }, // Second sub-traveler's pdf1
		// { name: 'Travelers[5][pdf2]', maxCount: 1 }, // Second sub-traveler's pdf2
		// Add more entries if needed for other sub-travelers
	  ]),
	travelControllerBig.createTravelerBig,
);


export const travelRoutesBig = routes;
