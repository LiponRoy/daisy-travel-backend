import mongoose, { Schema, Document } from "mongoose";

export interface IGeneralInfo extends Document {
  userId: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  birthDate?: Date;
}

const GeneralInfoSchema = new Schema<IGeneralInfo>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gender: { type: String, required: true },
    birthDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IGeneralInfo>("GeneralInfo", GeneralInfoSchema);
