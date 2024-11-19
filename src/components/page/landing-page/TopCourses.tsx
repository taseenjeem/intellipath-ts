import Link from "next/link";
import CourseCard from "../../global/ui/CourseCard";
import { ICourse } from "@/types";
import { getAllCourses } from "@/database/server-actions";

const TopCourses = async () => {
  const allCourses: ICourse[] = await getAllCourses();

  const sortedCourses = allCourses
    .filter(
      (course) =>
        Array.isArray(course.enrollments) && course.enrollments.length > 0
    )
    .sort((a, b) => (b.enrollments?.length || 0) - (a.enrollments?.length || 0))
    .slice(0, 8);

  return (
    <section className="container min-h-screen w-full mt-7 md:mt-28">
      <div className="md:flex md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="lg:text-5xl text-3xl text-primary uppercase font-bold">
            Explore Our Top Courses
          </h2>

          <p className="mt-6">
            Discover the most popular courses that are transforming lives.
            Whether you&apos;re looking to boost your career, learn a new skill,
            or pursue a passion, our top-rated courses provide the knowledge and
            expertise you need to succeed. Start learning today with
            IntelliPath.
          </p>
        </div>
        <Link href="/courses" className="mt-6 md:mt-0 btn btn-primary ">
          See All Courses
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 w-full mt-5 md:mt-10">
        {sortedCourses.map((item: ICourse) => (
          <CourseCard
            key={item._id}
            courseDetails={item}
            href={`/courses/${item.slug}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TopCourses;
