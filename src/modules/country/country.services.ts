import mongoose from "mongoose";
import { ICountry } from "./country.interface";
import {
  deleteLocalFile,
  uploadImage,
} from "../../utils/cloudinary_file_upload";
import ApiError from "../../errors/ApiError";
import countryModel from "./country.model";

const createCountry = async (
  payload: Partial<ICountry>,
  files: Express.Multer.File[]
): Promise<ICountry | null> => {
  const { name,category} = payload;

  // Find the user by name ,if found it mean already hav this country so delete local path image
  if (files.length > 4 || files.length < 4 ) {
	for (const file of files) {
		try {
		  // Delete local file after upload
		  deleteLocalFile(file.path);
		} catch (error) {
		  throw new ApiError(500, "Failed to delete image");
		}
	  }
	throw new ApiError(400, 'do not support less than or equal 4 images');
  }


  // Find the user by name ,if found it mean already hav this country so delete local path image
  const countryName = await countryModel.findOne({ name });
  if (countryName){
	  for (const file of files) {
		try {
		  // Delete local file after upload
		  deleteLocalFile(file.path);
		} catch (error) {
		  throw new ApiError(500, "Failed to delete image");
		}
	  }

	  throw new ApiError(404, "already upload this country image");

  } 

  // Handle image uploads
  const uploadedImages: any[] = [];
  for (const file of files) {
	console.log("file.path", file.path);
    try {
      // Upload image
      const result = await uploadImage(file.path, name as string);

      // Add image details to the images array
      uploadedImages.push({
        cloudinary_id: result.public_id,
        imageUrl: result.secure_url,
      });

      // Delete local file after upload
      deleteLocalFile(file.path);

      // Delete old image from Cloudinary if it exists
      //   if (user.images.length > 0) {
      //     await deleteImage(user.images[0].cloudinary_id); // Assuming single image handling
      //   }
    } catch (error) {
      throw new ApiError(500, "Failed to upload image");
    }
  }

   // Prepare the updated user data
   const updatedData = {
    name: name || '',
    category: category || '',
    images: uploadedImages.length > 0 ? uploadedImages : undefined,  // Update avatars field with Cloudinary info
  };


  // Create new user if doesn't exist
  const newCountry = await countryModel.create(updatedData);

  if (!newCountry) {
    throw new ApiError(500, "Failed to create country");
  }

  return newCountry;

};

const allCountry = async (): Promise<any> => {
  const tour = await countryModel
    .findOne(
      {
        name: "Singapur",
      },
      {
        name: 1,
        location: 1,
        _id: 0,
      }
    )
    .sort({
      createdAt: -1,
    })
    .lean();
  return tour;
};

export const countryService = {
  createCountry,
  allCountry,
};
