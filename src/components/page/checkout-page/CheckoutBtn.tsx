"use client";
import { createCheckoutSession } from "@/services/stripe/stripe";
import { ICourse } from "@/types";
import { toast } from "react-toastify";

const CheckoutBtn = ({
  course,
  purchasedPrice,
}: {
  course: ICourse;
  purchasedPrice: number;
}) => {
  const formAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { title: course.title, id: course._id, price: purchasedPrice };
    const { url } = await createCheckoutSession(data);

    if (url) {
      window.location.assign(url);
    } else {
      toast.error("Something went wrong");
      console.error("Failed to create checkout session.");
      throw new Error("Failed to create checkout session.");
    }
  };

  return (
    <>
      <form onSubmit={formAction} className="mt-5">
        <button type="submit" className="btn btn-primary w-full">
          Continue Payment
        </button>
      </form>
    </>
  );
};

export default CheckoutBtn;
