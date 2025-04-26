import mongoose, { Schema } from 'mongoose';
import {
	IEducationInfo,
	IGeneralInfo,
	IMainProfile,
	IWorkExperience,
} from './profile.interface';

const GeneralInfoSchema = new Schema<IGeneralInfo>({
	fullName: { type: String, required: true },
	dob: { type: Date },
	gender: { type: String, enum: ['Male', 'Female', 'Other'] },
	phone: { type: String },
});

const EducationInfoSchema = new Schema<IEducationInfo>({
	degree: { type: String, required: true },
	institution: { type: String, required: true },
	year: { type: Number, required: true },
});

const WorkExperienceSchema = new Schema<IWorkExperience>({
	company: { type: String, required: true },
	position: { type: String, required: true },
	startDate: { type: Date, required: true },
	endDate: { type: Date },
});

const MainProfileSchema = new Schema<IMainProfile>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			unique: true,
		},
		generalInfo: GeneralInfoSchema, // Embedded subdocument
		educationInfo: { type: [EducationInfoSchema], default: [] }, // Array of subdocuments
		workExperience: { type: [WorkExperienceSchema], default: [] }, // Array of subdocuments
	},
	{ timestamps: true }
);

export const mainProfile = mongoose.model<IMainProfile>(
	'MainProfile',
	MainProfileSchema
);
