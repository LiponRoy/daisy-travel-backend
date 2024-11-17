import mongoose from 'mongoose';
import { IsubTraveler, Itraveler } from './TravelerBig.interface';



const subTravelerSchema = new mongoose.Schema<IsubTraveler>({

  firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	email: { type: String, required: true },
	localAddress: { type: String, required: true },
	SpecialNotes: { type: String, required: true },
  // pdf1: {
  //   type: String,
  // },
  // pdf1_cloudinary_id: {
  //   type: String,
  // },
  // pdf2: {
  //   type: String,
  // },
  // pdf2_cloudinary_id: {
  //   type: String,
  // },
  passport_img: {type:String},
  passport_img_cloudinary_id: {type:String},
  photo_img: {type:String},
  photo_img_cloudinary_id: {type:String},
  bankStatement_pdf: {type:String},
  bankStatement_pdf_cloudinary_id: {type:String},

});

const TravelerSchema = new mongoose.Schema<Itraveler>({
  firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	email: { type: String, required: true },
	localAddress: { type: String, required: true },
	SpecialNotes: { type: String, required: true },
  // pdf1: {
  //   type: String,
  // },
  // pdf1_cloudinary_id: {
  //   type: String,
  // },
  // pdf2: {
  //   type: String,
  // },
  // pdf2_cloudinary_id: {
  //   type: String,
  // },
  passport_img: {type:String},
  passport_img_cloudinary_id: {type:String},
  photo_img: {type:String},
  photo_img_cloudinary_id: {type:String},
  bankStatement_pdf: {type:String},
  bankStatement_pdf_cloudinary_id: {type:String},
 Travelers: [subTravelerSchema], // Array of sub-users
});


export const TravelerModelBig = mongoose.model('TravelerBig', TravelerSchema);

