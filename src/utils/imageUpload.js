import axios from 'axios';

export const handleImageUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'products_assets'); // Your Cloudinary preset

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/duanu4gxj/image/upload`,
      formData
    );
    return response.data.secure_url; // Return the secure URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Error uploading image. Please try again.");
  }
};
