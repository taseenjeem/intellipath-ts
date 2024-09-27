import { getCourseBySlug } from "@/database/db-queries";
import Breadcrumbs from "@/src/components/page/purchased-course/Breadcrumbs";
import CourseControls from "@/src/components/page/purchased-course/CourseControls";

const PurchasedCourse = async ({
  params,
}: Readonly<{ params: { username: string; course: string } }>) => {
  const course = await getCourseBySlug(params.course);

  return (
    <>
      <Breadcrumbs
        username={params.username}
        course={course?.title ?? "Failed to load course name"}
      />
      <CourseControls />
    </>
  );
};

export default PurchasedCourse;
