import { NextFunction, Request, Response } from 'express';
import { tourService } from './tour.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import pick from '../../shared/pick';
import { paginationsFields } from '../../constants/paginationsFields';
import { ITour } from './tour.interface';
import ApiError from '../../errors/ApiError';
import { catchAsyncError } from '../../utils/catchAsyncErrors';
import { tourModel } from './tour.model';

const createTour = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const { ...tourData } = req.body;

		const result = await tourService.createTour(tourData);
		// console.log("result :",result)

		if (!result) {
			throw new ApiError(400, 'Failed to create user !');
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
	const filters = pick(req.query, [
		'searchTerm',
		'country',
		'price',
		'duration',
		'minPrice',
		'maxPrice',
	]);
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

const getSingleTour = catchAsyncError(async (req: Request, res: Response) => {
	const id = req.params.id;

	const result = await tourService.getSingleTour(id);

	sendResponse<ITour>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Single Tour get Successfully !',

		data: result,
	});
});

const updateTour = catchAsyncError(async (req: Request, res: Response) => {
	const id = req.params.id;
	const payLoad = req.body;

	const result = await tourService.updateTour(id, payLoad);

	sendResponse<ITour>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Update Tour Successfully !',

		data: result,
	});
});

const deleteTour = catchAsyncError(async (req: Request, res: Response) => {
	const id = req.params.id;

	const result = await tourService.deleteTour(id);

	sendResponse<ITour>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Delete Tour Successfully !',

		data: result,
	});
});

export const tourAllCountries = async (req: Request, res: Response) => {
	try {
		const products = await tourModel.distinct('country'); // Get only product names
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch country names' });
	}
};

export const getTotalPrice = async (req: Request, res: Response) => {
	try {
		// Fetch all packages with only the price field
		const packages = await tourModel.find().select('price');

		// Sum all prices using reduce
		const totalPrice = packages.reduce((sum, pkg) => sum + pkg.price, 0);

		res.status(200).send(totalPrice.toString());
	} catch (error) {
		res.status(500).json({ error: 'Failed to calculate total price' });
	}
};

export const tourController = {
	createTour,
	getTours,
	getSingleTour,
	updateTour,
	deleteTour,
	tourAllCountries,
	getTotalPrice,
};
