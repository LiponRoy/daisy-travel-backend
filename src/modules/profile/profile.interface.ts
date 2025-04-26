import mongoose, { Schema, Document } from 'mongoose';

export interface IGeneralInfo {
	fullName: string;
	dob: Date;
	gender: string;
	phone: string;
}

export interface IEducationInfo {
	degree: string;
	institution: string;
	year: number;
}

export interface IWorkExperience {
	company: string;
	position: string;
	startDate: Date;
	endDate?: Date;
}

export interface IMainProfile extends Document {
	userId: mongoose.Types.ObjectId;
	generalInfo?: IGeneralInfo;
	educationInfo: IEducationInfo[];
	workExperience: IWorkExperience[];
}
