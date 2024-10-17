import {Itraveler} from './Traveler.interface';
import { TravelerModel } from './Traveler.model';


const createTraveler = async (payload: Itraveler): Promise<Itraveler> => {

	const { mainTravelerName, mainTravelerEmail, Travelers } = payload;

    // Create and save new user
    const newTraveler = new TravelerModel({
		mainTravelerName,
		mainTravelerEmail,
		Travelers,
    });

    await newTraveler.save();
	return newTraveler;
};



export const tourService = {
	createTraveler,
};
