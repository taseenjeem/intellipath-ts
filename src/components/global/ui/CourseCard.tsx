import { ICourse } from "@/types";
import { placeholderBase64 } from "@/utils/placeholderBase64";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

interface CourseCardProps {
  courseDetails: ICourse;
  purchased?: boolean;
  instructorMode?: boolean;
  username?: string;
  href: string;
}

const CourseCard = ({
  courseDetails,
  purchased = false,
  instructorMode = false,
  username,
  href,
}: CourseCardProps) => {
  const averageRating = (): number => {
    if (
      !courseDetails?.testimonials ||
      courseDetails.testimonials.length === 0
    ) {
      return 0;
    }

    const totalRating = courseDetails.testimonials.reduce(
      (sum, testimonial) => sum + (testimonial.rating || 0),
      0
    );

    return totalRating / courseDetails.testimonials.length;
  };

  return (
    <div className="card size-full card-compact bg-base-300 hover:shadow-xl border border-base-300 hover:border-primary duration-300 group">
      <figure className="w-full max-h-[202px] overflow-hidden">
        <Image
          src={courseDetails?.thumbnail}
          alt={`${courseDetails?.title} thumbnail`}
          width={358}
          height={202}
          placeholder="blur"
          blurDataURL={placeholderBase64}
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
            <span className="link-hover cursor-pointer">
              {courseDetails.instructor.firstName}{" "}
              {courseDetails.instructor.lastName}
            </span>
          </span>
          <span className="flex items-center gap-2 text-accent text-xs md:text-base mt-2 md:mt-0">
            <span className="cursor-pointer" title="Total reviews">
              ({courseDetails?.testimonials?.length || 0})
            </span>{" "}
            <span className="flex items-center gap-[2px]">
              <span className="cursor-pointer" title="Average ratings">
                {averageRating()}
              </span>
              <FaStar />
            </span>
          </span>
        </div>

        <div className="card-actions w-full md:mt-5 mt-2">
          {instructorMode ? (
            <Link
              href={`/profile/${username}/my-courses/edit-course/${courseDetails.slug}`}
              className="btn btn-sm md:btn-md btn-primary w-full"
            >
              Edit Course Details
            </Link>
          ) : (
            <Link
              href={href}
              className="btn btn-sm md:btn-md btn-primary w-full"
            >
              {purchased ? "Start learning" : "Learn more"}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
