// src/models/Tour.ts

import mongoose, { Schema, Model, model } from 'mongoose';
import { ITour, TourModelType } from './tour.interface';

// 2. Create a Schema corresponding to the document interface.



const TourSchema: Schema = new Schema<ITour>(
	{
		fromLocation: { type: String, required: true },
		toLocation: { type: String, required: true },
		price: { type: String, required: true },
		tourDate: { type: String, required: true },
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

export const tourModel = model<ITour,TourModelType>('Tour', TourSchema);
