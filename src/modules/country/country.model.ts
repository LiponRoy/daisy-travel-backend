import { model, Schema } from "mongoose";
import { ICountry } from "./country.interface";

const countrySchema = new Schema<ICountry>({
	name: { type: String, required: true,unique: true },
	category: { type: String, required: true },
	images: [
	  {
		cloudinary_id: { type: String, required: true },
		imageUrl: { type: String, required: true }
	  }
	],
  });
  
  const countryModel = model<ICountry>('Country', countrySchema);
  
  export default countryModel;
