"use client";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import EmailInputField from "./EmailInputField";
import PassInputField from "./PassInputField";
import { toast } from "react-toastify";
import Link from "next/link";
import { useState } from "react";
import Logo from "../../../global/ui/Logo";
import { ILoginFormInputs } from "@/types";
import { credentialLogin } from "@/database/server-actions";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const methods = useForm<ILoginFormInputs>();
  const router = useRouter();

  const handleLogin: SubmitHandler<ILoginFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      const response = await credentialLogin(data);

      if (response.success) {
        toast.success(response.message);
        router.push("/");
      } else {
        toast.error("Invalid credentials. Try again!");
        methods.setError("root.serverError", { message: response.message });
      }
    } catch (error: any) {
      toast.error("An error occurred while processing your request.");
      methods.setError("root.serverError", { message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleLogin)}
        className="card-body pb-0"
      >
        <Logo formMode={true} />
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
              Login
            </button>
          )}
          <label className="label flex justify-start">
            <Link
              href="/reset-password"
              className="label-text-alt link link-hover"
            >
              Forgot password?
            </Link>
          </label>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
