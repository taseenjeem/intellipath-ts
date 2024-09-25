import { ICredentialLoginFormData } from "@/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface EmailInputFieldProps {
  register: UseFormRegister<ICredentialLoginFormData>; // Hook form register for form control
  errors: FieldErrors<ICredentialLoginFormData>; // Field errors for form validation
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
          required: "Your email is required", // Validation: email required
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex pattern for valid email
            message: "Please enter a valid email address", // Validation message for invalid email format
          },
        })}
        type="email"
        id="email"
        name="email"
        placeholder="example@email.com"
        className={`input input-bordered ${errors?.email ? "input-error" : ""}`} // Error class if email validation fails
      />

      {/* Display error message if email validation fails */}
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
