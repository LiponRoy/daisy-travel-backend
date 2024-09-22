import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './auth.constant';

const router = express.Router();

router.post(
	'/signup',
	validateRequest(AuthValidation.userValidationZodSchema),
	AuthControllers.signupUser
);
router.post(
	'/login',
	validateRequest(AuthValidation.loginValidationSchema),
	AuthControllers.loginUser
);
router.post('/logout', AuthControllers.logout);
router.get('/users', auth(USER_ROLE.customer), AuthControllers.getUsers);


router.get('/userProfile', auth(USER_ROLE.admin), AuthControllers.getMe);


router.post('/forgot-password', AuthControllers.forgotPassword);
router.post('/reset-password/:token', AuthControllers.resetPassword);
router.post('/verify-email', AuthControllers.verifyEmail);

router.post(
	'/resend-Verify-Email-Code',
	validateRequest(AuthValidation.resendVerifyEmailCode),
	AuthControllers.resendVerifyEmailCode
);
// router.post(
// 	'/refresh-token',
// 	validateRequest(AuthValidation.refreshTokenValidationSchema),
// 	AuthControllers.refreshToken
// );

export const AuthRoutes = router;
