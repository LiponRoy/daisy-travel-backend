// src/models/Tour.ts

import mongoose, { Schema, Model, model } from 'mongoose';
import { IUsers, userModelType } from './user.interface';

const userSchema: Schema = new Schema<IUsers>(
	{
		id: { type: String, required: true, unique: true },
		role: { type: String, required: true },
		password: { type: String, required: true },
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

export const userModel = model<IUsers, userModelType>('User', userSchema);
