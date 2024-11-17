import { Itraveler } from './Traveler.interface';
import { TravelerModel } from './Traveler.model';

const createTraveler = async (payload: Itraveler): Promise<Itraveler> => {
	const { name, email, Travelers } = payload;

	// Create and save new user
	const newTraveler = new TravelerModel({
		name,
		email,
		Travelers,
	});

	await newTraveler.save();
	return newTraveler;
};

export const tourService = {
	createTraveler,
};
