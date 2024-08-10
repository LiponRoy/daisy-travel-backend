import { ICountry } from './country.interface';
import { countryModel } from './country.model';

const createCountry = async (payload: ICountry): Promise<ICountry | null> => {
	const tour = await countryModel.create(payload);
	return tour;
};

const allCountry = async (): Promise<any> => {
	const tour = await countryModel
		.find(
			{
				name: 'Singapur',
			},
			{
				_id: 1,
			}
		)
		.sort({
			createdAt: -1,
		})
		.lean();
	return tour;
};

export const countryService = {
	createCountry,
	allCountry,
};
