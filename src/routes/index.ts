import express from 'express';
import { tourRoutes } from '../modules/tour/tour.route';

const router = express.Router();

const allRoutes = [
	{
		path: '/tour/',
		route: tourRoutes,
	},
	// {
	// 	path: '/product/',
	// 	route: productRoutes,
	// },
];

// router.use('/tour/', tourRoutes);
allRoutes.forEach((value) => router.use(value.path, value.route));

export default router;
