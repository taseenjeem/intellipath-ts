import { getCourseBySlug } from "@/database/server-actions";
import { ICourse } from "@/types";
import { formatDate } from "@/utils/dateFormatter";
import { convertMinutesToHoursAndMinutes } from "@/utils/minFormatter";
import Image from "next/image";

const CourseDetailsPage = async ({
  params,
}: Readonly<{ params: { slug: string } }>) => {
  const course: ICourse = await getCourseBySlug(params.slug);

  return (
    <>
      <section className="container">
        <div className="mt-5 md:mt-10 flex flex-col lg:flex-row gap-5">
          <Image
            width={400}
            height={400}
            src={course.thumbnail}
            alt={course.title}
            className="max-w-3xl w-full rounded-xl border-2 border-primary"
          />
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
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseDetailsPage;
