import { CountryZod } from './country.validation';
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { countryController } from './country,controller';
import upload from '../../middlewares/multerMiddleware';
import { handleMulterErrors } from '../../errors/handleMulterErrors';

const routes = express.Router();

routes.post(
	'/create',
	// validateRequest(CountryZod.CountryZodSchema),
	upload.array('images', 4),
	handleMulterErrors,
	countryController.createCountry
);

routes.get('/', countryController.getAllAcountry);

export const countryRoutes = routes;
