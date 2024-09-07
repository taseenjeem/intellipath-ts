"use server";
import { signIn } from "@/auth";
import { ICredentialLoginFormData } from "@/types";
import connectMongodb from "../services/connectMongodb";
import User from "../db-models/userModel";

export const credentialLogin = async (formData: ICredentialLoginFormData) => {
  try {
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    return {
      success: true,
      message: "You have successfully logged in.",
      userEmail: formData.email,
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: "An unexpected error occurred during login.",
    };
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    await connectMongodb();
    const user = await User.findOne({ email }).lean();
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Error finding user by email");
  }
};

export const updateUserProfileImage = async (userId: string, file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const imgbbApiKey = process.env.IMGBB_API_KEY;
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error("Image upload failed");
    }

    const imageUrl = data.data.url;

    await connectMongodb();
    await User.findByIdAndUpdate(userId, { profileImageUrl: imageUrl });

    return {
      success: true,
      imageUrl,
    };
  } catch (error) {
    console.error("Error uploading image or updating user:", error);
    return {
      success: false,
      message: "Failed to upload image or update user",
    };
  }
};

export const updateUserDetails = async (userId: string, updatedData: any) => {
  try {
    await connectMongodb();
    await User.findByIdAndUpdate(userId, updatedData);
  } catch (error) {
    console.error("Error updating user details:", error);
    throw new Error("Error updating user details");
  }
};
