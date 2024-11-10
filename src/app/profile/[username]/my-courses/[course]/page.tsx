import { getCourseBySlug } from "@/database/server-actions";
import Breadcrumbs from "@/src/components/global/ui/Breadcrumbs";
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
      <CourseControls courseData={course} username={params.username} />
    </>
  );
};

export default PurchasedCourse;
