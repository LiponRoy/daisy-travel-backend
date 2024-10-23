import { Request, Response } from 'express';
import { TravelerModelBig } from './TravelerBig.model';
import { IsubTraveler, Itraveler } from './TravelerBig.interface';
import cloudinary from '../../utils/cloudinary';
import { catchAsyncError } from '../../utils/catchAsyncErrors';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// Function to handle the creation of a new traveler along with sub-travelers
export const createTravelerBig = catchAsyncError(async (req: Request, res: Response) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

      if (!files) {
        return res.status(400).json({ message: 'No files uploaded' });
      }

      // Retrieve main traveler data
      const { name, email } = req.body;
      const travelerData: Itraveler = {
        name,
        email,
        pdf1: '',
        pdf1_cloudinary_id: '',
        pdf2: '',
        pdf2_cloudinary_id: '',
        Travelers: [] 
      };

      // Upload main traveler PDFs to Cloudinary
      if (files['pdf1'] && files['pdf1'].length > 0) {
        const result1 = await cloudinary.uploader.upload(files['pdf1'][0].path, {
          resource_type: 'auto',folder:"tpn_visaBooking" // Automatically detect file type
        });
        travelerData.pdf1 = result1.secure_url; // Save the secure URL
        travelerData.pdf1_cloudinary_id = result1.public_id; // Save Cloudinary public ID
      }

      if (files['pdf2'] && files['pdf2'].length > 0) {
        const result2 = await cloudinary.uploader.upload(files['pdf2'][0].path, {
          resource_type: 'auto',folder:"tpn_visaBooking"
        });
        travelerData.pdf2 = result2.secure_url;
        travelerData.pdf2_cloudinary_id = result2.public_id;
      }

      // Iterate through sub-travelers in the request body
      for (let i = 0; req.body.Travelers && i < req.body.Travelers.length; i++) {
        const subTravelerFiles = files[`Travelers[${i}][pdf1]`];
        const subTravelerFiles2 = files[`Travelers[${i}][pdf2]`];

        if (!req.body.Travelers[i].name || !req.body.Travelers[i].email) {
          return res.status(400).json({ message: 'Sub-traveler name and email are required' });
        }

        const subTravelerData: IsubTraveler = {
          name: req.body.Travelers[i].name,
          email: req.body.Travelers[i].email,
          pdf1: '',
          pdf1_cloudinary_id: '',
          pdf2: '',
          pdf2_cloudinary_id: ''
        };

        // Upload sub-traveler PDFs to Cloudinary
        if (subTravelerFiles && subTravelerFiles.length > 0) {
          const subResult1 = await cloudinary.uploader.upload(subTravelerFiles[0].path, {
            resource_type: 'auto',folder:"tpn_visaBooking"
          });
          subTravelerData.pdf1 = subResult1.secure_url;
          subTravelerData.pdf1_cloudinary_id = subResult1.public_id;
        }

        if (subTravelerFiles2 && subTravelerFiles2.length > 0) {
          const subResult2 = await cloudinary.uploader.upload(subTravelerFiles2[0].path, {
            resource_type: 'auto',folder:"tpn_visaBooking"
          });
          subTravelerData.pdf2 = subResult2.secure_url;
          subTravelerData.pdf2_cloudinary_id = subResult2.public_id;
        }

        travelerData.Travelers.push(subTravelerData);
      }

      // Create a new traveler in the database
      const newTraveler = new TravelerModelBig(travelerData);
      await newTraveler.save();

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Traveler Created Successfully !',
        data: newTraveler,
      });

     // return res.status(201).json({ message: 'Traveler created successfully', traveler: newTraveler });



    } catch (error) {
      console.error('Error creating traveler:', error);
      return res.status(500).json({ message: 'Server error', error: error });
    }
  }
);






export const travelControllerBig = {
	createTravelerBig,
};


















// import { Request, Response } from 'express';
// import { TravelerModelBig } from './TravelerBig.model';
// import { IsubTraveler, Itraveler } from './TravelerBig.interface';

// // Function to handle the creation of a new traveler along with sub-travelers
// export const travelControllerBig = {
//   createTravelerBig: async (req: Request, res: Response) => {
//     try {
//       // Ensure req.files is defined and type is correct
//       const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

//       if (!files) {
//         return res.status(400).json({ message: 'No files uploaded' });
//       }

//       // Retrieve main traveler data
//       const { name, email } = req.body; // Assuming these fields are in the body
//       const travelerData: Itraveler = {
//         name,
//         email,
//         pdf1: files['pdf1'] ? files['pdf1'][0].path : '', // Path to the uploaded pdf1
//         pdf1_cloudinary_id: 'cloudinary_id_here', // Replace with Cloudinary ID after upload
//         pdf2: files['pdf2'] ? files['pdf2'][0].path : '', // Path to the uploaded pdf2
//         pdf2_cloudinary_id: 'cloudinary_id_here', // Replace with Cloudinary ID after upload
//         Travelers: [] // Initialize with an empty array
//       };

//       // Iterate through sub-travelers in the request body
//       for (let i = 0; req.body.Travelers && i < req.body.Travelers.length; i++) {
//         const subTravelerFiles = files[`Travelers[${i}][pdf1]`];
//         const subTravelerFiles2 = files[`Travelers[${i}][pdf2]`];
        
//         // Ensure each sub-traveler has a name and email
//         if (!req.body.Travelers[i].name || !req.body.Travelers[i].email) {
//           return res.status(400).json({ message: 'Sub-traveler name and email are required' });
//         }

//         const subTravelerData: IsubTraveler = {
//           name: req.body.Travelers[i].name,
//           email: req.body.Travelers[i].email,
//           pdf1: subTravelerFiles && subTravelerFiles.length > 0 ? subTravelerFiles[0].path : '',
//           pdf1_cloudinary_id: 'cloudinary_id_here', // Replace with Cloudinary ID after upload
//           pdf2: subTravelerFiles2 && subTravelerFiles2.length > 0 ? subTravelerFiles2[0].path : '',
//           pdf2_cloudinary_id: 'cloudinary_id_here', // Replace with Cloudinary ID after upload
//         };
//         travelerData.Travelers.push(subTravelerData); // Add sub-traveler to main traveler
//       }

//       // Create a new traveler in the database
//       const newTraveler = new TravelerModelBig(travelerData);
//       await newTraveler.save();

//       return res.status(201).json({ message: 'Traveler created successfully', traveler: newTraveler });
//     } catch (error) {
//       console.error('Error creating traveler:', error);
//       return res.status(500).json({ message: 'Server error', error});
//     }
//   }
// };
