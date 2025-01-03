"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ICourse } from "@/types";
import FilterModal from "./FilterModal";
import CourseCard from "../../global/ui/CourseCard";
import SearchCourses from "./SearchCourses";
import searchImg from "/public/assets/images/search.svg";
import Image from "next/image";

interface CourseShowcaseProps {
  courses: ICourse[];
}

const refineFilterQueries = (query: string) => {
  const decodedQuery = decodeURI(query);
  if (decodedQuery === "undefined" || !decodedQuery) {
    return null;
  }
  return decodedQuery.split("|").map((item) => item.trim());
};

const CourseShowcase = ({ courses }: CourseShowcaseProps) => {
  const [result, setResult] = useState<ICourse[]>(courses);
  const queryParams = useSearchParams();
  const router = useRouter();

  const searchQuery = queryParams.get("search-courses") || "";
  const categoryFilterQuery = refineFilterQueries(
    queryParams.get("category") ?? ""
  );
  const languageFilterQuery = refineFilterQueries(
    queryParams.get("language") ?? ""
  );
  const levelFilterQuery = refineFilterQueries(queryParams.get("level") ?? "");

  useEffect(() => {
    let filteredCourses = courses;

    if (searchQuery) {
      filteredCourses = filteredCourses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilterQuery && categoryFilterQuery.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
        categoryFilterQuery.includes(course.category)
      );
    }

    if (languageFilterQuery && languageFilterQuery.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
        languageFilterQuery.includes(course.language)
      );
    }

    if (levelFilterQuery && levelFilterQuery.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
        levelFilterQuery.includes(course.level)
      );
    }

    setResult(filteredCourses);
  }, [searchQuery, courses]);

  const handleSearch = (searchValue: string) => {
    if (searchValue) {
      router.push(`?search-courses=${searchValue}`);
    } else {
      router.push("/courses");
      setResult(courses);
    }
  };

  const handleReset = () => {
    router.push("/courses");
    setResult(courses);
  };

  return (
    <>
      <div className="lg:w-4/5 w-full md:mt-10 mt-5">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-wrap md:flex-none justify-between gap-5 items-center mb-5">
            {searchQuery ? (
              <h1 className="text-xl md:text-3xl font-semibold text-primary uppercase max-w-lg">
                Showing results for &quot;{searchQuery}&quot;
              </h1>
            ) : (
              <h1 className="text-xl md:text-3xl font-semibold text-primary uppercase">
                Explore our all courses
              </h1>
            )}
            <FilterModal />
          </div>
          <SearchCourses onSearch={handleSearch} onReset={handleReset} />
        </div>
        {result.length > 0 ? (
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
        ) : (
          <div className="min-h-[50hv] size-full flex flex-col justify-center ">
            <Image
              src={searchImg}
              alt="search illustrator"
              className="max-w-sm mx-auto"
            />
            {searchQuery ? (
              <p className="text-lg text-center">
                No courses found for &quot;{searchQuery}&quot;.
              </p>
            ) : (
              <p className="text-lg text-center">No data found</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CourseShowcase;
