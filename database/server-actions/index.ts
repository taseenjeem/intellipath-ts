"use server";
import { signIn } from "@/auth";
import {
  IChangePassForm,
  ICredentialLoginFormData,
  IPublishCourse,
} from "@/types";
import connectMongodb from "../services/connectMongodb";
import User from "../db-models/userModel";
import Courses from "../db-models/courseModel";
import bcrypt from "bcryptjs";

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
    const user = await User.findOne({ email }).populate("courses").lean();
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Error finding user by email");
  }
};

export const getUserByID = async (userID: string) => {
  try {
    await connectMongodb();
    const user = await User.findById(userID).populate("courses").lean();
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw new Error("Error finding user by ID");
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    await connectMongodb();
    const user = await User.findOne({ username })
      .populate({
        path: "courses",
        populate: {
          path: "instructor",
        },
      })
      .lean();
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw new Error("Error finding user by username");
  }
};

export const uploadImage = async (file: File) => {
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

    return {
      success: true,
      imageUrl,
      message: "Image uploaded successfully",
    };
  } catch (error) {
    console.error("Error uploading image", error);
    return {
      success: false,
      imageUrl: null,
      message: "Failed to upload image",
    };
  }
};

export const updateUserProfileImage = async (userId: string, file: File) => {
  try {
    const { success, imageUrl, message } = await uploadImage(file);

    if (success) {
      await connectMongodb();
      await User.findByIdAndUpdate(userId, { profileImageUrl: imageUrl });

      return {
        success: true,
        imageUrl,
        message,
      };
    } else {
      console.error("Error uploading image or updating user:", message);
      return {
        success: false,
        imageUrl: null,
        message: "Failed to upload image",
      };
    }
  } catch (error) {
    console.error("Error uploading image or updating user:", error);
    return {
      success: false,
      message: "Failed to upload profile picture of the user",
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

export const changeUserPassword = async (
  userID: string,
  updatedData: IChangePassForm
) => {
  try {
    await connectMongodb();
    const existingUser = await User.findById(userID);

    if (!existingUser) {
      throw new Error("User not found");
    }

    const verifyPassword = await bcrypt.compare(
      updatedData.currentPassword,
      existingUser.password
    );
    if (!verifyPassword) {
      throw new Error("Current password is incorrect");
    }

    const isSamePassword = await bcrypt.compare(
      updatedData.newPassword,
      existingUser.password
    );

    if (isSamePassword) {
      throw new Error(
        "New password cannot be the same as the current password"
      );
    }

    const hashedPassword = await bcrypt.hash(updatedData.newPassword, 10);

    await User.findByIdAndUpdate(userID, {
      password: hashedPassword,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error updating user password:", err.message);
    throw new Error(err.message || "Error updating user password");
  }
};

export const publishCourse = async (
  userID: string,
  courseData: IPublishCourse,
  thumbnail: string
) => {
  try {
    await connectMongodb();
    const data = { ...courseData, thumbnail };
    const newCourse = new Courses(data);
    const result = await newCourse.save();

    if (result) {
      await User.findByIdAndUpdate(userID, {
        $push: { courses: result._id },
      });
      return {
        success: true,
        message: "Course published successfully",
        courseId: result._id,
      };
    }

    return { success: false, message: "Failed to save the course" };
  } catch (error) {
    const err = error as Error;
    console.error("Error in publishCourse:", err.message);
    return {
      success: false,
      message: err.message || "Error while publishing course",
    };
  }
};

export const getCourseBySlug = async (slug: string) => {
  try {
    await connectMongodb();
    const course = await Courses.findOne({ slug })
      .populate("instructor")
      .lean();
    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    console.error("Error in getCourseBySlug:", error);
    throw new Error("Error while getting course by slug");
  }
};
