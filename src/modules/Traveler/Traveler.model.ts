import mongoose from 'mongoose';
import { IsubTraveler, Itraveler } from './Traveler.interface';

const subTravelerSchema = new mongoose.Schema<IsubTraveler>({
	name: { type: String, required: true },
	email: { type: String, required: true },
});

const TravelerSchema = new mongoose.Schema<Itraveler>({
	name: { type: String, required: true },
	email: { type: String, required: true },
	Travelers: [subTravelerSchema], // Array of sub-users
});

export const TravelerModel = mongoose.model('Traveler', TravelerSchema);
