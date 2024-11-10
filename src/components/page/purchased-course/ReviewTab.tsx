"use client";
import { useEffect, useState } from "react";
import AddReviewForm from "./AddReview";
import { ITestimonial } from "@/types";
import { getReviewByUsername } from "@/database/server-actions";
import Image from "next/image";
import userPlaceholder from "/public/assets/images/profile-placeholder.jpg";
import { FaStar } from "react-icons/fa6";

interface IReviewTabProps {
  courseId: string;
  username: string;
}

const ReviewTab = ({ courseId, username }: IReviewTabProps) => {
  const [review, setReview] = useState<ITestimonial | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUserReview = async () => {
      setIsLoading(true);
      try {
        const result: ITestimonial = await getReviewByUsername(username);
        if (result) {
          setReview(result);
        } else {
          setReview(null);
        }
      } catch (error) {
        console.error("Error fetching user review:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getUserReview();
  }, [username]);

  return (
    <>
      <input
        type="radio"
        name="course_tabs"
        role="tab"
        className="tab"
        aria-label="Reviews"
      />
      <div role="tabpanel" className="tab-content pt-5 min-h-[60vh]">
        {review && (
          <>
            <h3 className="mb-5 font-semibold">Thank you for your response</h3>
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
          </>
        )}

        {!review && <AddReviewForm courseId={courseId} />}
      </div>
    </>
  );
};

export default ReviewTab;
