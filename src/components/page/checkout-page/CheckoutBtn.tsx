"use client";
import { createCheckoutSession } from "@/services/stripe/stripe";

const CheckoutBtn = () => {
  const formAction = async (data: any) => {
    const { url } = await createCheckoutSession(data);

    if (url) {
      window.location.assign(url);
    } else {
      console.error("Failed to create checkout session.");
      throw new Error("Failed to create checkout session.");
    }
  };

  return (
    <>
      <form action={formAction} className="mt-5">
        <button type="submit" className="btn btn-primary w-full">
          Continue Payment
        </button>
      </form>
    </>
  );
};

export default CheckoutBtn;
