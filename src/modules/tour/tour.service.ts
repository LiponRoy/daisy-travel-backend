import { SortOrder } from 'mongoose';
import { paginetionHelpers } from '../../helpers/paginationHelpers';
import { IPaginationResponse } from '../../interfaces/common';
import { IPagination } from '../../interfaces/pagination';
import { ITour, ItureFilters } from './tour.interface';
import { tourSearchableField } from '../../constants/paginationsFields';
import { tourModel } from './tour.model';
import { tourMomentCodeMapper } from './tour.constant';

const createTour = async (payload: ITour): Promise<ITour | null> => {
	// Ensure that moments and tis perticular code are asme or not
	if (tourMomentCodeMapper[payload.moment] !== payload.code) {
		throw new Error('Invalid Moment and Code');
	}

	const tour = await tourModel.create(payload);
	return tour;
};

const getAllTour = async (
	filters: ItureFilters,
	payLoad: IPagination
): Promise<IPaginationResponse<ITour[]>> => {
	// for searching
	const { searchTerm, ...filtersData } = filters;

	console.log('filtersData :', filtersData);

	// const andCondisons = [
	// 	{
	// 		$or: [
	// 			{
	// 				fromLocation: {
	// 					$regex: searchTerm,
	// 					$options: 'i',
	// 				},
	// 			},
	// 			{
	// 				toLocation: {
	// 					$regex: searchTerm,
	// 					$options: 'i',
	// 				},
	// 			},
	// 		],
	// 	},
	// ];

	const andCondisons = [];

	// for searching
	if (searchTerm) {
		andCondisons.push({
			$or: tourSearchableField.map((field) => ({
				[field]: {
					$regex: searchTerm,
					$options: 'i',
				},
			})),
		});
	}

	// for filtering
	if (Object.keys(filtersData).length) {
		andCondisons.push({
			$and: Object.entries(filtersData).map(([field, value]) => ({
				[field]: value,
			})),
		});
	}

	// const { page = 1, limit = 4 } = payLoad;
	// const skip = (page - 1) * limit;
	const { page, limit, skip, sortBy, sortOrder } =
		paginetionHelpers.calculatePaginetion(payLoad);

	// for sorting
	// const sortConditions: { [key: string]: SortOrder } = {};
	const sortConditions: Record<string, SortOrder> = {};

	if (sortBy && sortOrder) {
		sortConditions[sortBy] = sortOrder;
	}
	// End sorting

	const whereConditions = andCondisons.length > 0 ? { $and: andCondisons } : {};

	const tours = await tourModel
		.find(whereConditions)
		.populate('country', 'name -_id')
		.sort(sortConditions)
		.skip(skip)
		.limit(limit);
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

const getSingleTour = async (id: string): Promise<ITour | null> => {
	const tours = await tourModel.findById(id).populate('country');

	return tours;
};

const updateTour = async (
	id: string,
	payload: Partial<ITour>
): Promise<ITour | null> => {
	// If Update moment and code both have to update
	// Ensure that moments and tis perticular code are asme or not
	if (
		payload.moment &&
		payload.code &&
		tourMomentCodeMapper[payload.moment] !== payload.code
	) {
		throw new Error('Invalid Moment and Code');
	}

	const tours = await tourModel.findOneAndUpdate({ _id: id }, payload, {
		new: true,
	});

	return tours;
};
const deleteTour = async (id: string): Promise<ITour | null> => {
	const tours = await tourModel.findByIdAndDelete({ _id: id });

	return tours;
};

export const tourService = {
	createTour,
	getAllTour,
	getSingleTour,
	updateTour,
	deleteTour,
};
