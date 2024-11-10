import { getCourseBySlug } from "@/database/server-actions";
import { ICourse } from "@/types";
import { formatDate } from "@/utils/dateFormatter";
import { convertMinutesToHoursAndMinutes } from "@/utils/minFormatter";
import Image from "next/image";
import "/styles/description.scss";
import Link from "next/link";
import { placeholderBase64 } from "@/utils/placeholderBase64";
import CouponModal from "@/src/components/page/couese-details-page/CouponModal";
import TestimonialSlide from "@/src/components/page/courses-page/TestimonialSlide";

const CourseDetailsPage = async ({
  params,
}: Readonly<{ params: { slug: string } }>) => {
  const course: ICourse = await getCourseBySlug(params.slug);

  return (
    <>
      <section className="container">
        <div className="mt-5 md:mt-10 flex flex-col lg:flex-row gap-5">
          <div className="border-2 border-primary max-w-3xl w-full rounded-xl relative">
            <Image
              fill
              src={course.thumbnail}
              alt={course.title}
              placeholder="blur"
              blurDataURL={placeholderBase64}
              className="max-w-3xl w-full rounded-xl object-cover object-center"
            />
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-primary">
              {course.title}
            </h1>
            <p className="mt-3 max-w-lg">{course.short_description}</p>
            <div className="mt-7">
              <h2>
                <strong>Instructor: </strong>
                {course.instructor.firstName} {course.instructor.lastName}
              </h2>
              <h3>
                <strong>Category: </strong>
                {course.category}
              </h3>
              <h3>
                <strong>Course Language: </strong>
                {course.language}
              </h3>
              <h3>
                <strong>Course Level: </strong>
                {course.level}
              </h3>
              <h3>
                <strong>Course Duration: </strong>
                {convertMinutesToHoursAndMinutes(course.duration)}
              </h3>
              <h3>
                <strong>Total Enrollments: </strong>
                {course.enrollments ? course.enrollments.length : 0}
              </h3>
              <h3>
                <strong>Course Updated On: </strong>
                {course.updatedAt
                  ? formatDate(
                      course.updatedAt instanceof Date
                        ? course.updatedAt.toISOString()
                        : course.updatedAt
                    )
                  : "N/A"}
              </h3>
            </div>

            <div className="mt-5 flex flex-col md:flex-row md:items-end gap-5 md:gap-10">
              <div className="text-primary">
                <strong>Price: </strong>
                {course.discount ? (
                  <div className="flex items-end gap-2">
                    <p className="text-5xl font-semibold">${course.discount}</p>
                    <p className="text-xl line-through">${course.price}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-5xl font-semibold">${course.price}</p>
                  </div>
                )}
              </div>
              <Link
                href={`/checkout/${course._id}`}
                className="btn btn-primary"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
        <div className="space-y-5 md:space-y-10 mt-5 md:mt-10">
          <div>
            <h2 className="text-lg text-primary capitalize">
              <strong>Minimum Requirements: </strong>
            </h2>
            <p>{course.requirements}</p>
          </div>
          <div>
            <h2 className="text-lg text-primary capitalize">
              <strong>Course Modules: </strong>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-5 mt-3">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson._id}
                  className="bg-base-300 p-5 rounded-xl flex justify-center items-center"
                >
                  <p className="text-center">
                    {index + 1}. {lesson.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div
            className="description-container"
            dangerouslySetInnerHTML={{ __html: course.full_description }}
          />
        </div>
        <div className="mt-10">
          <div className="md:flex md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="lg:text-5xl text-3xl text-primary uppercase font-bold">
                Voices of Success
              </h2>

              <p className="mt-6">
                Hear from our vibrant community! Discover inspiring testimonials
                and reviews from students and instructors who have experienced
                the transformative power of IntelliPath. See how our courses
                have made a real difference in their educational journeys and
                career advancements.
              </p>
            </div>
            <Link href="/shop" className="mt-6 md:mt-0 btn btn-primary ">
              Join Our Community
            </Link>
          </div>
          {course.testimonials && course.testimonials?.length > 0 ? (
            <TestimonialSlide testimonials={course.testimonials ?? []} />
          ) : (
            <div className="border custom-border p-5 rounded-xl h-72 flex justify-center items-center mt-5">
              <p>No reviews have been added yet!</p>
            </div>
          )}
        </div>
        <CouponModal coupons={course.coupons || []} />
      </section>
    </>
  );
};

export default CourseDetailsPage;
