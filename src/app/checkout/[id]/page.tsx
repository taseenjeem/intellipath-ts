import { auth } from "@/auth";
import {
  getAllCourses,
  getCourseById,
  getUserByEmail,
} from "@/database/server-actions";
import ProductDescription from "@/src/components/page/checkout-page/ProductDescription";
import { ICourse, IUserInfo } from "@/types";
import { redirect } from "next/navigation";

export const generateStaticParams = async () => {
  const allCourses = await getAllCourses();
  return allCourses.map((course: ICourse) => ({ id: course._id }));
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const course: ICourse = await getCourseById(params.id);

  return {
    title: `Checkout - ${course.title}`,
  };
};

const CheckOutPage = async ({ params }: { params: { id: string } }) => {
  const course: ICourse = await getCourseById(params.id);
  const authInfo = await auth();

  if (authInfo?.user?.email) {
    const user: IUserInfo = await getUserByEmail(authInfo.user?.email);
    if (user.role === "instructor") {
      redirect("/");
    }
  }

  if (authInfo?.user?.email) {
    const user: IUserInfo = await getUserByEmail(authInfo.user?.email);
    if (user.role === "learner" && user.enrolledCourses) {
      const isSameCourse = user.enrolledCourses.find(
        (course) => course.purchased_course._id === params.id
      );
      if (isSameCourse) {
        redirect(`/checkout/course-already-purchased`);
      }
    }
  }

  return (
    <>
      <section className="container mt-5 md:mt-10 min-h-screen">
        <h1 className="text-4xl uppercase font-semibold text-primary text-center mb-5 md:mb-10">
          confirm checkout
        </h1>
        <div className="flex justify-center">
          <ProductDescription course={course} />
        </div>
      </section>
    </>
  );
};

export default CheckOutPage;
