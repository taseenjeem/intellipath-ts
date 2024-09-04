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

export const getUserByEmail = async (credentials: ICredentialLoginFormData) => {
  try {
    await connectMongodb();
    const user = await User.findOne({ email: credentials.email }).lean();
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Error finding user by email");
  }
};
