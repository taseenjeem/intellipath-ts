import { getCourseBySlug } from "@/database/db-queries";
import Breadcrumbs from "@/src/components/page/purchased-course/Breadcrumbs";
import VideoPlayer from "@/src/components/page/purchased-course/VideoPlayer";

const PurchasedCourse = async ({
  params,
}: Readonly<{ params: { username: string; course: string } }>) => {
  const course = await getCourseBySlug(params.course);

  return (
    <>
      <Breadcrumbs username={params.username} course={course?.title ?? ""} />
      <VideoPlayer />
    </>
  );
};

export default PurchasedCourse;
