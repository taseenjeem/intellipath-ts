import { getCourseBySlug } from "@/database/server-actions";
import { ICourse } from "@/types";
import { formatDate } from "@/utils/dateFormatter";
import { convertMinutesToHoursAndMinutes } from "@/utils/minFormatter";
import Image from "next/image";
import "/styles/description.scss";

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
              <button className="btn btn-primary">Enroll Now</button>
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
      </section>
    </>
  );
};

export default CourseDetailsPage;
