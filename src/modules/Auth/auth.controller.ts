import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';
import { catchAsyncError } from '../../utils/catchAsyncErrors';
import ApiError from '../../errors/ApiError';
import { Request, Response } from 'express';

const signupUser = catchAsyncError(async (req: Request, res: Response) => {
	const { ...users } = req.body;
	const newUser = await AuthServices.signupUser(users);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User Register Successfully Completed!',
		data: newUser,
	});
});

const verifyEmail = catchAsyncError(async (req: Request, res: Response) => {
	const { code } = req.body;
	const result = await AuthServices.verifyEmail(code);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Email Verified Successfully!',
		data: result,
	});
});

const resendVerifyEmailCode = catchAsyncError(
	async (req: Request, res: Response) => {
		const { email } = req.body;

		const result = await AuthServices.resendVerifyEmailCode(email);

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: 'Resend Email Verification code',
			data: result,
		});
	}
);

const loginUser = catchAsyncError(async (req: Request, res: Response) => {
	const result = await AuthServices.loginUser(req.body);
	const { authToken, user } = result;

	res.cookie('authToken', authToken, {
		secure: config.node_env === 'production',
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 1000 * 60 * 60 * 24 * 365,
	});

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User is logged in successfully!',
		data: {
			user,
			authToken,
		},
	});
});

const forgotPassword = catchAsyncError(async (req: Request, res: Response) => {
	await AuthServices.forgotPassword(req.body);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'sent email successfully!',
		data: null,
	});
});

const resetPassword = catchAsyncError(async (req: Request, res: Response) => {
	const { password } = req.body;
	const { token } = req.params;

	if (!token) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong !');
	}

	const result = await AuthServices.resetPassword(password, token);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'password Update successfully!',
		data: result,
	});
});

const logout = catchAsyncError(async (req: Request, res: Response) => {
	//res.clearCookie('refressToken');
	res.cookie('authToken', null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User Logged out',
		data: [],
	});
});

const getUsers = catchAsyncError(async (req: Request, res: Response) => {
	const users = await AuthServices.getUsers();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Getting all Users ',
		data: users,
	});
});

const getMe = catchAsyncError(async (req: Request, res: Response) => {
	const { email, role } = req.user;
	const result = await AuthServices.getMe(email, role);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User is retrieved successfully',
		data: result,
	});
});

export const AuthControllers = {
	signupUser,
	verifyEmail,
	resendVerifyEmailCode,
	loginUser,
	forgotPassword,
	resetPassword,
	logout,
	getUsers,
	getMe,
};
