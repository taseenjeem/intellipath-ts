"use client";
import { IRegisterFormInputs } from "@/types";
import { useState } from "react";
import { FieldErrors, useFormContext, UseFormRegister } from "react-hook-form";
import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";

interface PasswordInputFieldProps {
  register: UseFormRegister<IRegisterFormInputs>;
  errors: FieldErrors<IRegisterFormInputs>;
}

const PassInputField = ({ register, errors }: PasswordInputFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to manage password visibility
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false); // State to manage confirm password visibility
  const { watch } = useFormContext(); // Accessing form context to watch password value
  const password = watch("password"); // Watching the password field

  return (
    <>
      {/* Password Input */}
      <div className="form-control relative">
        <label htmlFor="password" className="label">
          <span
            className={`label-text ${errors?.password ? "text-error" : ""}`}
          >
            Password
          </span>
        </label>
        <div className="join">
          <input
            {...register("password", {
              required: "Your password is required", // Required validation
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // Regex for password complexity
                message:
                  "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a symbol", // Error message for invalid password
              },
            })}
            type={showPassword ? "text" : "password"} // Toggles input type for password visibility
            id="password"
            name="password"
            placeholder="aBcD@123"
            className={`input input-bordered w-full join-item ${
              errors?.password ? "input-error" : ""
            }`} // Conditional styling
          />
          <button
            type="button"
            className={`btn join-item ${
              errors?.password ? "btn-error" : "btn-neutral"
            }`} // Button styling based on error state
            onClick={() => setShowPassword(!showPassword)} // Toggles password visibility
          >
            {showPassword ? (
              <PiEyeDuotone className="size-6" />
            ) : (
              <PiEyeClosedDuotone className="size-6" />
            )}
          </button>
        </div>

        {/* Displays error message if there's a validation error */}
        {errors?.password && (
          <div className="label">
            <span className="label-text-alt text-error">
              {errors.password.message}
            </span>
          </div>
        )}
      </div>

      {/* Confirm Password Input */}
      <div className="form-control relative">
        <label htmlFor="confirmPassword" className="label">
          <span
            className={`label-text ${
              errors?.confirmPassword ? "text-error" : ""
            }`}
          >
            Confirm Password
          </span>
        </label>
        <div className="join">
          <input
            {...register("confirmPassword", {
              required: "Please confirm your password", // Required validation
              validate: (value) =>
                value === password || "Passwords do not match", // Validation for matching passwords
            })}
            type={showConfirmPassword ? "text" : "password"} // Toggles input type for password visibility
            id="confirmPassword"
            name="confirmPassword"
            placeholder="aBcD@123"
            className={`input input-bordered w-full join-item ${
              errors?.confirmPassword ? "input-error" : ""
            }`} // Conditional styling
          />
          <button
            type="button"
            className={`btn join-item ${
              errors?.confirmPassword ? "btn-error" : "btn-neutral"
            }`} // Button styling based on error state
            onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggles confirm password visibility
          >
            {showConfirmPassword ? (
              <PiEyeDuotone className="size-6" />
            ) : (
              <PiEyeClosedDuotone className="size-6" />
            )}
          </button>
        </div>

        {/* Displays error message if there's a validation error */}
        {errors?.confirmPassword && (
          <div className="label">
            <span className="label-text-alt text-error">
              {errors.confirmPassword.message}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default PassInputField; // Exporting the component
