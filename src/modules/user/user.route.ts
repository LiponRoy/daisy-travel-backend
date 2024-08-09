import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userZod } from './user.validation';
import { userController } from './user.controller';

const routes = express.Router();

routes.post(
	'/create',
	validateRequest(userZod.userZodSchema),
	userController.createUser
);

export const userRoutes = routes;
