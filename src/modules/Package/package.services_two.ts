import ApiError from "../../errors/ApiError";
import { deleteLocalFile, uploadImage } from "../../utils/cloudinary_file_upload";
import { IPackage } from "./package.interface_two";
import PackageModel_tow from "./package.model_two";

const createPackage_Two = async (
    payload: Partial<IPackage>,
    files: Express.Multer.File[]
  ): Promise<IPackage | null> => {
    console.log("Payload service: ", payload);
    console.log("files service: ", files);
  
    const { title } = payload;
  
    // Find the user by name ,if found it mean already hav this package so delete local path image
    if (files.length > 4 || files.length < 4) {
      for (const file of files) {
        try {
          // Delete local file
          deleteLocalFile(file.path);
        } catch (error) {
          throw new ApiError(500, "Failed to delete image");
        }
      }
      throw new ApiError(400, "do not support less than or equal 4 images");
    }
  
    // Find the user by name ,if found it mean already hav this package so delete local path image
    const countryName = await PackageModel_tow.findOne({ title });
    if (countryName) {
      for (const file of files) {
        try {
          // Delete local file
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
        let cloudinaryFolder = `/TripNest_Packages/${title as string}`;
        // Upload image
        const result = await uploadImage(file.path, cloudinaryFolder);
  
        // Add image details to the images array
        uploadedImages.push({
          cloudinary_id: result.public_id,
          imageUrl: result.secure_url,
        });
  
        // Delete local file after upload
        deleteLocalFile(file.path);
  
      } catch (error) {
        throw new ApiError(500, "Failed to upload image");
      }
    }
  
    console.log("uploadedImages services ... ", uploadedImages);
  
    // Prepare the updated user data
    const updatedData = {
      ...payload,
      images: uploadedImages.length > 0 ? uploadedImages : undefined, // Update avatars field with Cloudinary info
    };
  
    // Create new user if doesn't exist
    const newCountry = await PackageModel_tow.create(updatedData);
  
    if (!newCountry) {
      throw new ApiError(500, "Failed to create country");
    }
  
    return newCountry;
  };


  export const packageService_two = {
    createPackage_Two,

  };