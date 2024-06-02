import { NextFunction, Request, Response } from 'express';
import { tourService } from './tour.service';
import ErrorHandler from '../../utils/ErrorHandler';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import { catchAsyncError } from '../../shared/catchAsyncErrors';

const createTour = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const { ...tourData } = req.body;
		const result = await tourService.createTour(tourData);

		if (!result) {
			return next(new ErrorHandler('Failed to create user !', 400));
		}

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: 'Tour Created Successfully !',
			data: result,
		});
	}
);

const testOnly = (req: Request, res: Response) => {
	res.send('Test Only is running !');
};

export const tourController = {
	createTour,
	testOnly,
};
