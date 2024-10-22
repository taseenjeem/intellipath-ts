import { getCourseById } from "@/database/server-actions";

const CheckOutPage = async ({ params }: { params: { id: string } }) => {
  const course = await getCourseById(params.id);
  console.log("🚀 ~ CheckOutPage ~ course:", course);
  return <>Hello World</>;
};

export default CheckOutPage;
