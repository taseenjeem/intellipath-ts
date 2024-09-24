"use client";
import { IChangePassForm } from "@/types";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";

interface ICurrentPassword {
  register: UseFormRegister<IChangePassForm>;
  errors: FieldErrors<IChangePassForm>;
}

const CurrentPassword = ({ register, errors }: ICurrentPassword) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <div className="form-control relative">
        <label htmlFor="currentPassword" className="label">
          <span
            className={`label-text ${
              errors?.currentPassword ? "text-error" : ""
            }`}
          >
            Your current password
          </span>
        </label>
        <div className="join">
          <input
            {...register("currentPassword", {
              required: "Your current password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a symbol",
              },
            })}
            type={showPassword ? "text" : "password"}
            id="currentPassword"
            name="currentPassword"
            placeholder="aBcD@123"
            className={`input input-bordered w-full join-item ${
              errors?.currentPassword ? "input-error" : ""
            }`}
          />
          <button
            type="button"
            className={`btn join-item ${
              errors?.currentPassword ? "btn-error" : "btn-neutral"
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
