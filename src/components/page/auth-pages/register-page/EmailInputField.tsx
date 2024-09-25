import { IRegisterFormInputs } from "@/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface EmailInputFieldProps {
  register: UseFormRegister<IRegisterFormInputs>;
  errors: FieldErrors<IRegisterFormInputs>;
}

const EmailInputField = ({ register, errors }: EmailInputFieldProps) => {
  return (
    <div className="form-control">
      <label htmlFor="email" className="label">
        <span className={`label-text ${errors?.email ? "text-error" : ""}`}>
          Email
        </span>
      </label>
      <input
        {...register("email", {
          // Registering the email input with validation rules
          required: "Your email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex pattern for email validation
            message: "Please enter a valid email address", // Error message for invalid email
          },
        })}
        type="email"
        id="email"
        name="email"
        placeholder="example@email.com"
        className={`input input-bordered ${errors?.email ? "input-error" : ""}`} // Conditional styling based on error state
      />

      {/* Display error message if there's a validation error */}
      {errors?.email && (
        <div className="label">
          <span className="label-text-alt text-error">
            {errors.email.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default EmailInputField;
