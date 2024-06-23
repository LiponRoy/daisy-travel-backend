import { NextFunction, Request, Response } from 'express';
import { tourService } from './tour.service';
import ErrorHandler from '../../utils/ErrorHandler';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import { catchAsyncError } from '../../shared/catchAsyncErrors';
import { IPagination } from '../../interfaces/pagination';
import pick from '../../shared/pick';
import { paginationsFields } from '../../constants/paginationsFields';
import { ITour } from './tour.interface';

const createTour = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const { ...tourData } = req.body;

		const result = await tourService.createTour(tourData);
		// console.log("result :",result)

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

const getTours = catchAsyncError(async (req: Request, res: Response) => {
	// const paginationOptions:IPagination = {
	//   page: Number(req.query.page),
	//   limit: Number(req.query.limit),
	//   shortBy: req.query.shortBy ,
	//   shortOrder: req.query.shortOrder,
	// };
	const filters = pick(req.query, ['searchTerm','fromLocation','toLocation','price']);
	const paginationOptions = pick(req.query, paginationsFields);
	console.log('req.query, ', req.query);
	console.log('paginationsFields, ', paginationsFields);

	const result = await tourService.getAllTour(filters, paginationOptions);

	sendResponse<ITour[]>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Tours get Successfully !',
		meta: result.meta,
		data: result.data,
	});
	// console.log('query: ', paginationOptions);
});

const getSingleTour=catchAsyncError(async (req: Request, res: Response) => {
	const id = req.params.id;

	const result = await tourService.getSingleTour(id);

	sendResponse<ITour>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Single Tour get Successfully !',

		data: result
	});



})

export const tourController = {
	createTour,
	getTours,
	getSingleTour
};
