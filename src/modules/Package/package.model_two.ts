import mongoose, { Schema, Document } from "mongoose";
import { IDetailedItinerary, IHighlight, IInclusions, IPackage } from "./package.interface_two";


const highlightSchema = new Schema<IHighlight>({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const inclusionsSchema = new Schema<IInclusions>({
  title: { type: String, required: true },
});

const detailedItinerarySchema = new Schema<IDetailedItinerary>({
  day: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const imageSchema = new Schema({
  cloudinary_id: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const tourSchema = new Schema<IPackage>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  highlights: { type: [highlightSchema], required: true },
  inclusions: { type: [inclusionsSchema], required: true },
  detailedItinerary: { type: [detailedItinerarySchema], required: true },
  category: { type: String, required: true },
  images: { type: [imageSchema], required: true },
});

const PackageModel_tow = mongoose.model<IPackage>("Package_tow", tourSchema);

export default PackageModel_tow;
