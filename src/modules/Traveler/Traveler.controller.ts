import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
// import pick from '../../shared/pick';
import ApiError from '../../errors/ApiError';
import { catchAsyncError } from '../../utils/catchAsyncErrors';
import { TravelerModel } from './Traveler.model';
import cloudinary from '../../utils/cloudinary';
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

		// Parse the Travelers JSON strings into objects
		let parsedTravelers: any[] = [];
		if (Array.isArray(Travelers)) {
			parsedTravelers = Travelers.map(traveler => JSON.parse(traveler));
		}

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

		  console.log("name-",name)
		  console.log("email-",email)
		  console.log("Travelers-",Travelers)

	//Upload main traveler's pdf1 to Cloudinary

      const resultPdf1 = pdf1File
        ? await cloudinary.uploader.upload(pdf1File.path, {
            folder: 'travelers_pdfs',
          })
        : null;

      // Upload main traveler's pdf2 to Cloudinary
      const resultPdf2 = pdf2File
        ? await cloudinary.uploader.upload(pdf2File.path, {
            folder: 'travelers_pdfs',
          })
        : null;



		const travelerData = new TravelerModel({
			name,
			email,
			pdf1:resultPdf1?.secure_url || '',
			pdf1_cloudinary_id: resultPdf1?.public_id || '',
			pdf2:resultPdf2?.secure_url || '',
			pdf2_cloudinary_id: resultPdf2?.public_id || '',
			Travelers:parsedTravelers// Ensure it's parsed correctly
		  });

		  console.log("travelerData....: ",travelerData)
	
		  const savedTraveler = await travelerData.save();


	// 	// Create new traveler document
	// 	const newTraveler = new TravelerModel({
	// 		name,
	// 		email,
	// 		Travelers,
	// 	  });

    // // Save to the database
    // const savedTraveler = await newTraveler.save();

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: 'Traveler Created Successfully !',
			data: savedTraveler,
		});
	}
);


export const travelController = {
	createTraveler,
};
