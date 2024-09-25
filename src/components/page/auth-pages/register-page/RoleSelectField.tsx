"use client";
import { IRegisterFormInputs } from "@/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface IRoleSelectFieldProps {
  register: UseFormRegister<IRegisterFormInputs>;
  errors: FieldErrors<IRegisterFormInputs>;
}

const RoleSelectField = ({ register, errors }: IRoleSelectFieldProps) => {
  return (
    <div className="form-control">
      <label className="label" htmlFor="role">
        <span className={`label-text ${errors?.role ? "text-error" : ""}`}>
          You are registering as
        </span>
      </label>
      <select
        {...register("role", {
          required: "Selecting your role is required",
        })}
        id="role"
        name="role"
        className={`select select-bordered ${
          errors?.role ? "select-error" : ""
        }`}
      >
        <option value="" disabled selected>
          Select your role
        </option>
        <option value="learner">Learner</option>
        <option value="instructor">Instructor</option>
      </select>
      {errors?.role && (
        <div className="label">
          <span className="label-text-alt text-error">
            {errors.role.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default RoleSelectField;
