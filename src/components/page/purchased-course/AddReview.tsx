"use client";
import { addReview } from "@/database/server-actions";
import { useAppSelector } from "@/redux/store";
import { ITestimonial } from "@/types";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";

const AddReviewForm = ({
  courseId,
  setReview,
}: {
  courseId: string;
  setReview: React.Dispatch<React.SetStateAction<ITestimonial | null>>;
}) => {
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { _id } = useAppSelector((state) => state.userInfo);

  const handleRating = (rate: number) => {
    setRatingValue(rate);
  };

  const handleReviewForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (ratingValue === 0) {
      return toast.warn("Please select a rating");
    } else if (reviewText === "") {
      return toast.warn("Please add your valuable review");
    }

    const data = {
      user: _id,
      course: courseId,
      content: reviewText,
      rating: ratingValue,
    };

    const addReviewResult = await addReview(data);

    if (addReviewResult) {
      toast.success("Review added successfully!");
      setRatingValue(0);
      setReviewText("");
      setIsSubmitting(false);
      setReview(addReviewResult.review);
    } else {
      toast.error("Failed to add review. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="label-text">Rate this course out of 5 stars:</h3>
        <Rating SVGstyle={{ display: "inline-block" }} onClick={handleRating} />
      </div>
      <form onSubmit={handleReviewForm}>
        <div className="form-control">
          <label className="label" htmlFor="review">
            <span className="label-text">
              Tell us about your experience and improvements
            </span>
          </label>
          <textarea
            id="review"
            name="review"
            className="textarea textarea-bordered min-h-52"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
        {isSubmitting ? (
          <button className="btn btn-primary mt-5">
            <span className="loading loading-spinner"></span>
            Loading
          </button>
        ) : (
          <button type="submit" className="btn btn-primary mt-5">
            Add your review
          </button>
        )}
      </form>
    </div>
  );
};

export default AddReviewForm;
