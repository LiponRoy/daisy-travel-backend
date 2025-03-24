import mongoose, { Schema, Document } from "mongoose";

export interface IEducationInfo extends Document {
  userId: mongoose.Types.ObjectId;
  degree: string;
  university: string;
  graduationYear: number;
  major?: string;
  gpa?: number;
}

const EducationInfoSchema = new Schema<IEducationInfo>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    degree: { type: String, required: true },
    university: { type: String, required: true },
    graduationYear: { type: Number, required: true },
    major: { type: String },
    gpa: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model<IEducationInfo>("EducationInfo", EducationInfoSchema);
