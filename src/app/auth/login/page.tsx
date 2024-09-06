import LoginForm from "@/src/components/page/auth-pages/login-page/LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Login - IntelliPath",
  description:
    "Welcome to IntelliPath! Please log in to access your personalized learning dashboard and continue your educational journey. If you don't have an account yet, sign up now to unlock a world of knowledge and start navigating your future with us.",
};

const LoginPage = () => {
  return (
    <>
      <div className="hero custom-min-h">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="lg:text-left mb-5 md:mb-0">
            <h1 className="text-5xl text-center lg:text-left font-bold">
              Welcome Back!
            </h1>
            <p className="py-6 text-left">
              Welcome to IntelliPath! Please log in to access your personalized
              learning dashboard and continue your educational journey. If you
              don&apos;t have an account yet, sign up now to unlock a world of
              knowledge and start navigating your future with us.
            </p>
            <p className="mb-3">
              Don&apos;t have an account? Create one today and start your path
              to success with IntelliPath!
            </p>
            <Link className="btn btn-neutral text-left" href={`/auth/register`}>
              Create a new account
            </Link>
          </div>
          <div className="card shrink-0 w-full max-w-lg bg-base-200">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
