import { NextFunction, Request, Response } from 'express';
import { tourService } from './Traveler.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
// import pick from '../../shared/pick';
import ApiError from '../../errors/ApiError';
import { catchAsyncError } from '../../utils/catchAsyncErrors';




const createTraveler = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {

		const pdf1 = (req.files as { [key: string]: Express.Multer.File[] })['pdf1'][0].path;
		const pdf2 = (req.files as { [key: string]: Express.Multer.File[] })['pdf2'][0].path;

		console.log("createTraveler controller",pdf1,pdf2)

		// const pdf1 = await cloudinary.uploader.upload((req.files as { [key: string]: Express.Multer.File[] })['pdf1'][0].path);
		// const pdf2 = await cloudinary.uploader.upload((req.files as { [key: string]: Express.Multer.File[] })['pdf2'][0].path);

		

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
