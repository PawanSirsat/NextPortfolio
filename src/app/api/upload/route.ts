import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(
              NextResponse.json({ error: "Upload failed" }, { status: 500 })
            );
          } else {
            resolve(NextResponse.json(result));
          }
        })
        .end(buffer);
    });
  } catch (error) {
    console.error("Error processing upload:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
