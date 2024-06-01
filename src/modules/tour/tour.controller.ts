import { NextFunction, Request, Response } from 'express';
import { tourService } from './tour.service';
import { catchAsyncError } from '../../middlewares/catchAsyncErrors';
import ErrorHandler from '../../utils/ErrorHandler';

const createTour = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const tour = await tourService.createTour(req.body);

		if (!tour) {
			return next(new ErrorHandler('Failed to create user !', 400));
		}

		res.status(200).send({
			success: 'true',
			message: 'toure created successfully !',
			data: tour,
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
