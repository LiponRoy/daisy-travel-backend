import { paginetionHelpers } from '../../helpers/paginationHelpers';
import { IPaginationResponse } from '../../interfaces/common';
import { IPagination } from '../../interfaces/pagination';
import { ITour } from './tour.interface';
import tourModel from './tour.model';

const createTour = async (payload: ITour): Promise<ITour | null> => {
	const tour = await tourModel.create(payload);
	return tour;
};

const getAllTour = async (
	payLoad: IPagination
): Promise<IPaginationResponse<ITour[]>> => {
	// const { page = 1, limit = 4 } = payLoad;
	// const skip = (page - 1) * limit;
	const { page, limit, skip } = paginetionHelpers.calculatePaginetion(payLoad);

	const tours = await tourModel.find().sort().skip(skip).limit(limit);
	const total = await tourModel.countDocuments();
	return {
		meta: {
			page,
			limit,
			total,
		},
		data: tours,
	};
};

export const tourService = {
	createTour,
	getAllTour,
};
