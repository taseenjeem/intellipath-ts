"use client";
import { useEffect, useState } from "react";
import AddReviewForm from "./AddReview";
import { ITestimonial } from "@/types";
import { getReviewByUsername } from "@/database/server-actions";
import Image from "next/image";
import userPlaceholder from "/public/assets/images/profile-placeholder.jpg";
import { FaStar } from "react-icons/fa6";
import LoadingScreen from "../../global/Loadings/LoadingScreen";
import { MdEdit } from "react-icons/md";
import DeleteModal from "./DeleteModal";
import { useAppSelector } from "@/redux/store";

interface IReviewTabProps {
  courseId: string;
  username: string;
}

const ReviewTab = ({ courseId, username }: IReviewTabProps) => {
  const [review, setReview] = useState<ITestimonial | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { firstName, lastName } = useAppSelector((state) => state.userInfo);

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
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            {review && (
              <>
                <blockquote className="card p-5 bg-base-300">
                  <div className="flex items-center justify-between">
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
                            : `${firstName} ${lastName}`}
                        </p>
                        <span className="flex items-center text-sm gap-2 text-accent">
                          {review.rating}
                          <FaStar />
                        </span>
                      </div>
                    </div>
                    <span className="md:space-x-2 space-x-0 space-y-2 md:space-y-0 flex flex-col md:flex-row">
                      <DeleteModal
                        reviewId={review._id ?? ""}
                        courseId={courseId}
                        setReview={setReview}
                      />
                      <button className="btn btn-primary btn-xs md:btn-sm">
                        <MdEdit /> Edit
                      </button>
                    </span>
                  </div>

                  <p className="mt-4 italic text-xs md:text-base">
                    &quot; {review.content} &quot;
                  </p>
                </blockquote>
              </>
            )}
            {!review && (
              <AddReviewForm
                courseId={courseId}
                setReview={setReview}
                review={review}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ReviewTab;
