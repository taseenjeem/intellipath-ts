import { getAllCourses } from "@/database/server-actions";
import CourseShowcase from "@/src/components/page/courses-page/CourseShowcase";
import Filters from "@/src/components/page/courses-page/Filters";

const CoursesPage = async () => {
  const allCourse = await getAllCourses();

  return (
    <>
      <section className="container">
        <div className="flex gap-5">
          <Filters />
          <CourseShowcase courses={allCourse} />
        </div>
      </section>
    </>
  );
};

export default CoursesPage;
