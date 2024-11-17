import Image from "next/image";
import heroImg from "/public/assets/images/graduation.svg";
import { auth } from "@/auth";
import { IUserInfo } from "@/types";
import { getUserByEmail } from "@/database/server-actions";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Already Purchased - Intellipath",
  description:
    "IntelliPath is a cutting-edge online education platform designed to empower learners of all ages with personalized and engaging learning experiences. Our platform offers a vast array of courses across various disciplines, utilizing advanced technology to tailor learning paths that suit individual needs and goals. Whether you're looking to advance your career, develop new skills, or explore new interests, IntelliPath provides the tools and support to help you succeed.",
};

const CourseAlreadyPurchasedPage = async () => {
  const authInfo = await auth();
  const email = authInfo?.user?.email;

  if (!email) {
    return (
      <div className="hero min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">
          Unable to retrieve user information. Please log in again.
        </p>
      </div>
    );
  }

  const user: IUserInfo = await getUserByEmail(email);

  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={heroImg}
            alt="course already purchased hero image"
            className="drop-shadow-xl"
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Course Already Purchased
            </h1>
            <p className="py-6">
              You&apos;ve already purchased this course! No need to buy
              again—whenever the course gets updated with new content,
              you&apos;ll automatically have access to it for free. Enjoy
              lifetime learning at no extra cost!
            </p>
            <Link
              href={`/profile/${user.username}/my-courses`}
              className="btn btn-primary"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseAlreadyPurchasedPage;
