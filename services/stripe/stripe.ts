"use server";
import { headers } from "next/headers";
import { stripe } from "./stripeConfig";

export const createCheckoutSession = async (data: any) => {
  const ui_mode = "hosted";
  const origin = headers().get("origin");

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "auto",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: { name: data.title },
          unit_amount: data.price * 100,
        },
      },
    ],
    ...(ui_mode === "hosted" && {
      success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${data.id}&instructorId=${data.instructor}`,
      cancel_url: `${origin}/courses`,
    }),
    ui_mode,
  });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
};

export const createPaymentIntent = async (data: any) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: data.price * 100,
    automatic_payment_methods: { enabled: true },
    currency: "USD",
  });

  return { client_secret: paymentIntent.client_secret };
};
