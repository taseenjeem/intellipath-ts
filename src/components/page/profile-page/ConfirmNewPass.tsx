"use client";
import { IChangePassForm } from "@/types";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";

interface IConfirmNewPassProps {
  register: UseFormRegister<IChangePassForm>;
  errors: FieldErrors<IChangePassForm>;
}

const ConfirmNewPass = ({ register, errors }: IConfirmNewPassProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to control the visibility of the password

  return (
    <>
      {/* Form control container */}
      <div className="form-control relative">
        <label htmlFor="confirmNewPassword" className="label">
          <span
            className={`label-text ${
              errors?.confirmNewPassword ? "text-error" : ""
            }`}
          >
            Confirm your new password
          </span>
        </label>

        <div className="join">
          <input
            {...register("confirmNewPassword", {
              required: "Confirming your new password is required", // Validation rule for required field
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // Password pattern validation
                message:
                  "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a symbol",
              }, // Error message for pattern mismatch
            })}
            type={showPassword ? "text" : "password"} // Show password based on state
            id="confirmNewPassword"
            name="confirmNewPassword"
            placeholder="aBcD@123"
            className={`input input-bordered w-full join-item ${
              errors?.confirmNewPassword ? "input-error" : ""
            }`} // Conditionally apply error class based on validation state
          />

          {/* Button to toggle password visibility */}
          <button
            type="button"
            className={`btn join-item ${
              errors?.confirmNewPassword ? "btn-error" : "btn-neutral"
            }`}
            onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state on button click
          >
            {showPassword ? (
              <PiEyeDuotone className="size-6" />
            ) : (
              <PiEyeClosedDuotone className="size-6" />
            )}
          </button>
        </div>

        {/* Error message display if validation fails */}
        {errors?.confirmNewPassword && (
          <div className="label">
            <span className="label-text-alt text-error">
              {errors.confirmNewPassword.message}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default ConfirmNewPass;
