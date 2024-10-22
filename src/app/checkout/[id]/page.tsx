import { getCourseById } from "@/database/server-actions";
import ProductDescription from "@/src/components/page/checkout-page/ProductDescription";

const CheckOutPage = async ({ params }: { params: { id: string } }) => {
  const course = await getCourseById(params.id);
  return (
    <>
      <section className="container mt-5 md:mt-10">
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
