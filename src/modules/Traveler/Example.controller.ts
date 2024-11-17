// import { Request, Response } from 'express';
// import { TravelerModel } from './Traveler.model';
// import cloudinary from '../../config/cloudinary';

// export const travelController = {
//   createTraveler: async (req: Request, res: Response) => {
//     try {
//       const { name, email, Travelers } = req.body;
      
//       // Main traveler's pdf1 and pdf2
//       const pdf1 = req.files?.['pdf1']?.[0];
//       const pdf2 = req.files?.['pdf2']?.[0];

//       // Upload main traveler's pdf1 to Cloudinary
//       const resultPdf1 = pdf1
//         ? await cloudinary.uploader.upload(pdf1.path, {
//             folder: 'travelers_pdfs',
//           })
//         : null;

//       // Upload main traveler's pdf2 to Cloudinary
//       const resultPdf2 = pdf2
//         ? await cloudinary.uploader.upload(pdf2.path, {
//             folder: 'travelers_pdfs',
//           })
//         : null;

//       // Handle sub-travelers and their PDFs
//       const subTravelers = await Promise.all(
//         Travelers.map(async (subTraveler: any, index: number) => {
//           const subPdf1 = req.files?.[`Travelers[${index}][pdf1]`]?.[0];
//           const subPdf2 = req.files?.[`Travelers[${index}][pdf2]`]?.[0];

//           // Upload sub-traveler's pdf1
//           const resultSubPdf1 = subPdf1
//             ? await cloudinary.uploader.upload(subPdf1.path, {
//                 folder: 'sub_travelers_pdfs',
//               })
//             : null;

//           // Upload sub-traveler's pdf2
//           const resultSubPdf2 = subPdf2
//             ? await cloudinary.uploader.upload(subPdf2.path, {
//                 folder: 'sub_travelers_pdfs',
//               })
//             : null;

//           return {
//             name: subTraveler.name,
//             email: subTraveler.email,
//             pdf1: resultSubPdf1?.secure_url || '',
//             pdf1_cloudinary_id: resultSubPdf1?.public_id || '',
//             pdf2: resultSubPdf2?.secure_url || '',
//             pdf2_cloudinary_id: resultSubPdf2?.public_id || '',
//           };
//         })
//       );

//       // Create new traveler entry with main traveler and sub-travelers
//       const newTraveler = new TravelerModel({
//         name,
//         email,
//         pdf1: resultPdf1?.secure_url || '',
//         pdf1_cloudinary_id: resultPdf1?.public_id || '',
//         pdf2: resultPdf2?.secure_url || '',
//         pdf2_cloudinary_id: resultPdf2?.public_id || '',
//         Travelers: subTravelers,
//       });

//       // Save the traveler to MongoDB
//       await newTraveler.save();

//       res.status(201).json({ message: 'Traveler created successfully', traveler: newTraveler });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error creating traveler', error });
//     }
//   },
// };
