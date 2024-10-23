"use client";
import { ICourse } from "@/types";
import { formatDate } from "@/utils/dateFormatter";
import { convertMinutesToHoursAndMinutes } from "@/utils/minFormatter";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import CheckoutBtn from "./CheckoutBtn";

interface ProductDescriptionProps {
  course: ICourse;
}

interface ICoupon {
  _id?: string;
  code: string;
  discount: number;
}

const VAT_PERCENTAGE = 1;

const ProductDescription = ({ course }: ProductDescriptionProps) => {
  const [coupon, setCoupon] = useState<ICoupon | null>(null);

  const handleCouponChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = (e.target as HTMLFormElement).coupon.value;

    if (course.coupons) {
      const isValidCode = course.coupons.find(
        (item) => item.code.toLowerCase() === inputValue.toLowerCase()
      );

      if (isValidCode) {
        setCoupon(isValidCode);
        toast.success(`${isValidCode.code} Coupon applied successfully.`);
      } else {
        toast.error("Invalid coupon code.");
      }
    }
  };

  const calculateTotalPrice = () => {
    let priceAfterDiscount = course.discount || course.price;

    if (coupon) {
      const discountAmount = (priceAfterDiscount * coupon.discount) / 100;
      priceAfterDiscount -= discountAmount;
    }

    const vatAmount = (priceAfterDiscount * VAT_PERCENTAGE) / 100;
    const totalPrice = priceAfterDiscount + vatAmount;

    return Math.round(totalPrice);
  };

  return (
    <section className="max-w-[800px] w-full">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div>
          <Image
            width={400}
            height={100}
            src={course.thumbnail}
            alt={course.title}
            className="max-w-[393px] w-full border-2 border-primary rounded-xl"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3">{course.title}</h2>
          <h3 className="text-sm">
            <strong>Instructor: </strong>
            {course.instructor.firstName} {course.instructor.lastName}
          </h3>
          <h3 className="text-sm">
            <strong>Category: </strong>
            {course.category}
          </h3>
          <h3 className="text-sm">
            <strong>Course Language: </strong>
            {course.language}
          </h3>
          <h3 className="text-sm">
            <strong>Course Level: </strong>
            {course.level}
          </h3>
          <h3 className="text-sm">
            <strong>Course Duration: </strong>
            {convertMinutesToHoursAndMinutes(course.duration)}
          </h3>
          <h3 className="text-sm">
            <strong>Total Enrollments: </strong>
            {course.enrollments ? course.enrollments.length : 0}
          </h3>
          <h3 className="text-sm">
            <strong>Course Updated On: </strong>
            {course.updatedAt
              ? formatDate(
                  course.updatedAt instanceof Date
                    ? course.updatedAt.toISOString()
                    : course.updatedAt
                )
              : "N/A"}
          </h3>
        </div>
      </div>
      <div className="border-t border-dashed w-full my-5" />
      <div>
        {course.discount ? (
          <>
            <span className="flex items-center justify-between">
              <p>Actual Price :</p>
              <p>${course.price}</p>
            </span>
            <span className="flex items-center justify-between">
              <p>Discounted Price :</p>
              <p>${course.discount}</p>
            </span>
          </>
        ) : (
          <span className="flex items-center justify-between">
            <p>Actual Price :</p>
            <p>${course.price}</p>
          </span>
        )}
        <span className="flex items-center justify-between">
          <p>VAT (Value Added Tax) :</p>
          <p>{VAT_PERCENTAGE}%</p>
        </span>
        {coupon && (
          <span className="flex items-center justify-between">
            <p>Discount with coupon &quot;{coupon.code}&quot; :</p>
            <p>{coupon.discount}%</p>
          </span>
        )}
        <div className="border-t border-dashed w-full my-5" />
        <span className="flex items-center justify-between text-primary text-lg font-semibold">
          <p>Total :</p>
          <p>${calculateTotalPrice()}</p>
        </span>
      </div>
      <form onSubmit={handleCouponChange} className="mt-3">
        <div className="form-control">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              required
              type="text"
              id="coupon"
              name="coupon"
              placeholder="Use a valid promo code"
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary btn-outline w-full md:w-auto">
              Apply Coupon Code
            </button>
          </div>
        </div>
      </form>
      <CheckoutBtn />
    </section>
  );
};

export default ProductDescription;
