"use client";
import Image from "next/image";
import notFoundIllustrator from "/public/assets/images/404.png";
import { RiArrowGoBackFill, RiHome5Line } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="hero custom-min-h my-5 md:my-0">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image
            priority
            src={notFoundIllustrator}
            className="md:max-w-xl rounded-lg drop-shadow-xl"
            alt="404 not found illustrator"
          />
          <div>
            <h1 className="text-5xl font-bold">Oops! Page Not Found</h1>
            <p className="py-6">
              Sorry, the page you&apos;re looking for doesn&apos;t exist. It
              might have been moved or deleted. Let&apos;s get you back on
              track. Return to the homepage or explore our categories to
              continue your learning journey with IntelliPath.
            </p>
            <div className="flex gap-3">
              <button onClick={() => router.back()} className="btn btn-primary">
                <RiArrowGoBackFill className="size-4" />
                Go Back
              </button>
              <Link href={`/`} className="btn btn-primary">
                <RiHome5Line className="size-5" />
                Go to homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
