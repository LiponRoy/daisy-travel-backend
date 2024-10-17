import { NextFunction, Request, Response } from 'express';
import { tourService } from './Traveler.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
// import pick from '../../shared/pick';

import ApiError from '../../errors/ApiError';
import { catchAsyncError } from '../../utils/catchAsyncErrors';

const createTraveler = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		

		const result = await tourService.createTraveler(req.body);
		// console.log("result :",result)

		if (!result) {
			throw new ApiError(400, 'Failed to create Traveler !');
		}

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: 'Traveler Created Successfully !',
			data: result,
		});
	}
);



export const travelController = {
	createTraveler,
};
