import { Document } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface ITour {
	fromLocation: string;
	toLocation: string;
	price: number;
	tourDate: string;
}

export interface ItureFilters {
	searchTerm?: string;
}
