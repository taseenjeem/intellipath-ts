"use client";
import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import NameInputField from "./NameInputField";
import EmailInputField from "./EmailInputField";
import PassInputField from "./PassInputField";
import { toast } from "react-toastify";
import Logo from "@/src/components/global/ui/Logo";
import { IRegisterFormInputs } from "@/types";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to manage loading status
  const methods = useForm<IRegisterFormInputs>(); // Initializing react-hook-form
  const router = useRouter(); // Using router for navigation

  // Function to handle registration
  const handleRegister: SubmitHandler<IRegisterFormInputs> = async (data) => {
    setIsLoading(true); // Set loading state to true
    try {
      // Sending POST request to register the learner
      const response = await fetch(`/api/register/learner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        toast.success("Registration successful! Please login");
        router.push(`/auth/login`);
      } else if (response.status === 400) {
        toast.warning("Email already exists. Try another email");
      }
    } catch (error: any) {
      toast.error(error.message);
      methods.setError("root.serverError", { message: error.message });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <FormProvider {...methods}>
      {/* Providing form methods to children */}
      <form
        onSubmit={methods.handleSubmit(handleRegister)} // Handling form submission
        className="card-body"
      >
        <Logo formMode={true} />
        {/* Render name input fields */}
        <NameInputField
          register={methods.register}
          errors={methods.formState.errors}
        />
        {/* Render email input filed */}
        <EmailInputField
          register={methods.register}
          errors={methods.formState.errors}
        />
        {/* Render password input fields */}
        <PassInputField
          register={methods.register}
          errors={methods.formState.errors}
        />
        <div className="form-control mt-6">
          {isLoading ? (
            <button disabled className="btn btn-primary">
              <span className="loading loading-spinner"></span>
              Creating your account...
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Create an account
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
