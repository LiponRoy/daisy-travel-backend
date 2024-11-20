// src/models/Tour.ts

import mongoose, { Schema, Model, model } from 'mongoose';
import { ITour, TourModelType } from './tour.interface';

// 2. Create a Schema corresponding to the document interface.


const TourSchema: Schema = new Schema<ITour>(
	{
		fromLocation: { type: String, required: true },
		toLocation: { type: String, required: true },
		duration: { type: Number,
			enum: [1, 2, 3,4,5,6,7,8,9,10],
			default: 1},
		price: { type: Number, required: true },
		// moment: { type: String, required: true },
		// code: { type: String, required: true },
		tourDate: { type: String, required: true },
		country: { type: String,
			enum: ['Bangladesh', 'India', 'Bhutan',"Thailand"],
			default: 'Bangladesh'}
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);



TourSchema.pre('save', async function (next) {
	const isTourExists = await tourModel.findOne({
		moment: this.moment,
		code: this.code,
		tourDate: this.tourDate,
	});

	if (isTourExists) {
		throw new Error('Tour is already exists !');
	}
	next();
});

export const tourModel = model<ITour, TourModelType>('Tour', TourSchema);
