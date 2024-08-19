"use client";
import { LoginFormInputs } from "@/types";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";

interface PasswordInputFieldProps {
  register: UseFormRegister<LoginFormInputs>;
  errors: FieldErrors<LoginFormInputs>;
}

const PassInputField = ({ register, errors }: PasswordInputFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
              required: "Your password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a symbol",
              },
            })}
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="aBcD@123"
            className={`input input-bordered w-full join-item ${
              errors?.password ? "input-error" : ""
            }`}
          />
          <button
            type="button"
            className={`btn join-item ${
              errors?.password ? "btn-error" : "btn-neutral"
            }`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <PiEyeDuotone className="size-6" />
            ) : (
              <PiEyeClosedDuotone className="size-6" />
            )}
          </button>
        </div>
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
