
import { ITour } from './tour.interface';
import tourModel from './tour.model';

const createTour = async (payload: ITour): Promise<ITour | null> => {
	const tour = await tourModel.create(payload);
	return tour;
};

export const tourService = {
	createTour,
};
