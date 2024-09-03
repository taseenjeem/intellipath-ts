"use client";
import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import NameInputField from "./NameInputField";
import EmailInputField from "./EmailInputField";
import PassInputField from "./PassInputField";
import { toast } from "react-toastify";
import Logo from "@/src/components/global/ui/Logo";
import { IRegisterFormInputs } from "@/types";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const methods = useForm<IRegisterFormInputs>();

  const handleRegister: SubmitHandler<IRegisterFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      console.log(data);
    } catch (error: any) {
      toast.error(error.message);
      methods.setError("root.serverError", { message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleRegister)}
        className="card-body pb-0"
      >
        <Logo formMode={true} />
        <NameInputField
          register={methods.register}
          errors={methods.formState.errors}
        />
        <EmailInputField
          register={methods.register}
          errors={methods.formState.errors}
        />
        <PassInputField
          register={methods.register}
          errors={methods.formState.errors}
        />
        <div className="form-control mt-6">
          {isLoading ? (
            <button disabled className="btn btn-primary">
              <span className="loading loading-spinner"></span>
              Loading..
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
