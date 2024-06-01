import { catchAsyncError } from '../../middlewares/catchAsyncErrors';
import { ITour } from './tour.interface';
import tourModel from './tour.model';

const createTour = async (data: ITour): Promise<ITour | null> => {
	const { fromLocation, toLocation, tourDate } = data;

	const tour = await tourModel.create({
		fromLocation,
		toLocation,
		tourDate,
	});
	return tour;
};

export const tourService = {
	createTour,
};
