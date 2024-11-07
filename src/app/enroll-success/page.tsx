import Image from "next/image";
import img from "/public/assets/images/enroll-success.png";
import { BiSolidBadgeCheck } from "react-icons/bi";
import Link from "next/link";
import { ICourse, IEnrollments, IUserInfo } from "@/types";
import {
  enrollment,
  getCourseById,
  getUserByEmail,
  getUserByID,
} from "@/database/server-actions";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { stripe } from "@/services/stripe/stripeConfig";

interface EnrollSuccessPageProps {
  searchParams: {
    courseId: string;
    session_id: string;
    instructorId: string;
  };
}

const EnrollSuccessPage = async ({ searchParams }: EnrollSuccessPageProps) => {
  const userSession = await auth();
  const course: ICourse = await getCourseById(searchParams.courseId);
  const user: IUserInfo = await getUserByEmail(userSession?.user?.email ?? "");
  const instructor: IUserInfo = await getUserByID(searchParams.instructorId);
  const checkoutSession = await stripe.checkout.sessions.retrieve(
    searchParams.session_id
  );

  const {
    id,
    amount_total,
    amount_subtotal,
    currency,
    created,
    expires_at,
    payment_intent,
    payment_status,
    mode,
    status,
    success_url,
    cancel_url,
    customer_details,
    payment_method_types,
  } = checkoutSession;

  const data: IEnrollments = {
    stripe_session_id: id,
    amount_subtotal: amount_subtotal ? amount_subtotal / 100 : 0,
    amount_total: amount_total ? amount_total / 100 : 0,
    currency: currency,
    created: created,
    expires_at: expires_at,
    payment_intent:
      typeof payment_intent === "string"
        ? payment_intent
        : payment_intent?.id || null,
    payment_status: payment_status,
    mode: mode,
    status: status,
    success_url: success_url,
    cancel_url: cancel_url,
    customer_details: {
      email_while_payment: customer_details?.email,
      name_while_payment: customer_details?.name,
      address_while_payment: customer_details?.address?.country,
    },
    payment_method_type: payment_method_types,
    instructor: instructor,
    purchased_by: user,
    purchased_course: course,
  };

  if (
    !searchParams.courseId ||
    !searchParams.session_id ||
    !searchParams.instructorId ||
    !userSession?.user?.email ||
    user.role === "instructor"
  ) {
    redirect("/");
  } else {
    await enrollment(data, user._id, course._id ?? "");
  }

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <Image
          src={img}
          className="max-w-md w-full rounded-lg drop-shadow-xl"
          alt="Successful enrollment image"
        />
        <div className="lg:w-2/4">
          <h1 className="text-2xl font-bold">
            Successful Enrollment Confirmation &quot;{course?.title}&quot;{" "}
            <BiSolidBadgeCheck className="inline text-green-500" />
          </h1>
          <p className="py-6">
            Congratulations! You have successfully enrolled in your chosen
            course. We&apos;re excited to have you on board and look forward to
            guiding you on your learning journey. Get ready to dive into the
            course content, connect with instructors, and start achieving your
            goals. Welcome to a new world of knowledge and opportunities!
          </p>
          <div className="space-x-3">
            <Link
              href={`/profile/${user.username}/my-courses/`}
              className="btn btn-primary"
            >
              Start Learning
            </Link>
            <Link href={`/courses`} className="btn btn-primary">
              Explore Other Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollSuccessPage;
