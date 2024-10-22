import { getCourseById } from "@/database/server-actions";
import CheckoutForm from "@/src/components/page/checkout-page/CheckoutForm";
import ProductDescription from "@/src/components/page/checkout-page/ProductDescription";

const CheckOutPage = async ({ params }: { params: { id: string } }) => {
  const course = await getCourseById(params.id);
  return (
    <>
      <section className="container mt-5 md:mt-10">
        <h1 className="text-4xl uppercase font-semibold text-primary">
          Checkout
        </h1>
        <div className="grid grid-cols-2 gap-10 mt-5">
          <CheckoutForm />
          <ProductDescription course={course} />
        </div>
      </section>
    </>
  );
};

export default CheckOutPage;
