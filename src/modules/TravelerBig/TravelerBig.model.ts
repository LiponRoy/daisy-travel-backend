import mongoose from 'mongoose';
import { IsubTraveler, Itraveler } from './TravelerBig.interface';



const subTravelerSchema = new mongoose.Schema<IsubTraveler>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pdf1: {
    type: String,
  },
  pdf1_cloudinary_id: {
    type: String,
  },
  pdf2: {
    type: String,
  },
  pdf2_cloudinary_id: {
    type: String,
  },

});

const TravelerSchema = new mongoose.Schema<Itraveler>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pdf1: {
    type: String,
  },
  pdf1_cloudinary_id: {
    type: String,
  },
  pdf2: {
    type: String,
  },
  pdf2_cloudinary_id: {
    type: String,
  },
 Travelers: [subTravelerSchema], // Array of sub-users
});


export const TravelerModelBig = mongoose.model('TravelerBig', TravelerSchema);

