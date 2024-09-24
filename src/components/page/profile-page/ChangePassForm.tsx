"use client";
import { IChangePassForm } from "@/types";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CurrentPassword from "./CurrentPassword";
import NewPassword from "./NewPassword";
import ConfirmNewPass from "./ConfirmNewPass";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { changeUserPassword, getUserByID } from "@/database/server-actions";
import { updateUserInfo } from "@/redux/slices/UserInfoSlice";

const ChangePassForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const methods = useForm<IChangePassForm>();
  const dispatch = useAppDispatch();
  const userID = useAppSelector((state) => state.userInfo._id);

  const handleChangePassword: SubmitHandler<IChangePassForm> = async (data) => {
    setIsLoading(true);

    try {
      // Check if new password and confirm password match
      if (data.newPassword !== data.confirmNewPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // Call the API route to change the password
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID,
          updatedData: {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            confirmNewPassword: data.confirmNewPassword,
          },
        }),
      });

      // Parse the response from the API
      const result = await response.json();

      if (!response.ok) {
        // If response is not OK, throw an error with the message from the API
        throw new Error(result.message || "Failed to update the password");
      }

      // Update user info on success
      const updatedUserInfo = await getUserByID(userID);
      if (updatedUserInfo) {
        dispatch(updateUserInfo(updatedUserInfo));
      }

      // Display success message
      toast.success(result.message || "Password changed successfully");
      methods.reset();
    } catch (error: any) {
      // Handle the error message thrown from API
      toast.error(
        error.message || "An unexpected error occurred. Please try again."
      );
      console.error("Error:", error);
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleChangePassword)}
          className="space-y-4"
        >
          <CurrentPassword
            register={methods.register}
            errors={methods.formState.errors}
          />
          <NewPassword
            register={methods.register}
            errors={methods.formState.errors}
          />
          <ConfirmNewPass
            register={methods.register}
            errors={methods.formState.errors}
          />
          {isLoading ? (
            <button disabled className="btn btn-primary">
              <span className="loading loading-spinner"></span>
              Changing Password..
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Change password
            </button>
          )}
        </form>
      </FormProvider>
    </>
  );
};

export default ChangePassForm;
