"use server";
import { signIn } from "@/auth";
import { ICredentialLoginFormData } from "@/types";

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
