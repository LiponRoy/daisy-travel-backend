import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { catchAsyncError } from '../../utils/catchAsyncErrors';
import { userService } from './user.service';

const createUser = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const { ...userData } = req.body;

		const result = await userService.createUser(userData);
		// console.log("result :",result)

		if (!result) {
			throw new ApiError(400, 'Failed to create user !');
		}

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: 'User Created Successfully !',
			data: result,
		});
	}
);

export const userController = {
	createUser,
};
