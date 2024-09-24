"use client";
import { IChangePassForm } from "@/types";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CurrentPassword from "./CurrentPassword";

const ChangePassForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const methods = useForm<IChangePassForm>();

  const handleChangePassword: SubmitHandler<IChangePassForm> = async (data) => {
    setIsLoading(true);
    try {
      // Make API request to change password
      console.log(data);
    } catch (error) {
      toast.error("Something went wrong");
      // methods.setError("root.serverError", { message: response.message });
    } finally {
      setIsLoading(false);
    }
    methods.reset();
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleChangePassword)}
          className="space-y-4"
        >
          <CurrentPassword
            register={methods.register}
            errors={methods.formState.errors}
          />
          {isLoading ? (
            <button disabled className="btn btn-primary">
              <span className="loading loading-spinner"></span>
              Changing Password..
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Change password
            </button>
          )}
        </form>
      </FormProvider>
    </>
  );
};

export default ChangePassForm;
