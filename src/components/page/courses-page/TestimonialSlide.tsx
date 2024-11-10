"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ITestimonial } from "@/types";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import userPlaceholder from "/public/assets/images/profile-placeholder.jpg";

const settings = {
  dots: true,
  infinite: false,
  autoplay: true,
  autoplaySpeed: 5000,
  cssEase: "linear",
  pauseOnHover: true,
  draggable: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};
const TestimonialSlide = ({
  testimonials,
}: {
  testimonials: ITestimonial[];
}) => {
  console.log("🚀 ~ testimonials:", testimonials);
  return (
    <>
      <div className="mt-10">
        <Slider {...settings}>
          {testimonials.map((review) => (
            <div key={review._id}>
              <blockquote className="card p-5 bg-base-300 hover:shadow-xl border border-base-300 hover:border-primary duration-300">
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 rounded-full ring ring-offset-2">
                      <Image
                        alt="Profile Picture"
                        src={
                          typeof review.user !== "string" &&
                          review.user.profileImageUrl
                            ? review.user.profileImageUrl
                            : userPlaceholder
                        }
                        width={48}
                        height={48}
                        className="size-14 rounded-full object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-lg">
                      {typeof review.user !== "string"
                        ? `${review.user.firstName} ${review.user.lastName}`
                        : "Unknown User"}
                    </p>
                    <span className="flex items-center text-sm gap-2 text-accent">
                      {review.rating}
                      <FaStar />
                    </span>
                  </div>
                </div>

                <p className="mt-4 italic text-xs md:text-base">
                  &quot; {review.content} &quot;
                </p>
              </blockquote>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default TestimonialSlide;
