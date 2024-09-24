"use client";
import { IChangePassForm } from "@/types";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";

interface INewPassword {
  register: UseFormRegister<IChangePassForm>;
  errors: FieldErrors<IChangePassForm>;
}

const NewPassword = ({ register, errors }: INewPassword) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <div className="form-control relative">
        <label htmlFor="newPassword" className="label">
          <span
            className={`label-text ${errors?.newPassword ? "text-error" : ""}`}
          >
            Create a new password
          </span>
        </label>
        <div className="join">
          <input
            {...register("newPassword", {
              required: "Your new password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a symbol",
              },
            })}
            type={showPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            placeholder="aBcD@123"
            className={`input input-bordered w-full join-item ${
              errors?.newPassword ? "input-error" : ""
            }`}
          />
          <button
            type="button"
            className={`btn join-item ${
              errors?.newPassword ? "btn-error" : "btn-neutral"
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
