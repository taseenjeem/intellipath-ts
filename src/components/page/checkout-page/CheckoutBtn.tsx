"use client";
import { createCheckoutSession } from "@/services/stripe/stripe";
import { ICourse } from "@/types";
import { toast } from "react-toastify";

const CheckoutBtn = ({ course }: { course: ICourse }) => {
  const formAction = async (data: any) => {
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
