"use client";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import EmailInputField from "./EmailInputField";
import PassInputField from "./PassInputField";
import { toast } from "react-toastify";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "../../../global/ui/Logo";
import { ICredentialLoginFormData } from "@/types";
import { credentialLogin, getUserByEmail } from "@/database/server-actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/store";
import { updateUserInfo } from "@/redux/slices/UserInfoSlice";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to manage loading status
  const methods = useForm<ICredentialLoginFormData>(); // Initialize react-hook-form methods
  const router = useRouter(); // Router instance for navigation
  const dispatch = useAppDispatch(); // Redux dispatch function
  const searchParams = useSearchParams(); // To get query parameters from the URL

  useEffect(() => {
    const message = searchParams.get("message"); // Check if "login_required" message exists in URL
    if (message === "login_required") {
      toast.warn("Access denied. Please login."); // Show warning toast if login is required
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete("message"); // Remove message from URL
      router.replace(currentUrl.toString()); // Replace URL without message parameter
    }
  }, [searchParams, router]);

  const handleLogin: SubmitHandler<ICredentialLoginFormData> = async (data) => {
    setIsLoading(true); // Set loading state to true while processing
    try {
      const response = await credentialLogin(data); // Attempt to log in using provided credentials
      if (response.success) {
        const userInfo = await getUserByEmail(data.email); // Fetch user data by email after successful login
        if (userInfo) {
          dispatch(updateUserInfo(userInfo)); // Update Redux store with user info
          toast.success(response.message); // Show success message
          router.push("/"); // Redirect to home page
        }
      } else {
        toast.error("Invalid credentials. Try again!"); // Show error if login fails
        methods.setError("root.serverError", { message: response.message }); // Set form error
      }
    } catch (error: any) {
      toast.error("An error occurred while processing your request."); // Show error toast if request fails
      methods.setError("root.serverError", { message: error.message }); // Set server error in form
    } finally {
      setIsLoading(false); // Reset loading state after processing
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleLogin)} className="card-body">
        <Logo formMode={true} /> {/* Render logo */}
        {/* Render email input field */}
        <EmailInputField
          register={methods.register}
          errors={methods.formState.errors}
        />
        {/* Render password input field */}
        <PassInputField
          register={methods.register}
          errors={methods.formState.errors}
        />
        <div className="form-control mt-6">
          {isLoading ? (
            <button disabled className="btn btn-primary">
              <span className="loading loading-spinner"></span>
              Loading..
            </button> // Show loading spinner while login is in progress
          ) : (
            <button type="submit" className="btn btn-primary">
              Login
            </button> // Show login button if not loading
          )}

          {/* Link to reset password page */}
          <label className="label flex justify-start mt-3">
            <Link
              href="/reset-password"
              className="label-text-alt link link-hover"
            >
              Forgot password?
            </Link>
          </label>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
