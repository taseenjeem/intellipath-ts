import CourseCard from "@/src/components/global/ui/CourseCard";
import { ICourse, IUserInfo } from "@/types";
import illustrator from "/public/assets/images/search.png";
import Image from "next/image";
import { getUserByUsername } from "@/database/server-actions";
import Link from "next/link";

const MyCoursesPage = async ({
  params,
}: Readonly<{ params: { username: string } }>) => {
  const user: IUserInfo = await getUserByUsername(params.username);
  const { courses, role, username } = user;

  return (
    <>
      {role === "instructor" && (
        <div className="my-5 space-y-2 flex justify-between">
          <h3 className="text-xl md:text-2xl text-primary font-semibold">
            You have published total {courses?.length ?? 0} courses
          </h3>
          <Link
            href={`/profile/${params.username}/my-courses/publish-a-new-course`}
            className="btn btn-primary"
          >
            Publish a new course
          </Link>
        </div>
      )}
      {courses && courses.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 w-full mt-5">
          {courses.map((item: ICourse) => (
            <CourseCard
              key={item._id}
              href={`/profile/${params.username}/my-courses/${item.slug}`}
              courseDetails={item}
              purchased
              instructorMode={role === "instructor"}
              username={username}
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
            {role === "learner"
              ? "You haven't purchased any courses yet."
              : "You haven't published any courses yet."}
          </h2>
          <p className="text-gray-600 mt-2">
            {role === "learner"
              ? "Start exploring and learning new skills by purchasing courses from our curated list."
              : `To publish a course click on "Publish a new course" button`}
          </p>
        </div>
      )}
    </>
  );
};

export default MyCoursesPage;
