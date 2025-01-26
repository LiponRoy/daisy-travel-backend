import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { USER_ROLE } from './auth.constant';
import { authorizeRoles, isAuthenticatedUser } from '../../middlewares/auth';
import upload from '../../middlewares/multerMiddleware';
import { compressImage } from '../../middlewares/compressImage';


const router = express.Router();

router.post(
	'/signup',
	validateRequest(AuthValidation.userValidationZodSchema),
	AuthControllers.signupUser
);

// Profile update 
router.post(
	'/profileUpdate',
	upload.single("avatar"),
	// compressImage,
	AuthControllers.updateProfile
);
router.post(
	'/login',
	validateRequest(AuthValidation.loginValidationSchema),
	AuthControllers.loginUser
);
router.post('/logout', AuthControllers.logout);

router.get(
	'/users',
	isAuthenticatedUser(),
	authorizeRoles('admin'),
	AuthControllers.getUsers
);

router.get('/getMe', isAuthenticatedUser(), AuthControllers.getMe);
//router.get('/updateMe',upload.single("image"), isAuthenticatedUser(), AuthControllers.getMe);

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
