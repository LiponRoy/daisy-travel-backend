import sharp from "sharp";
import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";

export const compressImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.file) {
    return next();
  }

  const tempPath = req.file.path;
  const compressedPath = path.join(
    "uploads",
    `compressed_${Date.now()}_${req.file.originalname}`
  );

  try {
    await sharp(tempPath)
      .resize({ width: 800 }) // Resize the image
      .jpeg({ quality: 70 }) // Compress the image
      .toFile(compressedPath);

    req.file.path = compressedPath;

    // Add a delay before deleting
    setTimeout(() => {
      try {
        fs.unlinkSync(tempPath); // Delete the uncompressed file
      } catch (deleteError) {
        console.error("Error deleting temporary file:", deleteError);
      }
    }, 100);

    next();
  } catch (error) {
    console.error("Error during image compression:", error);
    res.status(500).json({ message: "Failed to compress image" });
  }
};
