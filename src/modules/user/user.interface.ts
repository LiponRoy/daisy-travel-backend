import { Model } from 'mongoose';

export interface IUsers {
	id: string;
	role: string;
	password: string;
}

export type userModelType = Model<IUsers, Record<string, unknown>>;
