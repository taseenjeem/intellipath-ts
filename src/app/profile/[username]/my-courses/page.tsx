import { getTopCourses } from "@/database/db-queries";
import CourseCard from "@/src/components/global/ui/CourseCard";
import { ICourses } from "@/types";

const MyCoursesPage = async ({
  params,
}: Readonly<{ params: { username: string } }>) => {
  const topCourses: ICourses[] = await getTopCourses();

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 w-full mt-5">
        {topCourses.map((item: ICourses) => (
          <CourseCard
            key={item._id}
            href={`/profile/${params.username}/my-courses/${item.slug}`}
            courseDetails={item}
            purchased
          />
        ))}
      </div>
    </>
  );
};

export default MyCoursesPage;
