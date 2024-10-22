import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
// import pick from '../../shared/pick';
import ApiError from '../../errors/ApiError';
import { catchAsyncError } from '../../utils/catchAsyncErrors';
// import { tourService } from './Traveler.service';

// Define Multer file type
interface MulterFile {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	destination: string;
	filename: string;
	path: string;
	size: number;
  }


const createTraveler = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {

		const { name, email, Travelers } = req.body;

		  // Type assertion to make sure TypeScript knows the shape of req.files
		  const files = req.files as { [fieldname: string]: MulterFile[] } | undefined;

		  // Handle req.files being undefined
		  if (!files) {
			return res.status(400).json({ message: "No files uploaded" });
		  }
		
		  // Access specific files safely with optional chaining
		  const pdf1File = files.pdf1?.[0];
		  const pdf2File = files.pdf2?.[0];
		
		  console.log("PDF1 File: ", pdf1File);
		  console.log("PDF2 File: ", pdf2File);

		//const result = await tourService.createTraveler(req.body,pdf1File,pdf2File);

		const result = "Karisma";


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
