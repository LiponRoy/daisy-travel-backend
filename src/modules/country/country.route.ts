import { CountryZod } from './country.validation';
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { countryController } from './country,controller';

const routes = express.Router();

routes.post(
	'/create',
	validateRequest(CountryZod.CountryZodSchema),
	countryController.createCountry
);

routes.get('/', countryController.getAllAcountry);

export const countryRoutes = routes;
