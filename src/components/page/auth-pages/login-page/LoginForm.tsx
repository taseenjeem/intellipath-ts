"use client";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import EmailInputField from "./EmailInputField";
import PassInputField from "./PassInputField";
import { toast } from "react-toastify";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "../../../global/ui/Logo";
import { ICredentialLoginFormData } from "@/types";
import { credentialLogin, getUserByEmail } from "@/database/server-actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/store";
import { updateUserInfo } from "@/redux/slices/UserInfoSlice";
import { useSession } from "next-auth/react";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const methods = useForm<ICredentialLoginFormData>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  console.log("🚀 ~ LoginForm ~ session:", session);

  useEffect(() => {
    const message = searchParams.get("message");
    if (message === "login_required") {
      toast.warn("Access denied. Please login.");
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete("message");
      router.replace(currentUrl.toString());
    }
  }, [searchParams, router]);

  const handleLogin: SubmitHandler<ICredentialLoginFormData> = async (data) => {
    setIsLoading(true);
    try {
      await credentialLogin(data);
      const userInfo = await getUserByEmail(session?.user?.email ?? data.email);
      dispatch(updateUserInfo(userInfo));
      toast.success("Login Successful");
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast.error("An error occurred while processing your request.");
      methods.setError("root.serverError", { message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleLogin)} className="card-body">
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
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
