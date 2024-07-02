import { Document, Model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface ITour {
	fromLocation: string;
	toLocation: string;
	price: string;
	tourDate: string;
}

export type TourModelType= Model<ITour,Record<string,unknown>>

export interface ItureFilters {
	searchTerm?: string;
}
