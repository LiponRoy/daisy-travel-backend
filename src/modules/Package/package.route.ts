import { CountryZod } from './package.validation';
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import upload from '../../middlewares/multerMiddleware';
import { handleMulterErrors } from '../../errors/handleMulterErrors';
import { packageController } from './package.controller';

const routes = express.Router();

routes.post(
	'/create',
	// validateRequest(CountryZod.CountryZodSchema),
	upload.array('images', 4),
	handleMulterErrors,
	packageController.createPackage
);

routes.post(
	'/create_tow',
	upload.array('images', 4),
	// handleMulterErrors,
	packageController.createPackage_Two
  );

routes.get('/', packageController.getAllPackage);

export const packageRoutes = routes;
