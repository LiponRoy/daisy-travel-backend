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
	const { accessToken, refressToken, user } = result;

	res.cookie('refressToken', refressToken, {
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
			accessToken,
			user,
		},
	});
});

const refreshToken = catchAsyncError(async (req: Request, res: Response) => {
	const { refreshToken } = req.cookies;
	const result = await AuthServices.refreshToken(refreshToken);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Access token is retrieved successfully!',
		data: result,
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
	res.cookie('refressToken', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User Logged out',
		data: [],
	});
});

// // Logout user   =>   /api/v1/logout
// exports.logout = catchAsyncErrors(async (req, res, next) => {
//     res.cookie('token', null, {
//         expires: new Date(Date.now()),
//         httpOnly: true
//     })

//     res.status(200).json({
//         success: true,
//         message: 'Logged out'
//     })
// })



const getUsers = catchAsyncError(async (req: Request, res: Response) => {
	const users = await AuthServices.getUsers();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Getting all Users ',
		data: users,
	});
});

const userProfile = catchAsyncError(async (req: Request, res: Response) => {
	const{email}=req.body
	const users = await AuthServices.userProfile(email);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Got profile user',
		data: users,
	});
});

export const AuthControllers = {
	signupUser,
	verifyEmail,
	resendVerifyEmailCode,
	loginUser,
	refreshToken,
	forgotPassword,
	resetPassword,
	logout,
	getUsers,
	userProfile,
};
