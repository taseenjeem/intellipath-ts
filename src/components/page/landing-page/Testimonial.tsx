import { getTestimonials } from "@/database/db-queries";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";

const Testimonial = async () => {
  const feedbackData = await getTestimonials();

  return (
    <>
      <section className="container min-h-screen w-full mt-7 md:mt-28">
        <div className="md:flex md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="lg:text-5xl text-3xl text-primary uppercase font-bold">
              Voices of Success
            </h2>

            <p className="mt-6">
              Hear from our vibrant community! Discover inspiring testimonials
              and reviews from students and instructors who have experienced the
              transformative power of IntelliPath. See how our courses have made
              a real difference in their educational journeys and career
              advancements.
            </p>
          </div>
          <Link href="/shop" className="mt-6 md:mt-0 btn btn-primary ">
            Start Learning
          </Link>
        </div>

        <div className="mt-5 md:mt-10 [column-fill:_balance] sm:columns-2 gap-3 lg:columns-3 md:gap-5">
          {feedbackData.map((item) => (
            <div
              key={item._id}
              className="mb-5 sm:break-inside-avoid cursor-pointer"
            >
              <blockquote className="card p-5 bg-base-300 hover:shadow-xl border border-base-300 hover:border-primary duration-300">
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 rounded-full ring ring-offset-2">
                      <Image
                        alt="Customer Avatar"
                        src={item.avatar}
                        width={48}
                        height={48}
                        className="size-14 rounded-full object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-sm">
                      {item.role} - {item.course}
                    </p>
                    <span className="flex items-center text-sm gap-2 text-accent">
                      {item.rating}
                      <FaStar />
                    </span>
                  </div>
                </div>

                <p className="mt-4 italic text-xs md:text-base">
                  &quot; {item.content} &quot;
                </p>
              </blockquote>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Testimonial;
