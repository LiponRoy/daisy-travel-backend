import mongoose, { Schema, Document } from "mongoose";

export interface IMainProfile extends Document {
  userId: mongoose.Types.ObjectId;
  generalInfo?: mongoose.Types.ObjectId;
  educationInfo?: mongoose.Types.ObjectId[];
  workExperience?: mongoose.Types.ObjectId[];
}

const MainProfileSchema = new Schema<IMainProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    generalInfo: { type: Schema.Types.ObjectId, ref: "GeneralInfo" },
    educationInfo: [{ type: Schema.Types.ObjectId, ref: "EducationInfo" }],
    workExperience: [{ type: Schema.Types.ObjectId, ref: "WorkExperience" }],
  },
  { timestamps: true }
);

export default mongoose.model<IMainProfile>("MainProfile", MainProfileSchema);
