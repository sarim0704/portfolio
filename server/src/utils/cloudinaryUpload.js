import cloudinary from '../config/cloudinary.js';

export function uploadBufferToCloudinary(buffer, folder, resourceType = 'auto') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType, overwrite: true },
      (error, result) => error ? reject(error) : resolve(result)
    );
    stream.end(buffer);
  });
}
