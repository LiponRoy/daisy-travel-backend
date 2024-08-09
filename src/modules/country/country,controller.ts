import { countryService } from './country.services';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { catchAsyncError } from '../../utils/catchAsyncErrors';

const createCountry = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const { ...countryData } = req.body;

		const result = await countryService.createCountry(countryData);
		// console.log("result :",result)

		if (!result) {
			throw new ApiError(400, 'Failed to create country !');
		}

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: 'Country Created Successfully !',
			data: result,
		});
	}
);

const getAllAcountry = catchAsyncError(async (req: Request, res: Response) => {
	const result = await countryService.allCountry();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Country are retrieved successfully',
		//meta: result.meta,
		data: result.result,
	});
});

export const countryController = {
	createCountry,
};
