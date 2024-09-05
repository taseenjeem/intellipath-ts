import { IRegisterFormInputs } from "@/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface NameInputFieldProps {
  register: UseFormRegister<IRegisterFormInputs>;
  errors: FieldErrors<IRegisterFormInputs>;
}

const NameInputField = ({ register, errors }: NameInputFieldProps) => {
  return (
    <>
      <div className="md:grid md:grid-cols-2 gap-2">
        <div className="form-control">
          <label htmlFor="firstName" className="label">
            <span
              className={`label-text ${errors?.firstName ? "text-error" : ""}`}
            >
              First Name
            </span>
          </label>
          <input
            {...register("firstName", { required: "First Name is required" })}
            type="text"
            id="firstName"
            name="firstName"
            placeholder="John"
            className={`input input-bordered ${
              errors?.firstName ? "input-error" : ""
            }`}
          />
          {errors?.firstName && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.firstName.message}
              </span>
            </div>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="lastName" className="label">
            <span
              className={`label-text ${errors?.lastName ? "text-error" : ""}`}
            >
              Last Name
            </span>
          </label>
          <input
            {...register("lastName", { required: "Last Name is required" })}
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Duo"
            className={`input input-bordered ${
              errors?.lastName ? "input-error" : ""
            }`}
          />
          {errors?.lastName && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.lastName.message}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NameInputField;
