"use client";
import { ICourse } from "@/types";
import FilterModal from "./FilterModal";
import CourseCard from "../../global/ui/CourseCard";
import SearchCourses from "./SearchCourses";
import { useState } from "react";

interface CourseShowcaseProps {
  courses: ICourse[];
}

const CourseShowcase = ({ courses }: CourseShowcaseProps) => {
  const [result, setResult] = useState(courses);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchValue = e.currentTarget.search.value.toLowerCase();

    const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchValue)
    );

    setResult(filteredCourses);
  };

  return (
    <>
      <div className="lg:w-4/5 w-full md:mt-10 mt-5">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-wrap md:flex-none justify-between gap-5 items-center mb-5">
            <h1 className="text-xl md:text-3xl font-semibold text-primary uppercase">
              Explore our all courses
            </h1>
            <FilterModal />
          </div>
          <SearchCourses onSearch={handleSearch} />
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-2 mt-6">
          {result.map((course) => (
            <div key={course._id}>
              <CourseCard
                courseDetails={course}
                href={`/courses/${course.slug}`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseShowcase;
