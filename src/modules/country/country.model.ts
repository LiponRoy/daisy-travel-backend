// src/models/Tour.ts

import mongoose, { Schema, Model, model } from 'mongoose';
import { CountryModelType, ICountry } from './country.interface';

const CountrySchema: Schema = new Schema<ICountry>(
	{
		name: { type: String, required: true },
		location: { type: String, required: true },
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

export const countryModel = model<ICountry, CountryModelType>(
	'Country',
	CountrySchema
);
