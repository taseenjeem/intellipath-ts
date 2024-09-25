"use server";
import { signIn } from "@/auth";
import { IChangePassForm, ICredentialLoginFormData } from "@/types";
import connectMongodb from "../services/connectMongodb";
import User from "../db-models/userModel";
import bcrypt from "bcryptjs";

// Function to handle login using credentials
export const credentialLogin = async (formData: ICredentialLoginFormData) => {
  try {
    // Attempt to sign in using provided email and password
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

// Function to fetch a user by email
export const getUserByEmail = async (email: string) => {
  try {
    await connectMongodb();
    const user = await User.findOne({ email }).lean();
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Error finding user by email");
  }
};

// Function to fetch a user by ID
export const getUserByID = async (userID: string) => {
  try {
    await connectMongodb();
    const user = await User.findById(userID).lean();
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw new Error("Error finding user by ID");
  }
};

// Function to fetch a user by username
export const getUserByUsername = async (username: string) => {
  try {
    await connectMongodb();
    const user = await User.findOne({ username }).lean();
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw new Error("Error finding user by username");
  }
};

// Function to update a user's profile image by uploading it to ImgBB
export const updateUserProfileImage = async (userId: string, file: File) => {
  const formData = new FormData(); // Create a new FormData object for the image
  formData.append("image", file); // Append the file to the FormData

  try {
    const imgbbApiKey = process.env.IMGBB_API_KEY; // Get ImgBB API key from environment variables
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, // Send POST request to ImgBB API
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error("Image upload failed"); // Throw error if the upload failed
    }

    const imageUrl = data.data.url; // Get the uploaded image URL from the response

    await connectMongodb();
    await User.findByIdAndUpdate(userId, { profileImageUrl: imageUrl });

    return {
      success: true,
      imageUrl, // Return the image URL for the client
    };
  } catch (error) {
    console.error("Error uploading image or updating user:", error);
    return {
      success: false,
      message: "Failed to upload image or update user",
    };
  }
};

// Function to update user details in MongoDB
export const updateUserDetails = async (userId: string, updatedData: any) => {
  try {
    await connectMongodb();
    await User.findByIdAndUpdate(userId, updatedData);
  } catch (error) {
    console.error("Error updating user details:", error);
    throw new Error("Error updating user details");
  }
};

// Function to check if a username is already taken
export const checkUsernameAvailability = async (username: string) => {
  try {
    await connectMongodb();
    const existingUser = await User.findOne({ username });
    return !!existingUser;
  } catch (error) {
    console.error("Error checking username:", error);
    throw new Error("Error checking username availability");
  }
};

// Function to change the user's password
export const changeUserPassword = async (
  userID: string,
  updatedData: IChangePassForm
) => {
  try {
    await connectMongodb();
    const existingUser = await User.findById(userID); // Fetch the user by ID

    if (!existingUser) {
      throw new Error("User not found"); // Throw error if the user does not exist
    }

    // Verify that the current password matches
    const verifyPassword = await bcrypt.compare(
      updatedData.currentPassword,
      existingUser.password
    );
    if (!verifyPassword) {
      throw new Error("Current password is incorrect");
    }

    // Ensure that the new password is not the same as the current password
    const isSamePassword = await bcrypt.compare(
      updatedData.newPassword,
      existingUser.password
    );

    if (isSamePassword) {
      throw new Error(
        "New password cannot be the same as the current password"
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(updatedData.newPassword, 10);

    // Update the user's password in the database
    await User.findByIdAndUpdate(userID, {
      password: hashedPassword,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error updating user password:", err.message);
    throw new Error(err.message || "Error updating user password");
  }
};
