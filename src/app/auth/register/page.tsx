import SocialAuth from "@/src/components/global/ui/SocialAuth";
import RegisterForm from "@/src/components/page/auth-pages/register-page/RegisterForm";
import Link from "next/link";

export const metadata = {
  title: "Create new account - IntelliPath",
  description:
    "Welcome to IntelliPath! Please log in to access your personalized learning dashboard and continue your educational journey. If you don't have an account yet, sign up now to unlock a world of knowledge and start navigating your future with us.",
};

const RegisterPage = () => {
  return (
    <>
      <div className="hero custom-min-h">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="lg:text-left mb-5 md:mb-0">
            <h1 className="text-5xl text-center lg:text-left font-bold">
              Join With Us!
            </h1>
            <p className="py-6 text-left">
              Join IntelliPath today and gain access to a wealth of courses and
              resources designed to help you achieve your learning goals.
              Registering is quick and easy—simply fill in your details to
              create your account and start your personalized learning journey
              with us.
            </p>
            <p className="mb-3">
              Already have an account? Log in here to continue your educational
              journey with IntelliPath!
            </p>
            <Link className="btn btn-neutral text-left" href={`/auth/login`}>
              Log In
            </Link>
          </div>
          <div className="card shrink-0 w-full max-w-lg bg-base-200">
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
