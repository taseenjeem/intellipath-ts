import { getAllCourses } from "@/database/server-actions";
import CourseShowcase from "@/src/components/page/courses-page/CourseShowcase";
import Filters from "@/src/components/page/courses-page/Filters";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Showcase - Intellipath",
  description:
    "IntelliPath is a cutting-edge online education platform designed to empower learners of all ages with personalized and engaging learning experiences. Our platform offers a vast array of courses across various disciplines, utilizing advanced technology to tailor learning paths that suit individual needs and goals. Whether you're looking to advance your career, develop new skills, or explore new interests, IntelliPath provides the tools and support to help you succeed.",
};

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
