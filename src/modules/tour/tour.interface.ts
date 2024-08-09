import { Document, Model, Types } from 'mongoose';

export type TourMoment = 'Morning' | 'Evening' | 'Night';
export type TourCode = '01' | '02' | '03';
// 1. Create an interface representing a document in MongoDB.
export interface ITour {
	fromLocation: string;
	toLocation: string;
	price: string;
	moment: TourMoment;
	code: TourCode;
	tourDate: string;
	country: Types.ObjectId;
}

export type TourModelType = Model<ITour, Record<string, unknown>>;

export interface ItureFilters {
	searchTerm?: string;
}

export type TtourMomentCodeMapper = {
	// this is called Maps type
	[key: string]: string;
};
