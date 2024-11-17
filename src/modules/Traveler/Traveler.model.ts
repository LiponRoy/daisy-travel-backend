import mongoose from 'mongoose';
import { IsubTraveler, Itraveler } from './Traveler.interface';

const subTravelerSchema = new mongoose.Schema<IsubTraveler>({
<<<<<<< HEAD
	name: { type: String, required: true },
	email: { type: String, required: true },
});

const TravelerSchema = new mongoose.Schema<Itraveler>({
	name: { type: String, required: true },
	email: { type: String, required: true },
	Travelers: [subTravelerSchema], // Array of sub-users
=======
  name: { type: String, required: true },
  email: { type: String, required: true },

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
>>>>>>> 74ea45429983aa7562bb86eadb0677d6869565f2
});


export const TravelerModel = mongoose.model('Traveler', TravelerSchema);
