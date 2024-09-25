"use client";
import { IChangePassForm } from "@/types";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";

interface INewPasswordProps {
  register: UseFormRegister<IChangePassForm>;
  errors: FieldErrors<IChangePassForm>;
}

const NewPassword = ({ register, errors }: INewPasswordProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to toggle password visibility

  return (
    <>
      <div className="form-control relative">
        <label htmlFor="newPassword" className="label">
          <span
            className={`label-text ${errors?.newPassword ? "text-error" : ""}`} // Applies error styling if there's a validation error
          >
            Create a new password
          </span>
        </label>
        <div className="join">
          <input
            {...register("newPassword", {
              required: "Your new password is required", // Validation rule: field is required
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // Regex pattern for a strong password
                message:
                  "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a symbol", // Error message for invalid password
              },
            })}
            type={showPassword ? "text" : "password"} // Toggles the input type between "text" and "password"
            id="newPassword"
            name="newPassword"
            placeholder="aBcD@123"
            className={`input input-bordered w-full join-item ${
              errors?.newPassword ? "input-error" : "" // Adds error styling if the input has validation errors
            }`}
          />
          {/* Button to toggle password visibility */}
          <button
            type="button"
            className={`btn join-item ${
              errors?.newPassword ? "btn-error" : "btn-neutral" // Styling based on validation error
            }`}
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility state
          >
            {/* Conditionally render the appropriate icon based on password visibility */}
            {showPassword ? (
              <PiEyeDuotone className="size-6" />
            ) : (
              <PiEyeClosedDuotone className="size-6" />
            )}
          </button>
        </div>

        {/* Error message display */}
        {errors?.newPassword && (
          <div className="label">
            <span className="label-text-alt text-error">
              {errors.newPassword.message}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default NewPassword;
