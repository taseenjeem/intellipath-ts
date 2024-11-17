import {
  getAllCourses,
  getAllUsers,
  getCourseBySlug,
} from "@/database/server-actions";
import Breadcrumbs from "@/src/components/global/ui/Breadcrumbs";
import EditCourseForm from "@/src/components/page/edit-course/EditCourseForm";
import { ICourse, IUserInfo } from "@/types";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Edit Course - Intellipath",
};

const EditCoursePage = async ({
  params,
}: Readonly<{ params: { username: string; course: string } }>) => {
  const course = await getCourseBySlug(params.course);

  return (
    <>
      <Breadcrumbs
        username={params.username}
        course={course?.title ?? "Failed to load course name"}
      />
      <EditCourseForm course={course} />
    </>
  );
};

export default EditCoursePage;
