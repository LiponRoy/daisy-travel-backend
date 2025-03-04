import {packageService } from './package.services';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { catchAsyncError } from '../../utils/catchAsyncErrors';
import { packageService_two } from './package.services_two';

const createPackage = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {

	//const { name,category } = req.body; // Extract fields from the body
    const files = req.files as Express.Multer.File[]; // Files uploaded from Multer

	//console.log("files.length controller..... ,", files.length);
	
		

		const result = await packageService.createPackage(req.body ,files);

		// if (!result) {
		// 	throw new ApiError(400, 'Failed to create Package !');
		// }

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: 'Package Created Successfully !',
			data: result,
		});
	}
);

// for testing 
const createPackage_Two = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {

    const files = req.files as Express.Multer.File[]; // Files uploaded from Multer

	console.log("cntrl files--",files)
	console.log("cntrl rec body--",req.body);


		const result = await packageService_two.createPackage_Two(req.body ,files);



		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: 'Package Created Successfully !',
			data: result,
		});
	}
);

const getAllPackage = catchAsyncError(async (req: Request, res: Response) => {
	const result = await packageService.allPackage();
	//console.log('result----', result);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Country are retrieved successfully',
		//meta: result.meta,
		data: result,
	});
});

export const packageController = {
	createPackage,
	createPackage_Two,
	getAllPackage,
};
