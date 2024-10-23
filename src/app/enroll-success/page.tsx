"use client";
import Image from "next/image";
import img from "/public/assets/images/enroll-success.png";
import { BiSolidBadgeCheck } from "react-icons/bi";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";

const EnrollSuccessPage = () => {
  const { username } = useAppSelector((state) => state.userInfo);

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <Image
          src={img}
          className="max-w-md w-full rounded-lg drop-shadow-xl"
          alt="Successful enrollment image"
        />
        <div className="lg:w-2/4">
          <h1 className="text-3xl font-bold">
            Successful Enrollment Confirmation &quot; Full Stack Web
            Development&quot;{" "}
            <BiSolidBadgeCheck className="inline text-green-500" />
          </h1>
          <p className="py-6">
            Congratulations! You have successfully enrolled in your chosen
            course. We&apos;re excited to have you on board and look forward to
            guiding you on your learning journey. Get ready to dive into the
            course content, connect with instructors, and start achieving your
            goals. Welcome to a new world of knowledge and opportunities!
          </p>
          <div className="space-x-3">
            <Link
              href={`/profile/${username}/my-courses/`}
              className="btn btn-primary"
            >
              Start Learning
            </Link>
            <Link href={`/courses`} className="btn btn-primary">
              Explore Other Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollSuccessPage;
