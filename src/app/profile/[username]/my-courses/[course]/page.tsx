import {
  getAllCourses,
  getAllUsers,
  getCourseBySlug,
} from "@/database/server-actions";
import Breadcrumbs from "@/src/components/global/ui/Breadcrumbs";
import CourseControls from "@/src/components/page/purchased-course/CourseControls";
import { ICourse, IUserInfo } from "@/types";

export const generateStaticParams = async () => {
  const allUsers: IUserInfo[] = await getAllUsers();
  const allCourses: ICourse[] = await getAllCourses();

  const staticPaths: any = [];

  allUsers.forEach((user: IUserInfo) => {
    allCourses.forEach((course: ICourse) => {
      staticPaths.push({
        params: {
          username: user.username,
          course: course.slug,
        },
      });
    });
  });

  return staticPaths;
};

export const generateMetadata = async ({
  params,
}: Readonly<{ params: { username: string; course: string } }>) => {
  const course: ICourse = await getCourseBySlug(params.course);
  return {
    title: `${course.title} - Intellipath`,
  };
};

const PurchasedCourse = async ({
  params,
}: Readonly<{ params: { username: string; course: string } }>) => {
  const course: ICourse = await getCourseBySlug(params.course);

  return (
    <>
      <Breadcrumbs
        username={params.username}
        course={course?.title ?? "Failed to load course name"}
      />
      <CourseControls courseData={course} username={params.username} />
    </>
  );
};

export default PurchasedCourse;
