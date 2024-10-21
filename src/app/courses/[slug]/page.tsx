import { getCourseBySlug } from "@/database/server-actions";

const CourseDetailsPage = async ({
  params,
}: Readonly<{ params: { slug: string } }>) => {
  const course = await getCourseBySlug(params.slug);

  return <>Hello World</>;
};

export default CourseDetailsPage;
