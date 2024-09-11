import express from 'express';
import { tourRoutes } from '../modules/tour/tour.route';
import { countryRoutes } from '../modules/country/country.route';
import { userRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';

const router = express.Router();

const allRoutes = [
	{
		path: '/tour/',
		route: tourRoutes,
	},
	{
		path: '/country/',
		route: countryRoutes,
	},
	// {
	// 	path: '/user/',
	// 	route: userRoutes,
	// },
	{
		path: '/auth',
		route: AuthRoutes,
	},
];

// router.use('/tour/', tourRoutes);
allRoutes.forEach((value) => router.use(value.path, value.route));

export default router;
