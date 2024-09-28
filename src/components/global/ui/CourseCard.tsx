import { ICourse } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

interface CourseCardProps {
  courseDetails: ICourse;
  purchased?: boolean;
  href: string;
}

const CourseCard = ({
  courseDetails,
  purchased = false,
  href,
}: CourseCardProps) => {
  return (
    <div className="card card-compact bg-base-300 hover:shadow-xl border border-base-300 hover:border-primary duration-300 group">
      <figure className="w-full max-w-[358px] max-h-[202px] overflow-hidden">
        <Image
          src={courseDetails?.thumbnail}
          alt={`${courseDetails?.title} thumbnail`}
          width={358}
          height={202}
          className="w-full h-auto object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
        />
      </figure>
      <div className="card-body">
        <h2 className="text-base md:text-xl font-semibold leading-tight md:leading-normal">
          {courseDetails?.title}
        </h2>
        <p className="text-xs md:text-base">
          {courseDetails?.short_description}
        </p>
        <div className="flex flex-col md:flex-row justify-between">
          <span className="text-xs md:text-base">
            <strong>Instructor: </strong>
            <span className="link-hover cursor-pointer">Taseen Jeem</span>
          </span>
          <span className="flex items-center gap-2 text-accent text-xs md:text-base mt-2 md:mt-0">
            <span className="cursor-pointer" title="Total reviews">
              ({courseDetails?.testimonials.length})
            </span>{" "}
            <span className="cursor-pointer" title="Average ratings">
              5
            </span>
            <FaStar />
          </span>
        </div>

        <div className="card-actions w-full md:mt-5 mt-2">
          <Link href={href} className="btn btn-sm md:btn-md btn-primary w-full">
            {purchased ? "Start learning" : "Learn more"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
