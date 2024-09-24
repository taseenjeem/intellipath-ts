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
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
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
              required: "Confirming your new password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a symbol",
              },
            })}
            type={showPassword ? "text" : "password"}
            id="confirmNewPassword"
            name="confirmNewPassword"
            placeholder="aBcD@123"
            className={`input input-bordered w-full join-item ${
              errors?.confirmNewPassword ? "input-error" : ""
            }`}
          />
          <button
            type="button"
            className={`btn join-item ${
              errors?.confirmNewPassword ? "btn-error" : "btn-neutral"
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
