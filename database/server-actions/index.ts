"use server";
import { signIn } from "@/auth";
import { ICredentialLoginFormData } from "@/types";

export const credentialLogin = async (formData: ICredentialLoginFormData) => {
  try {
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (response?.error) {
      return {
        success: false,
        message: response.error || "Login failed",
      };
    } else {
      return { success: true, message: "Login successful!" };
    }
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: "An unexpected error occurred during login.",
    };
  }
};
