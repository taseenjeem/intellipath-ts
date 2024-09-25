"use client";
import { ICredentialLoginFormData } from "@/types";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";

interface PasswordInputFieldProps {
  register: UseFormRegister<ICredentialLoginFormData>; // Hook form register for form control
  errors: FieldErrors<ICredentialLoginFormData>; // Field errors for form validation
}

const PassInputField = ({ register, errors }: PasswordInputFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to toggle password visibility

  return (
    <>
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
              required: "Your password is required", // Validation: password required
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // Regex pattern for password validation
                message:
                  "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a symbol", // Validation message for invalid password format
              },
            })}
            type={showPassword ? "text" : "password"} // Toggle between text and password input type
            id="password"
            name="password"
            placeholder="aBcD@123"
            className={`input input-bordered w-full join-item ${
              errors?.password ? "input-error" : ""
            }`} // Error class if password validation fails
          />
          <button
            type="button"
            className={`btn join-item ${
              errors?.password ? "btn-error" : "btn-neutral"
            }`} // Button styling based on password errors
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          >
            {showPassword ? (
              <PiEyeDuotone className="size-6" /> // Eye icon for visible password
            ) : (
              <PiEyeClosedDuotone className="size-6" /> // Eye closed icon for hidden password
            )}
          </button>
        </div>

        {/* Display error message if password validation fails */}
        {errors?.password && (
          <div className="label">
            <span className="label-text-alt text-error">
              {errors.password.message}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default PassInputField;
