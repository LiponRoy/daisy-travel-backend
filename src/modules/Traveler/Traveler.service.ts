// import cloudinary from '../../utils/cloudinary';
// import {IsubTraveler, Itraveler} from './Traveler.interface';
// import { TravelerModel } from './Traveler.model';


// const createTraveler = async (payload: Itraveler,pdf1File:any,pdf2File:any): Promise<Itraveler> => {


// 	console.log("services pdf1 --",pdf1File)
// 	console.log("services pdf2 --",pdf2File)

// 	const { name, email,Travelers } = payload;



// 	      // Upload pdf1 to Cloudinary
// 		  const resultPdf1 = pdf1File
// 		  ? await cloudinary.uploader.upload(pdf1File.path, {
// 			  folder: 'travelers_pdfs',
// 			})
// 		  : null;
  
// 		// Upload pdf2 to Cloudinary
// 		const resultPdf2 = pdf2File
// 		  ? await cloudinary.uploader.upload(pdf2File.path, {
// 			  folder: 'travelers_pdfs',
// 			})
// 		  : null;



// 		        // Handle sub-travelers and their PDFs
// 				const subTravelers = await Promise.all(
// 					Travelers.map(async (subTraveler: any, index: number) => {
// 					  const subPdf1 = Travelers.pdf1?.[`Travelers[${index}][pdf1]`]?.[0];
// 					  const subPdf2 = req.files?.[`Travelers[${index}][pdf2]`]?.[0];
			
// 					  // Upload sub-traveler's pdf1
// 					  const resultSubPdf1 = subPdf1
// 						? await cloudinary.uploader.upload(subPdf1.path, {
// 							folder: 'sub_travelers_pdfs',
// 						  })
// 						: null;
			
// 					  // Upload sub-traveler's pdf2
// 					  const resultSubPdf2 = subPdf2
// 						? await cloudinary.uploader.upload(subPdf2.path, {
// 							folder: 'sub_travelers_pdfs',
// 						  })
// 						: null;
			
// 					  return {
// 						name: subTraveler.name,
// 						email: subTraveler.email,
// 						pdf1: resultSubPdf1?.secure_url || '',
// 						pdf1_cloudinary_id: resultSubPdf1?.public_id || '',
// 						pdf2: resultSubPdf2?.secure_url || '',
// 						pdf2_cloudinary_id: resultSubPdf2?.public_id || '',
// 					  };
// 					})
// 				  );

		 

// 		  // Prepare traveler data
// 		  const newTraveler = new TravelerModel({
// 			name,
// 			email,
// 			pdf1: resultPdf1?.secure_url || '',
// 			pdf1_cloudinary_id: resultPdf1?.public_id || '',
// 			pdf2: resultPdf2?.secure_url || '',
// 			pdf2_cloudinary_id: resultPdf2?.public_id || '',
// 			Travelers: Travelers.map((subTraveler: IsubTraveler) => ({
				
// 			  name: subTraveler.name,
// 			  email: subTraveler.email,
// 			  pdf1: subTraveler?.secure_url || '',
// 			  pdf1_cloudinary_id: subTraveler?.public_id || '',
// 			  pdf2: subTraveler,
// 			  pdf2_cloudinary_id: subTraveler,
// 			})),
// 		  });



//     // // Create and save new user
//     // const newTraveler = new TravelerModel({
// 	// 	name,
// 	// 	email,
// 	// 	//Travelers,
//     // });

//     await newTraveler.save();
// 	return newTraveler;
// };



// export const tourService = {
// 	createTraveler,
// };
