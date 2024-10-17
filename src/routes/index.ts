import express from 'express';
import { tourRoutes } from '../modules/tour/tour.route';
import { countryRoutes } from '../modules/country/country.route';
import { travelRoutes } from '../modules/Traveler/Traveler.route';
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
	{
		path: '/traveler/',
		route: travelRoutes,
	},
	{
		path: '/auth',
		route: AuthRoutes,
	},
];

// router.use('/tour/', tourRoutes);
allRoutes.forEach((value) => router.use(value.path, value.route));

export default router;
