// lib/server.ts
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import DatauriParser from "datauri/parser";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image to Cloudinary
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  try {
    const parser = new DatauriParser();

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = parser.format(
      path.extname(file.name).toString(),
      buffer
    );

    if (!base64Image.content) {
      throw new Error("Failed to convert image to Base64 format.");
    }

    // Upload image to Cloudinary
    const response = await cloudinary.uploader.upload(base64Image.content, {
      resource_type: "image",
      folder: "flashcards",
    });

    console.log("Cloudinary upload response:", response);

    return response.secure_url;
  } catch (error) {
    console.error("🔴 Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary.");
  }
};
