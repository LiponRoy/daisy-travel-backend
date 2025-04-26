import express from 'express';
import {
	updateEducationInfo,
	updateGeneralInfo,
	updateWorkExperience,
} from './profile.controller';
import { isAuthenticatedUser } from '../../middlewares/auth';

const routes = express.Router();

routes.put('/general-info', isAuthenticatedUser(), updateGeneralInfo);
routes.put('/education-info', isAuthenticatedUser(), updateEducationInfo);
routes.put('/work-experience', isAuthenticatedUser(), updateWorkExperience);

export const profileRoutes = routes;
