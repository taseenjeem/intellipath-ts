import { getCourseBySlug } from "@/database/server-actions";
import Breadcrumbs from "@/src/components/global/ui/Breadcrumbs";

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
    </>
  );
};

export default EditCoursePage;
