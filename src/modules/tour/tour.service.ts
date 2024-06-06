
import { IPagination } from '../../interfaces/pagination';
import { ITour } from './tour.interface';
import tourModel from './tour.model';

const createTour = async (payload: ITour): Promise<ITour | null> => {
	const tour = await tourModel.create(payload);
	return tour;
};

const getAllTour = async () => {
	const tours = await tourModel.find();
	return tours;
};

export const tourService = {
	createTour,
	getAllTour
};
