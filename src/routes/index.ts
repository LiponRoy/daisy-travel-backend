import express from 'express';
import { tourRoutes } from '../modules/tour/tour.route';
import { travelRoutes } from '../modules/Traveler/Traveler.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { travelRoutesBig } from '../modules/TravelerBig/TravelerBig.route';
import { packageRoutes } from '../modules/Package/package.route';

const router = express.Router();

const allRoutes = [
	{
		path: '/tour/',
		route: tourRoutes,
	},
	{
		path: '/package/',
		route: packageRoutes,
	},

	{
		path: '/traveler/',
		route: travelRoutes,
	},
	{
		path: '/travelerBig/',
		route: travelRoutesBig,
	},
	{
		path: '/auth',
		route: AuthRoutes,
	},
];

// router.use('/tour/', tourRoutes);
allRoutes.forEach((value) => router.use(value.path, value.route));

export default router;
