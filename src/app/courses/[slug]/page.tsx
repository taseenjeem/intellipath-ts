import { getCourseBySlug } from "@/database/db-queries";

const CourseDetailsPage = async ({
  params,
}: Readonly<{ params: { slug: string } }>) => {
  const course = await getCourseBySlug(params.slug);

  return <>Hello World</>;
};

export default CourseDetailsPage;
