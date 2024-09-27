import { getTopCourses } from "@/database/db-queries";
import CourseCard from "@/src/components/global/ui/CourseCard";
import { ICourses } from "@/types";
import illustrator from "/public/assets/images/search.png";
import Image from "next/image";

const MyCoursesPage = async ({
  params,
}: Readonly<{ params: { username: string } }>) => {
  const purchasedCourses: ICourses[] = await getTopCourses();

  return (
    <>
      {purchasedCourses.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 w-full mt-5">
          {purchasedCourses.map((item: ICourses) => (
            <CourseCard
              key={item._id}
              href={`/profile/${params.username}/my-courses/${item.slug}`}
              courseDetails={item}
              purchased
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 flex flex-col justify-center items-center">
          <Image
            priority
            src={illustrator}
            className="max-w-md w-full"
            alt="No purchased courses"
          />
          <h2 className="text-xl font-semibold mt-5">
            You haven&apos;t purchased any courses yet.
          </h2>
          <p className="text-gray-600 mt-2">
            Start exploring and learning new skills by purchasing courses from
            our curated list.
          </p>
        </div>
      )}
    </>
  );
};

export default MyCoursesPage;
