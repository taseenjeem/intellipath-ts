import { getCourseById } from "@/database/server-actions";
import CheckoutForm from "@/src/components/page/checkout-page/CheckoutForm";

const CheckOutPage = async ({ params }: { params: { id: string } }) => {
  const course = await getCourseById(params.id);
  return (
    <>
      <section className="container mt-5 md:mt-10">
        <h1 className="text-4xl uppercase font-semibold text-primary">
          Checkout
        </h1>
        <div>
          <CheckoutForm />
        </div>
      </section>
    </>
  );
};

export default CheckOutPage;
