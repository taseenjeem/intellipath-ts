import { ICourse } from "@/types";
import FilterModal from "./FilterModal";
import CourseCard from "../../global/ui/CourseCard";

interface CourseShowcaseProps {
  courses: ICourse[];
}

const CourseShowcase = ({ courses }: CourseShowcaseProps) => {
  return (
    <>
      <div className="lg:w-4/5 w-full mt-10 ">
        <div className="flex md:flex-none justify-between items-center mb-5">
          <h1 className="text-xl md:text-3xl">Explore our all courses</h1>
          <FilterModal />
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-2">
          {courses.map((course) => (
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
