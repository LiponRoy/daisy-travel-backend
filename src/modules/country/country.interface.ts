import { Model } from 'mongoose';

export interface ICountry {
	name: string;
	location: string;
}

export type CountryModelType = Model<ICountry, Record<string, unknown>>;
