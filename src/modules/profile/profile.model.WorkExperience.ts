import mongoose, { Schema, Document } from "mongoose";

export interface IWorkExperience extends Document {
  userId: mongoose.Types.ObjectId;
  companyName: string;
  jobTitle: string;
  startDate: Date;
  endDate?: Date;
  responsibilities?: string;
}

const WorkExperienceSchema = new Schema<IWorkExperience>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    companyName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    responsibilities: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IWorkExperience>("WorkExperience", WorkExperienceSchema);
