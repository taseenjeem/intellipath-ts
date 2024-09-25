"use client";
import { IChangePassForm } from "@/types";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";

interface ICurrentPasswordProps {
  register: UseFormRegister<IChangePassForm>;
  errors: FieldErrors<IChangePassForm>;
}

const CurrentPassword = ({ register, errors }: ICurrentPasswordProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false); // Local state to toggle the visibility of the password

  return (
    <>
      <div className="form-control relative">
        {/* Container for the form control */}
        <label htmlFor="currentPassword" className="label">
          <span
            className={`label-text ${
              errors?.currentPassword ? "text-error" : "" // Adds error styling if there is an error with currentPassword
            }`}
          >
            Your current password
          </span>
        </label>
        <div className="join">
          <input
            {...register("currentPassword", {
              required: "Your current password is required", // Validation rule: the field is required
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // Regex pattern for password strength
                message:
                  "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a symbol", // Error message for invalid pattern
              },
            })}
            type={showPassword ? "text" : "password"} // Input type changes based on showPassword state
            id="currentPassword"
            name="currentPassword"
            placeholder="aBcD@123"
            className={`input input-bordered w-full join-item ${
              errors?.currentPassword ? "input-error" : "" // Adds error styling if validation fails
            }`}
          />
          {/* Button to toggle password visibility */}
          <button
            type="button"
            className={`btn join-item ${
              errors?.currentPassword ? "btn-error" : "btn-neutral" // Applies error styling to the button if there are validation errors
            }`}
            onClick={() => setShowPassword(!showPassword)} // Toggles the visibility of the password
          >
            {/* Conditionally render the appropriate icon based on password visibility */}
            {showPassword ? (
              <PiEyeDuotone className="size-6" />
            ) : (
              <PiEyeClosedDuotone className="size-6" />
            )}
          </button>
        </div>
        {/* Display validation error message if there's an error */}
        {errors?.currentPassword && (
          <div className="label">
            <span className="label-text-alt text-error">
              {errors.currentPassword.message}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default CurrentPassword;
