import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


/**
 * Uploads an optimized file (image, PDF, or video) buffer to Cloudinary.
 * @param buffer - The file as a Buffer.
 * @param folder - The folder where the file should be stored in Cloudinary.
 * @param fileType - The type of file: "image", "video", or "raw" (for PDFs and other documents).
 * @returns An object containing the public ID and URL of the uploaded file.
 */
export async function uploadFile(
  buffer: Buffer,
  folder: string,
  fileType: "image" | "video" | "raw"
): Promise<{ publicId: string; url: string }> {
  return new Promise<{ publicId: string; url: string }>((resolve, reject) => {
    const options: Record<string, any> = { 
      folder, 
      resource_type: fileType, 
      eager_async: true,
    };
    

     // Apply optimizations based on file type
     if (fileType === "image") {
      options.quality = "auto"; 
    } else if (fileType === "video") {
      options.resource_type = "video";
      options.eager = [{ format: "mp4", quality: "auto" }];
      options.eager_async = true; 
    } else {
      options.resource_type = "raw"; 
    }
try {
  
  const uploadStream = cloudinary.uploader.upload_stream(
    options,
    (error, result) => {
      if (error) {
        reject(new Error(`Failed to upload ${fileType} to Cloudinary.`));
      } else {
        resolve({ 
          publicId: result?.public_id || "", 
          url: result?.secure_url || "" 
        });
      }
    }
  );

  uploadStream.end(buffer);
} catch (error: any) {
  console.log(`${error.message} ${fileType}`);

  throw new Error(`${error.message} ${fileType}`);}
  });
}


